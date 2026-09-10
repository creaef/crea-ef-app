import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { execFile } from 'child_process';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import mammoth from 'mammoth';
import * as pdfParseModule from 'pdf-parse';
const pdfParse: any = (pdfParseModule as any).default || pdfParseModule;
import * as XLSX from 'xlsx';
import { formatGameDescription } from './src/types';
import { getNormativaForEtapa } from './src/utils/documentHeader';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

dotenv.config();

const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp, '(default)');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload too large. Por favor, reduce el tamaño de los documentos seleccionados.' });
  }
  next();
});

// API Key Pool for zero-cost high availability rotation across free Gemini keys
function getApiKeys(): string[] {
  const keys: string[] = [];
  if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY.trim());
  if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2.trim());
  if (process.env.GEMINI_API_KEY_3) keys.push(process.env.GEMINI_API_KEY_3.trim());
  if (process.env.GEMINI_API_KEY_4) keys.push(process.env.GEMINI_API_KEY_4.trim());
  
  if (keys.length === 0) {
    throw new Error('La clave GEMINI_API_KEY no está configurada en las variables de entorno.');
  }
  return Array.from(new Set(keys));
}

let keyPoolIndex = 0;

function getGenAIClient(keyIndexOrKey?: number | string): GoogleGenAI {
  let selectedKey = '';
  if (typeof keyIndexOrKey === 'string') {
    selectedKey = keyIndexOrKey;
  } else {
    const keys = getApiKeys();
    const keyIndex = keyIndexOrKey;
    selectedKey = keys[keyIndex !== undefined ? keyIndex % keys.length : keyPoolIndex % keys.length];
  }
  
  return new GoogleGenAI({
    apiKey: selectedKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

let freeKeyPoolIndex = 0;

// Helper to execute Gemini requests with multi-key rotation & free Flash model fallback on 429 / rate limit
async function callGeminiWithRetry(
  req: any,
  ai: GoogleGenAI,
  params: Parameters<typeof ai.models.generateContent>[0],
  maxRetries = 2
) {
  const userApiKey = req?.headers?.['x-user-api-key'] as string | undefined;
  const allKeys = userApiKey ? [userApiKey] : getApiKeys();
  
  // Si hay más de 1 llave, asumimos que la última es la de PAGO (fallback absoluto).
  const isMultiKey = !userApiKey && allKeys.length > 1;
  const freeKeys = isMultiKey ? allKeys.slice(0, allKeys.length - 1) : allKeys;
  const paidKey = isMultiKey ? allKeys[allKeys.length - 1] : null;

  // Ordenamos las llaves para esta petición: rotación entre gratuitas + pago al final
  const keysToTry: string[] = [];
  if (userApiKey || allKeys.length === 1) {
    keysToTry.push(allKeys[0]);
  } else {
    const startIndex = freeKeyPoolIndex % freeKeys.length;
    freeKeyPoolIndex = (freeKeyPoolIndex + 1) % freeKeys.length; // Avanzar rotación para la siguiente petición
    for (let i = 0; i < freeKeys.length; i++) {
      keysToTry.push(freeKeys[(startIndex + i) % freeKeys.length]);
    }
    if (paidKey) keysToTry.push(paidKey);
  }

  const obsoleteModels = ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash'];
  const requestedModel = params.model && !obsoleteModels.includes(params.model)
    ? params.model
    : 'gemini-flash-lite-latest';

  const modelsToTry = [
    requestedModel,
    'gemini-flash-lite-latest',
    'gemini-3.5-flash-lite',
    'gemini-flash-latest',
  ];
  const uniqueModels = Array.from(new Set(modelsToTry));
  let lastError: any = null;

  // Intentamos las llaves en el orden óptimo (gratuitas primero, pago al final)
  for (let kIndex = 0; kIndex < keysToTry.length; kIndex++) {
    const currentKey = keysToTry[kIndex];
    const client = getGenAIClient(currentKey);

    for (const modelCandidate of uniqueModels) {
      let attempt = 0;
      while (attempt <= maxRetries) {
        try {
          const currentParams = { ...params, model: modelCandidate };
          const response = await client.models.generateContent(currentParams);
          // Retornamos directo sin bloquear llaves globales
          return response;
        } catch (err: any) {
          lastError = err;
          const errStr = String(err?.message || err || '');
          const statusCode = err?.status || err?.statusCode || err?.code;

          // Si el modelo da 404 o fue retirado, NUNCA reintentar
          if (statusCode === 404 || errStr.includes('404') || errStr.includes('not found') || errStr.includes('no longer available')) {
            console.warn(`[Gemini API Key #${kIndex + 1} - ${modelCandidate}] Modelo no disponible (404), descartando de inmediato.`);
            break;
          }

          const isQuotaOrTransient =
            statusCode === 429 ||
            statusCode === 503 ||
            statusCode === 500 ||
            errStr.includes('429') ||
            errStr.includes('503') ||
            errStr.includes('RESOURCE_EXHAUSTED') ||
            errStr.includes('Quota exceeded') ||
            errStr.includes('quota') ||
            errStr.includes('overloaded');

          if (isQuotaOrTransient && attempt < maxRetries) {
            attempt++;
            const delayMs = attempt * 600 + Math.floor(Math.random() * 200);
            console.warn(`[Gemini API Key #${kIndex + 1} - ${modelCandidate}] Reintento ${attempt}/${maxRetries} en ${delayMs}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          } else {
            console.warn(`[Gemini API Key #${kIndex + 1} - ${modelCandidate}] Rotando a siguiente modelo/clave por: ${errStr.substring(0, 100)}`);
            break; // Try next model or next API key
          }
        }
      }
    }
  }

  if (lastError) {
    const errStr = String(lastError?.message || lastError);
    if (errStr.includes('API_KEY_SERVICE_BLOCKED') || errStr.includes('PERMISSION_DENIED') || errStr.includes('API_KEY_INVALID')) {
      throw new Error('La clave API proporcionada no es válida o no tiene permisos para usar Gemini. Si acabas de crearla, Google puede tardar 2-3 minutos en activarla. Asegúrate también de que elegiste "Create API key in new project".');
    }
    if (errStr.includes('503') || errStr.includes('high demand') || errStr.includes('overloaded') || errStr.includes('UNAVAILABLE')) {
      throw new Error('Los servidores de Google Gemini están muy saturados en este momento. Por favor, espera un par de minutos y vuelve a intentarlo.');
    }
    throw lastError;
  }
  throw new Error('El servicio de la API de Gemini no está disponible en este momento. Por favor, inténtalo de nuevo en unos instantes.');
}

// System instruction prompt for Andalusian EF LOMLOE Expert
const getSystemInstructionEF = (etapa?: string, comunidad: string = 'Andalucía') => `
Actúa como un Experto Docente en Educación Física y Desarrollador de Situaciones de Aprendizaje (SdA) para ${etapa || 'Educación Primaria'} en la Comunidad Autónoma de ${comunidad} (España), bajo la normativa vigente de dicha comunidad.
Tus propuestas deben ser pedagógicamente impecables, inclusivas (Marco DUA y atención NEAE), fundamentadas en metodologías activas y estrictamente alineadas con los Criterios de Evaluación y Competencias Específicas de ${comunidad} de Educación Física.
Responde siempre en español profesional, motivador y docente.
`;

/**
 * Safely parses JSON strings returned by AI models, stripping markdown fences,
 * extracting the inner JSON object/array, and cleaning trailing content or control characters.
 */
function safeParseAIJson<T = any>(text: string | undefined | null, defaultValue: T): T {
  if (!text || typeof text !== 'string') return defaultValue;

  let cleaned = text.trim();

  // Strip markdown code fences (```json ... ```)
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
    const fenceIdx = cleaned.indexOf('```');
    if (fenceIdx !== -1) {
      cleaned = cleaned.substring(0, fenceIdx).trim();
    }
  }

  // Extract from first { or [ to matching last } or ]
  const firstObj = cleaned.indexOf('{');
  const firstArr = cleaned.indexOf('[');

  let startIdx = -1;
  let endIdx = -1;

  if (firstObj !== -1 && (firstArr === -1 || firstObj < firstArr)) {
    startIdx = firstObj;
    endIdx = cleaned.lastIndexOf('}');
  } else if (firstArr !== -1) {
    startIdx = firstArr;
    endIdx = cleaned.lastIndexOf(']');
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('[safeParseAIJson] Primary JSON parse failed, attempting sanitization...', err);
    try {
      const sanitized = cleaned
        .replace(/,\s*([\}\]])/g, '$1')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, (c) => (c === '\n' || c === '\r' || c === '\t' ? c : ''));
      return JSON.parse(sanitized);
    } catch (e2) {
      console.error('[safeParseAIJson] Failed to parse JSON response:', e2, '\nLength:', text.length);
      return defaultValue;
    }
  }
}

// --- PERSISTENCE MOVED TO FIRESTORE ---

const trialStore = new Map<string, { count: number; lastAccess: Date }>();

// Vía 1: Trial (Doble Validación)
app.post('/api/auth/trial', (req, res) => {
  const { email, deviceCount } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  const cleanEmail = String(email).trim().toLowerCase();
  let record = trialStore.get(cleanEmail);

  if (!record) {
    record = { count: Math.max(0, Number(deviceCount) || 0), lastAccess: new Date() };
    trialStore.set(cleanEmail, record);
  }

  if (record.count >= 3 || Number(deviceCount) >= 3) {
    return res.status(403).json({
      blocked: true,
      message: 'Límite máximo de 3 Situaciones de Aprendizaje de prueba alcanzado en este email o dispositivo.',
      generacionesUsadas: record.count,
    });
  }

  record.count += 1;
  record.lastAccess = new Date();

  return res.json({
    blocked: false,
    generacionesUsadas: record.count,
    generacionesRestantes: Math.max(0, 3 - record.count),
  });
});

// Vía 2: Confirmar Pago Stripe (Webhook oficial y confirmación por URL)
app.post('/api/stripe/webhook', async (req, res) => {
  const event = req.body;
  const email =
    event?.data?.object?.customer_details?.email ||
    event?.data?.object?.customer_email ||
    event?.data?.object?.email ||
    event?.email;

  if (email) {
    const cleanEmail = String(email).trim().toLowerCase();
    const userRef = doc(db, 'users', cleanEmail);
    try {
      await setDoc(userRef, { estadoPago: 'Pagado', email: cleanEmail, password: '123' }, { merge: true });
      console.log(`[Stripe Webhook] Usuario ${cleanEmail} actualizado a estado Pagado en Firestore.`);
    } catch (e) {
      console.error(`[Stripe Webhook] Error actualizando usuario ${cleanEmail} en Firestore:`, e);
    }
  }
  res.json({ received: true });
});

app.post('/api/auth/user/confirm-payment', async (req, res) => {
  const { email } = req.body;
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail) return res.status(400).json({ error: 'Email requerido' });

  const userRef = doc(db, 'users', cleanEmail);
  try {
    await setDoc(userRef, { estadoPago: 'Pagado', email: cleanEmail }, { merge: true });
    return res.json({ success: true, estadoPago: 'Pagado', email: cleanEmail });
  } catch (e) {
    console.error(`Error confirming payment for ${cleanEmail}:`, e);
    return res.status(500).json({ error: 'Error interno guardando confirmación de pago' });
  }
});

// API 1: Generar Justificación de la SdA
app.post('/api/ai/generate-justification', async (req, res) => {
  try {
    const { titulo, curso, ciclo, tematica, etapa, comunidad = 'Andalucía' } = req.body;
    if (!titulo || !tematica) {
      return res.status(400).json({ error: 'Título y temática son requeridos.' });
    }

    const ai = getGenAIClient();
    const normativa = getNormativaForEtapa(etapa, comunidad);
    const prompt = `Redacta una justificación pedagógica y motivadora (entre 120 y 200 palabras) para una Situación de Aprendizaje de Educación Física.
Título: "${titulo}"
Curso/Nivel: ${curso} (${ciclo})
Temática principal: ${tematica}

Instrucciones:
- Justifica la pertinencia de la temática según el desarrollo psicoevolutivo del alumnado de ${curso}.
- Conecta explícitamente y textualmente con la relevancia para la vida diaria, el fomento de hábitos saludables, la inclusión DUA y los valores de la normativa vigente de la Comunidad Autónoma de ${comunidad}: cumpliendo estricta y únicamente con lo que establece el ${normativa}. Debes mencionar explícitamente esta ley/decreto.
- Devuelve únicamente el texto de la justificación redactado en Markdown limpio.`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash-8b',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.7,
      },
    });

    res.json({ justificacion: response.text?.trim() || '' });
  } catch (error: any) {
    console.error('Error generating justification:', error);
    res.status(500).json({ error: error.message || 'Error al generar la justificación con IA.' });
  }
});

