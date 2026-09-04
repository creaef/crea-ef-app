import React, { useState, useEffect } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';
import {
  Download,
  Copy,
  Printer,
  Save,
  Check,
  FileSpreadsheet,
  FileText,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  FileCheck,
  AlertCircle,
  RefreshCw,
  FolderOpen,
  Eye,
  X,
} from 'lucide-react';
import { SituacionAprendizaje, formatGameDescription, renderFormattedGameDescriptionHtml } from '../types';
import { CreaEfLogo, CREA_EF_LOGO_URL } from './CreaEfLogo';
import { renderOfficialDocumentHeaderHtml, getNormativaForEtapa } from '../utils/documentHeader';
import { METODOLOGIAS_ACTIVAS_EF, MODELOS_ESTRUCTURA_SESION } from '../data/methodologiesAndModels';

/**
 * Renderiza la descripción de un juego en componentes React
 * formateada en viñetas, secciones destacadas y texto justificado
 * para lectura escaneable a pie de pista.
 */
function renderFormattedGameDescriptionReact(text: string) {
  if (!text) return null;
  const formattedText = formatGameDescription(text);
  const lines = formattedText.split('\n');

  return (
    <div className="space-y-1 my-1 text-left">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header check: 1. ORGANIZACIÓN, 2. ROLES, 3. DESARROLLO, 4. VARIACIONES
        if (/^(1\.|2\.|3\.|4\.)\s*(ORGANIZACIÓN|ORGANIZACION|ROLES|DESARROLLO|VARIACIONES|Organización|Organizacion|Roles|Desarrollo|Variaciones)/i.test(trimmed)) {
          return (
            <div
              key={idx}
              className="font-extrabold text-indigo-950 text-xs mt-3 mb-1 pb-0.5 border-b border-indigo-200/80 flex items-center gap-1.5 text-left [hyphens:none]"
            >
              <span className="text-indigo-700 font-bold select-none">📌</span>
              <span className="font-extrabold">{trimmed}</span>
            </div>
          );
        }

        // Bullet check: starts with - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const content = trimmed.substring(2);
          const colonIdx = content.indexOf(':');

          if (colonIdx > 0 && colonIdx < 50) {
            const label = content.substring(0, colonIdx + 1);
            const value = content.substring(colonIdx + 1);
            return (
              <div key={idx} className="pl-3 text-slate-700 text-xs leading-relaxed text-justify flex items-start gap-1.5 my-0.5 font-normal [hyphens:none] [overflow-wrap:anywhere] [word-break:normal]">
                <span className="text-indigo-600 font-bold text-[10px] select-none mt-0.5">•</span>
                <span className="font-normal text-slate-700">
                  <strong className="font-bold text-slate-900">{label}</strong>
                  {value}
                </span>
              </div>
            );
          }

          return (
            <div key={idx} className="pl-3 text-slate-700 text-xs leading-relaxed text-justify flex items-start gap-1.5 my-0.5 font-normal [hyphens:none] [overflow-wrap:anywhere] [word-break:normal]">
              <span className="text-indigo-600 font-bold text-[10px] select-none mt-0.5">•</span>
              <span className="font-normal text-slate-700">{content}</span>
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={idx} className="text-slate-700 text-xs leading-relaxed text-justify my-0.5 font-normal [hyphens:none] [overflow-wrap:anywhere] [word-break:normal]">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
import {
  getCompetenciasByEtapa,
  getCriteriosByEtapa,
  getSaberesByEtapa,
  TODOS_LOS_CRITERIOS,
  TODOS_LOS_SABERES,
} from '../utils/curriculumHelpers';
import { SaberBasico } from '../types';

interface Step10Props {
  sda: SituacionAprendizaje;
  onSaveSdA: () => void;
  onPrev: () => void;
}

export const Step10Export: React.FC<Step10Props> = ({ sda, onSaveSdA, onPrev }) => {
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [creatingDoc, setCreatingDoc] = useState(false);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [errorDoc, setErrorDoc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vistaDocumento' | 'texto' | 'fichasSesion'>('vistaDocumento');

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'sda_completed', {
        etapa: sda.etapa,
        comunidad: sda.comunidad,
        curso: sda.curso,
        ciclo: sda.ciclo,
        tematica: sda.tematica
      });
    }
  }, []);

  // Obtener elementos curriculares autonómicos reales
  const competenciasEtapa = getCompetenciasByEtapa(sda.etapa, sda.comunidad);
  const criteriosEtapa = getCriteriosByEtapa(sda.etapa, sda.comunidad);
  const saberesEtapa = getSaberesByEtapa(sda.etapa, sda.comunidad);

  // Helper para obtener datos textuales literales de la metodología y del modelo según tarjetas de selección
  const getMetodologiaInfo = (nombreOrId: string) => {
    const found = METODOLOGIAS_ACTIVAS_EF.find((m) =>
      m.nombre.toLowerCase().includes((nombreOrId || '').toLowerCase()) ||
      (nombreOrId || '').toLowerCase().includes(m.nombre.toLowerCase()) ||
      m.id.toLowerCase().includes((nombreOrId || '').toLowerCase())
    );
    if (found) return found;
    return {
      nombre: nombreOrId || 'Metodología Activa de EF',
      descripcion: 'Uso de metodologías activas y vivenciales centradas en el juego motriz, la inclusión y la cooperación.',
      ejemploAplicacion: '',
    };
  };

  const getModeloInfo = (nombreOrId: string) => {
    const found = MODELOS_ESTRUCTURA_SESION.find((m) =>
      m.nombre.toLowerCase().includes((nombreOrId || '').toLowerCase()) ||
      (nombreOrId || '').toLowerCase().includes(m.nombre.toLowerCase()) ||
      m.id.toLowerCase().includes((nombreOrId || '').toLowerCase())
    );
    if (found) return found;
    return {
      nombre: nombreOrId || 'Estructura Cronométrica de Sesión (60 min)',
      enfoque: 'Organización pedagógica en calentamiento (10 min), parte principal (40 min) y vuelta a la calma con higiene (10 min).',
      fases: [],
    };
  };

  const metodologiaInfo = getMetodologiaInfo(sda.metodologiaActiva || '');
  const modeloInfo = getModeloInfo(sda.modeloEstructura || '');

  // Compute active curriculum elements for relational matrix
  const activeCompetenciasList = competenciasEtapa.filter((ce) =>
    sda.competenciasSeleccionadas.includes(ce.id) ||
    sda.criteriosSeleccionados.some((cod) => {
      const crit = criteriosEtapa.find((c) => c.codigo === cod || c.id === cod) ||
        TODOS_LOS_CRITERIOS.find((c) => c.codigo === cod || c.id === cod);
      return crit?.competenciaId === ce.id;
    })
  );

  const listToRenderCE = activeCompetenciasList.length > 0 ? activeCompetenciasList : competenciasEtapa;

  // Obtener saberes básicos desduplicados asociados a la competencia (sin repetir bloques A y B)
  const getSaberesForComp = (ceId: string): SaberBasico[] => {
    const bloqueMap: Record<string, string[]> = {
      'CE.EF.1': ['A'],
      'CE.EF.2': ['B', 'C'],
      'CE.EF.3': ['D'],
      'CE.EF.4': ['E'],
      'CE.EF.5': ['F'],
    };
    const targetBloques = bloqueMap[ceId] || ['A'];

    // 1. Buscar entre los saberes seleccionados por el usuario en el Paso 3
    const userSelectedMatching = sda.saberesSeleccionados
      .map((cod) => saberesEtapa.find((s) => s.codigo === cod) || TODOS_LOS_SABERES.find((s) => s.codigo === cod))
      .filter((s): s is SaberBasico => Boolean(s && (s.ciclo === sda.ciclo || s.ciclo === 'Todos') && targetBloques.includes(s.bloque)));

    let candidates: SaberBasico[] = userSelectedMatching;

    // 2. Si el usuario no seleccionó de este bloque, tomar los del ciclo de dicha comunidad
    if (candidates.length === 0) {
      candidates = saberesEtapa.filter(
        (s) => (s.ciclo === sda.ciclo || s.ciclo === 'Todos') && targetBloques.includes(s.bloque)
      );
    }

    // 3. Desduplicación estricta por descripción para asegurar que no haya bloques duplicados
    const seen = new Set<string>();
    const deduplicated: SaberBasico[] = [];
    for (const s of candidates) {
      const descKey = s.descripcion.trim().toLowerCase();
      if (!seen.has(descKey)) {
        seen.add(descKey);
        deduplicated.push(s);
      }
    }

    return deduplicated.length > 0 ? deduplicated : candidates.slice(0, 2);
  };

  // Format plain text export
  const getPlainText = (): string => {
    const lines: string[] = [];
    lines.push(`SITUACIÓN DE APRENDIZAJE: ${sda.titulo.toUpperCase()}`);
    lines.push(`Curso: ${sda.curso} (${sda.ciclo}) | Trimestre: ${sda.trimestre} | Nº Sesiones: ${sda.numSesiones}`);
    lines.push(`Temática: ${sda.tematica}\n`);

    lines.push(`1. JUSTIFICACIÓN`);
    lines.push(`${sda.justificacion}\n`);

    lines.push(`2. ELEMENTOS CURRICULARES (${getNormativaForEtapa(sda.etapa, sda.comunidad).split(' de ')[0]} ${sda.comunidad.toUpperCase()})`);
    lines.push(`Competencias Específicas: ${sda.competenciasSeleccionadas.join(', ')}`);
    lines.push(`Criterios de Evaluación: ${sda.criteriosSeleccionados.join(', ')}`);
    lines.push(`Saberes Básicos: ${sda.saberesSeleccionados.join(', ')}`);
    lines.push(`ODS: ${sda.odsSeleccionados.join(', ')}`);
    lines.push(`Descriptores Operativos: ${sda.descriptoresOperativos.join(', ')}\n`);

    lines.push(`3. METODOLOGÍA Y MODELOS DE ESTRUCTURA`);
    lines.push(`Metodología Activa: ${sda.metodologiaActiva}`);
    lines.push(`Modelo de Estructura: ${sda.modeloEstructura}\n`);

    lines.push(`4. DESARROLLO DE SESIONES (60 MINUTOS)`);
    sda.sesiones.forEach((ses, idx) => {
      lines.push(`\n--- Sesión ${idx + 1}: ${ses.titulo} ---`);
      lines.push(`Objetivo: ${ses.objetivoSesion || 'Desarrollo motriz'}`);
      lines.push(`Materiales: ${(ses.materialesTotales || []).join(', ')}`);
      (ses.fases || []).forEach((f) => {
        lines.push(`  * [${f.fase} - ${f.duracionMin} min] ${f.nombreJuego}`);
        lines.push(`    Descripción: ${formatGameDescription(f.descripcion)}`);
      });
    });

    lines.push(`\n5. PRODUCTO FINAL / RETO MOTOR`);
    lines.push(`${sda.productoFinal}\n`);

    lines.push(`6. ATENCIÓN A LA DIVERSIDAD (NEAE Y DUA)`);
    (sda.adaptacionesNEAE || []).forEach((a) => {
      lines.push(`* [${a.categoria}]: Materiales: ${a.materialesYEspacio} | Reglas: ${a.reglasYMetodologia}`);
    });
    (sda.pautasDUAGlobales || []).forEach((d: any) => {
      lines.push(`* ${typeof d === 'string' ? d : d.principio}`);
    });

    lines.push(`\n7. EVALUACIÓN FORMATIVA`);
    (sda.instrumentosEvaluacion || []).forEach((inst) => {
      lines.push(`* ${inst.tipo || inst.nombre}: ${inst.descripcion}`);
    });

    lines.push(`\n8. RECURSOS DIDÁCTICOS, INSTALACIONES Y MATERIALES`);
    lines.push(`* Instalaciones y Espacios: ${(sda.recursosEspaciales || []).join(' • ') || 'Pistas polideportivas y gimnasio cubierto'}`);
    lines.push(`* Materiales Escolares y Deportivos: ${(sda.recursosMateriales || []).join(' • ') || 'Material convencional y adaptado de EF'}`);
    lines.push(`* Recursos Didácticos y Curriculares: ${(sda.recursosCurriculares || []).join(' • ') || 'Tarjetas DUA y dianas de evaluación'}`);
    lines.push(`* Recursos Complementarios: ${(sda.recursosExternos || []).join(' • ') || 'Altavoz Bluetooth y cronómetro'}`);

    return lines.join('\n');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getPlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveLocally = () => {
    onSaveSdA();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // Clean up any html2canvas or print overlays to ensure buttons never stay blocked
  const cleanupHtml2CanvasArtifacts = () => {
    try {
      const overlays = document.querySelectorAll('.html2canvas-container, [class*="html2canvas"], iframe[id*="html2canvas"]');
      overlays.forEach((el) => el.remove());
    } catch (e) {
      console.warn('Cleanup error:', e);
    }
  };

  // Build visually rich HTML for Word (.doc) and PDF (.pdf) export
  const buildRichSdaExportHtml = (): string => {
    const matrixRows = listToRenderCE.map((comp) => {
      const criteriosDeEstaComp = criteriosEtapa.filter((c) => {
        if (c.competenciaId !== comp.id) return false;
        if (c.cursoRef && sda.curso) {
          if (c.cursoRef !== sda.curso) return false;
        } else if (c.ciclo !== sda.ciclo && c.ciclo !== 'Todos') {
          return false;
        }
        if (sda.criteriosSeleccionados.length > 0) {
          return sda.criteriosSeleccionados.includes(c.codigo) || sda.criteriosSeleccionados.includes(c.id);
        }
        return true;
      });
      const saberesDeEstaComp = getSaberesForComp(comp.id);

      const critHtml = criteriosDeEstaComp.length > 0
        ? `<ul style="margin: 0; padding-left: 14px; font-size: 10px; color: #1e293b; text-align: justify;">` +
          criteriosDeEstaComp.map((c) => `<li style="margin-bottom: 4px;"><strong style="color: #0284c7;">${c.codigo || c.id}:</strong> ${c.descripcion}</li>`).join('') +
          `</ul>`
        : `<p style="margin: 0; font-size: 10px; color: #64748b; font-style: italic; text-align: justify;">Criterios autonómicos de ${comp.id} (${sda.curso || sda.ciclo})</p>`;

      const sabHtml = `<ul style="margin: 0; padding-left: 14px; font-size: 10px; color: #1e293b; text-align: justify;">` +
        saberesDeEstaComp.map((s) => `<li style="margin-bottom: 4px;"><strong style="color: #0a2240;">Bloque ${s.bloque} (${s.bloqueNombre}):</strong> ${s.descripcion}</li>`).join('') +
        `</ul>`;

      return `
        <tr style="page-break-inside: avoid; break-inside: avoid;">
          <td style="padding: 10px; border: 1px solid #cbd5e1; vertical-align: top; background-color: #f8fafc; width: 33%; word-break: break-word; overflow-wrap: break-word; text-align: justify;">
            <strong style="color: #0a2240; font-size: 11px; display: block; margin-bottom: 4px;">${comp.id}: ${comp.nombre}</strong>
            <p style="margin: 0; font-size: 10px; color: #334155; line-height: 1.4; text-align: justify;">${comp.descripcion}</p>
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1; vertical-align: top; width: 33%; word-break: break-word; overflow-wrap: break-word; text-align: justify;">
            ${critHtml}
          </td>
          <td style="padding: 10px; border: 1px solid #cbd5e1; vertical-align: top; background-color: #f8fafc; width: 34%; word-break: break-word; overflow-wrap: break-word; text-align: justify;">
            ${sabHtml}
          </td>
        </tr>
      `;
    }).join('');

    const sessionsHtml = sda.sesiones.map((ses) => {
      const warmup = (ses.fases || []).filter((f) => f.fase.includes('Inicio') || f.fase.includes('Calentamiento'));
      const main = (ses.fases || []).filter((f) => f.fase.includes('Principal') || f.fase.includes('Práctica'));
      const cool = (ses.fases || []).filter((f) => f.fase.includes('Calma') || f.fase.includes('Reflexión') || f.fase.includes('Cierre'));
      const other = (ses.fases || []).filter((f) => 
        !f.fase.includes('Inicio') && !f.fase.includes('Calentamiento') &&
        !f.fase.includes('Principal') && !f.fase.includes('Práctica') &&
        !f.fase.includes('Calma') && !f.fase.includes('Reflexión') && !f.fase.includes('Cierre')
      );

      let warmupHtml = warmup.map((f) => `
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: bold; color: #0284c7; font-size: 11px;">Fase 1: Calentamiento / Inicio (${f.duracionMin} min)</span>
            <strong style="color: #0a2240; font-size: 11px;">${f.nombreJuego}</strong>
          </div>
          ${renderFormattedGameDescriptionHtml(f.descripcion)}
          ${f.esquemaGrafico ? `<p style="margin-top: 6px; font-size: 10px; color: #92400e; background: #fef3c7; padding: 6px 10px; border-radius: 4px; font-style: italic; text-align: justify;">🎨 <strong>Organización Espacial:</strong> ${f.esquemaGrafico}</p>` : ''}
        </div>
      `).join('');

      let mainHtml = '';
      if (main.length > 0) {
        mainHtml = `
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 800; color: #0a2240; font-size: 11px; border-bottom: 2px solid #e85d04; padding-bottom: 4px; margin-top: 6px; margin-bottom: 8px; text-transform: uppercase; page-break-after: avoid; break-after: avoid;">
              PARTE PRINCIPAL / PRÁCTICA (40 MIN) — ${main.length} ACTIVIDADES / JUEGOS CON ENFOQUE INCLUSIVO
            </div>
            ${main.map((f, mIdx) => `
              <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: bold; color: #e85d04; font-size: 11px;">Juego ${mIdx + 1} (${f.duracionMin} min)</span>
                  <strong style="color: #0a2240; font-size: 11px;">${f.nombreJuego}</strong>
                </div>
                ${renderFormattedGameDescriptionHtml(f.descripcion)}
                ${f.esquemaGrafico ? `<p style="margin-top: 6px; font-size: 10px; color: #334155; background: #f8fafc; padding: 6px 10px; border-radius: 4px; font-style: italic; text-align: justify;">🎨 <strong>Organización Espacial:</strong> ${f.esquemaGrafico}</p>` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }

      let coolHtml = cool.map((f) => `
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: bold; color: #047857; font-size: 11px;">Fase Final: Vuelta a la Calma / Reflexión (${f.duracionMin} min)</span>
            <strong style="color: #0a2240; font-size: 11px;">${f.nombreJuego}</strong>
          </div>
          ${renderFormattedGameDescriptionHtml(f.descripcion)}
        </div>
      `).join('');

      let otherHtml = other.map((f) => `
        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 8px; page-break-inside: avoid; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: bold; color: #0284c7; font-size: 11px;">${f.fase} (${f.duracionMin} min)</span>
            <strong style="color: #0a2240; font-size: 11px;">${f.nombreJuego}</strong>
          </div>
          ${renderFormattedGameDescriptionHtml(f.descripcion)}
        </div>
      `).join('');

      return `
        <div class="session-card" style="margin-bottom: 22px; border: 1.5px solid #0a2240; border-radius: 6px; overflow: hidden; page-break-inside: auto; break-inside: auto;">
          <!-- CABECERA Y FASE 1 INDIVISIBLES: SI NO CABEN AL FINAL DE PÁGINA SALTAN LIMPIAS A LA SIGUIENTE -->
          <div class="session-start-block" style="page-break-inside: avoid !important; break-inside: avoid !important;">
            <div style="background-color: #0a2240; color: #ffffff; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e85d04;">
              <span style="font-size: 11.5px; font-weight: 900; text-transform: uppercase;">
                SESIÓN ${ses.numeroSesion}: ${(ses.titulo || '').replace(/^Sesión\s*\d+:\s*/i, '').toUpperCase()} (60 MINUTOS)
              </span>
              <span style="font-size: 10px; color: #fef08a; font-weight: bold;">
                Materiales: ${(ses.materialesTotales || []).join(', ') || 'Habitual de EF'}
              </span>
            </div>
            ${ses.objetivoSesion ? `
              <div style="background-color: #1e293b; color: #ffffff; padding: 6px 12px; font-size: 10px; font-style: italic; text-align: justify;">
                <strong>Objetivo Pedagógico de Sesión:</strong> ${ses.objetivoSesion}
              </div>
            ` : ''}
            <div style="padding: 10px 10px 4px 10px; background-color: #ffffff;">
              ${warmupHtml}
            </div>
          </div>
          <div style="padding: 0 10px 10px 10px; background-color: #ffffff;">
            ${mainHtml}
            ${coolHtml}
            ${otherHtml}
          </div>
        </div>
      `;
    }).join('');

    const neaeTableRows = (sda.adaptacionesNEAE || []).map((a) => `
      <tr style="page-break-inside: avoid; break-inside: avoid;">
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; background-color: #fff1f2; font-weight: bold; color: #9f1239; font-size: 10.5px; width: 25%; vertical-align: top;">
          ${a.categoria}
        </td>
        <td colSpan="2" style="padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10px; color: #334155; text-align: justify; vertical-align: top;">
          <p style="margin: 0 0 3px 0;"><strong>Espacio y Materiales:</strong> ${a.materialesYEspacio}</p>
          <p style="margin: 0 0 3px 0;"><strong>Reglas y Metodología:</strong> ${a.reglasYMetodologia}</p>
          <p style="margin: 0;"><strong>Pautas Docente:</strong> ${a.pautasDocente}</p>
        </td>
      </tr>
    `).join('');

    const duaTableRows = (sda.pautasDUAGlobales || []).map((p: any, i: number) => `
      <tr style="page-break-inside: avoid; break-inside: avoid;">
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; background-color: #f0fdf4; font-weight: bold; color: #14532d; font-size: 10.5px; width: 25%; vertical-align: top;">
          ${typeof p === 'string' ? `Pauta DUA ${i + 1}` : p.principio}
        </td>
        <td colSpan="2" style="padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10px; color: #166534; text-align: justify; vertical-align: top;">
          ${typeof p !== 'string' && Array.isArray(p.pautas) ? `<ul style="margin: 0; padding-left: 14px;">${p.pautas.map((pt: string) => `<li style="margin-bottom: 2px;">${pt}</li>`).join('')}</ul>` : (typeof p === 'string' ? p : '')}
        </td>
      </tr>
    `).join('');

    const instTableRows = (sda.instrumentosEvaluacion || []).map((i) => `
      <tr style="page-break-inside: avoid; break-inside: avoid;">
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold; color: #0a2240; font-size: 10.5px; width: 28%; vertical-align: top;">
          ${i.tipo || i.nombre}
        </td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 10px; color: #334155; text-align: justify; vertical-align: top; width: 72%;">
          <p style="margin: 0 0 3px 0; font-weight: 500; color: #1e293b;">${i.descripcion}</p>
          <p style="margin: 0; color: #e85d04; font-weight: bold;"><strong>Aplicación Práctica:</strong> ${i.aplicacion}</p>
        </td>
      </tr>
    `).join('');

    const isThirdCycleOrHigher =
      (typeof sda.ciclo === 'string' && (sda.ciclo.toLowerCase().includes('tercer') || sda.ciclo.toLowerCase().includes('3º') || sda.ciclo.toLowerCase().includes('secundaria') || sda.ciclo.toLowerCase().includes('eso'))) ||
      (typeof sda.curso === 'string' && (sda.curso.includes('5º') || sda.curso.includes('6º') || sda.curso.toLowerCase().includes('eso') || sda.curso.toLowerCase().includes('secundaria')));

    const digitalCompetenceText = isThirdCycleOrHigher
      ? 'Registro audiovisual puntual en tabletas para análisis biomecánico, consulta de retos/pistas y formularios digitales de coevaluación (Google Forms, Kahoot).'
      : 'Pensamiento computacional desenchufado, orientación espacial mediante códigos de colores, cronometraje y señalizaciones acústicas analógicas dinamizadas por el docente.';

    const metodsList = (sda.metodologiaActiva || '').split(',').map((m: string) => m.trim()).filter(Boolean);
    const metodsJustifications = metodsList.map((mName: string) => {
      const found = METODOLOGIAS_ACTIVAS_EF.find((ma) => ma.nombre.toLowerCase().includes(mName.toLowerCase()) || mName.toLowerCase().includes(ma.nombre.toLowerCase()));
      if (found) {
        return `
          <div style="margin-bottom: 8px;">
            <strong style="color: #0a2240; font-size: 11px; display: block;">🎯 ${found.nombre}:</strong>
            <p style="margin: 2px 0 4px 0; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify;">${found.descripcion}</p>
            <p style="margin: 0; font-size: 9.5px; color: #b45309; font-style: italic; text-align: justify;"><strong>Aplicación en la SdA:</strong> ${found.ejemploAplicacion}</p>
          </div>
        `;
      }
      return `
        <div style="margin-bottom: 6px;">
          <strong style="color: #0a2240; font-size: 11px; display: block;">🎯 ${mName}:</strong>
          <p style="margin: 2px 0 0 0; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify;">Metodología activa orientada a potenciar la participación inclusiva, el compromiso motor y los valores de cooperación en las situaciones de aprendizaje de EF.</p>
        </div>
      `;
    }).join('');

    const modelFound = MODELOS_ESTRUCTURA_SESION.find((mod) => mod.nombre.toLowerCase().includes((sda.modeloEstructura || '').toLowerCase()) || (sda.modeloEstructura || '').toLowerCase().includes(mod.nombre.toLowerCase()));
    const modelJustification = modelFound
      ? `
        <strong style="color: #0a2240; font-size: 11px; display: block;">⏱️ ${modelFound.nombre} (60 min):</strong>
        <p style="margin: 2px 0 6px 0; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify;">${modelFound.enfoque}</p>
        <ul style="margin: 0; padding-left: 14px; font-size: 9.5px; color: #475569;">
          ${modelFound.fases.map((f: any) => `<li style="margin-bottom: 2px;"><strong>${f.nombre} (${f.duracionDefault || 10} min):</strong> ${f.descripcion}</li>`).join('')}
        </ul>
      `
      : `
        <strong style="color: #0a2240; font-size: 11px; display: block;">⏱️ ${sda.modeloEstructura || 'Estructura Cronométrica'}:</strong>
        <p style="margin: 2px 0 4px 0; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify;">Sesión de 60 minutos organizada pedagógicamente en 10 min de calentamiento y activación psicomotriz, 40 min de parte principal dividida en 4 situaciones de juego inclusivas, y 10 min finales de vuelta a la calma, reflexión metacognitiva y rutinas de higiene personal.</p>
      `;

    return `
      <div style="font-family: Arial, sans-serif; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; line-height: 1.5; padding: 20px; color: #1e293b; max-width: 850px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- MEMBRETE OFICIAL CON LOGOTIPO CREA-EF -->
        ${renderOfficialDocumentHeaderHtml('RESUMEN Y PROGRAMACIÓN SdA EF', sda.id || 'SDA-EF-2026', sda.etapa, sda.comunidad)}

        <!-- HERO BANNER EN TABLA COMPACTA -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; border: 2px solid #0a2240; background-color: #0a2240; color: #ffffff;">
          <tbody>
            <tr>
              <td style="padding: 18px 20px; text-align: left;">
                <span style="background-color: #e85d04; color: #ffffff; font-weight: 800; font-size: 10px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 8px;">
                  SITUACIÓN DE APRENDIZAJE ${(sda.etapa === 'Infantil' ? 'PSICOMOTRICIDAD' : 'EDUCACIÓN FÍSICA')} (${sda.comunidad.toUpperCase()} — ${getNormativaForEtapa(sda.etapa, sda.comunidad).split(' de ')[0]})
                </span>
                <h1 style="margin: 6px 0 10px 0; font-size: 20px; font-weight: 900; color: #ffffff; line-height: 1.3; text-align: left;">
                  ${sda.titulo || 'Sin Título'}
                </h1>
                <div style="font-size: 11px; color: #cbd5e1; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px; margin-top: 6px;">
                  <strong>Curso:</strong> ${sda.curso} (${sda.ciclo}) &nbsp;|&nbsp; 
                  <strong>Trimestre:</strong> ${sda.trimestre} &nbsp;|&nbsp; 
                  <strong style="color: #fef08a;">Nº Sesiones: ${sda.numSesiones} (60 min)</strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 1. JUSTIFICACIÓN Y TEMÁTICA -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  1. JUSTIFICACIÓN Y TEMÁTICA DE LA SdA
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 14px; font-size: 11px; color: #1e293b; text-align: justify; line-height: 1.6;">
                  <p style="margin: 0 0 8px 0; font-weight: bold; color: #0a2240; font-size: 11px; text-align: justify;">
                    <span style="background-color: #e85d04; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase; font-weight: 800; margin-right: 6px;">Temática Motriz</span> ${sda.tematica || 'No especificada'}
                  </p>
                  <div style="border-top: 1px solid #cbd5e1; padding-top: 8px; text-align: justify;">
                    ${sda.justificacion || 'Sin justificación.'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. ELEMENTOS CURRICULARES Y MATRIZ LOMLOE -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; border: 1.5px solid #0a2240; font-size: 10.5px;">
          <thead>
            <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
              <th colSpan={3} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                2. ELEMENTOS CURRICULARES Y MATRIZ DE RELACIÓN LOMLOE (${getNormativaForEtapa(sda.etapa, sda.comunidad).split(' de ')[0]})
              </th>
            </tr>
            <tr style="background-color: #1e293b; color: #ffffff; text-align: left; page-break-after: avoid; break-after: avoid;">
              <th style="padding: 8px 10px; width: 33%; font-weight: bold; border: 1px solid #475569;">Competencias Específicas</th>
              <th style="padding: 8px 10px; width: 33%; font-weight: bold; border: 1px solid #475569;">Criterios de Evaluación</th>
              <th style="padding: 8px 10px; width: 34%; font-weight: bold; border: 1px solid #475569;">Saberes Básicos</th>
            </tr>
          </thead>
          <tbody>
            ${matrixRows}
          </tbody>
        </table>

        <!-- 3. METODOLOGÍA Y MODELOS PEDAGÓGICOS -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th colSpan={2} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  3. METODOLOGÍA Y MODELOS PEDAGÓGICOS (JUSTIFICACIÓN Y ESTRUCTURA)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 12px 14px; border: 1px solid #cbd5e1; width: 50%; vertical-align: top; text-align: justify;">
                  <span style="color: #e85d04; font-weight: 800; font-size: 9.5px; text-transform: uppercase; display: block; margin-bottom: 6px;">FUNDAMENTACIÓN METODOLÓGICA</span>
                  ${metodsJustifications || '<p style="margin: 0; font-size: 10px; color: #334155;">Metodología activa y vivencial orientada al juego inclusivo.</p>'}
                </td>
                <td style="padding: 12px 14px; border: 1px solid #cbd5e1; width: 50%; vertical-align: top; text-align: justify;">
                  <span style="color: #e85d04; font-weight: 800; font-size: 9.5px; text-transform: uppercase; display: block; margin-bottom: 6px;">MODELO CRONOMÉTRICO DE SESIÓN (60 MIN)</span>
                  ${modelJustification}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. DESARROLLO DE SESIONES -->
        <div style="margin-bottom: 22px;">
          <h2 style="text-align: left; color: #0a2240; font-size: 14px; font-weight: 900; border-bottom: 2.5px solid #e85d04; padding-bottom: 4px; margin-bottom: 14px; text-transform: uppercase; page-break-after: avoid; break-after: avoid;">
            4. DESARROLLO DE LAS SESIONES DE TRABAJO (60 MINUTOS)
          </h2>
          ${sessionsHtml}
        </div>

        <!-- 5. PRODUCTO FINAL Y RETO MOTOR -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  5. PRODUCTO FINAL Y RETO MOTOR COLECTIVO
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #eef2ff;">
                <td style="padding: 14px; font-size: 11px; color: #1e1b4b; line-height: 1.6; text-align: justify; border: 1px solid #c7d2fe;">
                  ${sda.productoFinal || 'Sin definir.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 6. ATENCIÓN A LA DIVERSIDAD -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th colSpan={3} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  6. ATENCIÓN A LA DIVERSIDAD (MARCO DUA Y ADAPTACIONES NEAE)
                </th>
              </tr>
            </thead>
            <tbody>
              ${neaeTableRows ? `
                <tr style="background-color: #9f1239; color: #ffffff;">
                  <td colSpan={3} style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase;">
                    ADAPTACIONES NEAE POR CASUÍSTICA ESPECÍFICA
                  </td>
                </tr>
                ${neaeTableRows}
              ` : ''}
              ${duaTableRows ? `
                <tr style="background-color: #047857; color: #ffffff;">
                  <td colSpan={3} style="padding: 8px 12px; font-weight: bold; font-size: 11px; text-transform: uppercase;">
                    PAUTAS UNIVERSALES DUA (DISEÑO UNIVERSAL PARA EL APRENDIZAJE)
                  </td>
                </tr>
                ${duaTableRows}
              ` : ''}
            </tbody>
          </table>
        </div>

        <!-- 7. EVALUACIÓN INICIAL Y DIAGNÓSTICA (TABLA SEPARADA DE 1 COLUMNA) -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 18px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  7. EVALUACIÓN INICIAL Y DIAGNÓSTICA
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 12px; font-size: 11px; border: 1px solid #cbd5e1; text-align: justify; width: 100%;">
                  <p style="margin: 0; color: #334155; text-align: justify; line-height: 1.6; width: 100%;">${sda.evaluacionInicial || 'Diagnóstica inicial de capacidades motrices, actitudinales y nivel competencial de partida.'}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 7.2 HERRAMIENTAS E INSTRUMENTOS DE EVALUACIÓN (TABLA SEPARADA DE 2 COLUMNAS) -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th colSpan={2} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  HERRAMIENTAS E INSTRUMENTOS DE EVALUACIÓN Y FORMATIVOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #1e293b; color: #ffffff;">
                <th style="padding: 8px 10px; width: 28%; text-align: left; font-size: 10.5px;">Herramienta / Instrumento</th>
                <th style="padding: 8px 10px; width: 72%; text-align: left; font-size: 10.5px;">Criterios de Evaluación, Descripción y Aplicación Práctica</th>
              </tr>
              ${instTableRows || `
                <tr>
                  <td colSpan={2} style="padding: 10px; font-size: 10.5px; text-align: center; color: #64748b; border: 1px solid #cbd5e1;">No se han registrado instrumentos específicos para esta SdA.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <!-- 8. CONEXIONES INTERDISCIPLINARES -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 22px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff; page-break-after: avoid; break-after: avoid;">
                <th colSpan={2} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  8. CONEXIONES INTERDISCIPLINARES (VINCULACIÓN OTRAS ÁREAS)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 25%; font-weight: bold; color: #0a2240; font-size: 10.5px; vertical-align: top;">🔢 Matemáticas</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 75%; font-size: 10.5px; color: #334155; text-align: justify;">Conteo de puntos, cálculo de distancias y tiempos, orientación geométrica en el espacio de juego y registro estadístico.</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 25%; font-weight: bold; color: #0a2240; font-size: 10.5px; vertical-align: top;">📚 Lengua Castellana</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 75%; font-size: 10.5px; color: #334155; text-align: justify;">Comprensión de reglamentos, vocabulario motriz específico, expresión oral en asambleas reflexivas y coevaluación dialogada.</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 25%; font-weight: bold; color: #047857; font-size: 10.5px; vertical-align: top;">🌱 Conocimiento del Medio</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 75%; font-size: 10.5px; color: #334155; text-align: justify;">Reconocimiento de frecuencia cardíaca/respiratoria, higiene corporal, educación para la salud, nutrición activa y respeto al entorno.</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 25%; font-weight: bold; color: #b45309; font-size: 10.5px; vertical-align: top;">🎨 Educación Artística</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 75%; font-size: 10.5px; color: #334155; text-align: justify;">Expresión corporal, ritmo, acompañamiento musical, coordinación colectiva y diseño de tarjetas o insignias.</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 25%; font-weight: bold; color: #6b21a8; font-size: 10.5px; vertical-align: top;">📱 Competencia Digital</td>
                <td style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 75%; font-size: 10.5px; color: #334155; text-align: justify;">${digitalCompetenceText}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 9. RECURSOS DIDÁCTICOS, INSTALACIONES Y MATERIALES -->
        <div class="section-container" style="page-break-inside: avoid !important; break-inside: avoid !important; margin-bottom: 0px;">
          <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0a2240;">
            <thead>
              <tr style="background-color: #0a2240; color: #ffffff;">
                <th colSpan={2} style="padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 900; text-transform: uppercase; border-bottom: 2px solid #e85d04;">
                  9. RECURSOS DIDÁCTICOS, INSTALACIONES Y MATERIALES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 30%; font-weight: bold; color: #0a2240; font-size: 10.5px; vertical-align: top;">
                  🏟️ Instalaciones y Espacios:
                </td>
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 70%; font-size: 10.5px; color: #334155; text-align: justify;">
                  ${(sda.recursosEspaciales && sda.recursosEspaciales.length > 0) ? sda.recursosEspaciales.join(' • ') : 'Pista polideportiva exterior del centro, pabellón cubierto / gimnasio escolar y zonas delimitadas seguras.'}
                </td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 30%; font-weight: bold; color: #0a2240; font-size: 10.5px; vertical-align: top;">
                  ⚽ Materiales Escolares y Deportivos:
                </td>
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 70%; font-size: 10.5px; color: #334155; text-align: justify;">
                  ${(sda.recursosMateriales && sda.recursosMateriales.length > 0) ? sda.recursosMateriales.join(' • ') : 'Balones de gomaespuma, petos de colores, aros, picas, conos delimitadores, colchonetas y material alternativo.'}
                </td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 30%; font-weight: bold; color: #047857; font-size: 10.5px; vertical-align: top;">
                  📋 Recursos Didácticos y Curriculares:
                </td>
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 70%; font-size: 10.5px; color: #334155; text-align: justify;">
                  ${(sda.recursosCurriculares && sda.recursosCurriculares.length > 0) ? sda.recursosCurriculares.join(' • ') : 'Tarjetas visuales DUA de apoyo a las reglas, dianas de autoevaluación motriz y fichas de registro cooperativo.'}
                </td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 30%; font-weight: bold; color: #6b21a8; font-size: 10.5px; vertical-align: top;">
                  🎵 Recursos Complementarios:
                </td>
                <td style="padding: 10px 12px; border: 1px solid #cbd5e1; width: 70%; font-size: 10.5px; color: #334155; text-align: justify;">
                  ${(sda.recursosExternos && sda.recursosExternos.length > 0) ? sda.recursosExternos.join(' • ') : (isThirdCycleOrHigher ? 'Tabletas para consulta puntual de retos y altavoz Bluetooth portátil.' : 'Altavoz Bluetooth portátil para ambientación musical y cronómetro analógico del docente.')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    `;
  };

  // Direct PDF Download handler that triggers direct file save
  const handlePrintPDF = async () => {
    if (downloadingPdf) return;
    setDownloadingPdf(true);
    setErrorDoc(null);

    try {
      cleanupHtml2CanvasArtifacts();
      const richHtml = buildRichSdaExportHtml();
      const container = document.createElement('div');
      container.innerHTML = richHtml;
      container.style.width = '100%';
      container.style.maxWidth = '190mm';
      container.style.boxSizing = 'border-box';
      container.style.background = '#ffffff';
      container.style.color = '#1e293b';

      const opt = {
        margin: [8, 8, 8, 8] as [number, number, number, number],
        filename: `Resumen_SdA_${(sda.titulo || 'Educacion_Fisica').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.session-start-block', '.section-container', '.avoid-break', 'tr'] }
      };

      await html2pdf().set(opt).from(container).save();
    } catch (err: any) {
      console.warn('Direct PDF download error, falling back to print dialog:', err);
      try {
        window.print();
      } catch (e) {
        setErrorDoc('No se pudo descargar o abrir el cuadro del PDF.');
      }
    } finally {
      cleanupHtml2CanvasArtifacts();
      setDownloadingPdf(false);
    }
  };

  // Open in Google Docs & Create Document directly in Drive
  const handleCreateGoogleDoc = async () => {
    setCreatingDoc(true);
    setErrorDoc(null);

    try {
      const token = localStorage.getItem('sda_drive_access_token') || localStorage.getItem('google_access_token') || sessionStorage.getItem('google_access_token');

      if (!token) {
        // If no token, offer direct Word download which can be uploaded/opened directly in Google Docs
        setErrorDoc('No se detectó sesión activa de Google Drive. Puedes autorizar Drive en el Paso 5 o descargar el archivo Word (.doc) que se abre perfectamente en Google Docs.');
        handleDownloadWord();
        setCreatingDoc(false);
        return;
      }

      const res = await fetch('/api/docs/create-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token, sda }),
      });

      const data = await res.json();
      if (res.ok && (data.docUrl || data.documentUrl)) {
        const targetUrl = data.docUrl || data.documentUrl;
        setDocUrl(targetUrl);
        window.open(targetUrl, '_blank');
      } else {
        setErrorDoc(data.error || 'No se pudo crear el documento directamente en Google Drive. Se iniciará la descarga en Word.');
        handleDownloadWord();
      }
    } catch (err: any) {
      console.error('Error creating Google Doc:', err);
      setErrorDoc(err.message || 'Error al conectar con la API de Google Docs. Descargando en formato Word.');
      handleDownloadWord();
    } finally {
      setCreatingDoc(false);
    }
  };

  const handleDownloadWord = () => {
    const richHtml = buildRichSdaExportHtml();

    const fullWordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${sda.titulo || 'Situacion_de_Aprendizaje'}</title>
        <style>
          @page { size: A4 portrait; margin: 1.5cm; }
          body { font-family: Arial, sans-serif; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; line-height: 1.5; padding: 20px; color: #1e293b; background-color: #ffffff; }
          h1 { color: #ffffff; font-size: 20pt; font-weight: bold; text-align: left; }
          h2 { color: #2C3E50; font-size: 15pt; font-weight: bold; border-bottom: 2pt solid #4338ca; padding-bottom: 4pt; margin-top: 18pt; margin-bottom: 10pt; text-transform: uppercase; text-align: left; }
          h3 { color: #312e81; font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; text-align: left; }
          p, div, li { font-size: 10.5pt; color: #334155; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; }
          table { width: 100%; border-collapse: collapse; margin-top: 10pt; margin-bottom: 10pt; }
          th, td { border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: left; font-size: 10pt; }
          th { font-weight: bold; }
        </style>
      </head>
      <body>
        ${richHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullWordHtml], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SdA_${(sda.titulo || 'Educacion_Fisica').replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="step10-container" className="space-y-6">
      {/* Printable CSS override for clean PDF printing */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 10mm 12mm 10mm;
          }
          body * {
            visibility: hidden !important;
          }
          #sda-printable-content, #sda-printable-content * {
            visibility: visible !important;
          }
          #sda-printable-content {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 10px !important;
            color: #0f172a !important;
            background: #ffffff !important;
          }
          table, tr, td, th, div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          h1, h2, h3, h4, th {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4 no-print border border-indigo-700/40">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Download className="w-7 h-7 text-amber-400" />
            <h2 className="text-xl font-bold">Paso 10: Resumen SdA</h2>
          </div>
          <p className="text-indigo-100 text-sm max-w-2xl">
            Documento completo y estructurado listo para abrir en Google Docs, descargar en PDF o copiar el texto completo.
          </p>
        </div>

        {/* ACTION CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Abrir en Google Docs */}
          <button
            type="button"
            id="btn-open-google-docs"
            onClick={handleCreateGoogleDoc}
            disabled={creatingDoc}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-md border border-blue-400 disabled:opacity-50"
          >
            {creatingDoc ? (
              <RefreshCw className="w-4 h-4 text-white animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4 text-white" />
            )}
            <span>Abrir en Google Docs</span>
          </button>

          {/* Copiar Texto */}
          <button
            type="button"
            id="btn-copy-text"
            onClick={handleCopyText}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition shadow"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-indigo-800" />}
            <span>{copied ? '¡Texto Copiado!' : 'Copiar texto'}</span>
          </button>

          {/* Descargar Word */}
          <button
            type="button"
            id="btn-download-word"
            onClick={handleDownloadWord}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs transition shadow border border-indigo-600"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300" />
            <span>Descargar Word (.doc)</span>
          </button>

          {/* Descargar PDF */}
          <button
            type="button"
            id="btn-print-pdf"
            onClick={handlePrintPDF}
            disabled={downloadingPdf}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition shadow border border-amber-300 disabled:opacity-50"
          >
            {downloadingPdf ? (
              <RefreshCw className="w-4 h-4 text-slate-950 animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-slate-950" />
            )}
            <span>{downloadingPdf ? 'Abriendo PDF...' : 'Descargar PDF'}</span>
          </button>

          {/* Guardar SdA local */}
          <button
            type="button"
            id="btn-save-sda-local"
            onClick={handleSaveLocally}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-950 hover:bg-black text-white font-bold text-xs transition shadow border border-indigo-800"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4 text-amber-300" />}
            <span>{savedSuccess ? '¡Guardada!' : 'Guardar SdA'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 text-xs flex items-center space-x-2.5 no-print shadow-xs animate-fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-bold">
            ¡Situación de Aprendizaje guardada con éxito en la memoria del navegador! Puedes volver a cargarla o revisarla en cualquier momento desde el menú.
          </span>
        </div>
      )}

      {errorDoc && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center space-x-2 no-print">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorDoc}</span>
        </div>
      )}

      {docUrl && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-950 text-xs flex flex-wrap items-center justify-between gap-3 no-print shadow-xs">
          <div className="flex items-center space-x-2.5">
            <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">
                ¡Documento para Google Docs preparado!
              </p>
              <p className="text-[11px] text-slate-600">
                El documento se ha abierto en una nueva pestaña o se ha generado el archivo compatible para tu Google Drive.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 no-print">
        <button
          type="button"
          id="tab-vista-documento"
          onClick={() => setActiveTab('vistaDocumento')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center space-x-2 ${
            activeTab === 'vistaDocumento'
              ? 'bg-indigo-900 text-white shadow-md ring-2 ring-indigo-400'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Vista Documento Consolidado</span>
        </button>

        <button
          type="button"
          id="tab-fichas-sesion"
          onClick={() => setActiveTab('fichasSesion')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center space-x-2 ${
            activeTab === 'fichasSesion'
              ? 'bg-indigo-900 text-white shadow-md ring-2 ring-indigo-400'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Fichas por Sesión</span>
        </button>

        <button
          type="button"
          id="tab-texto-plano"
          onClick={() => setActiveTab('texto')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center space-x-2 ${
            activeTab === 'texto'
              ? 'bg-indigo-900 text-white shadow-md ring-2 ring-indigo-400'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Texto Plano Exportable</span>
        </button>
      </div>

      {/* TAB 1: Document View (Maintained in DOM so exports always find it) */}
      <div
        id="sda-printable-content"
        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-8 max-w-5xl mx-auto text-slate-800 font-sans"
        style={{
          display: activeTab === 'vistaDocumento' ? 'block' : 'none',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'justify',
          hyphens: 'none',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: 1.5,
          padding: '20px',
        }}
      >
          {/* Official Letterhead / Membrete Corporativo */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b-4 border-slate-900 mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-1 bg-white border border-slate-200 rounded-2xl shadow-xs shrink-0">
                <CreaEfLogo className="w-16 h-16" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                  <span className="text-orange-500">Crea-</span>
                  <span className="text-sky-500">Ef</span>
                </h1>
                <p className="text-xs font-bold text-slate-700 mt-1">
                  Diseña y personaliza tus Situaciones de Aprendizaje de EF
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  Programación LOMLOE • {getNormativaForEtapa(sda.etapa, sda.comunidad)}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-0.5">
              <div className="font-extrabold text-slate-900 text-xs">DOCUMENTO OFICIAL DE PROGRAMACIÓN</div>
              <div>Fecha: {new Date().toLocaleDateString('es-ES')}</div>
              <div className="font-mono text-[10px] text-slate-400">ID: {sda.id || 'SDA-EF-2026'}</div>
            </div>
          </div>

          {/* Header metadata */}
          <div className="border-b-2 border-indigo-900 pb-4">
            <h2 className="text-2xl font-extrabold text-indigo-950 tracking-tight">
              TÍTULO DE LA SITUACIÓN DE APRENDIZAJE: {sda.titulo || 'Sin Título'}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm font-semibold text-slate-700">
              <span className="bg-indigo-100 text-indigo-950 px-3 py-1 rounded-lg">
                <strong>Curso:</strong> {sda.curso}
              </span>
              <span className="bg-indigo-50 text-indigo-900 px-3 py-1 rounded-lg border border-indigo-200">
                <strong>Ciclo:</strong> {sda.ciclo}
              </span>
              <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg">
                <strong>Trimestre:</strong> {sda.trimestre}
              </span>
              <span className="bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg shadow-2xs">
                <strong>Nº de Sesiones:</strong> {sda.numSesiones} (60 min)
              </span>
            </div>
          </div>

          {/* 1. Justificación */}
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              1. Justificación y Temática
            </h3>
            <p className="text-xs font-bold text-indigo-950">
              <strong>Temática(s) Seleccionada(s):</strong> {sda.tematica || 'No especificada'}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
              {sda.justificacion || 'Sin justificación.'}
            </p>
          </section>

          {/* 2. Elementos Curriculares y Matriz de Relación */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1 flex items-center justify-between">
              <span>2. Elementos Curriculares y Matriz de Relación ({sda.comunidad} - {getNormativaForEtapa(sda.etapa, sda.comunidad).split(' de ')[0]})</span>
              <span className="text-xs bg-purple-100 text-purple-900 font-extrabold px-2.5 py-0.5 rounded-full">
                Matriz LOMLOE
              </span>
            </h3>

            {/* Cuadro de Relación de Competencias Clave, Competencias Específicas, Criterios y Saberes Básicos */}
            <div className="overflow-x-auto rounded-xl border-2 border-purple-400/80 shadow-xs bg-white">
              <table className="w-full text-xs border-collapse">
                <thead>
                  {/* Fila 1: Competencias Claves */}
                  <tr className="border-b-2 border-purple-400">
                    <th className="bg-purple-600 text-white font-extrabold p-3 text-left w-1/4 border-r border-purple-400 text-xs sm:text-sm tracking-wide">
                      Competencias Claves:
                    </th>
                    <th colSpan={2} className="bg-purple-100/90 text-purple-950 font-bold p-3 text-left text-xs leading-relaxed">
                      Competencia Personal, Social y de Aprender a Aprender (CPSAA), Competencia Ciudadana (CC), Competencia Emprendedora (CE), Competencia en Comunicación Lingüística (CCL), Competencia STEM
                    </th>
                  </tr>
                  {/* Fila 2: Cabecera 3 Columnas */}
                  <tr className="bg-purple-600 text-white font-extrabold border-b border-purple-400 text-xs sm:text-sm">
                    <th className="p-3 text-center border-r border-purple-400 w-1/3">
                      Competencias Específicas
                    </th>
                    <th className="p-3 text-center border-r border-purple-400 w-1/3">
                      Criterios de Evaluación
                    </th>
                    <th className="p-3 text-center w-1/3">
                      Saberes Básicos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-200">
                  {listToRenderCE.map((comp) => {
                    const criteriosDeEstaComp = criteriosEtapa.filter((c) => {
                      if (c.competenciaId !== comp.id) return false;
                      if (c.cursoRef && sda.curso) {
                        if (c.cursoRef !== sda.curso) return false;
                      } else if (c.ciclo !== sda.ciclo && c.ciclo !== 'Todos') {
                        return false;
                      }
                      if (sda.criteriosSeleccionados.length > 0) {
                        return sda.criteriosSeleccionados.includes(c.codigo) || sda.criteriosSeleccionados.includes(c.id);
                      }
                      return true;
                    });

                    const saberesDeEstaComp = getSaberesForComp(comp.id);

                    return (
                      <tr key={comp.id} className="hover:bg-purple-50/40 transition">
                        <td className="p-3.5 border-r border-purple-200 align-top bg-purple-50/20 space-y-1">
                          <span className="font-extrabold text-purple-950 block text-xs">
                            {comp.id}: {comp.nombre}
                          </span>
                          <p className="text-[11px] text-slate-700 leading-relaxed">{comp.descripcion}</p>
                        </td>
                        <td className="p-3.5 border-r border-purple-200 align-top">
                          {criteriosDeEstaComp.length > 0 ? (
                            <ul className="space-y-2 list-disc pl-4 text-[11px] text-slate-800">
                              {criteriosDeEstaComp.map((crit, cIdx) => (
                                <li key={cIdx} className="leading-snug">
                                  <strong className="text-purple-950 font-bold">{crit.codigo || crit.id}:</strong> {crit.descripcion}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">Criterios autonómicos de {comp.id} ({sda.curso || sda.ciclo})</p>
                          )}
                        </td>
                        <td className="p-3.5 align-top bg-slate-50/50">
                          <ul className="space-y-2 list-disc pl-4 text-[11px] text-slate-800">
                            {saberesDeEstaComp.map((sab, sIdx) => (
                              <li key={sIdx} className="leading-snug">
                                <strong className="text-indigo-950 font-bold">Bloque {sab.bloque} ({sab.bloqueNombre}):</strong> {sab.descripcion}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Metodología y Modelos Pedagógicos con Textos Explicativos Literales */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1 flex items-center justify-between">
              <span>3. Metodología y Modelos Pedagógicos</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full">
                Fundamentación Didáctica
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Metodologías Activas */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="text-[11px] font-extrabold text-orange-600 uppercase tracking-wide block">
                  🎯 Fundamentación Metodológica
                </span>
                {(() => {
                  const mList = (sda.metodologiaActiva || '').split(',').map((m: string) => m.trim()).filter(Boolean);
                  if (mList.length === 0) {
                    return <p className="text-xs text-slate-600">Metodología activa y vivencial basada en el juego motor inclusivo.</p>;
                  }
                  return mList.map((mName: string, mIdx: number) => {
                    const found = METODOLOGIAS_ACTIVAS_EF.find(
                      (ma) => ma.nombre.toLowerCase().includes(mName.toLowerCase()) || mName.toLowerCase().includes(ma.nombre.toLowerCase())
                    );
                    return (
                      <div key={mIdx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                        <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm">
                          {found ? found.nombre : mName}
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed text-justify">
                          {found ? found.descripcion : 'Metodología activa orientada a potenciar la autonomía, la inclusión y la cooperación en situaciones motrices.'}
                        </p>
                        {found?.ejemploAplicacion && (
                          <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/60 leading-snug">
                            <strong>Aplicación en la SdA:</strong> {found.ejemploAplicacion}
                          </p>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Modelo de Estructuración de Sesión */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wide block">
                  ⏱️ Estructuración de Sesión (60 Minutos)
                </span>
                {(() => {
                  const modFound = MODELOS_ESTRUCTURA_SESION.find(
                    (m) => m.nombre.toLowerCase().includes((sda.modeloEstructura || '').toLowerCase()) ||
                           (sda.modeloEstructura || '').toLowerCase().includes(m.nombre.toLowerCase())
                  );
                  if (!modFound) {
                    return (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 shadow-2xs">
                        <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm">
                          {sda.modeloEstructura || 'Estructura Cronométrica Estándar'}
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed text-justify">
                          Organización pedagógica en 10 min de calentamiento y activación psicomotriz, 40 min de parte principal con juegos inclusivos y 10 min de vuelta a la calma con reflexión e higiene.
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 shadow-2xs">
                      <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm">
                        {modFound.nombre}
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed text-justify">
                        {modFound.enfoque}
                      </p>
                      <div className="space-y-1 pt-1 border-t border-slate-100">
                        {modFound.fases.map((f: any, fIdx: number) => (
                          <div key={fIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="font-bold text-indigo-900 shrink-0">• {f.nombre} ({f.duracionDefault || 10} min):</span>
                            <span>{f.descripcion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>

          {/* 4. Desarrollo de Sesiones */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              4. Desarrollo de las Sesiones de Trabajo (60 min)
            </h3>

            <div className="space-y-4">
              {sda.sesiones.map((ses) => (
                <div key={ses.numeroSesion} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-indigo-950 text-sm">
                      Sesión {ses.numeroSesion}: {ses.titulo} (60 min)
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Materiales: {ses.materialesTotales?.join(', ') || 'Habitual de EF'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    {(() => {
                      const warmup = (ses.fases || []).filter((f) => f.fase.includes('Inicio') || f.fase.includes('Calentamiento'));
                      const main = (ses.fases || []).filter((f) => f.fase.includes('Principal') || f.fase.includes('Práctica'));
                      const cool = (ses.fases || []).filter((f) => f.fase.includes('Calma') || f.fase.includes('Reflexión') || f.fase.includes('Cierre'));
                      const other = (ses.fases || []).filter((f) => 
                        !f.fase.includes('Inicio') && !f.fase.includes('Calentamiento') &&
                        !f.fase.includes('Principal') && !f.fase.includes('Práctica') &&
                        !f.fase.includes('Calma') && !f.fase.includes('Reflexión') && !f.fase.includes('Cierre')
                      );

                      return (
                        <>
                          {/* Calentamiento */}
                          {warmup.map((f, fIdx) => (
                            <div key={`w-${fIdx}`} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-indigo-900 text-[11px]">
                                  Fase 1: Calentamiento / Inicio ({f.duracionMin} min)
                                </span>
                                <span className="font-extrabold text-slate-900 text-xs">{f.nombreJuego}</span>
                              </div>
                              {renderFormattedGameDescriptionReact(f.descripcion)}
                              {f.esquemaGrafico && (
                                <p className="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200 mt-1 italic">
                                  🎨 <strong>Organización Espacial:</strong> {f.esquemaGrafico}
                                </p>
                              )}
                            </div>
                          ))}

                          {/* Parte Principal Agrupada */}
                          {main.length > 0 && (
                            <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-200 space-y-2">
                              <div className="font-extrabold text-indigo-950 text-xs border-b border-indigo-200 pb-1 flex items-center justify-between">
                                <span>PARTE PRINCIPAL / PRÁCTICA (40 min)</span>
                                <span className="text-[11px] font-bold text-indigo-700">{main.length} Actividades</span>
                              </div>
                              {main.map((f, mIdx) => (
                                <div key={`m-${mIdx}`} className="bg-white p-2.5 rounded-lg border border-indigo-100 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-indigo-900 text-[11px]">
                                      Juego {mIdx + 1} ({f.duracionMin} min)
                                    </span>
                                    <span className="font-extrabold text-slate-900 text-xs">{f.nombreJuego}</span>
                                  </div>
                                  {renderFormattedGameDescriptionReact(f.descripcion)}
                                  {f.esquemaGrafico && (
                                    <p className="text-[11px] text-slate-600 bg-slate-50 p-1 rounded mt-0.5 italic">
                                      🎨 <strong>Organización Espacial:</strong> {f.esquemaGrafico}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Vuelta a la calma */}
                          {cool.map((f, fIdx) => (
                            <div key={`c-${fIdx}`} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-indigo-900 text-[11px]">
                                  Fase Final: Vuelta a la Calma ({f.duracionMin} min)
                                </span>
                                <span className="font-extrabold text-slate-900 text-xs">{f.nombreJuego}</span>
                              </div>
                              {renderFormattedGameDescriptionReact(f.descripcion)}
                            </div>
                          ))}

                          {other.map((f, oIdx) => (
                            <div key={`o-${oIdx}`} className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-indigo-900 text-[11px]">{f.fase} ({f.duracionMin} min)</span>
                                <span className="font-extrabold text-slate-900 text-xs">{f.nombreJuego}</span>
                              </div>
                              {renderFormattedGameDescriptionReact(f.descripcion)}
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Producto Final */}
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              5. Producto Final / Reto
            </h3>
            <p className="text-xs text-slate-800 bg-indigo-50/80 p-4 rounded-xl border border-indigo-200 leading-relaxed">
              {sda.productoFinal || 'Sin definir.'}
            </p>
          </section>

          {/* 6. Diversidad */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              6. Atención a la Diversidad (Marco DUA y Adaptaciones NEAE)
            </h3>
            <div className="text-xs space-y-2">
              <h4 className="font-bold text-slate-900">Adaptaciones NEAE por Casuística:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(sda.adaptacionesNEAE || []).map((a, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-indigo-900 text-[11px]">NEAE: {a.categoria}</span>
                    <p className="text-[11px] text-slate-600">
                      <strong>Materiales y Espacio:</strong> {a.materialesYEspacio}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      <strong>Reglas:</strong> {a.reglasYMetodologia}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      <strong>Pautas Docente:</strong> {a.pautasDocente}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs space-y-1 pt-2">
              <h4 className="font-bold text-slate-900">Pautas Universales DUA:</h4>
              {(sda.pautasDUAGlobales || []).map((p: any, i: number) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-indigo-950 text-[11px]">
                    {typeof p === 'string' ? `Pauta ${i + 1}` : p.principio}
                  </span>
                  {typeof p !== 'string' && Array.isArray(p.pautas) && (
                    <ul className="list-disc pl-4 space-y-0.5 mt-1">
                      {p.pautas.map((pt: string, ptIdx: number) => (
                        <li key={ptIdx} className="text-[11px] text-slate-700">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 7. Evaluación */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              7. Evaluación Formativa e Instrumentos
            </h3>

            <div className="text-xs space-y-1">
              <h4 className="font-bold text-slate-900">Evaluación Inicial:</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {sda.evaluacionInicial || 'Diagnóstica inicial'}
              </p>
            </div>

            <div className="text-xs space-y-2">
              <h4 className="font-bold text-slate-900">Herramientas Formativas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(sda.instrumentosEvaluacion || []).map((inst, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-indigo-900 text-[11px]">{inst.tipo || inst.nombre}</span>
                    <p className="text-[11px] text-slate-700">{inst.descripcion}</p>
                    <p className="text-[11px] text-indigo-800 italic">Aplicación: {inst.aplicacion}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Conexiones Interdisciplinares */}
          <section className="space-y-3 border-t border-slate-200 pt-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1 flex items-center justify-between">
              <span>8. Conexiones Interdisciplinares (Vinculación Curricular)</span>
              <span className="text-xs bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full font-bold">
                {getNormativaForEtapa(sda.etapa, sda.comunidad).split(' de ')[0]} {sda.comunidad}
              </span>
            </h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed space-y-2">
              <p className="text-slate-700">
                Esta Situación de Aprendizaje (<em>{sda.titulo}</em>) vincula el trabajo motriz de forma transversal con los saberes básicos de otras áreas del currículo:
              </p>
              <ul className="space-y-2 pt-1 text-slate-700">
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shrink-0">🔢 Matemáticas</span>
                  <span>Conteo de puntos, cálculo de distancias/tiempos, geometría del terreno de juego y registro de estadísticas.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shrink-0">📚 Lengua Castellana</span>
                  <span>Comprensión de reglamentos, vocabulario motriz específico, expresión oral en asambleas y coevaluación dialogada.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">🌱 Conocimiento del Medio</span>
                  <span>Frecuencia cardíaca/respiratoria, higiene postural, educación para la salud, hábitos saludables y respeto al entorno.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded shrink-0">🎨 Educación Artística</span>
                  <span>Expresión corporal, ritmo y respuesta motriz con acompañamiento musical, diseño de mapas o insignias gamificadas.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shrink-0">📱 Competencia Digital</span>
                  <span>
                    {(typeof sda.curso === 'string' && (sda.curso.includes('5º') || sda.curso.includes('6º') || sda.curso.toLowerCase().includes('eso') || sda.curso.toLowerCase().includes('secundaria')))
                      ? 'Grabación en tabletas para análisis biomecánico, códigos QR con retos/pistas y formularios digitales de coevaluación (Google Forms, Kahoot).'
                      : 'Pensamiento computacional desenchufado, orientación espacial con códigos de colores, cronometraje y señalizaciones acústicas analógicas dinamizadas por el docente (sin pantallas del alumnado).'}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* 9. Recursos Didácticos, Instalaciones y Materiales */}
          <section className="space-y-3 border-t border-slate-200 pt-4">
            <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-1 flex items-center justify-between">
              <span>9. Recursos Didácticos, Instalaciones y Materiales de la SdA</span>
              <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                Medios y Organización
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Instalaciones y Espacios */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-indigo-950 text-xs flex items-center space-x-1.5">
                  <span>🏟️</span>
                  <span>Instalaciones y Espacios:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {(sda.recursosEspaciales && sda.recursosEspaciales.length > 0)
                    ? sda.recursosEspaciales.join(' • ')
                    : 'Pista polideportiva exterior, pabellón cubierto / gimnasio escolar y zonas delimitadas seguras.'}
                </p>
              </div>

              {/* Materiales Escolares y Deportivos */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-indigo-950 text-xs flex items-center space-x-1.5">
                  <span>⚽</span>
                  <span>Materiales Escolares y Deportivos:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {(sda.recursosMateriales && sda.recursosMateriales.length > 0)
                    ? sda.recursosMateriales.join(' • ')
                    : 'Balones de gomaespuma, petos de colores, aros, picas, conos delimitadores, colchonetas y material alternativo.'}
                </p>
              </div>

              {/* Recursos Curriculares */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-emerald-950 text-xs flex items-center space-x-1.5">
                  <span>📋</span>
                  <span>Recursos Didácticos y Curriculares:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {(sda.recursosCurriculares && sda.recursosCurriculares.length > 0)
                    ? sda.recursosCurriculares.join(' • ')
                    : 'Tarjetas visuales DUA de apoyo a las reglas, dianas de autoevaluación motriz y fichas de registro cooperativo.'}
                </p>
              </div>

              {/* Recursos Complementarios */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-extrabold text-purple-950 text-xs flex items-center space-x-1.5">
                  <span>🎵</span>
                  <span>Recursos Complementarios:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {(sda.recursosExternos && sda.recursosExternos.length > 0)
                    ? sda.recursosExternos.join(' • ')
                    : ((typeof sda.curso === 'string' && (sda.curso.includes('5º') || sda.curso.includes('6º') || sda.curso.toLowerCase().includes('eso')))
                        ? 'Tabletas para consulta puntual de retos y altavoz Bluetooth portátil.'
                        : 'Altavoz Bluetooth portátil para ambientación musical y cronómetro analógico del docente.')}
                </p>
              </div>
            </div>

            {/* Referencia técnica informativa */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2 mt-2">
              <span>
                <strong>Referencia de diseño:</strong> {sda.driveFolderName ? `Carpeta Drive: ${sda.driveFolderName}` : 'Programación Oficial EF LOMLOE'}
              </span>
              <span>
                Drive: {sda.porcentajeDrive ?? 0}% | Banco Juegos: {sda.porcentajeBancoJuegos ?? 0}% | IA: {sda.porcentajeIA ?? 100}%
              </span>
            </div>
          </section>
        </div>

      {/* TAB 2: Fichas por Sesión */}
      {activeTab === 'fichasSesion' && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {sda.sesiones.map((ses) => (
            <div key={ses.numeroSesion} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b-2 border-indigo-900 pb-3">
                <div>
                  <span className="text-xs font-bold bg-indigo-900 text-white px-3 py-1 rounded-md">
                    SESIÓN {ses.numeroSesion} (60 MIN)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{(ses.titulo || '').replace(/^Sesión\s*\d+:\s*/i, '')}</h3>
                  <p className="text-xs text-slate-500">{sda.curso} • {sda.tematica}</p>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-slate-700 block">Materiales:</span>
                  <p className="text-indigo-900 font-semibold">{(ses.materialesTotales || []).join(', ')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {ses.fases.map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                        {f.fase} ({f.duracionMin} min)
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs">{f.nombreJuego}</h4>
                    </div>
                    {renderFormattedGameDescriptionReact(f.descripcion)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Texto Plano */}
      {activeTab === 'texto' && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
          <pre className="whitespace-pre-wrap leading-relaxed">{getPlainText()}</pre>
        </div>
      )}

      {/* Navigation Footer */}
    </div>
  );
};
