import html2pdf from 'html2pdf.js';
import { SesionTrabajo, ActividadEnSesion } from '../types';

export interface SdaInfoForSheet {
  titulo?: string;
  tematica?: string;
  curso?: string;
  ciclo?: string;
  etapa?: string;
  comunidad?: string;
  trimestre?: string;
  numSesiones?: number;
}

/**
 * Parsea la descripción de un juego para extraer sus elementos operativos
 * garantizando que NUNCA se corte ni se trunque texto.
 */
export function extractCompactGameParts(act: ActividadEnSesion) {
  const raw = (act.descripcion || '').trim();
  
  const secLines: { [key: string]: string[] } = {
    terreno: [],
    roles: [],
    desarrollo: [],
    normas: [],
    variante: [],
    cancion: [],
    general: []
  };

  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  let currentSec = 'general';

  for (const line of lines) {
    if (/^(?:1\.)?\s*(?:Terreno(?:\s*de\s*juego)?|ORGANIZACI[OÓ]N\s*ESPACIAL)/i.test(line)) {
      currentSec = 'terreno';
      const part = line.replace(/^(?:1\.)?\s*(?:Terreno(?:\s*de\s*juego)?|ORGANIZACI[OÓ]N\s*ESPACIAL):?\s*/i, '').trim();
      if (part) secLines.terreno.push(part);
    } else if (/^(?:2\.)?\s*(?:Roles(?:\s*del\s*alumnado|\s*activos)?|ROLES)/i.test(line)) {
      currentSec = 'roles';
      const part = line.replace(/^(?:2\.)?\s*(?:Roles(?:\s*del\s*alumnado|\s*activos)?|ROLES):?\s*/i, '').trim();
      if (part) secLines.roles.push(part);
    } else if (/^(?:3\.)?\s*(?:Desarrollo(?:\s*del\s*juego)?|DESARROLLO\s*PASO|Secuencia)/i.test(line)) {
      currentSec = 'desarrollo';
      const part = line.replace(/^(?:3\.)?\s*(?:Desarrollo(?:\s*del\s*juego)?|DESARROLLO\s*PASO|Secuencia):?\s*/i, '').trim();
      if (part) secLines.desarrollo.push(part);
    } else if (/^(?:4\.)?\s*(?:Normas(?:\s*y\s*reglas|\s*claras)?|Reglas)/i.test(line)) {
      currentSec = 'normas';
      const part = line.replace(/^(?:4\.)?\s*(?:Normas(?:\s*y\s*reglas|\s*claras)?|Reglas):?\s*/i, '').trim();
      if (part) secLines.normas.push(part);
    } else if (/^(?:5\.)?\s*(?:Variaci(?:ones|ón)|Variantes|VARIACIONES)/i.test(line)) {
      currentSec = 'variante';
      const part = line.replace(/^(?:5\.)?\s*(?:Variaci(?:ones|ón|entes)|VARIACIONES)?:?\s*/i, '').trim();
      if (part) secLines.variante.push(part);
    } else if (/^(?:🎵\s*)?(?:Canci[oó]n|Letra|Retah[ií]la)/i.test(line)) {
      currentSec = 'cancion';
      const part = line.replace(/^(?:🎵\s*)?(?:Canci[oó]n|Letra|Retah[ií]la):?\s*/i, '').trim();
      if (part) secLines.cancion.push(part);
    } else {
      secLines[currentSec].push(line);
    }
  }

  // Si no se clasificó desarrollo pero hay líneas generales, reunirlas
  let desarrollo = secLines.desarrollo.join(' ').trim();
  if (!desarrollo && secLines.general.length > 0) {
    desarrollo = secLines.general.join(' ').trim();
  } else if (secLines.general.length > 0 && !desarrollo.includes(secLines.general[0])) {
    desarrollo = `${secLines.general.join(' ')} ${desarrollo}`.trim();
  }

  // Fallback si aún sigue vacío: usar raw completo (¡sin truncar!)
  if (!desarrollo && raw) {
    desarrollo = raw;
  }

  const organizacion = secLines.terreno.join(' ').trim();
  const roles = secLines.roles.join(' ').trim();
  const normas = secLines.normas.map(n => n.replace(/^[-*•]\s*/, '')).join(' • ').trim();
  const variante = secLines.variante.map(v => v.replace(/^[-*•]\s*/, '')).join(' • ').trim();
  let cancion = secLines.cancion.join('\n').trim();

  // Si no se detectó canción en secLines pero está dentro del desarrollo, extraerla
  if (!cancion) {
    const songMatch = desarrollo.match(/(?:🎵\s*)?(?:Canci[oó]n|Letra|Retah[ií]la):?\s*["“]([^"”]+)["”]/i);
    if (songMatch) {
      cancion = songMatch[1].trim();
    }
  }

  // Limpiar texto de canciones del desarrollo para aligerar la ficha de pista principal
  if (cancion) {
    desarrollo = desarrollo.replace(/(?:🎵\s*)?(?:Canci[oó]n|Letra|Retah[ií]la):?\s*["“][^"”]+["”]/gi, '').trim();
    desarrollo = desarrollo.replace(/(?:🎵\s*)?(?:Canci[oó]n|Letra|Retah[ií]la):?[^\n.]*(?:\.|$)/gi, '').trim();
  }

  return {
    nombre: act.nombreJuego || act.fase || 'Actividad',
    duracion: act.duracionMin || 10,
    fase: act.fase || '',
    organizacion: organizacion || 'Espacio delimitado de pista polideportiva',
    roles: roles,
    desarrollo: desarrollo,
    normas: normas,
    variante: variante,
    cancion: cancion,
    materiales: act.materiales || [],
  };
}

/**
 * Genera el HTML de una sesión calibrado milimétricamente para ocupar
 * EXACTAMENTE 1 PÁGINA A4 para la sesión motriz, y si contiene canciones,
 * anexa un folio complementario independiente al final.
 */
export function renderSessionSheetHtml(
  sesion: SesionTrabajo,
  sdaInfo: SdaInfoForSheet,
  sesionIdx: number = 0,
  totalSesiones: number = 6
): string {
  const numSes = sesion.numeroSesion || (sesionIdx + 1);
  const titSes = (sesion.titulo || `Sesión ${numSes}`).replace(/^Sesión\s*\d+:\s*/i, '').toUpperCase();
  const sdaTitle = sdaInfo.titulo || sdaInfo.tematica || 'SdA Educación Física';
  const curso = sdaInfo.curso || 'Educación Primaria';
  const matTotales = Array.isArray(sesion.materialesTotales) && sesion.materialesTotales.length > 0
    ? sesion.materialesTotales.join(', ')
    : 'Material convencional de EF (conos, petos, balones)';

  // Agrupar fases
  const warmup = sesion.fases.filter(f => /calentamiento|activaci[oó]n|inicial/i.test(f.fase));
  const main = sesion.fases.filter(f => /principal|pr[aá]ctica|reto|estaci[oó]n|desaf[ií]o/i.test(f.fase) || (!warmup.includes(f) && !/vuelta|calma|final|higiene/i.test(f.fase)));
  const cool = sesion.fases.filter(f => /vuelta|calma|final|higiene|reflexi[oó]n/i.test(f.fase));

  // Recolectar canciones de toda la sesión para el Folio Anexo
  const songsInSession: { juegoNombre: string; cancion: string; fase: string }[] = [];
  sesion.fases.forEach(f => {
    const parts = extractCompactGameParts(f);
    if (parts.cancion && parts.cancion.trim().length > 5) {
      songsInSession.push({
        juegoNombre: parts.nombre,
        cancion: parts.cancion.trim(),
        fase: f.fase || 'Actividad'
      });
    }
  });

  // Renderizar tarjeta individual de juego protegida contra cualquier corte o solapamiento
  const renderGameCard = (act: ActividadEnSesion, tagColor: string, tagLabel: string, borderLeftColor: string) => {
    const parts = extractCompactGameParts(act);
    return `
      <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-left: 4.5px solid ${borderLeftColor}; border-radius: 5px; padding: 4px 7px; margin-bottom: 2px; box-sizing: border-box;">
        
        <!-- FILA 1: BADGE DE FASE + TÍTULO DEL JUEGO + MATERIALES (PROTECCIÓN TOTAL CON PADDING EN CELDA) -->
        <table style="width: 100%; border-collapse: collapse; margin: 0 0 2.5px 0; padding: 0;">
          <tr>
            <td style="vertical-align: middle; text-align: left; padding: 2px 0 2px 0;">
              <span style="background: ${tagColor}; color: #ffffff; font-size: 8.5px; font-weight: bold; padding: 2.5px 6.5px; border-radius: 3px; text-transform: uppercase; display: inline-block; vertical-align: middle; margin-right: 5px; line-height: 1.25;">
                ${tagLabel} • ${parts.duracion} min
              </span>
              <span style="font-size: 10px; color: #0a2240; font-weight: bold; text-transform: uppercase; vertical-align: middle; line-height: 1.3;">
                ${parts.nombre}
              </span>
            </td>
            ${parts.materiales.length > 0 ? `
              <td style="vertical-align: middle; text-align: right; white-space: nowrap; padding: 2px 0 2px 5px; width: 1%;">
                <span style="font-size: 7.5px; color: #334155; font-weight: bold; background: #f1f5f9; padding: 1.5px 5.5px; border-radius: 3px; border: 1px solid #cbd5e1; display: inline-block; line-height: 1.2;">
                  📦 ${parts.materiales.join(', ')}
                </span>
              </td>
            ` : ''}
          </tr>
        </table>

        <!-- FILA 2: ESPACIO Y ROLES -->
        <div style="font-size: 8.5px; color: #0f172a; line-height: 1.45; margin-bottom: 2.5px; background: #f8fafc; padding: 2.5px 6px; border-radius: 3px; border: 1px solid #e2e8f0;">
          <strong style="color: #0284c7;">📍 Espacio:</strong> ${parts.organizacion}
          ${parts.roles ? ` • <strong style="color: #6366f1;">👥 Roles:</strong> ${parts.roles}` : ''}
        </div>

        <!-- FILA 3: DESARROLLO DEL JUEGO (LINE-HEIGHT 1.55: CERO RECORTES EN TODAS LAS LÍNEAS) -->
        <div style="font-size: 8.5px; color: #1e293b; line-height: 1.55; margin-bottom: 2.5px;">
          <strong style="color: #0a2240;">🏃 Desarrollo:</strong> ${parts.desarrollo}
        </div>

        <!-- CANCIÓN / RETAHÍLA: REFERENCIA AL ANEXO TRAS LA SESIÓN -->
        ${parts.cancion ? `
          <div style="font-size: 8px; color: #7c2d12; background: #fff7ed; padding: 2px 6px; border-radius: 3px; margin-bottom: 2.5px; font-style: italic; border-left: 3px solid #f97316; line-height: 1.4;">
            🎵 <strong>Canción / Letra:</strong> Letra completa y ritmo disponibles en el <strong>ANEXO DE PISTA</strong> (Folio anexo)
          </div>
        ` : ''}

        <!-- FILA 4: REGLAS Y VARIANTES DESTACADAS -->
        ${(parts.normas || parts.variante) ? `
          <div style="display: flex; gap: 5px; font-size: 8px; line-height: 1.45; margin-top: 1px; flex-wrap: wrap;">
            ${parts.normas ? `
              <div style="flex: 1; min-width: 140px; background: #fffbeb; border: 1px solid #fef3c7; border-left: 2.5px solid #f59e0b; padding: 2px 5px; border-radius: 3px;">
                <strong style="color: #b45309;">⚠️ Regla:</strong> ${parts.normas}
              </div>
            ` : ''}
            ${parts.variante ? `
              <div style="flex: 1; min-width: 140px; background: #f0fdf4; border: 1px solid #dcfce7; border-left: 2.5px solid #10b981; padding: 2px 5px; border-radius: 3px;">
                <strong style="color: #047857;">💡 Variante:</strong> ${parts.variante}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  };

  // Maquetar Parte Principal: si hay 2 o más actividades, distribuir en cuadrícula de 2 columnas (2x2)
  let mainContentHtml = '';
  if (main.length <= 1) {
    mainContentHtml = main.map((act, mIdx) => renderGameCard(act, '#e85d04', `Juego ${mIdx + 1}`, '#f59e0b')).join('');
  } else {
    const rows: string[] = [];
    for (let i = 0; i < main.length; i += 2) {
      const g1 = main[i];
      const g2 = main[i + 1];
      rows.push(`
        <tr>
          <td style="width: 50%; vertical-align: top; padding: 0 2.5px 0 0;">
            ${renderGameCard(g1, '#e85d04', `Juego ${i + 1}`, '#f59e0b')}
          </td>
          <td style="width: 50%; vertical-align: top; padding: 0 0 0 2.5px;">
            ${g2 ? renderGameCard(g2, '#e85d04', `Juego ${i + 2}`, '#f59e0b') : ''}
          </td>
        </tr>
      `);
    }
    mainContentHtml = `
      <table style="width: 100%; border-collapse: separate; border-spacing: 0 2px; margin: 0; padding: 0;">
        ${rows.join('')}
      </table>
    `;
  }

  // Página 1: Folio único principal de la sesión
  const page1Html = `
    <div class="session-sheet-page" style="width: 100%; max-width: 710px; margin: 0 auto; background: #ffffff; color: #0f172a; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box; padding: 0 4px; page-break-inside: avoid !important; break-inside: avoid !important;">
      
      <!-- CABECERA INSTITUCIONAL COMPACTA Y ELEGANTE -->
      <div style="border: 1.5px solid #0a2240; border-radius: 5px; overflow: hidden; margin-bottom: 4px; box-sizing: border-box;">
        <table style="width: 100%; border-collapse: collapse; background: #0a2240; margin: 0; padding: 0;">
          <tr>
            <td style="padding: 4px 8px; vertical-align: middle; text-align: left;">
              <span style="background: #e85d04; color: #ffffff; font-size: 8.5px; font-weight: bold; padding: 1.5px 5px; border-radius: 3px; display: inline-block; margin-right: 6px; line-height: 1.3;">
                DIARIO DE PISTA EF
              </span>
              <span style="font-size: 10.5px; font-weight: bold; text-transform: uppercase; color: #ffffff; line-height: 1.35;">
                SESIÓN ${numSes} DE ${totalSesiones}: ${titSes}
              </span>
            </td>
            <td style="padding: 4px 8px; vertical-align: middle; text-align: right; white-space: nowrap; width: 1%;">
              <span style="font-size: 8px; font-weight: bold; background: #1e3a8a; padding: 1.5px 6px; border-radius: 3px; color: #93c5fd; display: inline-block; line-height: 1.3;">
                ⏱️ 60 MINUTOS
              </span>
            </td>
          </tr>
        </table>

        <div style="background: #f8fafc; padding: 3px 8px; display: grid; grid-template-columns: 2fr 1fr; gap: 6px; font-size: 8.5px; border-top: 1px solid #e2e8f0; line-height: 1.4;">
          <div>
            <strong style="color: #0a2240;">📚 SdA / Nivel:</strong> ${sdaTitle} • <strong>${curso}</strong> ${sdaInfo.trimestre ? `(${sdaInfo.trimestre})` : ''}
          </div>
          <div style="text-align: right;">
            <strong style="color: #0a2240;">📍 Espacio:</strong> Pista polideportiva / Gimnasio
          </div>
        </div>

        ${sesion.objetivoSesion ? `
          <div style="background: #ffffff; padding: 2.5px 8px; font-size: 8.5px; color: #334155; border-top: 1px solid #e2e8f0; font-style: italic; line-height: 1.4;">
            <strong style="color: #0369a1; font-style: normal;">🎯 Objetivo Motriz:</strong> ${sesion.objetivoSesion}
          </div>
        ` : ''}

        <div style="background: #fffbeb; padding: 2.5px 8px; font-size: 8px; color: #92400e; border-top: 1px solid #fef3c7; line-height: 1.35;">
          <strong>📦 Materiales Requeridos:</strong> ${matTotales}
        </div>
      </div>

      <!-- FASE 1: CALENTAMIENTO / ACTIVACIÓN MOTRIZ (CONTENEDOR UNIFICADO: CERO CORTES) -->
      <div style="border: 1.5px solid #0284c7; border-radius: 5px; overflow: hidden; margin-bottom: 4px; box-sizing: border-box;">
        <div style="background: #0284c7; color: #ffffff; padding: 4.5px 8px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
          <span style="font-size: 9.5px; font-weight: bold; text-transform: uppercase; line-height: 1.35; color: #ffffff;">
            1. FASE INICIAL / ACTIVACIÓN DINÁMICA (10 MIN)
          </span>
          <span style="font-size: 8px; color: #ffffff; opacity: 0.95; line-height: 1.3;">
            Puesta en marcha e implicación motriz
          </span>
        </div>
        <div style="background: #f0f9ff; padding: 3px 4px 1px 4px; border-top: 1px solid #bae6fd;">
          ${warmup.length > 0 
            ? warmup.map((act) => renderGameCard(act, '#0284c7', 'Calentamiento', '#0284c7')).join('')
            : '<p style="font-size: 8.5px; color: #64748b; margin: 2px; font-style: italic; line-height: 1.4;">Desplazamientos dinámicos, movilidad articular y juego breve de activación perceptiva.</p>'
          }
        </div>
      </div>

      <!-- FASE 2: PARTE PRINCIPAL (CONTENEDOR UNIFICADO: CERO CORTES) -->
      <div style="border: 1.5px solid #e85d04; border-radius: 5px; overflow: hidden; margin-bottom: 4px; box-sizing: border-box;">
        <div style="background: #e85d04; color: #ffffff; padding: 4.5px 8px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
          <span style="font-size: 9.5px; font-weight: bold; text-transform: uppercase; line-height: 1.35; color: #ffffff;">
            2. PARTE PRINCIPAL / DESAFÍOS Y APLICACIÓN MOTRIZ (40 MIN)
          </span>
          <span style="font-size: 8px; color: #ffffff; opacity: 0.95; line-height: 1.3;">
            ${main.length} Retos / Juegos nucleares
          </span>
        </div>
        <div style="background: #fffaf0; padding: 3px 4px 1px 4px; border-top: 1px solid #fed7aa;">
          ${mainContentHtml}
        </div>
      </div>

      <!-- FASE 3: VUELTA A LA CALMA (CONTENEDOR UNIFICADO: CERO CORTES) -->
      <div style="border: 1.5px solid #059669; border-radius: 5px; overflow: hidden; margin-bottom: 4px; box-sizing: border-box;">
        <div style="background: #059669; color: #ffffff; padding: 4.5px 8px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;">
          <span style="font-size: 9.5px; font-weight: bold; text-transform: uppercase; line-height: 1.35; color: #ffffff;">
            3. VUELTA A LA CALMA / REFLEXIÓN E HIGIENE (10 MIN)
          </span>
          <span style="font-size: 8px; color: #ffffff; opacity: 0.95; line-height: 1.3;">
            Descenso de pulsaciones y hábitos
          </span>
        </div>
        <div style="background: #f0fdf4; padding: 3px 4px 1px 4px; border-top: 1px solid #a7f3d0;">
          ${cool.length > 0 
            ? cool.map((act) => renderGameCard(act, '#059669', 'Vuelta a la Calma', '#10b981')).join('')
            : '<p style="font-size: 8.5px; color: #64748b; margin: 2px; font-style: italic; line-height: 1.4;">Puesta en común, respiración guiada, recogida cooperativa del material y aseo personal.</p>'
          }
        </div>
      </div>

      <!-- ZONA DEL DOCENTE A PIE DE PISTA (DIARIO DE CAMPO / INCIDENCIAS / DUA) - 100% EN LA HOJA 1 -->
      <div style="border: 1.2px dashed #94a3b8; border-radius: 5px; padding: 4px 8px; background: #fafaf9; margin-top: 3px; box-sizing: border-box; page-break-inside: avoid !important; break-inside: avoid !important;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #e7e5e4; padding-bottom: 2px; gap: 6px;">
          <strong style="color: #0a2240; font-size: 8px; text-transform: uppercase; line-height: 1.3;">
            📝 DIARIO DE CLASE Y REGISTRO A PIE DE PISTA (A rellenar por el docente)
          </strong>
          <span style="color: #44403c; font-size: 7.5px; font-weight: bold; line-height: 1.3;">
            Alumnado exento/lesionado: ____________________________________
          </span>
        </div>
        <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 8px;">
          <div>
            <span style="color: #44403c; font-weight: bold; font-size: 8px; display: block; margin-bottom: 1px; line-height: 1.3;">
              Observaciones, incidencias y adaptaciones DUA sobre la marcha:
            </span>
            <div style="height: 11px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>
            <div style="height: 11px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>
          </div>
          <div style="border-left: 1px solid #e7e5e4; padding-left: 8px;">
            <span style="color: #44403c; font-weight: bold; font-size: 8px; display: block; margin-bottom: 1px; line-height: 1.3;">
              Evaluación rápida de sesión:
            </span>
            <div style="display: flex; flex-direction: column; gap: 1px; font-size: 7.5px; color: #292524; margin-top: 1px; line-height: 1.3;">
              <span style="display: flex; align-items: center; gap: 4px;">
                <span style="border: 1px solid #78716c; width: 8.5px; height: 8.5px; display: inline-block; border-radius: 2px;"></span>
                <span>Objetivo motriz alcanzado</span>
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                <span style="border: 1px solid #78716c; width: 8.5px; height: 8.5px; display: inline-block; border-radius: 2px;"></span>
                <span>Clima cooperativo y fair play</span>
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                <span style="border: 1px solid #78716c; width: 8.5px; height: 8.5px; display: inline-block; border-radius: 2px;"></span>
                <span>Ajustar tiempo/reglas en próxima sesión</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- PIE DE HOJA -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2.5px; font-size: 7px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 1.5px; line-height: 1.2;">
        <span>Crea-EF • Planificación Curricular y Diario de Pista LOMLOE</span>
        <span>Sesión ${numSes} de ${totalSesiones} • Formato 1 Folio A4 Pista ${songsInSession.length > 0 ? '(+ Anexo Cancionero)' : ''}</span>
      </div>
    </div>
  `;

  // Página 2: Anexo de Cancionero y Retahílas (SOLO si hay canciones en la sesión)
  let annexHtml = '';
  if (songsInSession.length > 0) {
    annexHtml = `
      <div class="session-sheet-page" style="width: 100%; max-width: 710px; margin: 0 auto; background: #ffffff; color: #0f172a; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box; padding: 0 4px; page-break-before: always !important; break-before: page !important; page-break-inside: avoid !important; break-inside: avoid !important;">
        
        <!-- CABECERA DEL ANEXO -->
        <div style="border: 1.5px solid #7c2d12; border-radius: 6px; overflow: hidden; margin-bottom: 8px; box-sizing: border-box;">
          <table style="width: 100%; border-collapse: collapse; background: #7c2d12; margin: 0; padding: 0;">
            <tr>
              <td style="padding: 6px 10px; vertical-align: middle; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #ffffff; line-height: 1.35;">
                  🎵 ANEXO DE PISTA: CANCIONERO Y RETAHÍLAS MOTORAS
                </span>
              </td>
              <td style="padding: 6px 10px; vertical-align: middle; text-align: right; white-space: nowrap; width: 1%;">
                <span style="font-size: 8.5px; font-weight: bold; background: #ea580c; padding: 2.5px 7px; border-radius: 3px; color: #ffffff; line-height: 1.2;">
                  SESIÓN ${numSes} • ANEXO DOCENTE
                </span>
              </td>
            </tr>
          </table>
          <div style="background: #fff7ed; padding: 5px 10px; font-size: 8.5px; color: #9a3412; line-height: 1.4; border-top: 1px solid #fed7aa;">
            Este folio complementario contiene las letras completas y pautas de entonación de los juegos de la <strong>Sesión ${numSes} (${titSes})</strong>. Permite al docente llevar la sesión de juegos completa en 1 solo folio de trabajo y recurrir a este anexo si desea consultar las canciones.
          </div>
        </div>

        <!-- TARJETAS DE CANCIONES -->
        ${songsInSession.map((s, idx) => `
          <div style="background: #ffffff; border: 1.5px solid #fed7aa; border-left: 6px solid #f97316; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #fed7aa; padding-bottom: 4px; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: bold; color: #9a3412; text-transform: uppercase;">
                🎵 Canción ${idx + 1}: ${s.juegoNombre}
              </span>
              <span style="font-size: 8.5px; background: #ffedd5; color: #c2410c; padding: 2px 8px; border-radius: 3px; font-weight: bold;">
                Fase: ${s.fase}
              </span>
            </div>
            <div style="font-size: 10px; color: #431407; line-height: 1.6; font-style: italic; background: #fffaf0; padding: 8px 12px; border-radius: 4px; border: 1px dashed #fdba74; white-space: pre-line;">
              ${s.cancion}
            </div>
          </div>
        `).join('')}

        <!-- PIE DE HOJA DEL ANEXO -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 7.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 3px; line-height: 1.2;">
          <span>Crea-EF • Planificación Curricular y Diario de Pista LOMLOE</span>
          <span>Sesión ${numSes} de ${totalSesiones} • Folio Anexo Cancionero</span>
        </div>
      </div>
    `;
  }

  return `${page1Html}${annexHtml}`;
}

/**
 * Descarga una única sesión en PDF de exactamente 1 página A4
 */
export async function downloadSingleSessionSheetPdf(
  sesion: SesionTrabajo,
  sdaInfo: SdaInfoForSheet,
  sesionIdx: number = 0,
  totalSesiones: number = 6
): Promise<void> {
  const container = document.createElement('div');
  container.style.width = '710px';
  container.style.margin = '0 auto';
  container.style.padding = '0';
  container.style.boxSizing = 'border-box';
  container.style.background = '#ffffff';

  const numSes = sesion.numeroSesion || (sesionIdx + 1);
  const cleanTitle = (sesion.titulo || `Sesion_${numSes}`).replace(/[^a-zA-Z0-9]/g, '_').slice(0, 25);

  container.innerHTML = `
    <style>
      @page {
        size: A4 portrait;
        margin: 4mm 6mm;
      }
      * {
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif !important;
      }
      .session-sheet-page {
        font-family: Arial, Helvetica, sans-serif !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
    </style>
    ${renderSessionSheetHtml(sesion, sdaInfo, sesionIdx, totalSesiones)}
  `;

  document.body.appendChild(container);

  const opt = {
    margin: [4, 6, 4, 6] as [number, number, number, number],
    filename: `Ficha_Pista_Sesion_${numSes}_${cleanTitle}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      logging: false,
      windowWidth: 710,
      scrollX: 0,
      scrollY: 0,
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Descarga el cuaderno completo de pista con todas las sesiones,
 * donde cada sesión ocupa exactamente 1 carilla A4.
 */
export async function downloadAllSessionsNotebookPdf(
  sesiones: SesionTrabajo[],
  sdaInfo: SdaInfoForSheet
): Promise<void> {
  if (!sesiones || sesiones.length === 0) return;

  const container = document.createElement('div');
  container.style.width = '710px';
  container.style.margin = '0 auto';
  container.style.padding = '0';
  container.style.boxSizing = 'border-box';
  container.style.background = '#ffffff';

  const cleanSdaTitle = (sdaInfo.titulo || sdaInfo.tematica || 'SdA_EF').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);

  const pagesHtml = sesiones.map((ses, idx) => 
    renderSessionSheetHtml(ses, sdaInfo, idx, sesiones.length)
  ).join('');

  container.innerHTML = `
    <style>
      @page {
        size: A4 portrait;
        margin: 4mm 6mm;
      }
      * {
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif !important;
      }
      .session-sheet-page {
        font-family: Arial, Helvetica, sans-serif !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .session-sheet-page:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    </style>
    ${pagesHtml}
  `;

  document.body.appendChild(container);

  const opt = {
    margin: [4, 6, 4, 6] as [number, number, number, number],
    filename: `Cuaderno_Pista_Todas_Sesiones_${cleanSdaTitle}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      logging: false,
      windowWidth: 710,
      scrollX: 0,
      scrollY: 0,
      letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
  };

  try {
    await html2pdf().set(opt).from(container).save();
  } finally {
    document.body.removeChild(container);
  }
}