// API 2: Generar Rúbrica de Evaluación
app.post('/api/ai/generate-rubric', async (req, res) => {
  try {
    const { criterios, etapa, comunidad } = req.body;
    if (!criterios || !Array.isArray(criterios) || criterios.length === 0) {
      return res.status(400).json({ error: 'Se requiere una lista de criterios de evaluación.' });
    }

    const ai = getGenAIClient();
    const prompt = `Genera los descriptores de una Rúbrica de Evaluación Formativa y Cuadrante de Desempeño para los siguientes Criterios de Evaluación de Educación Física (LOMLOE ${comunidad || 'Andalucía'}):
${JSON.stringify(criterios, null, 2)}

INSTRUCCIONES PEDAGÓGICAS ESTRICTAS:
- Para CADA criterio debes generar OBLIGATORIAMENTE 4 niveles de desempeño progresivos y diferenciados:
  1. "Iniciado (1-4)": Dificultad notable o necesidad de guía constante del docente.
  2. "En proceso (5-6)": Aplicación básica o ejecución con apoyos y correcciones puntuales.
  3. "Conseguido (7-8)": Dominio autónomo, correcto y seguro en las situaciones motrices habituales.
  4. "Excelente (9-10)": Dominio sobresaliente, fluido, creativo y con iniciativa de colaboración con el grupo.
- TOTALMENTE PROHIBIDO usar nombres propios ficticios de alumnos (como "Luis", "Ana", etc.). Describe acciones pedagógicas impersonales ("Presenta dificultad para...", "Aplica de forma autónoma...", etc.).
- PROHIBIDO repetir el mismo texto en diferentes niveles.
- El texto del criterio debe corresponder exactamente con el criterio curricular indicado.

Devuelve una respuesta en formato JSON estricto con el siguiente esquema:
[
  {
    "criterioCodigo": "código del criterio (ej: EFI.1.1.a)",
    "criterioTexto": "texto íntegro del criterio",
    "niveles": [
      { "nivel": "Iniciado (1-4)", "descriptor": "descripción concreta del desempeño para nivel iniciado" },
      { "nivel": "En proceso (5-6)", "descriptor": "descripción concreta del desempeño para nivel en proceso" },
      { "nivel": "Conseguido (7-8)", "descriptor": "descripción concreta del desempeño para nivel conseguido" },
      { "nivel": "Excelente (9-10)", "descriptor": "descripción concreta del desempeño para nivel excelente" }
    ]
  }
]`;

    try {
      const response = await callGeminiWithRetry(req, ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
          temperature: 0.3,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                criterioCodigo: { type: Type.STRING },
                criterioTexto: { type: Type.STRING },
                niveles: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      nivel: { type: Type.STRING },
                      descriptor: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        },
      });

      const parsed = safeParseAIJson(response.text, []);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Validar que no contenga valores corruptos ni repeticiones
        const validRubric = parsed.map((item: any) => {
          const rawLevels = Array.isArray(item.niveles) ? item.niveles : [];
          const labels = ['Iniciado (1-4)', 'En proceso (5-6)', 'Conseguido (7-8)', 'Excelente (9-10)'];
          const cleanLevels = labels.map((lbl, idx) => {
            const found = rawLevels.find((n: any) => n.nivel?.includes(lbl.split(' ')[0]) || n.nivel?.includes(String(idx + 1))) || rawLevels[idx];
            const cleanDesc = (found?.descriptor || '')
              .replace(/undefined/gi, '')
              .replace(/Luis\/a|Luis|alumn[oa] fictici[oa]/gi, 'El alumnado')
              .trim();
            return {
              nivel: lbl,
              descriptor: cleanDesc || `Demuestra desempeño acorde al nivel ${lbl} en los aprendizajes del criterio.`
            };
          });
          return {
            criterioCodigo: item.criterioCodigo || 'Criterio EF',
            criterioTexto: (item.criterioTexto || '').replace(/undefined/gi, '').trim(),
            niveles: cleanLevels
          };
        });
        return res.json({ rubrica: validRubric });
      }
    } catch (aiErr) {
      console.warn('[generate-rubric] Gemini AI error, using fallback rubric:', aiErr);
    }

    const fallbackRubric = criterios.map((c: any) => {
      const codigo = c.codigo || c.criterioCodigo || 'Criterio EF';
      const desc = (c.descripcion || c.criterioTexto || 'desarrollo de las capacidades y saberes motrices').replace(/undefined/gi, '').trim();
      return {
        criterioCodigo: codigo,
        criterioTexto: desc,
        niveles: [
          { nivel: 'Iniciado (1-4)', descriptor: `Muestra dificultades para identificar y aplicar los aprendizajes motrices de ${codigo}. Precisa ayuda y guía permanente del docente.` },
          { nivel: 'En proceso (5-6)', descriptor: `Participa con interés y aplica de forma básica las normas y habilidades de ${codigo}, necesitando indicaciones puntuales.` },
          { nivel: 'Conseguido (7-8)', descriptor: `Demuestra solvencia, autonomía y eficacia en el cumplimiento de ${codigo}, integrando las normas y hábitos saludables de forma habitual.` },
          { nivel: 'Excelente (9-10)', descriptor: `Demuestra un dominio sobresaliente y creativo en ${codigo}, anticipando respuestas motrices eficaces y colaborando activamente con el grupo.` },
        ],
      };
    });

    res.json({ rubrica: fallbackRubric });
  } catch (error: any) {
    console.error('Error generating rubric:', error);
    res.status(500).json({ error: error.message || 'Error al generar la rúbrica.' });
  }
});

// API 2b: Generar Rúbrica Personalizada de 4 Niveles por Sesión de Trabajo
app.post('/api/ai/generate-session-rubric', async (req, res) => {
  try {
    const { sesiones, tematica, curso, criteriosSeleccionados = [], etapa } = req.body;
    if (!Array.isArray(sesiones) || sesiones.length === 0) {
      return res.status(400).json({ error: 'Se requiere al menos una sesión de trabajo generada.' });
    }

    const ai = getGenAIClient();

    const summarySesiones = sesiones
      .map((s: any, idx: number) => {
        const mainGames = (s.fases || [])
          .map((f: any) => f.nombreJuego)
          .filter(Boolean)
          .join(', ');
        return `Sesión ${s.numeroSesion || idx + 1}: "${s.titulo || 'Sesión de EF'}" | Objetivo: ${s.objetivoSesion || 'Práctica motriz'} | Juegos: ${mainGames || 'Actividades de EF'}`;
      })
      .join('\n');

    const prompt = `Crea una Rúbrica Criterial y Cualitativa de EVALUACIÓN DE 4 NIVELES adaptada específicamente a CADA UNA de las siguientes sesiones de trabajo de Educación Física (${curso || 'Primaria'}, Temática: "${tematica || 'General'}"):

Criterios de Evaluación LOMLOE seleccionados por el docente:
${JSON.stringify(criteriosSeleccionados || [], null, 2)}

Sesiones de Trabajo a evaluar:
${summarySesiones}

INSTRUCCIONES CRÍTICAS:
Para CADA una de las ${sesiones.length} sesiones:
1. Selecciona 1, 2 o 3 Criterios de Evaluación de la lista anterior que tengan relación directa con las habilidades y juegos motores trabajados en dicha sesión.
2. Escribe la rúbrica de 4 niveles (Iniciado 1-4, En proceso 5-6, Conseguido 7-8, Excelente 9-10) evaluando el desempeño de los estudiantes en los juegos específicos de esa sesión bajo la perspectiva de los Criterios de Evaluación seleccionados.

Devuelve un JSON array de objetos con el siguiente esquema:
[
  {
    "criterioCodigo": "Sesión 1: [Título de la sesión] (Criterios: [Codigos de criterios vinculados])",
    "criterioTexto": "[Resumen de los juegos principales trabajados en la sesión y su vinculación con los Criterios seleccionados]",
    "niveles": [
      { "nivel": "Iniciado (1-4)", "descriptor": "[Descripción cualitativa de desempeño deficiente en los juegos de la sesión respecto al criterio]" },
      { "nivel": "En proceso (5-6)", "descriptor": "[Descripción cualitativa de desempeño básico con ayuda en la sesión respecto al criterio]" },
      { "nivel": "Conseguido (7-8)", "descriptor": "[Descripción cualitativa de desempeño autónomo y fluido en la sesión respecto al criterio]" },
      { "nivel": "Excelente (9-10)", "descriptor": "[Descripción cualitativa de desempeño sobresaliente, creativo y cooperativo en la sesión]" }
    ]
  }
]`;

    try {
      const response = await callGeminiWithRetry(req, ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
          temperature: 0.3,
          responseMimeType: 'application/json',
        },
      });

      const parsed = safeParseAIJson(response.text, []);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ rubrica: parsed });
      }
    } catch (aiErr) {
      console.warn('[generate-session-rubric] Gemini AI error, fallback local por sesión:', aiErr);
    }

    // Dynamic fallback generator linked to criteriosSeleccionados
    const fallbackRubric = sesiones.map((s: any, idx: number) => {
      const mainGames = (s.fases || []).map((f: any) => f.nombreJuego).filter(Boolean).slice(0, 3).join(', ');
      const sesTitle = s.titulo ? `Sesión ${s.numeroSesion || idx + 1}: ${s.titulo}` : `Sesión ${s.numeroSesion || idx + 1}`;

      const matchedCriteria = (criteriosSeleccionados && criteriosSeleccionados.length > 0)
        ? criteriosSeleccionados.slice(idx % criteriosSeleccionados.length, (idx % criteriosSeleccionados.length) + 2).join(', ')
        : 'Criterios LOMLOE EF';

      const descContenidos = mainGames
        ? `Juegos trabajados: ${mainGames} (Vinculados a ${matchedCriteria})`
        : `Objetivo: ${s.objetivoSesion || 'Práctica motriz'} (Vinculados a ${matchedCriteria})`;

      return {
        criterioCodigo: `${sesTitle} [${matchedCriteria}]`,
        criterioTexto: descContenidos,
        niveles: [
          {
            nivel: 'Iniciado (1-4)',
            descriptor: `Presenta dificultades notables para ejecutar las reglas e itinerarios de los juegos de la sesión (${mainGames || 'actividades de EF'}) bajo las exigencias de ${matchedCriteria}. Requiere ayuda docente continua.`,
          },
          {
            nivel: 'En proceso (5-6)',
            descriptor: `Participa activamente en los juegos de la sesión (${mainGames || 'actividades de EF'}) y demuestra una aplicación básica de los indicadores de ${matchedCriteria}, con guía puntual.`,
          },
          {
            nivel: 'Conseguido (7-8)',
            descriptor: `Ejecuta con soltura, autonomía y precisión las actividades de la sesión (${mainGames || 'actividades de EF'}), cumpliendo satisfactoriamente con los estándares de ${matchedCriteria}.`,
          },
          {
            nivel: 'Excelente (9-10)',
            descriptor: `Demuestra un dominio sobresaliente y creativo en los juegos de la sesión (${mainGames || 'actividades de EF'}), superando los requerimientos de ${matchedCriteria} e impulsando la colaboración en grupo.`,
          },
        ],
      };
    });

    res.json({ rubrica: fallbackRubric });
  } catch (error: any) {
    console.error('Error generating session rubric:', error);
    res.status(500).json({ error: error.message || 'Error al generar la rúbrica por sesiones.' });
  }
});

