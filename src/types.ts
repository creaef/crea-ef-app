export type ComunidadAutonoma = 'Andalucía' | 'Aragón' | 'Asturias' | 'Cantabria' | 'Castilla y León' | 'Castilla-La Mancha' | 'Catalunya' | 'Extremadura' | 'Región de Murcia' | 'Galicia' | 'Comunidad de Madrid' | 'Comunidad Valenciana' | 'La Rioja' | 'Navarra' | 'País Vasco';
export type EtapaEducativa = 'Infantil' | 'Primaria' | 'ESO' | 'Bachillerato';
export type Ciclo = 'Infantil' | 'Primer Ciclo' | 'Segundo Ciclo' | 'Tercer Ciclo' | '1º Ciclo ESO' | '2º Ciclo ESO' | 'Bachillerato' | 'Todos' | '1º ESO' | '2º ESO' | '3º ESO' | '4º ESO' | '1º y 2º ESO' | '3º y 4º ESO' | '1º a 3º ESO';
export type Curso = '3 años' | '4 años' | '5 años' | '1º Primaria' | '2º Primaria' | '3º Primaria' | '4º Primaria' | '5º Primaria' | '6º Primaria' | '1º ESO' | '2º ESO' | '3º ESO' | '4º ESO' | '1º Bachillerato' | '2º Bachillerato';
export type Trimestre = '1º Trimestre' | '2º Trimestre' | '3º Trimestre';

export type TematicaEF = string;

export interface CompetenciaEspecifica {
  id: string; // e.g. "CE.EF.1"
  numero: number;
  nombre: string;
  descripcion: string;
}

export interface CriterioEvaluacion {
  id: string; // e.g. "1.1.a" or "EFI.1.A.1"
  codigo: string;
  ciclo: Ciclo;
  cursoRef?: string;
  competenciaId: string;
  descripcion: string;
}

export interface SaberBasico {
  codigo: string;
  bloque: string;
  bloqueNombre: string;
  ciclo: Ciclo;
  cursoRef?: string;
  descripcion: string;
}

export interface MetodologiaActiva {
  id: string;
  nombre: string;
  descripcion: string;
  ejemploAplicacion: string;
}

export type ModeloEstructuraSesion = 'Modelo 1: Tradicional' | 'Modelo 2: Competencial' | 'Modelo 3: Metodologías Activas' | '';

export interface JuegoActividadDB {
  id: string;
  nombre: string;
  tematica: TematicaEF;
  ciclo: Ciclo | 'Todos';
  conexionCurricular: string;
  criteriosEvaluacion: string[];
  faseIdeal: 'Inicial' | 'Principal' | 'Vuelta a la Calma';
  descripcion: string;
  atencionDiversidad: string;
  materiales: string[];
}

export interface ActividadEnSesion {
  fase: string; // e.g. 'Calentamiento / Inicio', 'Parte Principal / Práctica', 'Vuelta a la Calma'
  duracionMin: number;
  juegoId?: string;
  nombreJuego: string;
  descripcion: string;
  materiales: string[];
  adaptacionDUA?: string;
  esquemaGrafico?: string; // Descripción o configuración del esquema visual de organización espacial
  esquemaTactico?: EsquemaTactico; // Coordenadas y elementos tácticos en pista (Propuesta B)
}

export interface TacticalPitchElement {
  tipo: 'alumno' | 'jugador_azul' | 'jugador_rojo' | 'portero' | 'porteria' | 'cono' | 'balon' | 'pica' | 'diana' | 'aro' | 'colchoneta' | 'banco' | 'flecha';
  x: number; // Coordenada horizontal (0-100%)
  y: number; // Coordenada vertical (0-100%)
  label?: string; // Etiqueta (ej: "1", "2", "3" para conos)
  color?: string; // Color de la camiseta del alumno (rojo, azul, verde, naranja, morado)
  // Campos específicos para flechas de trayectoria
  x2?: number; // Punto final horizontal si es flecha
  y2?: number; // Punto final vertical si es flecha
  curva?: 'arriba' | 'abajo' | 'recta'; // Tipo de curvatura de la trayectoria
}

