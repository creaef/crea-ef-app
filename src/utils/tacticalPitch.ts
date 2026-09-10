/**
 * Motor de análisis sintáctico-espacial y renderizado táctico de Educación Física.
 * Analiza el texto real del juego (Roles, Terreno, Desarrollo, Materiales) y genera
 * una representación gráfica 100% personalizada y acorde para CADA juego:
 * - Filas de alumnos enfrentadas o en hilera.
 * - Dos equipos con petos diferenciados (azul vs rojo) o varios subgrupos.
 * - Conos numerados, aros alineados o dispersos, balones, porterías o colchonetas.
 * - Flechas de carrera, pase, slalom o rescate.
 * Compatible con html2canvas, html2pdf, Word (.doc) y React.
 */

import { EsquemaTactico, TacticalPitchElement } from '../types';

export type PitchType = 'pabellon' | 'circuito' | 'paredon' | 'porteria' | 'rondo';

/**
 * Detecta automáticamente el tipo de pista según el juego.
 */
export function detectPitchType(text?: string, gameName?: string): PitchType {
  const combined = `${gameName || ''} ${text || ''}`.toLowerCase();

  if (/circuito|estaci[oó]n|estaciones|postas|recorrid|slalom|obst[aá]culo|puente/i.test(combined)) {
    return 'circuito';
  }
  if (/pared|pared[oó]n|front[oó]n|red|tenis|p[aá]del|campo dividido|separad|medio campo/i.test(combined)) {
    return 'paredon';
  }
  if (/porter[ií]a|chut|disparo|portero|gol|penalti|diana|lanzamiento|tiro/i.test(combined)) {
    return 'porteria';
  }
  if (/rondo|c[ií]rculo|corro|rueda|central|en medio/i.test(combined)) {
    return 'rondo';
  }
  return 'pabellon';
}

/**
 * Dibuja un muñeco de palitos de EF en SVG.
 */
function renderStickPuppetSvg(x: number, y: number, color = '#b91c1c'): string {
  const px = x - 10;
  const py = y - 28;
  return `
    <g transform="translate(${px}, ${py})">
      <!-- Cabeza -->
      <circle cx="10" cy="6" r="4.5" fill="#fed7aa" stroke="#0f172a" stroke-width="1.1" />
      <!-- Torso / Camiseta -->
      <line x1="10" y1="10.5" x2="10" y2="18.5" stroke="${color}" stroke-width="3" stroke-linecap="round" />
      <!-- Brazos -->
      <line x1="5" y1="13.5" x2="15" y2="13.5" stroke="${color}" stroke-width="2.2" stroke-linecap="round" />
      <!-- Piernas -->
      <line x1="10" y1="18.5" x2="6" y2="28" stroke="#1e293b" stroke-width="2" stroke-linecap="round" />
      <line x1="10" y1="18.5" x2="14" y2="28" stroke="#1e293b" stroke-width="2" stroke-linecap="round" />
    </g>
  `;
}

/**
 * Dibuja un cono deportivo naranja con base y número/etiqueta opcional encima.
 */