// API 3: Generar o Enriquecer Reto / Producto Final
app.post('/api/ai/generate-final-challenge', async (req, res) => {
  try {
    const { titulo, curso, tematica, metodologia, etapa, comunidad, resumenSesiones, sesiones } = req.body;
    const ai = getGenAIClient();

    // Extraer resumen breve de juegos de las sesiones para alimentar la creatividad con mínimo coste de tokens
    const sesionesContexto = resumenSesiones || (Array.isArray(sesiones) && sesiones.length > 0
      ? sesiones.slice(0, 6).map((s: any, idx: number) => {
          const mainGames = (s.fases || [])
            .filter((f: any) => f.fase?.includes('Principal') || f.fase?.includes('Práctica'))
            .map((f: any) => f.nombreJuego)
            .filter(Boolean)
            .slice(0, 2)
            .join(', ');
          return `S${idx + 1}: ${s.titulo}${mainGames ? ` [${mainGames}]` : ''}`;
        }).join(' | ')
      : '');

    // Prompt optimizado, directo y ágil para respuesta inmediata (menos de 2 segundos)
    const prompt = `Actúa como docente de Educación Física y diseña un Desafío Motor o Producto Final muy original, tangible y motivador para culminar esta SdA:
Título: "${titulo || 'SdA Educación Física'}"
Curso: ${curso || 'Educación Primaria'} (${etapa || 'Primaria'})
Temática: ${tematica || 'Habilidades y Juegos Motores'}
Metodología: ${metodologia || 'Metodología Activa y Cooperativa'}
${sesionesContexto ? `Juegos y dinámicas clave de las sesiones: "${sesionesContexto}"` : ''}

CRITERIOS:
1. Elige una modalidad de culminación atractiva y específica para la temática (ej: "Torneo de Retos Cooperativos con tarjetas Fair Play", "Gymkana de Misiones Motrices Gamificadas", "Escape Room Motor Colaborativo", "Festival / Muestra Expresiva Coeducativa", "Circuito de Estaciones Motrices Inclusivas").
2. Evita fórmulas trilladas o genéricas. Debe sonar como una propuesta real y emocionante para el alumnado.
3. Extensión: entre 60 y 90 palabras, directo al grano y redactado en tono docente motivador.

Devuelve estrictamente un JSON con este formato:
{
  "tituloReto": "Nombre breve y atractivo del Reto",
  "descripcionReto": "Descripción de la actividad culminante integrando los aprendizajes."
}`;

    let data: any = {};
    try {
      const response = await callGeminiWithRetry(req, ai, {
        model: 'gemini-flash-lite-latest',
        contents: prompt,
        config: {
          systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
          temperature: 0.8,
          responseMimeType: 'application/json',
        },
      });

      data = safeParseAIJson(response.text, {});
    } catch (aiErr) {
      console.warn('[generate-final-challenge] Gemini AI error or slow, using personalized creative challenge:', aiErr);
    }

    const descCandidate = data?.descripcionReto || data?.descripcion || data?.reto || data?.productoFinal;
    if (!descCandidate || typeof descCandidate !== 'string' || descCandidate.trim().length < 20) {
      // Catálogo de variantes creativas y dinámicas para evitar cualquier texto repetitivo
      const sampleNames = Array.isArray(sesiones) && sesiones.length > 0
        ? sesiones.slice(0, 3).map((s: any) => (s.titulo || '').replace(/^Sesión\s*\d+:\s*/i, '')).filter(Boolean).join(', ')
        : tematica;

      const alternativas = [
        {
          titulo: `Gymkana de Retos y Misiones Motrices: "${titulo || tematica}"`,
          desc: `Jornada culminante por estaciones cooperativas en ${curso}, donde los equipos deben resolver desafíos motores progresivos aplicando las habilidades practicadas en las sesiones (${sampleNames}). Cada equipo suma puntos de Juego Limpio y apoyo mutuo para abrir la "caja del reto común", garantizando una participación 100% activa sin eliminaciones.`
        },
        {
          titulo: `Torneo Coeducativo y Feria de Desafíos de ${tematica || 'Educación Física'}`,
          desc: `Encuentro deportivo y lúdico organizado bajo la metodología ${metodologia || 'cooperativa'}. El alumnado de ${curso} demuestra los aprendizajes adquiridos (${sampleNames}) gestionando sus propias rotaciones, el arbitraje dialogado y la autorregulación grupal, finalizando con un podium compartido de deportividad y esfuerzo colectivo.`
        },
        {
          titulo: `Escape Room Motor y Desafío Colaborativo Final`,
          desc: `Gran reto de aventura psicomotriz en el gimnasio o patio exterior para ${curso}. A través de pistas, acertijos motores y estaciones de destreza vinculadas a ${tematica}, los grupos interconectan las dinámicas trabajadas (${sampleNames}) para descifrar el código final mediante la cooperación de todos sus integrantes.`
        }
      ];

      // Selección dinámica aleatoria según timestamp
      const selected = alternativas[Date.now() % alternativas.length];
      data = {
        tituloReto: data?.tituloReto || selected.titulo,
        descripcionReto: selected.desc
      };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error generating challenge:', error);
    res.status(500).json({ error: error.message || 'Error al generar el reto final.' });
  }
});

// API 4: Generar Sesiones de Trabajo con Gemini (incluyendo lectura de documentación de Google Drive)
app.post('/api/ai/generate-sessions', async (req, res) => {
  try {
    const {
      numSesiones,
      curso,
      ciclo,
      tematica,
      modeloEstructura,
      criteriosSeleccionados,
      driveDocumentationText,
      etapa,
    } = req.body;

    const ai = getGenAIClient();

    let documentationInstruction = '';
    if (driveDocumentationText && driveDocumentationText.trim().length > 0) {
      documentationInstruction = `
INSTRUCCIÓN CRÍTICA Y PRIORITARIA (BÚSQUEDA Y EXTRACCIÓN EN DOCUMENTOS ADJUNTOS DE DRIVE, PDF, WORD Y BANCOS EXCEL):
El docente ha proporcionado documentación oficial o un Banco de Juegos (en carpetas de Google Drive, documentos Word, PDF, archivos locales o hojas Excel):
---
${driveDocumentationText.slice(0, 45000)}
---

REGLAS OBLIGATORIAS DE LECTURA, BÚSQUEDA Y CUMPLIMENTACIÓN:
1. BÚSQUEDA Y SELECCIÓN INTELIGENTE: Examina minuciosamente todo el texto adjunto arriba. Si el docente ha adjuntado un Banco de Juegos o documentos con fichas de juegos, busca aquellos juegos que mejor se adapten a la temática ("${tematica}"), a la edad y al ciclo (${curso} - ${ciclo}).
2. JUEGOS SELECCIONADOS MANUALMENTE O DESDE BANCO: Si hay juegos explícitamente nombrados o importados desde el Banco de Juegos en el texto, INCORPÓRALOS OBLIGATORIAMENTE con su nombre exacto y utiliza el texto explicativo de su descripción real que aparece tras el nombre del juego en el documento.
3. DESGLOSE CONCISO EN 5 APARTADOS OBLIGATORIOS: Para cada juego extraído del documento/banco, sintetiza su explicación en 5 apartados breves, directos y operativos (entre 70 y 110 palabras por juego, eliminando textos tediosos o redundantes):
   - Terreno de juego: Dónde se juega con medida aproximada (ej. Media pista polideportiva, 20x15m delimitada con conos).
   - Roles: Roles activos del alumnado (ej. 4 cazadores con peto y fugitivos). Obviar la posición del docente y las rotaciones DUA.
   - Desarrollo del juego: Explicación concisa y directa de cómo se juega (dinámica motriz principal).
   - Normas: Normas claras y directas en viñetas (faltas, puntuación y objetivo motor).
   - Variaciones: 1 o 2 variantes rápidas para aumentar/disminuir dificultad o dinamizar.
4. SI EL TEXTO DEL DOCUMENTO ES SINTÉTICO O BREVE: Completa y redacta pedagógicamente la mecánica de juego de forma transparente para que quede 100% explicada para el docente en clase.
5. REGISTRO DE FUENTES: En la lista "fuentesUtilizadas", incluye los nombres exactos de los archivos Word, PDF, carpetas de Drive o Excel de donde extrajiste la información (indicados en '--- ARCHIVO / FUENTE: ... ---' o '--- ARCHIVO LOCAL ADJUNTO: ... ---').`;
    } else {
      documentationInstruction = `Genera actividades y juegos originales, altamente pedagógicos e innovadores para Educación Física, acordes a la temática "${tematica}" y nivel ${curso} (${ciclo}). Cada juego debe incluir su desarrollo conciso y directo estructurado con los 5 apartados obligatorios (Terreno de juego, Roles, Desarrollo del juego, Normas, Variaciones).`;
    }

    const prompt = `Diseña una secuencia didáctica completa de EXACTAMENTE ${numSesiones} SESIONES de Educación Física (60 minutos cada una).
Curso/Nivel: ${curso} (${ciclo})
Temática(s) seleccionada(s): ${tematica}
Modelo de Estructura de Sesión: ${modeloEstructura}
Criterios de Evaluación trabajados: ${JSON.stringify(criteriosSeleccionados || [])}

${documentationInstruction}

INSTRUCCIÓN MANDATORIA Y CRÍTICA PARA CADA UNA DE LAS SESIONES (DESDE LA SESIÓN 1 HASTA LA SESIÓN ${numSesiones}):
Debes generar un array "sesiones" con EXACTAMENTE ${numSesiones} OBJETOS DE SESIÓN (desde numeroSesion 1 hasta numeroSesion ${numSesiones}). NINGUNA SESIÓN PUEDE SER ABREVIADA O RESUMIDA.

¡REGLAS INDISPENSABLES DE CONTENIDO Y ESTRUCTURA DE JUEGOS!:
1. PROHIBICIÓN ABSOLUTA DE JUEGOS REPETIDOS EN LA MISMA SESIÓN: Dentro de una misma sesión (los 4 juegos de la Parte Principal), NUNCA repitas el mismo juego ni el mismo nombre. Cada una de las 4 actividades de la Parte Principal debe tener un nombre original distinto y una dinámica motriz completamente diferente.
2. BÚSQUEDA Y EXTRACCIÓN PRIORITARIA EN DOCUMENTOS COMPARTIDOS (EXCEL / DRIVE): Analiza con prioridad absoluta el banco de recursos en Excel y documentos de Google Drive compartidos por el docente. Si no alcanzan para cubrir todas las actividades de las ${numSesiones} sesiones, completa los juegos restantes con actividades de EF originales, coherentes y adaptadas al nivel ${curso}.
3. ADECUACIÓN ESTRICTA A LA EDAD Y NIVEL COGNITIVO/MOTRIZ: Es OBLIGATORIO que TODOS los juegos seleccionados o inventados sean estrictamente adecuados para la edad, curso y nivel madurativo del alumnado (${curso} - ${ciclo}). Si un juego del banco de recursos es demasiado complejo, infantil o peligroso para su edad, ADÁPTALO obligatoriamente simplificando/complicando sus reglas, o DESCÁRTALO y crea uno nuevo adecuado. Nunca incluyas actividades complejas de secundaria para infantil/primer ciclo, ni juegos infantiles para cursos altos.
4. EXPLICACIONES REALES Y ESPECÍFICAS (PROHIBIDO TEXTO PLANTILLA GENÉRICO): Queda estrictamente prohibido usar frases genéricas o copiadas de plantilla como "El juego inicia con la señal sonora del docente...". CADA JUEGO DEBE EXPLICAR DETALLADAMENTE CÓMO SE JUEGA REALMENTE (reglas concretas, forma de puntuar, normas tácticas y objetivo motor).

FORMATO CONCISO Y SINTETIZADO POR JUEGO (entre 70 y 110 palabras por juego, directo y operativo a pie de pista):
Queda terminantemente prohibido meter parrafadas teóricas, rotaciones DUA individuales y medidas de seguridad repetitivas dentro de los juegos. El docente necesita una ficha ágil:

Terreno de juego:
Señala dónde se debe jugar con una medida aproximada (ej. Media pista polideportiva, 20x15m delimitada con conos).

Roles:
Señala los roles del alumnado (ej. 4 atacantes con peto amarillo y defensores libres). Obvia la posición del profesorado y las rotaciones DUA individuales.

Desarrollo del juego:
Explicación concisa y directa del juego y su dinámica motriz (máximo 3-4 líneas).

Normas:
Normas claras y directas en viñetas (faltas, puntuación y objetivo).

Variaciones:
1 o 2 variantes rápidas que se pueden realizar en el juego.

PROPUESTA B - COORDENADAS TÁCTICAS LIGERAS (IA TÁCTICA):
Para cada juego genera OBLIGATORIAMENTE un campo "esquemaTactico" ligero con la distribución en pista:
"esquemaTactico": {
  "tipoPista": "pabellon" | "circuito" | "paredon" | "porteria" | "rondo",
  "descripcionCorta": "Breve frase de la disposición táctica (ej. Dos equipos con zona de pase central)",
  "elementos": [
    { "tipo": "jugador_azul", "x": 25, "y": 40, "label": "A1" },
    { "tipo": "jugador_azul", "x": 25, "y": 60, "label": "A2" },
    { "tipo": "balon", "x": 45, "y": 50, "label": "Pase" },
    { "tipo": "jugador_rojo", "x": 75, "y": 50, "label": "Defensa" },
    { "tipo": "cono", "x": 10, "y": 15, "label": "Límite" }
  ]
}
Tipos de elementos válidos: "jugador_azul", "jugador_rojo", "portero", "cono", "balon", "pica", "diana". Las coordenadas x e y son números porcentuales entre 5 y 95.

HILO NARRATIVO Y GAMIFICACIÓN:
Integra un hilo narrativo continuo y gamificado que conecte todas las sesiones de principio a fin si la metodología es Gamificación (ej. misiones, niveles, insignias, mapa del tesoro, historia envolvente). Si es otra metodología, contextualiza los retos y juegos en la temática del título y en el Reto/Producto Final.

${
  ((typeof ciclo === 'string' && (ciclo.toLowerCase().includes('tercer') || ciclo.toLowerCase().includes('3º') || ciclo.toLowerCase().includes('secundaria') || ciclo.toLowerCase().includes('eso'))) ||
   (typeof curso === 'string' && (curso.includes('5º') || curso.includes('6º') || curso.toLowerCase().includes('eso') || curso.toLowerCase().includes('secundaria'))))
    ? `INTEGRACIÓN DE COMPETENCIA DIGITAL EN 3º CICLO / SECUNDARIA (USO PEDAGÓGICO PUNTUAL):
Puedes incorporar de forma puntual y motivadora el uso de herramientas digitales reales (ej. tabletas para autograbación del movimiento o formularios digitales), siempre supeditado al protagonismo motor.`
    : `PROHIBICIÓN ESTRICTA DE DISPOSITIVOS DIGITALES (INFANTIL Y 1º-4º DE PRIMARIA):
ESTÁ TERMINANTEMENTE PROHIBIDO incluir tabletas, teléfonos móviles, lectores de códigos QR, vídeos o pantallas en las actividades o materiales de estas sesiones. El alumnado de Infantil, 1º Ciclo (1º y 2º) y 2º Ciclo (3º y 4º de Primaria) debe realizar práctica motriz 100% viva, analógica y tangible utilizando exclusivamente materiales convencionales de Educación Física (balones, petos, aros, picas, cuerdas, colchonetas, etc.). NUNCA propongas tabletas ni móviles para este curso (${curso}).`
}
ESTRUCURA Y FASES DE CADA SESIÓN (60 MINUTOS TOTALES):
Cada sesión DEBE contener exactamente 6 objetos en la lista "fases" (1 Calentamiento + 4 Juegos en la Parte Principal + 1 Vuelta a la Calma):
1. Fase 1: "fase": "Calentamiento / Inicio", "duracionMin": 10
2. Fase 2: "fase": "Parte Principal / Práctica", "duracionMin": 10
3. Fase 3: "fase": "Parte Principal / Práctica", "duracionMin": 10
4. Fase 4: "fase": "Parte Principal / Práctica", "duracionMin": 10
5. Fase 5: "fase": "Parte Principal / Práctica", "duracionMin": 10
6. Fase 6: "fase": "Vuelta a la Calma / Reflexión", "duracionMin": 10

Devuelve una respuesta JSON estricta con este formato:
{
  "porcentajeDrive": 45,
  "porcentajeBancoJuegos": 35,
  "porcentajeIA": 20,
  "fuentesUtilizadas": ["Banco de Juegos Excel: Juegos_Cooperativos.xlsx", "Carpeta Drive: UD_Habilidades"],
  "sesiones": [
    {
      "numeroSesion": 1,
      "titulo": "Título de la sesión 1",
      "objetivoSesion": "Objetivo pedagógico de la sesión 1",
      "materialesTotales": ["Conos", "Pelotas", "Petos"],
      "fases": [
        {
          "fase": "Calentamiento / Inicio",
          "duracionMin": 10,
          "nombreJuego": "Activación Inicial",
          "descripcion": "Terreno de juego:\nEspacio delimitado de 15x15m con conos.\n\nRoles:\nParejas colaborativas libres en pista.\n\nDesarrollo del juego:\nDesplazamientos continuos realizando cambios de ritmo y movilidad articular imitando figuras motrices.\n\nNormas:\n- Respetar el espacio personal de los compañeros.\n- Reaccionar rápidamente al cambio de consigna.\n\nVariaciones:\n- Cambiar de pareja a la señal sonora.",
          "materiales": ["Conos"],
          "esquemaTactico": {
            "tipoPista": "pabellon",
            "descripcionCorta": "Desplazamientos y parejas",
            "elementos": [
              { "tipo": "alumno", "x": 15, "y": 60, "color": "#0284c7" },
              { "tipo": "flecha", "x": 20, "y": 55, "x2": 80, "y2": 50, "curva": "arriba", "color": "#0f766e" },
              { "tipo": "cono", "x": 40, "y": 65, "label": "1" },
              { "tipo": "cono", "x": 60, "y": 65, "label": "2" },
              { "tipo": "alumno", "x": 85, "y": 60, "color": "#b91c1c" }
            ]
          }
        },
        {
          "fase": "Parte Principal / Práctica",
          "duracionMin": 10,
          "nombreJuego": "Juego 1: El Rescate Cooperativo",
          "descripcion": "Terreno de juego:\nMedia pista polideportiva (20x15m) con zona segura delimitada con conos.\n\nRoles:\n3 perseguidores con peto rojo y el resto de la clase como rescatadores.\n\nDesarrollo del juego:\nLos perseguidores intentan tocar a los compañeros con un balón de espuma. Los tocados quedan congelados con piernas abiertas hasta que otro pasa por debajo para rescatar.\n\nNormas:\n- El toque debe ser suave de cintura para abajo.\n- La zona segura sólo permite permanecer 5 segundos.\n\nVariaciones:\n- Añadir un perseguidor más o rescatar chocando ambas palmas.",
          "materiales": ["Pelotas", "Petos"],
          "esquemaTactico": {
            "tipoPista": "pabellon",
            "descripcionCorta": "Perseguidores y rescatadores",
            "elementos": [
              { "tipo": "alumno", "x": 12, "y": 68, "color": "#0284c7" },
              { "tipo": "flecha", "x": 15, "y": 55, "x2": 82, "y2": 52, "curva": "arriba", "color": "#0284c7" },
              { "tipo": "alumno", "x": 50, "y": 50, "color": "#b91c1c" },
              { "tipo": "cono", "x": 50, "y": 70, "label": "1" },
              { "tipo": "alumno", "x": 84, "y": 65, "color": "#16a34a" }
            ]
          }
        }
      ]
    }
  ]
}`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.75,
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseAIJson<any>(response.text, {});
    let sesionesRes: any[] = Array.isArray(parsed) ? parsed : (parsed.sesiones || []);

    // Ensure array length matches numSesiones requested without using any static hardcoded game descriptions
    if (sesionesRes.length < numSesiones) {
      console.warn(`[API] Gemini devolvió ${sesionesRes.length} sesiones de las ${numSesiones} solicitadas. Auto-completando sesiones restantes de forma contextual...`);
      const existingCount = sesionesRes.length;
      for (let i = existingCount + 1; i <= numSesiones; i++) {
        sesionesRes.push({
          numeroSesion: i,
          titulo: `Sesión ${i}: Retos y Habilidades Tácticas de ${tematica}`,
          objetivoSesion: `Aplicar y consolidar patrones motores y trabajo cooperativo en la temática ${tematica}.`,
          materialesTotales: ['Conos', 'Petos', 'Pelotas', 'Picas'],
          fases: [
            {
              fase: 'Calentamiento / Inicio',
              duracionMin: 10,
              nombreJuego: `Activación Motriz ${i}: Movilidad y Coordinación`,
              descripcion: `Terreno de juego:\nPista polideportiva completa delimitada con conos en esquinas.\n\nRoles:\nAlumnado en carrera suave y parejas de movilidad activa.\n\nDesarrollo del juego:\nDesplazamientos continuos variados con cambios de ritmo y movilidad articular reaccionando a consignas de ${tematica}.\n\nNormas:\n- Mantener distancia prudencial para evitar choques.\n- Seguir las consignas de movilidad sin detenerse.\n\nVariaciones:\n- Cambiar de dirección o de compañero de trote a la señal.`,
              materiales: ['Conos'],
              esquemaTactico: {
                tipoPista: 'pabellon',
                descripcionCorta: 'Movilidad articular en medio campo',
                elementos: [
                  { tipo: 'jugador_azul', x: 25, y: 35, label: 'A1' },
                  { tipo: 'jugador_azul', x: 30, y: 40, label: 'A2' },
                  { tipo: 'jugador_rojo', x: 70, y: 60, label: 'B1' },
                  { tipo: 'jugador_rojo', x: 75, y: 65, label: 'B2' },
                  { tipo: 'cono', x: 10, y: 15, label: 'Cono' },
                  { tipo: 'cono', x: 90, y: 85, label: 'Cono' }
                ]
              }
            },
            {
              fase: 'Parte Principal / Práctica',
              duracionMin: 10,
              nombreJuego: `Reto Motor ${i}.1: Habilidades de ${tematica}`,
              descripcion: `Terreno de juego:\nMedia pista dividida en 2 subcampos rectangulares (15x12m).\n\nRoles:\n3 atacantes en posesión y 2 defensores en zona con petos distintivos.\n\nDesarrollo del juego:\nLos atacantes circulan el móvil buscando pases precisos y desmarques hacia la zona de meta sin ser interceptados.\n\nNormas:\n- Distancia de seguridad de 1 metro sin contacto físico.\n- Sumar 1 punto tras completar 4 pases limpios.\n\nVariaciones:\n- Limitar el tiempo de posesión individual a 3 segundos.`,
              materiales: ['Pelotas', 'Petos'],
              esquemaTactico: {
                tipoPista: 'pabellon',
                descripcionCorta: 'Ataque 3x2 con zonas delimitadas',
                elementos: [
                  { tipo: 'jugador_azul', x: 20, y: 30, label: 'A1' },
                  { tipo: 'jugador_azul', x: 20, y: 70, label: 'A2' },
                  { tipo: 'jugador_azul', x: 35, y: 50, label: 'A3' },
                  { tipo: 'balon', x: 28, y: 40, label: 'Móvil' },
                  { tipo: 'jugador_rojo', x: 65, y: 35, label: 'Defensa' },
                  { tipo: 'jugador_rojo', x: 65, y: 65, label: 'Defensa' }
                ]
              }
            },
            {
              fase: 'Parte Principal / Práctica',
              duracionMin: 10,
              nombreJuego: `Reto Motor ${i}.2: Circuito Táctico Cooperativo`,
              descripcion: `Terreno de juego:\n3 estaciones motrices delimitadas en el perímetro de la pista.\n\nRoles:\nGrupos rotativos de 5 alumnos por estación motriz.\n\nDesarrollo del juego:\nCada grupo supera el desafío técnico de su estación motriz sumando aciertos colectivos antes de rotar en sentido horario.\n\nNormas:\n- Completar el recorrido de forma controlada.\n- Respetar el orden de salida en cada posta.\n\nVariaciones:\n- Modificar la distancia al objetivo o añadir un obstáculo.`,
              materiales: ['Petos', 'Picas', 'Conos'],
              esquemaTactico: {
                tipoPista: 'circuito',
                descripcionCorta: 'Circuito perimetral de 3 postas',
                elementos: [
                  { tipo: 'pica', x: 20, y: 50, label: '1️⃣ Posta' },
                  { tipo: 'balon', x: 36, y: 50, label: '➔' },
                  { tipo: 'pica', x: 50, y: 50, label: '2️⃣ Posta' },
                  { tipo: 'balon', x: 65, y: 50, label: '➔' },
                  { tipo: 'pica', x: 80, y: 50, label: '3️⃣ Posta' }
                ]
              }
            },
            {
              fase: 'Parte Principal / Práctica',
              duracionMin: 10,
              nombreJuego: `Reto Motor ${i}.3: Juego Global y Resolución`,
              descripcion: `Terreno de juego:\nCampo central de 20x15m con dos zonas de anotación definidas.\n\nRoles:\nDos equipos mixtos equilibrados de 6 jugadores.\n\nDesarrollo del juego:\nJuego real modificado aplicando los patrones motrices practicados para avanzar mediante pases y anotar en la meta rival.\n\nNormas:\n- No se permite el contacto brusco.\n- Puntuación doble cuando todos tocan el móvil en la jugada.\n\nVariaciones:\n- Incorporar un jugador comodín neutral de apoyo ofensivo.`,
              materiales: ['Pelotas', 'Petos'],
              esquemaTactico: {
                tipoPista: 'pabellon',
                descripcionCorta: 'Juego de aplicación con metas opuestas',
                elementos: [
                  { tipo: 'jugador_azul', x: 22, y: 35, label: 'Azul' },
                  { tipo: 'jugador_azul', x: 22, y: 65, label: 'Azul' },
                  { tipo: 'balon', x: 42, y: 50, label: 'Pase' },
                  { tipo: 'jugador_rojo', x: 76, y: 35, label: 'Rojo' },
                  { tipo: 'jugador_rojo', x: 76, y: 65, label: 'Rojo' }
                ]
              }
            },
            {
              fase: 'Parte Principal / Práctica',
              duracionMin: 10,
              nombreJuego: `Reto Motor ${i}.4: Desafío Final`,
              descripcion: `Terreno de juego:\nPista completa dividida en 3 calles longitudinales.\n\nRoles:\nParejas colaborativas de ejecutores y observadores.\n\nDesarrollo del juego:\nPuesta en práctica global de la dinámica de la sesión encadenando secuencias motrices fluidas.\n\nNormas:\n- Cooperar con el compañero para mantener el ritmo de acción.\n- Respetar los límites de la propia calle de juego.\n\nVariaciones:\n- Elegir entre dos niveles de dificultad en cada intento.`,
              materiales: ['Conos', 'Petos'],
              esquemaTactico: {
                tipoPista: 'paredon',
                descripcionCorta: 'Calles longitudinales en parejas',
                elementos: [
                  { tipo: 'jugador_azul', x: 25, y: 50, label: 'A' },
                  { tipo: 'balon', x: 45, y: 50, label: 'Móvil' },
                  { tipo: 'jugador_rojo', x: 75, y: 50, label: 'B' }
                ]
              }
            },
            {
              fase: 'Vuelta a la Calma / Reflexión',
              duracionMin: 10,
              nombreJuego: `Reflexión y Puesta en Común ${i}`,
              descripcion: `Terreno de juego:\nCírculo central del gimnasio sobre esterillas.\n\nRoles:\nTodo el grupo sentado en posición cómoda de asamblea.\n\nDesarrollo del juego:\nEstiramientos pasivos guiados combinados con respiración consciente y asamblea reflexiva sobre los aprendizajes motrices.\n\nNormas:\n- Respetar el turno de palabra en la asamblea.\n- Mantener un tono de voz relajado y pausado.\n\nVariaciones:\n- Expresar con gestos o diana visual el grado de satisfacción.`,
              materiales: ['Esterillas'],
              esquemaTactico: {
                tipoPista: 'rondo',
                descripcionCorta: 'Asamblea circular relajada',
                elementos: [
                  { tipo: 'jugador_azul', x: 25, y: 50, label: 'Alumnos' },
                  { tipo: 'jugador_azul', x: 50, y: 25, label: 'Alumnos' },
                  { tipo: 'jugador_azul', x: 75, y: 50, label: 'Alumnos' },
                  { tipo: 'jugador_azul', x: 50, y: 75, label: 'Alumnos' }
                ]
              }
            },
          ],
        });
      }
    }

    // Post-process all sessions:
    // 1. Ensure game names within each session are UNIQUE (no repeated game names in the same session).
    // 2. Remove any leftover generic template paragraphs.
    // 3. Format game descriptions cleanly.
    sesionesRes.forEach((ses) => {
      if (ses.fases && Array.isArray(ses.fases)) {
        const seenNames = new Set<string>();

        ses.fases.forEach((f: any, idx: number) => {
          let gameName = String(f.nombreJuego || `Juego ${idx}`).trim();
          if (seenNames.has(gameName.toLowerCase())) {
            gameName = `${gameName} (Variante ${idx})`;
            f.nombreJuego = gameName;
          }
          seenNames.add(gameName.toLowerCase());

          if (f.descripcion) {
            let descStr = String(f.descripcion);
            if (descStr.includes('El juego inicia con la señal sonora del docente')) {
              descStr = descStr.replace(
                /- Secuencia de juego y normas: El juego inicia con la señal sonora del docente\. Los participantes se desplazan controladamente por la zona delimitada buscando alcanzar la meta o completar el reto motor\. Se aplican normas de cooperación y oposición limpia: respetando el turno de acción, pasando el móvil a compañeros desmarcados para anotar o evitar la interceptación rival, y rotando posiciones tras cada ciclo de puntuación\./g,
                `Desarrollo del juego: Inicio mediante consigna docente. Se desarrolla la dinámica específica de ${gameName} enfocada en la temática ${tematica}, cumpliendo la secuencia motriz.`
              );
            }
            f.descripcion = formatGameDescription(descStr);
          }
        });
      }
    });

    const hasDriveDocs = Boolean(driveDocumentationText && driveDocumentationText.trim().length > 0 && (driveDocumentationText.includes('Google Drive') || driveDocumentationText.includes('PDF') || driveDocumentationText.includes('Ficha') || driveDocumentationText.includes('UD_') || driveDocumentationText.includes('Documento')));
    const hasBancoJuegos = Boolean(driveDocumentationText && (driveDocumentationText.includes('BANCO DE JUEGOS') || driveDocumentationText.includes('Excel') || driveDocumentationText.includes('EXCEL') || driveDocumentationText.includes('.xlsx')));

    let pDrive = typeof parsed.porcentajeDrive === 'number' ? parsed.porcentajeDrive : (hasDriveDocs ? 45 : 0);
    let pBanco = typeof parsed.porcentajeBancoJuegos === 'number' ? parsed.porcentajeBancoJuegos : (hasBancoJuegos ? 35 : 0);
    let pIA = typeof parsed.porcentajeIA === 'number' ? parsed.porcentajeIA : Math.max(10, 100 - pDrive - pBanco);

    res.json({
      sesiones: sesionesRes,
      porcentajeDrive: pDrive,
      porcentajeBancoJuegos: pBanco,
      porcentajeIA: pIA,
      fuentesUtilizadas: parsed.fuentesUtilizadas || [],
    });
  } catch (error: any) {
    console.error('Error generating sessions:', error);
    res.status(500).json({ error: error.message || 'Error al generar las sesiones con IA.' });
  }
});

// API: Enriquecer y Cumplimentar Explicación Completa de un Juego / Actividad
app.post('/api/ai/enrich-game-description', async (req, res) => {
  try {
    const { nombreJuego, descripcion, tematica, curso, etapa, comunidad } = req.body;
    const ai = getGenAIClient();

    const prompt = `Actúa como Catedrático Experto en Didáctica de la Educación Física y LOMLOE en ${comunidad || 'Andalucía'}.
Completa, re-genera o desarrolla en su totalidad el siguiente juego/actividad para Educación Física (${curso || 'Educación Primaria'}, temática: "${tematica || 'General'}"):

Nombre del juego actual: "${nombreJuego || 'Juego o Actividad de EF'}"
Explicación o notas existentes: "${descripcion || ''}"

INSTRUCCIÓN CRÍTICA:
1. Si la explicación existente es breve, escasa, vacía o no tiene datos suficientes para explicar el juego, DEBES SUSTITUIR O REGENERAR EL JUEGO POR COMPLETO proponiendo un juego específico, tradicional o innovador de Educación Física perfecto para la temática "${tematica || 'General'}" y nivel "${curso || 'Primaria'}".
2. Redacta una explicación concisa y directa (70-110 palabras), operativa para el docente a pie de pista.
3. Debes estructurar la explicación en los 5 apartados obligatorios (sin textos extensos ni rotaciones DUA redundantes):

Terreno de juego:
Señala dónde se juega con una medida aproximada (ej. Media pista polideportiva, 20x15m delimitada con conos).

Roles:
Señala los roles del alumnado (ej. 4 atacantes con peto amarillo y defensores libres). Obvia la posición del profesorado y las rotaciones DUA individuales.

Desarrollo del juego:
Explicación concisa y directa de cómo se juega (máximo 3-4 líneas).

Normas:
Normas claras y directas en viñetas (faltas, puntuación y objetivo motor).

Variaciones:
1 o 2 variantes prácticas para adaptar el juego.

Devuelve un JSON estricto con:
{
  "nombreJuego": "Nombre definitivo del juego (mantener el original o nuevo si se sustituyó por falta de datos)",
  "descripcionEnriquecida": "..."
}`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseAIJson<any>(response.text, {});
    const textRes = parsed.descripcionEnriquecida || parsed.descripcion || response.text || '';
    const formatted = formatGameDescription(textRes);
    res.json({
      nombreJuego: parsed.nombreJuego || nombreJuego,
      descripcionEnriquecida: formatted,
    });
  } catch (error: any) {
    console.error('Error enriching game description:', error);
    res.status(500).json({ error: error.message || 'Error al enriquecer la descripción del juego.' });
  }
});

// API: Enriquecer / Autocompletar Sesión Completa con IA
app.post('/api/ai/enrich-full-session', async (req, res) => {
  try {
    const { sesion, tematica, curso, etapa } = req.body;
    if (!sesion || !sesion.fases) {
      return res.status(400).json({ error: 'Datos de sesión incompletos.' });
    }

    const ai = getGenAIClient();
    const prompt = `Actúa como Catedrático de Educación Física. Analiza y autocompleta/enriquece TODAS las actividades de la siguiente sesión.
Si alguna actividad está vacía, incompleta, sin explicación o con datos escasos, REGENÉRALA O COMPLÉTALA con un juego de Educación Física conciso y dinámico para ${curso || 'Primaria'} y temática "${tematica || 'General'}".

Sesión actual:
Título: "${sesion.titulo || ''}"
Fases/Actividades actuales:
${JSON.stringify(sesion.fases, null, 2)}

REGLA INDISPENSABLE:
Cada una de las fases/actividades devueltas debe tener su "nombreJuego", "duracionMin", "materiales" y su "descripcion" REDACTADA DE FORMA CONCISA (70-110 palabras) con los 5 apartados obligatorios:
Terreno de juego: ...
Roles: ...
Desarrollo del juego: ...
Normas: ...
Variaciones: ...

Devuelve un JSON estricto con la estructura de la sesión actualizada:
{
  "titulo": "${sesion.titulo || ''}",
  "objetivoSesion": "${sesion.objetivoSesion || ''}",
  "materialesTotales": ${JSON.stringify(sesion.materialesTotales || [])},
  "fases": [
    {
      "fase": "...",
      "duracionMin": 10,
      "nombreJuego": "...",
      "descripcion": "...",
      "materiales": ["..."]
    }
  ]
}`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseAIJson<any>(response.text, {});
    if (parsed.fases && Array.isArray(parsed.fases)) {
      parsed.fases.forEach((f: any) => {
        if (f.descripcion) f.descripcion = formatGameDescription(f.descripcion);
      });
    }

    res.json({ sesionActualizada: parsed });
  } catch (error: any) {
    console.error('Error enriching full session:', error);
    res.status(500).json({ error: error.message || 'Error al enriquecer la sesión completa.' });
  }
});

// API: Lectura y Extracción de Archivos Locales (PDF, Word, Excel, TXT)
app.post('/api/parse-local-file', async (req, res) => {
  try {
    const { fileName, base64Data } = req.body;
    if (!fileName || !base64Data) {
      return res.status(400).json({ error: 'Faltan parámetros fileName o base64Data' });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const ext = path.extname(fileName).toLowerCase();
    let extractedText = '';

    if (ext === '.pdf') {
      try {
        const data = await pdfParse(buffer);
        extractedText = data.text || '';
      } catch (pdfErr) {
        console.error('Error parseando PDF:', pdfErr);
        extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\táéíóúÁÉÍÓÚñÑ]/g, ' ');
      }
    } else if (ext === '.docx' || ext === '.doc') {
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value || '';
      } catch (wordErr) {
        console.error('Error parseando Word:', wordErr);
        extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\táéíóúÁÉÍÓÚñÑ]/g, ' ');
      }
    } else if (ext === '.xlsx' || ext === '.xls' || ext === '.csv') {
      try {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetTexts: string[] = [];
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const csv = XLSX.utils.sheet_to_csv(sheet);
          if (csv && csv.trim()) {
            sheetTexts.push(`--- HOJA: ${sheetName} ---\n${csv.trim()}`);
          }
        });
        extractedText = sheetTexts.join('\n\n');
      } catch (excelErr) {
        console.error('Error parseando Excel:', excelErr);
        extractedText = buffer.toString('utf-8');
      }
    } else {
      // Archivo de texto plano / Markdown (.txt, .md, etc.)
      extractedText = buffer.toString('utf-8');
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ error: 'No se pudo extraer texto del archivo seleccionado.' });
    }

    res.json({
      fileName,
      charCount: extractedText.length,
      extractedText: extractedText.trim(),
    });
  } catch (error: any) {
    console.error('Error en /api/parse-local-file:', error);
    res.status(500).json({ error: error.message || 'Error al procesar el archivo local.' });
  }
});