export interface EsquemaTactico {
  tipoPista: 'pabellon' | 'circuito' | 'paredon' | 'porteria' | 'rondo';
  descripcionCorta?: string;
  elementos: TacticalPitchElement[];
}

export interface SesionTrabajo {
  numeroSesion: number;
  titulo: string;
  objetivoSesion: string;
  fases: ActividadEnSesion[];
  criteriosTrabajados: string[];
  materialesTotales: string[];
}

export interface AdaptacionNEAE {
  categoria: string;
  materialesYEspacio?: string;
  reglasYMetodologia?: string;
  pautasDocente?: string;
  material?: string;
  espacio?: string;
}

export interface PautaDUA {
  principio: string;
  pautas: string[];
}

export interface NivelRubrica {
  nivel: 'Iniciado (1-4)' | 'En proceso (5-6)' | 'Conseguido (7-8)' | 'Excelente (9-10)';
  descriptor: string;
}

export interface ElementoRubrica {
  criterioCodigo: string;
  criterioTexto: string;
  niveles: NivelRubrica[];
}

export interface InstrumentoEvaluacion {
  tipo: string;
  nombre?: string;
  descripcion: string;
  aplicacion: string;
  itemsOIndicadores?: string[];
}

/**
 * Formatea la descripción del desarrollo de un juego asegurando
 * que cada uno de los 5 apartados concisos (Terreno de juego, Roles, Desarrollo del juego, Normas, Variaciones)
 * esté presente sin redundancias, eliminando cualquier residuo como 'y normas' del inicio del desarrollo.
 */