function renderConeSvg(x: number, y: number, label?: string): string {
  const px = x - 7;
  const py = y - 10;
  return `
    <g transform="translate(${px}, ${py})">
      ${label ? `<text x="7" y="-5" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#0f766e" text-anchor="middle">${label}</text>` : ''}
      <polygon points="7,0 2,12 12,12" fill="#ea580c" stroke="#9a3412" stroke-width="0.8" />
      <ellipse cx="7" cy="12" rx="6" ry="1.8" fill="#c2410c" />
      <line x1="4.5" y1="6" x2="9.5" y2="6" stroke="#ffffff" stroke-width="1" />
    </g>
  `;
}

/**
 * Dibuja un aro deportivo en el suelo (elipse en perspectiva).
 */
function renderHoopSvg(x: number, y: number, color = '#ea580c'): string {
  return `
    <g>
      <ellipse cx="${x}" cy="${y}" rx="13" ry="6.5" fill="none" stroke="${color}" stroke-width="3.2" />
    </g>
  `;
}

/**
 * Dibuja un balón de deporte (fútbol/balonmano).
 */
function renderBallSvg(x: number, y: number): string {
  return `
    <g transform="translate(${x - 5}, ${y - 5})">
      <circle cx="5" cy="5" r="5" fill="#ffffff" stroke="#0f172a" stroke-width="1.2" />
      <polygon points="5,2 3,4 4,7 6,7 7,4" fill="#0f172a" />
    </g>
  `;
}

/**
 * Dibuja una colchoneta, banco o posta.
 */
function renderMatSvg(x: number, y: number, dashed = false): string {
  const strokeDash = dashed ? 'stroke-dasharray="3,3"' : '';
  return `
    <rect x="${x - 16}" y="${y - 6}" width="32" height="12" rx="3" fill="#f1f5f9" stroke="#9333ea" stroke-width="1.4" ${strokeDash} />
  `;
}

/**
 * Dibuja una portería o meta.
 */
function renderGoalSvg(x: number, y: number): string {
  return `
    <g transform="translate(${x - 4}, ${y - 18})">
      <rect x="0" y="0" width="8" height="36" rx="2" fill="#ffffff" stroke="#ef4444" stroke-width="2" />
      <line x1="0" y1="9" x2="8" y2="9" stroke="#ef4444" stroke-width="1" />
      <line x1="0" y1="18" x2="8" y2="18" stroke="#ef4444" stroke-width="1" />
      <line x1="0" y1="27" x2="8" y2="27" stroke="#ef4444" stroke-width="1" />
    </g>
  `;
}

/**
 * Dibuja una flecha direccional arqueada o recta de trayectoria.
 */
function renderArrowSvg(x1: number, y1: number, x2: number, y2: number, color = '#0f766e', curva = 'arriba'): string {
  const markerId = `arr_${Math.round(x1)}_${Math.round(y1)}_${Math.round(x2)}_${color.replace('#', '')}`;
  
  let pathD = '';
  if (curva === 'arriba') {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 15;
    pathD = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  } else if (curva === 'abajo') {
    const midX = (x1 + x2) / 2;
    const midY = Math.max(y1, y2) + 15;
    pathD = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  } else {
    pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  return `
    <defs>
      <marker id="${markerId}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M 0 0 L 7 3 L 0 6 z" fill="${color}" />
      </marker>
    </defs>
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.6" marker-end="url(#${markerId})" stroke-linecap="round" />
  `;
}

/**
 * Analizador semántico del texto del juego.
 * Extrae con precisión los elementos motrices específicos que existen en ese juego
 * y genera una escena táctica personalizada para:
 * - Persecución con perseguidor de color diferenciado (rojo) persiguiendo a alumnos (azul/verde)
 * - Equipos con terreno dividido (red / conos divisorios, equipos a cada lado y lanzamientos)
 * - Transporte de material (parejas o alumnos acarreando material de almacén a meta)
 * - Parejas (enfrentadas o coordinadas con balón/conos)
 * - Tríos (formación triangular de pases y cooperación)
 * - Puntería / derribar conos / dianas
 * - Circuitos por estaciones / postas numeradas
 * - Relevos y filas en hilera
 * - Puente de aros y saltos
 * - Portería y tiros a puerta
 * - Slalom con conos numerados
 */
export function buildCustomVisualElementsForGame(text = '', title = ''): TacticalPitchElement[] {
  const combined = `${title} ${text}`.toLowerCase();
  const elements: TacticalPitchElement[] = [];

  // Categorías de detección semántica
  const isPersecucion = /perseguid|cazador|pillar|pilla-pilla|pilla\s*pilla|mancha|atrapar|tocar|tulip[aá]n|cortahilos|polis\s*y\s*cacos|lobo|zorro|la\s*lleva|el\s*que\s*pilla|robar|escapar/i.test(combined);
  const isTerrenoDividido = /terreno\s*dividido|campo\s*dividido|cancha\s*dividida|a\s*cada\s*lado|red|volei|v[oó]leibol|datchball|bal[oó]n\s*prisionero|cementerio|dodgeball|balontiro|dos\s*campos|campo\s*propio|campo\s*contrario|mitad\s*de\s*campo|a\s*su\s*campo|frontera/i.test(combined);
  const isTransporte = /transport|llevar\s*el\s*material|trasladar|acarreo|llevar\s*un|llevando|coger\s*y\s*llevar|recoger\s*material|mudanza|almac[eé]n|banco\s*y\s*colchoneta|porteo/i.test(combined);
  const isTrios = /tr[ií]o|tr[ií]os|por\s*tr[ií]os|en\s*tr[ií]os|grupos\s*de\s*3|grupos\s*de\s*tres/i.test(combined);
  const isParejas = /pareja|parejas|por\s*parejas|en\s*parejas|d[uú]os|dos\s*en\s*dos/i.test(combined);
  const isPunteria = /diana|dianas|derribar|punter[ií]a|bolos|tirar\s*conos|blanco|lanzamiento\s*de\s*precisi[oó]n/i.test(combined);
  const isCircuito = /circuito|estaci[oó]n|estaciones|postas|recorrido\s*motriz/i.test(combined);
  const isAros = /aro|aros|puente\s*de\s*aros|saltar\s*aros/i.test(combined);
  const isPorteria = /porter[ií]a|portero|gol|penalti|chut|lanzamiento\s*a\s*porter[ií]a/i.test(combined);
  const isFilas = /fila|filas|hilera|relevos|testigo|carrera\s*de\s*relevos/i.test(combined);
  const isRondo = /rondo|c[ií]rculo|corro|rueda|en\s*c[ií]rculo/i.test(combined);
  const isSlalom = /slalom|zig-zag|zigzag|pica|picas/i.test(combined);
  const hasBalon = /bal[oó]n|balones|pelota|pelotas|m[oó]vil/i.test(combined);
  const hasConos = /cono|conos/i.test(combined);

  // 1. JUEGO DE PERSECUCIÓN (Perseguidor con color rojo/amarillo destacado persiguiendo a azules/verdes)
  if (isPersecucion) {
    // 1 Perseguidor en color rojo vivo (#dc2626) en acción
    elements.push({ tipo: 'alumno', x: 28, y: 55, color: '#dc2626' });
    // Flecha de persecución directa hacia los fugitivos
    elements.push({ tipo: 'flecha', x: 31, y: 50, x2: 52, y2: 45, curva: 'recta', color: '#dc2626' });

    // Alumnos perseguidos / fugitivos en azul y verde dispersos esquivando
    elements.push({ tipo: 'alumno', x: 56, y: 44, color: '#0284c7' });
    elements.push({ tipo: 'flecha', x: 58, y: 40, x2: 78, y2: 36, curva: 'arriba', color: '#16a34a' });

    elements.push({ tipo: 'alumno', x: 70, y: 70, color: '#0284c7' });
    elements.push({ tipo: 'flecha', x: 72, y: 66, x2: 86, y2: 66, curva: 'arriba', color: '#0284c7' });

    elements.push({ tipo: 'alumno', x: 14, y: 42, color: '#16a34a' });
    elements.push({ tipo: 'alumno', x: 45, y: 72, color: '#0284c7' });

    // Cono de zona de refugio / casa a salvo
    elements.push({ tipo: 'cono', x: 88, y: 48, label: 'Casa' });
    return elements;
  }

  // 2. EQUIPOS CON TERRENO DIVIDIDO (Red / medio campo / dos mitades enfrentadas: ej. datchball, volei, balón prisionero)
  if (isTerrenoDividido) {
    // Conos delimitando la línea central divisoria
    elements.push({ tipo: 'cono', x: 50, y: 26, label: 'Red' });
    elements.push({ tipo: 'cono', x: 50, y: 72 });

    // Equipo A (Azul - campo izquierdo)
    elements.push({ tipo: 'alumno', x: 16, y: 42, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 26, y: 70, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 38, y: 46, color: '#0284c7' });

    // Equipo B (Rojo - campo derecho)
    elements.push({ tipo: 'alumno', x: 62, y: 46, color: '#b91c1c' });
    elements.push({ tipo: 'alumno', x: 74, y: 70, color: '#b91c1c' });
    elements.push({ tipo: 'alumno', x: 84, y: 42, color: '#b91c1c' });

    // Balón en trayectoria curva alta sobrevolando la red divisoria
    elements.push({ tipo: 'balon', x: 39, y: 38 });
    elements.push({ tipo: 'flecha', x: 37, y: 42, x2: 66, y2: 42, curva: 'arriba', color: '#ea580c' });
    return elements;
  }

  // 3. JUEGOS TRANSPORTANDO MATERIAL (Acarreos, mudanza motriz, rescate de material de almacén a meta)
  if (isTransporte) {
    // Zona de salida / Almacén de material a la izquierda
    elements.push({ tipo: 'cono', x: 10, y: 36, label: 'Inicio' });
    elements.push({ tipo: 'colchoneta', x: 12, y: 64 });

    // Pareja de alumnos en Azul transportando el material juntos
    elements.push({ tipo: 'alumno', x: 36, y: 55, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 48, y: 55, color: '#0284c7' });
    // Balón/móvil transportado en medio de la pareja
    elements.push({ tipo: 'balon', x: 42, y: 56 });

    // Flecha direccional de transporte rápido hacia la zona de depósito
    elements.push({ tipo: 'flecha', x: 50, y: 52, x2: 76, y2: 52, curva: 'recta', color: '#0f766e' });

    // Zona de meta / Almacén receptor a la derecha
    elements.push({ tipo: 'aro', x: 82, y: 58, color: '#ea580c' });
    elements.push({ tipo: 'cono', x: 88, y: 38, label: 'Meta' });
    return elements;
  }

  // 4. JUEGOS POR TRÍOS (Formación triangular de cooperación y pases)
  if (isTrios) {
    // Trío 1 (lado izquierdo, azules)
    elements.push({ tipo: 'alumno', x: 14, y: 40, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 32, y: 40, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 23, y: 72, color: '#0284c7' });
    elements.push({ tipo: 'balon', x: 23, y: 48 });
    elements.push({ tipo: 'flecha', x: 17, y: 40, x2: 30, y2: 40, curva: 'recta', color: '#0284c7' });
    elements.push({ tipo: 'flecha', x: 30, y: 44, x2: 24, y2: 68, curva: 'recta', color: '#0284c7' });

    // Trío 2 (lado derecho, verdes)
    elements.push({ tipo: 'alumno', x: 64, y: 40, color: '#16a34a' });
    elements.push({ tipo: 'alumno', x: 82, y: 40, color: '#16a34a' });
    elements.push({ tipo: 'alumno', x: 73, y: 72, color: '#16a34a' });
    elements.push({ tipo: 'balon', x: 73, y: 48 });
    elements.push({ tipo: 'flecha', x: 67, y: 40, x2: 80, y2: 40, curva: 'recta', color: '#16a34a' });
    elements.push({ tipo: 'flecha', x: 80, y: 44, x2: 74, y2: 68, curva: 'recta', color: '#16a34a' });
    return elements;
  }

  // 5. JUEGOS POR PAREJAS (Enfrentadas o coordinadas con balón y conos)
  if (isParejas) {
    // Pareja 1 (lado izquierdo, azules)
    elements.push({ tipo: 'alumno', x: 16, y: 55, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 36, y: 55, color: '#0284c7' });
    elements.push({ tipo: 'balon', x: 26, y: 58 });
    elements.push({ tipo: 'flecha', x: 18, y: 51, x2: 34, y2: 51, curva: 'arriba', color: '#0284c7' });
    elements.push({ tipo: 'cono', x: 12, y: 68 });
    elements.push({ tipo: 'cono', x: 40, y: 68 });

    // Pareja 2 (lado derecho, rojas)
    elements.push({ tipo: 'alumno', x: 64, y: 55, color: '#b91c1c' });
    elements.push({ tipo: 'alumno', x: 84, y: 55, color: '#b91c1c' });
    elements.push({ tipo: 'balon', x: 74, y: 58 });
    elements.push({ tipo: 'flecha', x: 66, y: 51, x2: 82, y2: 51, curva: 'arriba', color: '#b91c1c' });
    elements.push({ tipo: 'cono', x: 60, y: 68 });
    elements.push({ tipo: 'cono', x: 88, y: 68 });
    return elements;
  }

  // 6. PUNTERÍA / DIANAS / DERRIBAR CONOS
  if (isPunteria) {
    // Línea de lanzadores
    elements.push({ tipo: 'alumno', x: 16, y: 45, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 16, y: 70, color: '#0284c7' });
    elements.push({ tipo: 'balon', x: 22, y: 45 });
    elements.push({ tipo: 'balon', x: 22, y: 70 });

    // Flechas de tiro parabólico directo
    elements.push({ tipo: 'flecha', x: 24, y: 46, x2: 74, y2: 40, curva: 'arriba', color: '#ea580c' });
    elements.push({ tipo: 'flecha', x: 24, y: 69, x2: 74, y2: 68, curva: 'arriba', color: '#0f766e' });

    // Fila de conos numerados como dianas
    elements.push({ tipo: 'cono', x: 76, y: 38, label: '1' });
    elements.push({ tipo: 'cono', x: 84, y: 55, label: '2' });
    elements.push({ tipo: 'cono', x: 76, y: 72, label: '3' });
    return elements;
  }

  // 7. CIRCUITO POR ESTACIONES / POSTAS (Estaciones numeradas con material variado)
  if (isCircuito) {
    // Estación 1: Banco sueco
    elements.push({ tipo: 'banco', x: 18, y: 56 });
    elements.push({ tipo: 'alumno', x: 18, y: 44, color: '#0284c7' });
    elements.push({ tipo: 'cono', x: 10, y: 36, label: 'E1' });

    // Estación 2: Aros de salto
    elements.push({ tipo: 'aro', x: 40, y: 58, color: '#ea580c' });
    elements.push({ tipo: 'alumno', x: 40, y: 44, color: '#16a34a' });
    elements.push({ tipo: 'cono', x: 33, y: 36, label: 'E2' });

    // Estación 3: Conos de slalom
    elements.push({ tipo: 'cono', x: 62, y: 58, label: 'E3' });
    elements.push({ tipo: 'alumno', x: 62, y: 44, color: '#b91c1c' });
    elements.push({ tipo: 'balon', x: 67, y: 58 });

    // Estación 4: Diana / lanzamiento
    elements.push({ tipo: 'cono', x: 85, y: 58, label: 'E4' });
    elements.push({ tipo: 'alumno', x: 80, y: 44, color: '#9333ea' });

    // Flechas de rotación
    elements.push({ tipo: 'flecha', x: 22, y: 40, x2: 32, y2: 40, curva: 'recta', color: '#0f766e' });
    elements.push({ tipo: 'flecha', x: 45, y: 40, x2: 55, y2: 40, curva: 'recta', color: '#0f766e' });
    elements.push({ tipo: 'flecha', x: 67, y: 40, x2: 75, y2: 40, curva: 'recta', color: '#0f766e' });
    return elements;
  }

  // 8. RONDO / CÍRCULO COLECTIVO
  if (isRondo) {
    elements.push(
      { tipo: 'alumno', x: 16, y: 55, color: '#ea580c' },
      { tipo: 'alumno', x: 30, y: 72, color: '#9333ea' },
      { tipo: 'alumno', x: 50, y: 36, color: '#0284c7' },
      { tipo: 'alumno', x: 70, y: 72, color: '#b91c1c' },
      { tipo: 'alumno', x: 84, y: 55, color: '#16a34a' }
    );
    if (hasBalon) {
      elements.push({ tipo: 'balon', x: 44, y: 54 });
      elements.push({ tipo: 'flecha', x: 32, y: 64, x2: 66, y2: 64, curva: 'arriba', color: '#0284c7' });
    }
    return elements;
  }

  // 9. PUENTE DE AROS / CIRCUITO CON AROS
  if (isAros) {
    elements.push({ tipo: 'alumno', x: 10, y: 72, color: '#b91c1c' });
    elements.push({ tipo: 'flecha', x: 12, y: 55, x2: 88, y2: 48, curva: 'arriba', color: '#9333ea' });

    if (/banco|colchoneta/i.test(combined)) {
      elements.push({ tipo: 'banco', x: 32, y: 56 });
      elements.push({ tipo: 'colchoneta', x: 56, y: 56 });
      elements.push({ tipo: 'aro', x: 80, y: 54, color: '#ea580c' });
    } else {
      elements.push({ tipo: 'aro', x: 34, y: 58, color: '#dc2626' });
      elements.push({ tipo: 'aro', x: 54, y: 58, color: '#2563eb' });
      elements.push({ tipo: 'aro', x: 74, y: 58, color: '#eab308' });
      if (hasConos) {
        elements.push({ tipo: 'cono', x: 88, y: 62 });
      }
    }
    return elements;
  }

  // 10. FILAS O RELEVOS (Alumnos alineados esperando relevo y alumno corriendo hacia cono)
  if (isFilas) {
    // Alumno en acción + compañeros esperando en fila detrás
    elements.push({ tipo: 'alumno', x: 18, y: 65, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 11, y: 65, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 5, y: 65, color: '#0284c7' });

    elements.push({ tipo: 'flecha', x: 21, y: 52, x2: 86, y2: 50, curva: 'arriba', color: '#0f766e' });

    if (hasConos) {
      elements.push({ tipo: 'cono', x: 40, y: 60, label: '1' });
      elements.push({ tipo: 'cono', x: 60, y: 60, label: '2' });
      elements.push({ tipo: 'cono', x: 80, y: 60, label: '3' });
    } else {
      elements.push({ tipo: 'cono', x: 86, y: 62, label: 'Meta' });
    }

    if (hasBalon) {
      elements.push({ tipo: 'balon', x: 23, y: 68 });
    }
    return elements;
  }

  // 11. PORTERÍA O LANZAMIENTO A META
  if (isPorteria) {
    elements.push({ tipo: 'alumno', x: 15, y: 58, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 28, y: 72, color: '#0284c7' });
    elements.push({ tipo: 'alumno', x: 55, y: 54, color: '#b91c1c' });
    elements.push({ tipo: 'alumno', x: 84, y: 54, color: '#eab308' });
    elements.push({ tipo: 'porteria', x: 92, y: 46 });
    if (hasBalon) {
      elements.push({ tipo: 'balon', x: 20, y: 60 });
      elements.push({ tipo: 'flecha', x: 22, y: 54, x2: 80, y2: 48, curva: 'arriba', color: '#0284c7' });
    }
    return elements;
  }

  // 12. SLALOM O CONOS NUMERADOS
  if (isSlalom || hasConos) {
    elements.push({ tipo: 'alumno', x: 12, y: 72, color: '#b91c1c' });
    elements.push({ tipo: 'flecha', x: 14, y: 55, x2: 86, y2: 45, curva: 'arriba', color: '#0f766e' });
    elements.push({ tipo: 'cono', x: 38, y: 60, label: '1' });
    elements.push({ tipo: 'cono', x: 56, y: 60, label: '2' });
    elements.push({ tipo: 'cono', x: 74, y: 60, label: '3' });
    if (hasBalon) {
      elements.push({ tipo: 'balon', x: 17, y: 72 });
    }
    return elements;
  }

  // 13. CASO GENERAL CONTEXTUALIZADO
  elements.push({ tipo: 'alumno', x: 16, y: 60, color: '#0284c7' });
  elements.push({ tipo: 'flecha', x: 20, y: 52, x2: 80, y2: 52, curva: 'arriba', color: '#0f766e' });
  elements.push({ tipo: 'cono', x: 50, y: 56, label: '1' });
  elements.push({ tipo: 'alumno', x: 84, y: 60, color: '#b91c1c' });
  if (hasBalon) {
    elements.push({ tipo: 'balon', x: 22, y: 62 });
  }

  return elements;
}

/**
 * Genera el esquema táctico visual puro en SVG (idéntico a los ejemplos del usuario).
 * Altura compacta (72px), sin textos, con muñecos, conos numerados, aros, balones y flechas.
 */
export function getTacticalPitchHtml(
  type: PitchType = 'pabellon',
  title = '',
  esquemaTactico?: EsquemaTactico,
  gameDescription?: string
): string {
  const width = 500;
  const height = 74;

  // Si la actividad trae coordenadas específicas de la IA, úsalas; si no, analiza el texto del juego
  const rawElements: TacticalPitchElement[] = (esquemaTactico?.elementos && esquemaTactico.elementos.length > 0)
    ? esquemaTactico.elementos
    : buildCustomVisualElementsForGame(gameDescription, title);

  const fullText = `${title} ${gameDescription || ''}`.toLowerCase();

  // Color de borde de pista y fondo adaptativo según la temática
  let borderColor = '#99f6e4'; // verde menta suave (imágenes 2 y 3)
  let bgColor = '#f0fdfa';
  if (/rondo|c[ií]rculo|corro/i.test(fullText)) {
    borderColor = '#a7f3d0';
    bgColor = '#f0fdf4';
  } else if (/aro|puente|violeta|morad|acrosport|salto/i.test(fullText)) {
    borderColor = '#ddd6fe'; // lila suave (imagen 4)
    bgColor = '#faf5ff';
  }

  let svgElementsHtml = '';

  // Si es un juego con terreno dividido / red, dibujar la línea divisoria vertical central
  if (/terreno\s*dividido|campo\s*dividido|cancha\s*dividida|a\s*cada\s*lado|red|volei|v[oó]leibol|datchball|bal[oó]n\s*prisionero/i.test(fullText)) {
    svgElementsHtml += `<line x1="${width / 2}" y1="5" x2="${width / 2}" y2="${height - 5}" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4,3" />`;
  }

  // Si es un rondo, dibujar el círculo interior elíptico en el centro (como en tu imagen 3)
  if (/rondo|c[ií]rculo|corro/i.test(fullText)) {
    svgElementsHtml += `<ellipse cx="${width / 2}" cy="${height / 2}" rx="85" ry="13" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="4,4" />`;
  }

  // Renderizar cada elemento en sus coordenadas relativas
  for (const el of rawElements) {
    const cx = (el.x / 100) * width;
    const cy = (el.y / 100) * height;

    if (el.tipo === 'alumno' || el.tipo === 'jugador_azul' || el.tipo === 'jugador_rojo' || el.tipo === 'portero') {
      let c = el.color || '#b91c1c';
      if (el.tipo === 'jugador_azul') c = '#0284c7';
      if (el.tipo === 'jugador_rojo') c = '#b91c1c';
      if (el.tipo === 'portero') c = '#eab308';
      svgElementsHtml += renderStickPuppetSvg(cx, cy, c);
    } else if (el.tipo === 'cono') {
      svgElementsHtml += renderConeSvg(cx, cy, el.label);
    } else if (el.tipo === 'aro') {
      svgElementsHtml += renderHoopSvg(cx, cy, el.color || '#ea580c');
    } else if (el.tipo === 'balon') {
      svgElementsHtml += renderBallSvg(cx, cy);
    } else if (el.tipo === 'banco') {
      svgElementsHtml += renderMatSvg(cx, cy, false);
    } else if (el.tipo === 'colchoneta') {
      svgElementsHtml += renderMatSvg(cx, cy, true);
    } else if (el.tipo === 'porteria') {
      svgElementsHtml += renderGoalSvg(cx, cy);
    } else if (el.tipo === 'flecha') {
      const x2 = typeof el.x2 === 'number' ? (el.x2 / 100) * width : cx + 80;
      const y2 = typeof el.y2 === 'number' ? (el.y2 / 100) * height : cy;
      svgElementsHtml += renderArrowSvg(cx, cy, x2, y2, el.color || '#0f766e', el.curva || 'arriba');
    }
  }

  return `
    <div class="tactical-pitch-box" style="margin-top: 4px; margin-bottom: 4px; width: 100%; display: flex; justify-content: center; page-break-inside: avoid !important; break-inside: avoid !important; box-sizing: border-box;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 480px; height: auto; display: block; border-radius: 8px; overflow: visible;">
        <!-- Fondo de pista con borde discontinuo redondeado -->
        <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="8" ry="8" fill="${bgColor}" stroke="${borderColor}" stroke-width="1.8" stroke-dasharray="4,4" />
        <!-- Elementos tácticos (Muñecos, conos numerados, flechas, aros, balones, etc.) -->
        ${svgElementsHtml}
      </svg>
    </div>
  `;
}

/**
 * Alias de compatibilidad
 */
export const getTacticalPitchSvg = (
  type: PitchType = 'pabellon',
  title = '',
  _width?: number,
  _height?: number
): string => {
  return getTacticalPitchHtml(type, title);
};