// API 5: Generar Atención a la Diversidad (Adaptaciones NEAE + Pautas DUA)
app.post('/api/ai/generate-diversity', async (req, res) => {
  try {
    const { neaeSeleccionadas, sdaContext } = req.body;
    const etapa = sdaContext?.etapa || 'Primaria';
    const ai = getGenAIClient();

    const prompt = `Genera la propuesta de Atención a la Diversidad para la Situación de Aprendizaje de Educación Física.
Contexto:
- Título SdA: "${sdaContext?.titulo || 'Educación Física'}"
- Curso: ${sdaContext?.curso || 'Primaria'}
- Temática: ${sdaContext?.tematica || 'Deportes y Juegos'}
- Producto Final: ${sdaContext?.productoFinal || 'Reto motor'}
- Casuísticas / Alumnado NEAE seleccionado: ${JSON.stringify(neaeSeleccionadas || [])}

Instrucciones:
1. Para cada tipo de casuística o alumnado NEAE seleccionado (ej: TDAH, Discapacidad Motora, Discapacidad Visual, Discapacidad Auditiva, TEA, Altas Capacidades, etc.), proporciona adaptaciones prácticas específicas para Educación Física en las áreas de materiales, espacios, reglas y pautas docentes.
2. A continuación, proporciona las Pautas Universales DUA (Diseño Universal para el Aprendizaje) organizadas según las 3 redes DUA (Compromiso, Representación, Acción/Expresión).

Devuelve una respuesta JSON estricta con esta estructura:
{
  "adaptacionesNEAE": [
    {
      "categoria": "Categoría o Casuística NEAE",
      "materialesYEspacio": "Adaptación de materiales y organización espacial",
      "reglasYMetodologia": "Modificaciones en reglas, tiempo y agrupamientos",
      "pautasDocente": "Indicaciones clave para el maestro/a durante las clases"
    }
  ],
  "pautasDUA": [
    {
      "principio": "Pauta I: Proporcionar Múltiples Formas de Compromiso",
      "pautas": ["Estrategia DUA 1", "Estrategia DUA 2", "Estrategia DUA 3"]
    },
    {
      "principio": "Pauta II: Proporcionar Múltiples Formas de Representación",
      "pautas": ["Estrategia DUA 1", "Estrategia DUA 2", "Estrategia DUA 3"]
    },
    {
      "principio": "Pauta III: Proporcionar Múltiples Formas de Acción y Expresión",
      "pautas": ["Estrategia DUA 1", "Estrategia DUA 2", "Estrategia DUA 3"]
    }
  ]
}`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.5,
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseAIJson(response.text, {});
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating diversity:', error);
    res.status(500).json({ error: error.message || 'Error al generar la atención a la diversidad.' });
  }
});