export function formatGameDescription(text: string): string {
  if (!text || !text.trim()) return '';
  let str = text.trim();

  // Clean HTML tags & markdown bold formatting that corrupt rendering
  str = str.replace(/<\/?(?:b|strong)>/gi, '');
  str = str.replace(/\*\*/g, '');

  const HEADERS = {
    h1: 'Terreno de juego:',
    h2: 'Roles:',
    h3: 'Desarrollo del juego:',
    h4: 'Normas:',
    h5: 'Variaciones:',
  };

  // Parse lines into sections 1, 2, 3, 4, 5
  const lines = str.split('\n');
  let currentSec = 0;
  const secContents: { [key: number]: string[] } = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };

  for (let l of lines) {
    let trimmed = l.trim();
    if (!trimmed) continue;

    // Filter out redundant bloated lines from old format: DUA rotations, docente position, excessive security
    if (/^[-*]?\s*(?:Rotaciones\s*y\s*DUA|Posici[oó]n\s*estrat[eé]gica|Adaptaciones\s*DUA|Medidas\s*de\s*seguridad):/i.test(trimmed)) {
      continue;
    }

    if (/^(?:1\.)?\s*(?:Terreno(?:\s*de\s*juego)?|ORGANIZACI[OÓ]N\s*ESPACIAL)/i.test(trimmed)) {
      currentSec = 1;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0 && trimmed.length > colonIdx + 1) {
        const val = trimmed.substring(colonIdx + 1).trim();
        if (val) secContents[1].push(val);
      }
    } else if (/^(?:2\.)?\s*(?:Roles(?:\s*del\s*alumnado|\s*activos)?|ROLES)/i.test(trimmed)) {
      currentSec = 2;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0 && trimmed.length > colonIdx + 1) {
        const val = trimmed.substring(colonIdx + 1).trim();
        if (val) secContents[2].push(val);
      }
    } else if (/^(?:3\.)?\s*(?:Desarrollo(?:\s*del\s*juego(?:\s*y\s*normas)?)?|DESARROLLO\s*PASO|Secuencia(?:\s*de\s*juego(?:\s*y\s*normas)?)?)/i.test(trimmed)) {
      currentSec = 3;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0 && trimmed.length > colonIdx + 1) {
        let val = trimmed.substring(colonIdx + 1).trim();
        // Eliminar cualquier residuo de "y normas" al inicio del texto
        val = val.replace(/^[-*]?\s*(?:y\s*normas|normas):?\s*/i, '').trim();
        if (val) secContents[3].push(val);
      }
    } else if (/^(?:4\.)?\s*(?:Normas(?:\s*y\s*reglas|\s*claras)?|Reglas)/i.test(trimmed)) {
      currentSec = 4;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0 && trimmed.length > colonIdx + 1) {
        const val = trimmed.substring(colonIdx + 1).trim();
        if (val) secContents[4].push(val);
      }
    } else if (/^(?:5\.)?\s*(?:Variaciones|Variantes|VARIACIONES)/i.test(trimmed)) {
      currentSec = 5;
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > 0 && trimmed.length > colonIdx + 1) {
        const val = trimmed.substring(colonIdx + 1).trim();
        if (val) secContents[5].push(val);
      }
    } else {
      // Limpiar cualquier línea suelta que empiece por "y normas" en el desarrollo
      if (currentSec === 3) {
        trimmed = trimmed.replace(/^[-*]?\s*y\s*normas:?\s*/i, '').trim();
        if (trimmed) secContents[3].push(trimmed);
      } else {
        secContents[currentSec].push(trimmed);
      }
    }
  }

  let p1 = secContents[1].join('\n').trim();
  let p2 = secContents[2].join('\n').trim();
  let p3 = secContents[3].join('\n').trim();
  let p4 = secContents[4].join('\n').trim();
  let p5 = secContents[5].join('\n').trim();

  // If unsectioned content exists
  if (secContents[0].length > 0) {
    const unsectioned = secContents[0].join('\n').trim();
    p3 = p3 ? `${unsectioned}\n${p3}` : unsectioned;
  }

  // Clean sub-bullets that repeat the header name or residual 'y normas'
  p1 = p1.replace(/^[-*]?\s*(?:Terreno\s*y\s*delimitaci[oó]n|Terreno):?\s*/gim, '').trim();
  p2 = p2.replace(/^[-*]?\s*(?:Roles\s*activos|Roles):?\s*/gim, '').trim();
  p3 = p3.replace(/^[-*]?\s*(?:Secuencia\s*de\s*juego\s*(?:y\s*normas)?|Secuencia|Desarrollo\s*del\s*juego\s*(?:y\s*normas)?|Desarrollo):?\s*/gim, '').trim();
  p3 = p3.replace(/^[-*]?\s*(?:y\s*normas|normas):?\s*/gim, '').trim();
  p3 = p3.split('\n').map((line) => line.replace(/^[-*]?\s*y\s*normas:?\s*/i, '').trim()).filter(Boolean).join('\n');

  const parts: string[] = [];

  parts.push(`${HEADERS.h1}\n${p1 || 'Pista polideportiva delimitada (aprox. 20x15m).'}`);
  parts.push(`${HEADERS.h2}\n${p2 || 'Equipos equitativos con roles activos (atacantes y defensores).'}`);
  parts.push(`${HEADERS.h3}\n${p3 || str}`);
  if (p4) {
    parts.push(`${HEADERS.h4}\n${p4}`);
  } else {
    parts.push(`${HEADERS.h4}\n- Respetar el espacio y las zonas de seguridad.\n- Pases limpios sin contacto excesivo.`);
  }
  if (p5) {
    parts.push(`${HEADERS.h5}\n${p5}`);
  } else {
    parts.push(`${HEADERS.h5}\n- Reducir o ampliar el espacio de juego según fluidez motriz.`);
  }

  return parts.join('\n\n');
}

/**
 * Renderiza la descripción de un juego en formato HTML rico
 * estructurado con encabezados destacados, viñetas y texto justificado
 * para PDF, Word y vista previa del documento.
 */