// API 6: Generar Instrumentos de Evaluación Formativa seleccionados por el usuario
app.post('/api/ai/generate-evaluation-tools', async (req, res) => {
  try {
    const { selectedInstrumentTypes, tematica, criteriosSeleccionados, curso, etapa, comunidad } = req.body;
    const ai = getGenAIClient();

    const prompt = `Genera los Instrumentos de Evaluación Formativa seleccionados por el docente para una Situación de Aprendizaje de Educación Física en ${comunidad || 'Andalucía'} (${curso}).
Temática(s): ${tematica}
Criterios de Evaluación seleccionados: ${JSON.stringify(criteriosSeleccionados || [])}
Tipos de Instrumentos a generar obligatoriamente: ${JSON.stringify(selectedInstrumentTypes || [])}

Instrucciones:
Para cada tipo de instrumento solicitado (ej: Lista de Cotejo, Escala de Observación, Diana de Autoevaluación, Cuaderno de Campo / Registro Anecdótico, Coevaluación), genera su descripción, cómo se aplica en clase y una lista de ítems u observaciones específicos alineados directamente con los criterios de evaluación y la temática.

Devuelve una respuesta JSON estricta con el siguiente formato:
[
  {
    "tipo": "Nombre del Instrumento (ej: Lista de Cotejo)",
    "nombre": "Título del instrumento específico",
    "descripcion": "Explicación del objeto de evaluación",
    "aplicacion": "Cuándo y cómo lo aplica el alumnado o docente durante las clases",
    "itemsOIndicadores": [
      "Ítem o indicador de logro 1",
      "Ítem o indicador de logro 2",
      "Ítem o indicador de logro 3",
      "Ítem o indicador de logro 4"
    ]
  }
]`;

    try {
      const response = await callGeminiWithRetry(req, ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      });

      const parsed = safeParseAIJson(response.text, []);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ instrumentos: parsed });
      }
    } catch (aiErr) {
      console.warn('[generate-evaluation-tools] Gemini AI error, using fallback tools:', aiErr);
    }

    const requestedTypes = Array.isArray(selectedInstrumentTypes) && selectedInstrumentTypes.length > 0
      ? selectedInstrumentTypes
      : ['Lista de Cotejo / Checklist de Desempeño Motriz'];

    const fallbackTools = requestedTypes.map((type: string) => ({
      tipo: type,
      nombre: `Instrumento: ${type}`,
      descripcion: `Herramienta de evaluación formativa orientada a valorar la consecución de las competencias y habilidades motoras en la temática ${tematica || 'Educación Física'}.`,
      aplicacion: `Aplicable por el docente o alumnado durante el desarrollo de las clases en ${curso || 'Primaria'}.`,
      itemsOIndicadores: [
        'Comprende y respeta las normas de la actividad y fair play',
        'Ejecuta con fluidez y coordinación las habilidades motrices específicas',
        'Coopera activamente y apoya a sus compañeros/as de equipo',
        'Muestra autonomía, esfuerzo y resolución de retos motrices',
      ],
    }));

    res.json({ instrumentos: fallbackTools });
  } catch (error: any) {
    console.error('Error generating evaluation tools:', error);
    res.status(500).json({ error: error.message || 'Error al generar los instrumentos de evaluación.' });
  }
});

// Helper to handle Google Drive / OAuth errors gracefully
function handleDriveError(res: express.Response, error: any, defaultMsg: string) {
  console.error(defaultMsg, error);
  const errStr = String(error?.message || error || '');
  const isAuthError =
    error?.status === 401 ||
    error?.code === 401 ||
    error?.response?.status === 401 ||
    errStr.includes('invalid authentication credentials') ||
    errStr.includes('OAuth 2 access token') ||
    errStr.includes('invalid_grant') ||
    errStr.includes('Unauthenticated') ||
    errStr.includes('Invalid Credentials');

  if (isAuthError) {
    return res.status(401).json({
      error: 'Tu sesión de Google Drive ha caducado o las credenciales no son válidas. Por favor, vuelve a iniciar sesión con tu cuenta de Google.',
    });
  }
  return res.status(500).json({ error: error.message || defaultMsg });
}

// API 7: List Google Drive Folders & Files (Browser Endpoint)
app.post('/api/drive/list', async (req, res) => {
  try {
    const { accessToken, folderId = 'root', search = '' } = req.body;
    if (!accessToken) {
      return res.status(401).json({ error: 'OAuth access token es requerido. Por favor, inicia sesión con Google.' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth });

    let query = "trashed = false";
    if (search && search.trim().length > 0) {
      const sanitized = search.trim().replace(/'/g, "\\'");
      query += ` and name contains '${sanitized}'`;
    } else if (folderId) {
      query += ` and '${folderId}' in parents`;
    }

    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, modifiedTime, iconLink, size)',
      pageSize: 50,
      orderBy: 'folder,name',
    });

    const items = (response.data.files || []).map((f) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      isFolder: f.mimeType === 'application/vnd.google-apps.folder',
      modifiedTime: f.modifiedTime,
      iconLink: f.iconLink,
      size: f.size,
    }));

    res.json({ items, folderId });
  } catch (error: any) {
    handleDriveError(res, error, 'Error al listar archivos/carpetas de Google Drive.');
  }
});

// API 7b: List Google Drive Folders (Legacy Compatible)
app.post('/api/drive/folders', async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(401).json({ error: 'OAuth access token es requerido.' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
      fields: 'files(id, name)',
      pageSize: 50,
      orderBy: 'name',
    });

    res.json({ folders: response.data.files || [] });
  } catch (error: any) {
    handleDriveError(res, error, 'Error al listar las carpetas de Google Drive.');
  }
});

// API 8: Read files in a Google Drive folder
app.post('/api/drive/read-folder', async (req, res) => {
  try {
    const { accessToken, folderId } = req.body;
    if (!accessToken || !folderId) {
      return res.status(400).json({ error: 'accessToken y folderId son requeridos.' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth });
    const docs = google.docs({ version: 'v1', auth });

    // List files inside the folder
    const filesRes = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)',
      pageSize: 20,
    });

    const files = filesRes.data.files || [];
    let aggregatedText = '';

    for (const file of files) {
      try {
        if (file.mimeType === 'application/vnd.google-apps.document' && file.id) {
          // Read Google Doc content
          const docRes = await docs.documents.get({ documentId: file.id });
          const content = docRes.data.body?.content || [];
          let docText = '';
          content.forEach((block) => {
            if (block.paragraph) {
              block.paragraph.elements?.forEach((el) => {
                if (el.textRun?.content) docText += el.textRun.content;
              });
            }
          });
          aggregatedText += `\n--- ARCHIVO: ${file.name} ---\n${docText}\n`;
        } else if (file.mimeType === 'text/plain' && file.id) {
          // Export text plain
          const textRes = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'text' });
          aggregatedText += `\n--- ARCHIVO: ${file.name} ---\n${textRes.data}\n`;
        } else if (file.id) {
          // Attempt export for other drive docs
          try {
            const expRes = await drive.files.export({ fileId: file.id, mimeType: 'text/plain' }, { responseType: 'text' });
            aggregatedText += `\n--- ARCHIVO: ${file.name} ---\n${expRes.data}\n`;
          } catch (e) {
            aggregatedText += `\n--- ARCHIVO: ${file.name} (tipo: ${file.mimeType}) ---\n`;
          }
        }
      } catch (fErr) {
        console.warn(`Could not read file ${file.name}:`, fErr);
      }
    }

    res.json({
      fileCount: files.length,
      files: files.map((f) => ({ id: f.id, name: f.name })),
      documentationText: aggregatedText.trim(),
    });
  } catch (error: any) {
    handleDriveError(res, error, 'Error al leer la carpeta de Google Drive.');
  }
});