export function renderFormattedGameDescriptionHtml(text: string): string {
  if (!text) return '';
  const formattedText = formatGameDescription(text);
  const lines = formattedText.split('\n');
  let html = '';

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      html += '<div style="height: 3px;"></div>';
      continue;
    }

    // Encabezados de los 5 apartados concisos
    if (/^(?:[1-5]\.)?\s*(Terreno de juego|Roles|Desarrollo del juego|Normas|Variaciones|Variantes)/i.test(trimmed) && trimmed.endsWith(':')) {
      let icon = '📌';
      let color = '#1e1b4b';
      let bg = '#e0e7ff';
      if (/terreno/i.test(trimmed)) { icon = '🏟️'; color = '#0369a1'; bg = '#e0f2fe'; }
      else if (/roles/i.test(trimmed)) { icon = '👥'; color = '#4338ca'; bg = '#ede9fe'; }
      else if (/desarrollo/i.test(trimmed)) { icon = '🏃'; color = '#1e1b4b'; bg = '#f1f5f9'; }
      else if (/normas/i.test(trimmed)) { icon = '📋'; color = '#b45309'; bg = '#fef3c7'; }
      else if (/variaci|variant/i.test(trimmed)) { icon = '🔀'; color = '#047857'; bg = '#d1fae5'; }

      html += `<div class="game-section-badge" style="display: inline-block; font-weight: 800; color: ${color}; background: ${bg}; font-size: 10px; margin-top: 5px; margin-bottom: 2px; padding: 1px 6px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.3px; page-break-after: avoid !important; break-after: avoid !important; page-break-inside: avoid !important; break-inside: avoid !important;">${icon} ${trimmed}</div>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // Viñeta con etiqueta destacada si tiene dos puntos
      const content = trimmed.substring(2);
      const colonIdx = content.indexOf(':');

      if (colonIdx > 0 && colonIdx < 40) {
        const label = content.substring(0, colonIdx + 1);
        const value = content.substring(colonIdx + 1);
        html += `<div class="game-bullet-item" style="padding-left: 8px; margin-bottom: 2px; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; page-break-inside: avoid !important; break-inside: avoid !important;">• <strong style="color: #0f172a; font-weight: bold;">${label}</strong>${value}</div>`;
      } else {
        html += `<div class="game-bullet-item" style="padding-left: 8px; margin-bottom: 2px; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; page-break-inside: avoid !important; break-inside: avoid !important;">• ${content}</div>`;
      }
    } else {
      // Párrafo normal
      html += `<p class="game-paragraph-item" style="margin: 0 0 3px 0; font-size: 10px; color: #334155; line-height: 1.45; text-align: justify; hyphens: none; word-wrap: break-word; overflow-wrap: break-word; page-break-inside: avoid !important; break-inside: avoid !important;">${trimmed}</p>`;
    }
  }

  return html;
}

export interface DriveFolderInfo {
  id: string;
  name: string;
}

export interface DriveFileInfo {
  id: string;
  name: string;
  mimeType: string;
}

export interface SituacionAprendizaje {
  id: string;
  fechaCreacion: string;
  // Paso 1: Datos Generales
  comunidad: ComunidadAutonoma;
  etapa: EtapaEducativa;
  titulo: string;
  curso: Curso;
  ciclo: Ciclo;
  trimestre: Trimestre;
  numSesiones: number;
  tematica: TematicaEF;
  justificacion: string;

  // Paso 2 & 3: Curriculares
  competenciasSeleccionadas: string[]; // ids
  criteriosSeleccionados: string[]; // codigos
  saberesSeleccionados: string[]; // codigos
  odsSeleccionados: string[]; // e.g. "ODS 3", "ODS 5"
  descriptoresOperativos: string[]; // e.g. "CPSAA2", "CC1"

  // Paso 4: Metodología
  metodologiaActiva: string;
  modeloEstructura: ModeloEstructuraSesion;

  // Paso 5: Sesiones & Drive documentation
  driveFolderId?: string;
  driveFolderName?: string;
  driveDocumentationText?: string;
  porcentajeDrive?: number;
  porcentajeBancoJuegos?: number;
  porcentajeIA?: number;
  sesiones: SesionTrabajo[];

  // Paso 6: Producto Final
  productoFinal: string;

  // Paso 7: Diversidad
  neaeSeleccionadas: string[];
  adaptacionesNEAE: AdaptacionNEAE[];
  pautasDUAGlobales: PautaDUA[] | string[];

  // Paso 8: Evaluación
  instrumentosSeleccionados: string[];
  evaluacionInicial: string;
  instrumentosEvaluacion: InstrumentoEvaluacion[];
  rubrica: ElementoRubrica[];

  // Paso 9: Recursos
  recursosEspaciales: string[];
  recursosMateriales: string[];
  recursosExternos: string[];
  recursosCurriculares: string[];
}