// API 8b: Read multiple selected folders & individual documents from Google Drive
app.post('/api/drive/read-selected', async (req, res) => {
  try {
    const { accessToken, folderIds = [], fileIds = [] } = req.body;
    if (!accessToken) {
      return res.status(401).json({ error: 'OAuth access token es requerido.' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth });
    const docs = google.docs({ version: 'v1', auth });

    let aggregatedText = '';
    const readFilesList: { id: string; name: string }[] = [];

    // Helper to read single file
    const readFileContent = async (fileId: string, fileName?: string, mimeType?: string) => {
      try {
        let name = fileName;
        let type = mimeType;
        if (!name || !type) {
          const meta = await drive.files.get({ fileId, fields: 'id, name, mimeType' });
          name = meta.data.name || 'Archivo Sin Nombre';
          type = meta.data.mimeType || '';
        }

        readFilesList.push({ id: fileId, name: name || 'Documento Drive' });

        if (type === 'application/vnd.google-apps.document') {
          const docRes = await docs.documents.get({ documentId: fileId });
          const content = docRes.data.body?.content || [];
          let text = '';
          content.forEach((block) => {
            if (block.paragraph) {
              block.paragraph.elements?.forEach((el) => {
                if (el.textRun?.content) text += el.textRun.content;
              });
            }
          });
          aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n${text}\n`;
        } else if (type === 'application/pdf' || (name && name.toLowerCase().endsWith('.pdf'))) {
          try {
            const pdfRes = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
            const pdfData = await pdfParse(Buffer.from(pdfRes.data as ArrayBuffer));
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n${pdfData.text}\n`;
          } catch (pdfErr) {
            console.warn(`Could not parse PDF ${name} from Drive:`, pdfErr);
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n`;
          }
        } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || (name && name.toLowerCase().endsWith('.docx'))) {
          try {
            const docxRes = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
            const docxData = await mammoth.extractRawText({ buffer: Buffer.from(docxRes.data as ArrayBuffer) });
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n${docxData.value}\n`;
          } catch (docxErr) {
            console.warn(`Could not parse Word ${name} from Drive:`, docxErr);
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n`;
          }
        } else if (type === 'text/plain') {
          const textRes = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'text' });
          aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n${textRes.data}\n`;
        } else {
          try {
            const expRes = await drive.files.export({ fileId, mimeType: 'text/plain' }, { responseType: 'text' });
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} ---\n${expRes.data}\n`;
          } catch {
            aggregatedText += `\n--- ARCHIVO / FUENTE: ${name} (tipo: ${type}) ---\n`;
          }
        }
      } catch (err) {
        console.warn(`Could not read file ${fileId}:`, err);
      }
    };

    // 1. Read files inside selected folders (prioritizing topic matches)
    for (const fId of folderIds) {
      try {
        const folderMeta = await drive.files.get({ fileId: fId, fields: 'id, name' });
        const filesInFolder = await drive.files.list({
          q: `'${fId}' in parents and trashed=false`,
          fields: 'files(id, name, mimeType)',
          pageSize: 40,
        });
        const items = (filesInFolder.data.files || []).filter(
          (item) => item.id && item.mimeType !== 'application/vnd.google-apps.folder'
        );

        // Sort items so those matching key topics (parkour, equilibrio, saltos, etc.) are prioritized at the top
        const priorityKeywords = ['parkour', 'equilibrio', 'salto', 'desplazamiento', 'deporte', 'atletismo', 'baloncesto', 'fútbol', 'juego', 'ficha', 'unidad'];
        items.sort((a, b) => {
          const aName = (a.name || '').toLowerCase();
          const bName = (b.name || '').toLowerCase();
          const aPriority = priorityKeywords.some((kw) => aName.includes(kw)) ? 1 : 0;
          const bPriority = priorityKeywords.some((kw) => bName.includes(kw)) ? 1 : 0;
          return bPriority - aPriority;
        });

        for (const item of items) {
          if (item.id) {
            await readFileContent(item.id, `[Carpeta ${folderMeta.data.name}] ${item.name}`, item.mimeType);
          }
        }
      } catch (fErr) {
        console.warn(`Error scanning folder ${fId}:`, fErr);
      }
    }

    // 2. Read individual selected files
    for (const fileId of fileIds) {
      await readFileContent(fileId);
    }

    res.json({
      fileCount: readFilesList.length,
      sourceFiles: readFilesList.map((f) => f.name),
      documentationText: aggregatedText.trim(),
    });
  } catch (error: any) {
    handleDriveError(res, error, 'Error al procesar la selección de Google Drive.');
  }
});

// API 9: Create Google Doc directly in user's Drive
app.post('/api/docs/create-doc', async (req, res) => {
  try {
    const { accessToken, sda } = req.body;
    if (!accessToken) {
      return res.status(401).json({ error: 'OAuth access token es requerido.' });
    }
    if (!sda || !sda.titulo) {
      return res.status(400).json({ error: 'Datos de la SdA requeridos.' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const docs = google.docs({ version: 'v1', auth });

    // 1. Create document
    const createRes = await docs.documents.create({
      requestBody: {
        title: `SdA EF - ${sda.titulo} (${sda.curso})`,
      },
    });

    const documentId = createRes.data.documentId;
    if (!documentId) {
      throw new Error('No se pudo obtener la ID del documento creado.');
    }

    // Format full SdA text and build formatting requests for Google Docs API
    interface TextSegment {
      text: string;
      style?: 'title' | 'heading1' | 'heading2' | 'boldLabel';
    }

    const segments: TextSegment[] = [];

    segments.push({ text: `SITUACIÓN DE APRENDIZAJE: ${(sda.titulo || 'EDUCACIÓN FÍSICA').toUpperCase()}\n`, style: 'title' });
    segments.push({ text: `Curso: ${sda.curso} (${sda.ciclo}) | Trimestre: ${sda.trimestre} | Nº Sesiones: ${sda.numSesiones}\n`, style: 'boldLabel' });
    segments.push({ text: `Temáticas: ${sda.tematica}\n\n`, style: 'boldLabel' });

    // 1. Justificación y Temática de la SdA
    segments.push({ text: `1. JUSTIFICACIÓN Y TEMÁTICA DE LA SdA\n`, style: 'heading1' });
    segments.push({ text: `${sda.justificacion || 'Sin justificación.'}\n\n` });

    // 2. Elementos Curriculares y Matriz de Relación
    const normativaText = `(${sda.comunidad ? sda.comunidad.toUpperCase() : 'LOMLOE'})`;
    segments.push({ text: `2. ELEMENTOS CURRICULARES Y MATRIZ DE RELACIÓN ${normativaText}\n`, style: 'heading1' });
    segments.push({ text: `Competencias Específicas: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.competenciasSeleccionadas || []).join(', ')}\n` });
    segments.push({ text: `Criterios de Evaluación: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.criteriosSeleccionados || []).join(', ')}\n` });
    segments.push({ text: `Saberes Básicos: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.saberesSeleccionados || []).join(', ')}\n\n` });

    // 3. Metodología y Modelos Pedagógicos
    segments.push({ text: `3. METODOLOGÍA Y MODELOS PEDAGÓGICOS\n`, style: 'heading1' });
    segments.push({ text: `Metodología Activa: `, style: 'boldLabel' });
    segments.push({ text: `${sda.metodologiaActiva || 'Metodología Activa y Vivencial'}\n` });
    segments.push({ text: `Modelo de Estructura de Sesión: `, style: 'boldLabel' });
    segments.push({ text: `${sda.modeloEstructura || 'Estructura Cronométrica de 60 min'}\n\n` });

    // 4. Desarrollo de las Sesiones de Trabajo
    segments.push({ text: `4. DESARROLLO DE LAS SESIONES DE TRABAJO (60 MINUTOS)\n`, style: 'heading1' });
    (sda.sesiones || []).forEach((ses: any, idx: number) => {
      segments.push({ text: `--- SESIÓN ${idx + 1}: ${ses.titulo} ---\n`, style: 'heading2' });
      segments.push({ text: `Objetivo: `, style: 'boldLabel' });
      segments.push({ text: `${ses.objetivoSesion || 'Desarrollo motriz y actitudinal'}\n` });
      segments.push({ text: `Materiales: `, style: 'boldLabel' });
      segments.push({ text: `${(ses.materialesTotales || []).join(', ')}\n` });

      (ses.fases || []).forEach((f: any) => {
        segments.push({ text: `  * [${f.fase} - ${f.duracionMin} min] `, style: 'boldLabel' });
        segments.push({ text: `${f.nombreJuego}\n`, style: 'boldLabel' });
        segments.push({ text: `    Descripción: `, style: 'boldLabel' });
        segments.push({ text: `${f.descripcion}\n` });
      });
      segments.push({ text: `\n` });
    });

    // 5. Producto Final y Reto Motor Colectivo
    segments.push({ text: `5. PRODUCTO FINAL Y RETO MOTOR COLECTIVO\n`, style: 'heading1' });
    segments.push({ text: `${sda.productoFinal || 'Sin definir.'}\n\n` });

    // 6. Atención a la Diversidad
    segments.push({ text: `6. ATENCIÓN A LA DIVERSIDAD (MARCO DUA Y ADAPTACIONES NEAE)\n`, style: 'heading1' });
    if (sda.adaptacionesNEAE && sda.adaptacionesNEAE.length > 0) {
      sda.adaptacionesNEAE.forEach((a: any) => {
        segments.push({ text: `* Adaptación NEAE [${a.categoria}]:\n`, style: 'boldLabel' });
        segments.push({ text: `  Materiales y Espacio: ${a.materialesYEspacio}\n` });
        segments.push({ text: `  Reglas y Metodología: ${a.reglasYMetodologia}\n` });
        segments.push({ text: `  Pautas Docente: ${a.pautasDocente}\n` });
      });
    }
    if (sda.pautasDUAGlobales && sda.pautasDUAGlobales.length > 0) {
      sda.pautasDUAGlobales.forEach((d: any) => {
        const titleStr = typeof d === 'string' ? d : d.principio;
        segments.push({ text: `* ${titleStr}:\n`, style: 'boldLabel' });
        if (typeof d !== 'string' && Array.isArray(d.pautas)) {
          d.pautas.forEach((p: string) => {
            segments.push({ text: `  - ${p}\n` });
          });
        }
      });
    }
    segments.push({ text: `\n` });

    // 7. Evaluación Inicial y Diagnóstica (Herramientas formativas)
    segments.push({ text: `7. EVALUACIÓN INICIAL Y DIAGNÓSTICA (HERRAMIENTAS FORMATIVAS)\n`, style: 'heading1' });
    segments.push({ text: `Estrategia Diagnóstica Inicial: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.evaluacionInicial || 'Diagnóstica inicial de capacidades motrices y nivel competencial de partida.').replace(/\bCOMING\b|\bCOMING\s+SOON\b/gi, '').trim()}\n` });
    if (sda.instrumentosEvaluacion && sda.instrumentosEvaluacion.length > 0) {
      sda.instrumentosEvaluacion.forEach((inst: any) => {
        segments.push({ text: `* Instrumento [${inst.tipo || inst.nombre}]: `, style: 'boldLabel' });
        segments.push({ text: `${inst.descripcion} (Aplicación: ${inst.aplicacion})\n` });
      });
    }
    segments.push({ text: `\n` });

    // 8. Conexiones Interdisciplinares
    segments.push({ text: `8. CONEXIONES INTERDISCIPLINARES\n`, style: 'heading1' });
    segments.push({ text: `* Matemáticas: Conteo de puntos, distancias y tiempos, orientación geométrica y estadísticas.\n` });
    segments.push({ text: `* Lengua Castellana: Comprensión de reglamentos, vocabulario motriz específico y asambleas reflexivas.\n` });
    segments.push({ text: `* Conocimiento del Medio: Frecuencia cardíaca/respiratoria, higiene corporal, salud activa y respeto ambiental.\n` });
    segments.push({ text: `* Educación Artística: Expresión corporal, ritmo, coordinación colectiva y diseño de retos.\n` });
    segments.push({ text: `* Competencia Digital: Análisis audiovisual y formularios interactivos de coevaluación.\n\n` });

    // 9. Recursos Didácticos, Instalaciones y Materiales
    segments.push({ text: `9. RECURSOS DIDÁCTICOS, INSTALACIONES Y MATERIALES\n`, style: 'heading1' });
    segments.push({ text: `* Instalaciones y Espacios: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.recursosEspaciales && sda.recursosEspaciales.length > 0) ? sda.recursosEspaciales.join(' • ') : 'Pistas polideportivas y gimnasio cubierto'}\n` });
    segments.push({ text: `* Materiales Escolares y Deportivos: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.recursosMateriales && sda.recursosMateriales.length > 0) ? sda.recursosMateriales.join(' • ') : 'Material convencional y alternativo de EF'}\n` });
    segments.push({ text: `* Recursos Didácticos y Curriculares: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.recursosCurriculares && sda.recursosCurriculares.length > 0) ? sda.recursosCurriculares.join(' • ') : 'Tarjetas DUA y dianas de evaluación'}\n` });
    segments.push({ text: `* Recursos Complementarios: `, style: 'boldLabel' });
    segments.push({ text: `${(sda.recursosExternos && sda.recursosExternos.length > 0) ? sda.recursosExternos.join(' • ') : 'Altavoz Bluetooth y cronómetro'}\n\n` });

    // Build single text string and formatting ranges
    let fullContent = '';
    const formattingRequests: any[] = [];

    let currentIndex = 1; // Google Docs indices start at 1
    for (const seg of segments) {
      const segText = seg.text;
      const startIndex = currentIndex;
      fullContent += segText;
      currentIndex += segText.length;
      const endIndex = currentIndex;

      if (seg.style === 'title') {
        formattingRequests.push({
          updateTextStyle: {
            range: { startIndex, endIndex },
            textStyle: {
              bold: true,
              fontSize: { magnitude: 18, unit: 'PT' },
              foregroundColor: { color: { rgbColor: { red: 0.04, green: 0.13, blue: 0.25 } } }, // Navy #0A2240
            },
            fields: 'bold,fontSize,foregroundColor',
          },
        });
      } else if (seg.style === 'heading1') {
        formattingRequests.push({
          updateTextStyle: {
            range: { startIndex, endIndex },
            textStyle: {
              bold: true,
              fontSize: { magnitude: 13, unit: 'PT' },
              foregroundColor: { color: { rgbColor: { red: 0.04, green: 0.13, blue: 0.25 } } }, // Navy #0A2240
            },
            fields: 'bold,fontSize,foregroundColor',
          },
        });
      } else if (seg.style === 'heading2') {
        formattingRequests.push({
          updateTextStyle: {
            range: { startIndex, endIndex },
            textStyle: {
              bold: true,
              fontSize: { magnitude: 11, unit: 'PT' },
              foregroundColor: { color: { rgbColor: { red: 0.91, green: 0.36, blue: 0.02 } } }, // Orange #E85D04
            },
            fields: 'bold,fontSize,foregroundColor',
          },
        });
      } else if (seg.style === 'boldLabel') {
        formattingRequests.push({
          updateTextStyle: {
            range: { startIndex, endIndex },
            textStyle: {
              bold: true,
            },
            fields: 'bold',
          },
        });
      }
    }

    // Apply JUSTIFIED paragraph alignment to full document
    formattingRequests.unshift({
      updateParagraphStyle: {
        range: { startIndex: 1, endIndex: currentIndex },
        paragraphStyle: {
          alignment: 'JUSTIFIED',
          lineSpacing: 115,
        },
        fields: 'alignment,lineSpacing',
      },
    });

    // Insert content and apply styling
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: fullContent,
            },
          },
          ...formattingRequests,
        ],
      },
    });

    const docUrl = `https://docs.google.com/document/d/${documentId}/edit`;
    res.json({ docId: documentId, docUrl });
  } catch (error: any) {
    handleDriveError(res, error, 'Error al crear el documento en Google Docs.');
  }
});

// API: Parse local uploaded file (Word .docx, PDF .pdf, Excel .xlsx, TXT)
app.post('/api/parse-local-file', async (req, res) => {
  try {
    const { fileName = '', base64Data = '' } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'Faltan los datos del archivo local en base64.' });
    }

    const fileBuffer = Buffer.from(base64Data, 'base64');
    const ext = path.extname(fileName).toLowerCase();
    let extractedText = '';

    if (ext === '.docx' || ext === '.doc') {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value || '';
      } catch (docErr) {
        console.warn(`Error parsing docx ${fileName}:`, docErr);
        extractedText = fileBuffer.toString('utf-8');
      }
    } else if (ext === '.pdf') {
      try {
        const pdfData = await pdfParse(fileBuffer);
        extractedText = pdfData.text || '';
      } catch (pdfErr) {
        console.warn(`Error parsing pdf ${fileName}:`, pdfErr);
        extractedText = fileBuffer.toString('utf-8');
      }
    } else if (ext === '.xlsx' || ext === '.xls') {
      try {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames || [];
        const textParts: string[] = [];
        sheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          if (sheet) {
            const csv = XLSX.utils.sheet_to_csv(sheet);
            textParts.push(`--- HOJA EXCEL: ${sheetName} ---\n${csv}`);
          }
        });
        extractedText = textParts.join('\n\n');
      } catch (xlErr) {
        console.warn(`Error parsing excel ${fileName}:`, xlErr);
        extractedText = fileBuffer.toString('utf-8');
      }
    } else {
      extractedText = fileBuffer.toString('utf-8');
    }

    const cleanText = extractedText.trim();
    if (!cleanText) {
      return res.status(400).json({ error: `No se pudo extraer texto legible del archivo local "${fileName}".` });
    }

    const formattedOutput = `\n--- ARCHIVO LOCAL ADJUNTO: ${fileName} ---\n${cleanText}\n`;

    res.json({
      success: true,
      fileName,
      extractedText: formattedOutput,
      charCount: cleanText.length,
    });
  } catch (error: any) {
    console.error('Error in /api/parse-local-file:', error);
    res.status(500).json({ error: error.message || 'Error al procesar el archivo local.' });
  }
});

// API: Generar Estrategia de Evaluación Inicial / Diagnóstica
app.post('/api/ai/generate-initial-eval', async (req, res) => {
  try {
    const { tematica, curso, criteriosSeleccionados, etapa } = req.body;

    const ai = getGenAIClient();
    const prompt = `Redacta una estrategia de Evaluación Inicial / Diagnóstica para una Situación de Aprendizaje de Educación Física en Primaria (${curso}):
Temática: "${tematica || 'Educación Física'}"
Criterios de Evaluación: ${JSON.stringify(criteriosSeleccionados || [])}

Escribe entre 80 y 150 palabras explicando:
- Una prueba inicial o juego diagnóstico para valorar las competencias y contenidos previos del alumnado.
- Qué indicadores clave observará el docente durante la primera sesión.
- Cómo se registrarán de forma ágil las necesidades y niveles de partida del alumnado.`;

    const response = await callGeminiWithRetry(req, ai, {
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstructionEF(etapa, req.body.comunidad),
        temperature: 0.7,
      },
    });

    res.json({ evaluacionInicial: response.text?.trim() || '' });
  } catch (error: any) {
    console.error('Error generating initial evaluation:', error);
    res.status(500).json({ error: error.message || 'Error al generar la evaluación inicial con IA.' });
  }
});

// SdA Persistence Cloud Endpoints (Server-side Firestore fallback & safety)
app.post('/api/user/save-sda', async (req, res) => {
  try {
    const { email, sda } = req.body;
    if (!email || !sda || !sda.id) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios (email, sda, sda.id).' });
    }
    const cleanEmail = String(email).trim().toLowerCase();
    // Sanitize any undefined values from the object for Firestore compatibility
    const cleanSda = JSON.parse(JSON.stringify(sda));
    const sdaDocRef = doc(db, 'users', cleanEmail, 'user_sdas', String(cleanSda.id));
    await setDoc(sdaDocRef, cleanSda, { merge: true });
    return res.json({ success: true, id: cleanSda.id });
  } catch (error: any) {
    console.error('Error saving SdA on server Firestore:', error);
    return res.status(500).json({ error: error.message || 'Error al guardar SdA en el servidor.' });
  }
});

app.post('/api/user/delete-sda', async (req, res) => {
  try {
    const { email, id } = req.body;
    if (!email || !id) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios (email, id).' });
    }
    const cleanEmail = String(email).trim().toLowerCase();
    const sdaDocRef = doc(db, 'users', cleanEmail, 'user_sdas', String(id));
    await deleteDoc(sdaDocRef);
    return res.json({ success: true, id });
  } catch (error: any) {
    console.error('Error deleting SdA on server Firestore:', error);
    return res.status(500).json({ error: error.message || 'Error al eliminar SdA en el servidor.' });
  }
});

app.get('/api/user/sdas', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: 'Falta el parámetro email.' });
    }
    const cleanEmail = String(email).trim().toLowerCase();
    const sdasRef = collection(db, 'users', cleanEmail, 'user_sdas');
    const snap = await getDocs(sdasRef);
    const sdas = snap.docs.map(d => d.data());
    return res.json({ sdas });
  } catch (error: any) {
    console.error('Error fetching SdAs from server Firestore:', error);
    return res.status(500).json({ error: error.message || 'Error al obtener SdAs del servidor.' });
  }
});

// Función de detección de navegador para renderizado de PDF en alta fidelidad
function getBrowserExecutablePath(): string | null {
  // En Render o entornos cloud con 512MB RAM, no ejecutar navegadores headless pesados
  // que disparen OOM killer o abortos nativos SIGABRT (134). La exportación se procesa en el cliente.
  if (process.env.RENDER || process.env.NODE_ENV === 'production') {
    return null;
  }
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
    return process.env.CHROME_BIN;
  }
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome-stable',
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

// Endpoint directo de exportación de PDF de alta fidelidad sin diálogos de impresión
app.post('/api/export/pdf', async (req, res) => {
  try {
    const { html, title } = req.body;
    if (!html) {
      return res.status(400).json({ error: 'Falta el contenido HTML a exportar.' });
    }

    const browserPath = getBrowserExecutablePath();
    if (!browserPath) {
      return res.status(503).json({ error: 'Motor de servidor no disponible para PDF. Se utilizará el motor cliente.' });
    }

    const cleanTitle = (title || 'Situacion_de_Aprendizaje_EF')
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_')
      .replace(/_+/g, '_');

    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const tempHtmlPath = path.join(os.tmpdir(), `sda_${uniqueId}.html`);
    const tempPdfPath = path.join(os.tmpdir(), `sda_${uniqueId}.pdf`);
    const tempUserDataDir = path.join(os.tmpdir(), `sda_chrome_ud_${uniqueId}`);

    const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${title || 'Situación de Aprendizaje'}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #1e293b;
      background-color: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      page-break-inside: auto;
    }
    tr, .avoid-break, .session-start-block {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    thead, th, h1, h2, h3, h4, .section-header {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

    fs.writeFileSync(tempHtmlPath, fullHtml, 'utf-8');

    await new Promise<void>((resolve, reject) => {
      execFile(
        browserPath,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--single-process',
          '--no-zygote',
          '--no-pdf-header-footer',
          `--user-data-dir=${tempUserDataDir}`,
          `--print-to-pdf=${tempPdfPath}`,
          tempHtmlPath,
        ],
        { timeout: 30000 },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    if (!fs.existsSync(tempPdfPath)) {
      throw new Error('El archivo PDF no fue generado por el motor de renderizado.');
    }

    const pdfBuffer = fs.readFileSync(tempPdfPath);

    // Limpieza de ficheros temporales
    try {
      if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
      if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
      if (fs.existsSync(tempUserDataDir)) fs.rmSync(tempUserDataDir, { recursive: true, force: true });
    } catch (e) {
      console.warn('Error limpiando archivos temporales de PDF:', e);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="SdA_${cleanTitle}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error generando PDF en el servidor:', error);
    return res.status(500).json({ error: error.message || 'Error interno generando el PDF.' });
  }
});

// Boot server and Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Servidor SdA Educación Física corriendo en http://localhost:${PORT}`);
  });
}

startServer();
