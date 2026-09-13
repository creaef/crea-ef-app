import {
  SituacionAprendizaje,
  SesionTrabajo,
  ActividadEnSesion,
  JuegoActividadDB,
  Ciclo,
  TematicaEF,
  ModeloEstructuraSesion,
  ElementoRubrica,
  formatGameDescription,
  EtapaEducativa,
} from '../types';
import { BASE_DATOS_ACTIVIDADES } from '../data/activitiesDatabase';
import { TODAS_LAS_COMPETENCIAS, TODOS_LOS_CRITERIOS, TODOS_LOS_SABERES } from './curriculumHelpers';
import { ODS_LIST } from '../data/curriculumData';
import { MODELOS_ESTRUCTURA_SESION, PAUTAS_DUA_GLOBALES, ADAPTACIONES_NEAE_BASE, INSTRUMENTOS_EVALUACION_DEFAULT } from '../data/methodologiesAndModels';

// Filter database activities by cycle & theme
export function getActividadesFiltradas(ciclo: Ciclo, tematica: TematicaEF): JuegoActividadDB[] {
  let list = BASE_DATOS_ACTIVIDADES.filter(
    (act) => (act.ciclo === ciclo || act.ciclo === 'Todos') && act.tematica === tematica
  );

  // Fallback: If filtered list is small, include activities from "Todos" or related themes
  if (list.length < 3) {
    const fallbacks = BASE_DATOS_ACTIVIDADES.filter(
      (act) => act.ciclo === ciclo || act.ciclo === 'Todos'
    );
    list = [...list, ...fallbacks.filter((f) => !list.some((l) => l.id === f.id))];
  }
  return list;
}

// Map course to cycle
export function getCicloFromCurso(curso: string): Ciclo {
  if (curso.includes('años')) return 'Infantil';
  if (curso.includes('Primaria')) {
    if (curso.startsWith('1º') || curso.startsWith('2º')) return 'Primer Ciclo';
    if (curso.startsWith('3º') || curso.startsWith('4º')) return 'Segundo Ciclo';
    return 'Tercer Ciclo';
  }
  if (curso.includes('ESO')) {
    if (curso.startsWith('1º') || curso.startsWith('2º')) return '1º Ciclo ESO';
    return '2º Ciclo ESO';
  }
  if (curso.includes('Bachillerato')) return 'Bachillerato';
  return 'Todos';
}

export function getEtapaFromCurso(curso: string): EtapaEducativa {
  if (curso.includes('años')) return 'Infantil';
  if (curso.includes('Primaria')) return 'Primaria';
  if (curso.includes('ESO')) return 'ESO';
  if (curso.includes('Bachillerato')) return 'Bachillerato';
  return 'Primaria'; // Default
}

// Generate automatic sessions given model structure and activities database
export function generarSesionesAuto(
  numSesiones: number,
  ciclo: Ciclo,
  tematica: TematicaEF,
  modeloEstructura: ModeloEstructuraSesion,
  criteriosCodigos: string[]
): SesionTrabajo[] {
  const actividadesDisponibles = getActividadesFiltradas(ciclo, tematica);
  const modeloInfo = MODELOS_ESTRUCTURA_SESION.find((m) => m.id === modeloEstructura) || MODELOS_ESTRUCTURA_SESION[1];

  const iniciales = actividadesDisponibles.filter((a) => a.faseIdeal === 'Inicial');
  const principales = actividadesDisponibles.filter((a) => a.faseIdeal === 'Principal');
  const calmas = actividadesDisponibles.filter((a) => a.faseIdeal === 'Vuelta a la Calma');

  const sesiones: SesionTrabajo[] = [];

  for (let i = 1; i <= numSesiones; i++) {
    const fases: ActividadEnSesion[] = [];
    const materialesSet = new Set<string>();

    if (modeloEstructura === 'Modelo 1: Tradicional') {
      // 6 fases: Animación (10m), Principal Reto 1 (10m), Principal Reto 2 (10m), Principal Reto 3 (10m), Principal Reto 4 (10m), Vuelta a la Calma (10m)
      const juegoIni = iniciales[(i - 1) % (iniciales.length || 1)] || actividadesDisponibles[0];
      const p1 = principales[(i - 1) % (principales.length || 1)] || actividadesDisponibles[1] || juegoIni;
      const p2 = principales[i % (principales.length || 1)] || actividadesDisponibles[2] || p1;
      const p3 = principales[(i + 1) % (principales.length || 1)] || actividadesDisponibles[3 % actividadesDisponibles.length] || p2;
      const p4 = principales[(i + 2) % (principales.length || 1)] || actividadesDisponibles[4 % actividadesDisponibles.length] || p3;
      const juegoCalma = calmas[(i - 1) % (calmas.length || 1)] || actividadesDisponibles[actividadesDisponibles.length - 1];

      fases.push({
        fase: 'Animación (Fase Inicial)',
        duracionMin: 10,
        juegoId: juegoIni.id,
        nombreJuego: juegoIni.nombre,
        descripcion: juegoIni.descripcion,
        materiales: juegoIni.materiales,
        adaptacionDUA: juegoIni.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Reto Motriz 1',
        duracionMin: 10,
        juegoId: p1.id,
        nombreJuego: p1.nombre,
        descripcion: p1.descripcion,
        materiales: p1.materiales,
        adaptacionDUA: p1.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Reto Motriz 2',
        duracionMin: 10,
        juegoId: p2.id,
        nombreJuego: p2.nombre,
        descripcion: p2.descripcion,
        materiales: p2.materiales,
        adaptacionDUA: p2.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Reto Motriz 3',
        duracionMin: 10,
        juegoId: p3.id,
        nombreJuego: p3.nombre,
        descripcion: p3.descripcion,
        materiales: p3.materiales,
        adaptacionDUA: p3.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Reto Motriz 4',
        duracionMin: 10,
        juegoId: p4.id,
        nombreJuego: p4.nombre,
        descripcion: p4.descripcion,
        materiales: p4.materiales,
        adaptacionDUA: p4.atencionDiversidad,
      });

      fases.push({
        fase: 'Vuelta a la Calma',
        duracionMin: 10,
        juegoId: juegoCalma.id,
        nombreJuego: juegoCalma.nombre,
        descripcion: juegoCalma.descripcion,
        materiales: juegoCalma.materiales,
        adaptacionDUA: juegoCalma.atencionDiversidad,
      });
    } else if (modeloEstructura === 'Modelo 2: Competencial') {
      // 6 fases: Activación (10m), Exploración 1 (10m), Exploración 2 (10m), Estructuración (10m), Aplicación (10m), Reflexión (10m)
      const juego1 = iniciales[(i - 1) % (iniciales.length || 1)] || actividadesDisponibles[0];
      const p1 = principales[(i - 1) % (principales.length || 1)] || actividadesDisponibles[1] || juego1;
      const p2 = principales[i % (principales.length || 1)] || actividadesDisponibles[2] || p1;
      const p3 = principales[(i + 1) % (principales.length || 1)] || actividadesDisponibles[3 % actividadesDisponibles.length] || p2;
      const p4 = principales[(i + 2) % (principales.length || 1)] || actividadesDisponibles[4 % actividadesDisponibles.length] || p3;
      const juegoCalma = calmas[(i - 1) % (calmas.length || 1)] || actividadesDisponibles[actividadesDisponibles.length - 1];

      fases.push({
        fase: 'Activación y Conexión',
        duracionMin: 10,
        juegoId: juego1.id,
        nombreJuego: `Reto de Entrada: ${juego1.nombre}`,
        descripcion: `Presentación del problema motriz de la sesión y juego de toma de contacto: ${juego1.descripcion}`,
        materiales: juego1.materiales,
        adaptacionDUA: juego1.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Exploración 1',
        duracionMin: 10,
        juegoId: p1.id,
        nombreJuego: p1.nombre,
        descripcion: `Ensayo y error en grupos para resolver la tarea motriz propuesta: ${p1.descripcion}`,
        materiales: p1.materiales,
        adaptacionDUA: p1.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Exploración 2',
        duracionMin: 10,
        juegoId: p2.id,
        nombreJuego: p2.nombre,
        descripcion: `Progresión de la tarea motriz incorporando oposición/cooperación activa: ${p2.descripcion}`,
        materiales: p2.materiales,
        adaptacionDUA: p2.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Estructuración Táctica',
        duracionMin: 10,
        juegoId: p3.id,
        nombreJuego: `Puesta a punto: ${p3.nombre}`,
        descripcion: `Sistematización de los aprendizajes y patrones técnicos/tácticos: ${p3.descripcion}`,
        materiales: p3.materiales,
        adaptacionDUA: p3.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Aplicación y Desafío',
        duracionMin: 10,
        juegoId: p4.id,
        nombreJuego: `Desafío Aplicado: ${p4.nombre}`,
        descripcion: `Puesta en práctica final en situación real inclusiva: ${p4.descripcion}`,
        materiales: p4.materiales,
        adaptacionDUA: p4.atencionDiversidad,
      });

      fases.push({
        fase: 'Vuelta a la Calma / Reflexión Formativa',
        duracionMin: 10,
        juegoId: juegoCalma.id,
        nombreJuego: juegoCalma.nombre,
        descripcion: `Puesta en común, autorregulación y feedback formativo: ${juegoCalma.descripcion}`,
        materiales: juegoCalma.materiales,
        adaptacionDUA: juegoCalma.atencionDiversidad,
      });
    } else {
      // Modelo 3: Metodologías Activas (Planificación 10m, 4 Estaciones/Postas de 10m c/u, Evaluación 10m)
      const p1 = principales[(i - 1) % (principales.length || 1)] || actividadesDisponibles[0];
      const p2 = principales[i % (principales.length || 1)] || actividadesDisponibles[1] || p1;
      const p3 = principales[(i + 1) % (principales.length || 1)] || actividadesDisponibles[2 % actividadesDisponibles.length] || p2;
      const p4 = principales[(i + 2) % (principales.length || 1)] || actividadesDisponibles[3 % actividadesDisponibles.length] || p3;
      const juegoCalma = calmas[(i - 1) % (calmas.length || 1)] || actividadesDisponibles[actividadesDisponibles.length - 1];

      fases.push({
        fase: 'Planificación / Asamblea Inicial',
        duracionMin: 10,
        nombreJuego: `Asamblea de Roles y Presentación de Misiones (Sesión ${i})`,
        descripcion:
          'Explicación del reto de estaciones de trabajo en el patio, reparto de roles rotativos (capitán, material, observador) y consenso de normas.',
        materiales: ['Pizarra táctica', 'Petos de roles'],
      });

      fases.push({
        fase: 'Parte Principal / Estación 1',
        duracionMin: 10,
        juegoId: p1.id,
        nombreJuego: `Estación 1: ${p1.nombre}`,
        descripcion: `Reto motriz en la posta 1: ${p1.descripcion}`,
        materiales: p1.materiales,
        adaptacionDUA: p1.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Estación 2',
        duracionMin: 10,
        juegoId: p2.id,
        nombreJuego: `Estación 2: ${p2.nombre}`,
        descripcion: `Reto motriz en la posta 2: ${p2.descripcion}`,
        materiales: p2.materiales,
        adaptacionDUA: p2.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Estación 3',
        duracionMin: 10,
        juegoId: p3.id,
        nombreJuego: `Estación 3: ${p3.nombre}`,
        descripcion: `Reto motriz en la posta 3: ${p3.descripcion}`,
        materiales: p3.materiales,
        adaptacionDUA: p3.atencionDiversidad,
      });

      fases.push({
        fase: 'Parte Principal / Estación 4',
        duracionMin: 10,
        juegoId: p4.id,
        nombreJuego: `Estación 4: ${p4.nombre}`,
        descripcion: `Reto motriz en la posta 4: ${p4.descripcion}`,
        materiales: p4.materiales,
        adaptacionDUA: p4.atencionDiversidad,
      });

      fases.push({
        fase: 'Evaluación Grupal / Puesta en Común',
        duracionMin: 10,
        juegoId: juegoCalma.id,
        nombreJuego: juegoCalma.nombre,
        descripcion: `Reflexión compartida en círculo y registro en el Cuaderno de Equipo o Diana de Autoevaluación: ${juegoCalma.descripcion}`,
        materiales: juegoCalma.materiales,
        adaptacionDUA: juegoCalma.atencionDiversidad,
      });
    }

    // Ensure all phase descriptions are formatted into 4 regulatory sections
    fases.forEach((f) => {
      f.descripcion = formatGameDescription(f.descripcion);
      f.materiales.forEach((m) => materialesSet.add(m));
    });

    sesiones.push({
      numeroSesion: i,
      titulo: `Sesión ${i}: Progresión ${i === 1 ? 'Inicial' : i === numSesiones ? 'de Consolidación y Reto Final' : 'de Desarrollo Motriz'}`,
      objetivoSesion: `Experimentar y resolver situaciones motrices de ${tematica.toLowerCase()} aplicando criterios de cooperación e inclusión.`,
      fases,
      criteriosTrabajados: criteriosCodigos,
      materialesTotales: Array.from(materialesSet),
    });
  }

  return sesiones;
}

// Generate default rubric from selected criteria
export function generarRubricaPorDefecto(criteriosCodigos: string[]): ElementoRubrica[] {
  return criteriosCodigos.map((cod) => {
    const critObj = TODOS_LOS_CRITERIOS.find((c) => c.codigo === cod || c.id === cod);
    const desc = critObj ? critObj.descripcion : 'Demuestra el criterio de evaluación seleccionado.';
    return {
      criterioCodigo: cod,
      criterioTexto: desc,
      niveles: [
        {
          nivel: 'Iniciado (1-4)',
          descriptor: `Muestra dificultades para ${desc.toLowerCase().slice(0, 80)}... Requiere ayuda constante y supervisión docente.`,
        },
        {
          nivel: 'En proceso (5-6)',
          descriptor: `Realiza de forma básica o discontinua el desempeño: ${desc.toLowerCase().slice(0, 90)}... con ayuda puntual entre iguales.`,
        },
        {
          nivel: 'Conseguido (7-8)',
          descriptor: `Consigue adecuadamente y de forma autónoma el desempeño: ${desc}`,
        },
        {
          nivel: 'Excelente (9-10)',
          descriptor: `Demuestra un dominio sobresaliente, apoya a sus compañeros e integra con creatividad y espíritu crítico: ${desc}`,
        },
      ],
    };
  });
}

// Generate exact Markdown output string required by the prompt
export function exportarSdAaMarkdown(sda: SituacionAprendizaje): string {
  const compsList = sda.competenciasSeleccionadas
    .map((id) => {
      const c = TODAS_LAS_COMPETENCIAS.find((item) => item.id === id);
      return c ? `* **${c.id}:** ${c.nombre} (${c.descripcion})` : `* **${id}**`;
    })
    .join('\n');

  const critsList = sda.criteriosSeleccionados
    .map((cod) => {
      const cr = TODOS_LOS_CRITERIOS.find((item) => item.codigo === cod || item.id === cod);
      return cr ? `* **${cr.codigo}:** ${cr.descripcion}` : `* **${cod}**`;
    })
    .join('\n');

  const saberesList = sda.saberesSeleccionados
    .map((cod) => {
      const sb = TODOS_LOS_SABERES.find((item) => item.codigo === cod);
      return sb ? `* **[Bloque ${sb.bloque}] ${sb.codigo}:** ${sb.descripcion}` : `* **${cod}**`;
    })
    .join('\n');

  const odsList = sda.odsSeleccionados
    .map((oId) => {
      const o = ODS_LIST.find((item) => item.id === oId);
      return o ? `* **${o.nombre}:** ${o.descripcion}` : `* **${oId}**`;
    })
    .join('\n');

  const descOpList = sda.descriptoresOperativos.map((d) => `\`${d}\``).join(', ');

  // Sessions markdown formatting
  const sesionesMd = sda.sesiones
    .map((ses) => {
      const fasesStr = ses.fases
        .map(
          (f) =>
            `    * ***${f.fase} (${f.duracionMin} min):*** **${f.nombreJuego}**. ${f.descripcion} *(Material: ${f.materiales.join(', ') || 'Sin material específico'})*`
        )
        .join('\n');

      return `* **Sesión ${ses.numeroSesion}: ${ses.titulo}** (60 min)\n${fasesStr}`;
    })
    .join('\n\n');

  // NEAE adaptations formatting
  const neaeMd = sda.adaptacionesNEAE
    .map(
      (a) =>
        `* **Adaptaciones para Necesidad ${a.categoria}:**\n  - *Materiales y Espacio:* ${a.materialesYEspacio || a.material || ''}\n  - *Pautas metodológicas/Reglas:* ${a.reglasYMetodologia || ''}`
    )
    .join('\n\n');

  // Rubric formatting
  const rubricaMd = sda.rubrica
    .map((r) => {
      const nivelesStr = r.niveles
        .map((n) => `  - **${n.nivel}:** ${n.descriptor}`)
        .join('\n');
      return `* **Criterio ${r.criterioCodigo}:** ${r.criterioTexto}\n${nivelesStr}`;
    })
    .join('\n\n');

  // Resources formatting
  const espStr = sda.recursosEspaciales.map((r) => `* ${r}`).join('\n');
  const matStr = sda.recursosMateriales.map((r) => `* ${r}`).join('\n');
  const extStr = sda.recursosExternos.map((r) => `* ${r}`).join('\n');

  return `---
## TÍTULO DE LA SITUACIÓN DE APRENDIZAJE: ${sda.titulo}
**Curso:** ${sda.curso} | **Ciclo:** ${sda.ciclo} | **Trimestre:** ${sda.trimestre} | **Nº de Sesiones:** ${sda.numSesiones}

### 1. Justificación y Temática
**Temática Principal:** ${sda.tematica}

${sda.justificacion}

### 2. Elementos Curriculares
#### Competencias Específicas
${compsList}

#### Criterios de Evaluación (Andalucía - Normativa LOMLOE)
${critsList}

#### Saberes Básicos
${saberesList}

#### ODS, Temas Transversales y Descriptores Operativos
${odsList}
* **Descriptores Operativos del Perfil de Salida:** ${descOpList}

### 3. Metodología
* **Metodología Activa Principal:** ${sda.metodologiaActiva}
* **Modelo de Estructuración de Sesión:** ${sda.modeloEstructura}

*Propuesta didáctica basada en la progresión lógica de situaciones motrices, fomentando el aprendizaje significativo, la autonomía, la autorregulación emocional y el trabajo cooperativo en el patio de Educación Física.*

### 4. Desarrollo de las Sesiones de Trabajo (Desglose estructurado y fluido)
${sesionesMd}

### 5. Producto Final y Reto Motor Colectivo
${sda.productoFinal}

### 6. Atención a la Diversidad (Marco DUA y Adaptaciones NEAE)
#### Pautas DUA Universales
${sda.pautasDUAGlobales.map((p) => `* ${p}`).join('\n')}

#### Módulo NEAE (Atención a Casuísticas Específicas)
${neaeMd}

### 7. Evaluación Inicial y Diagnóstica (Herramientas formativas)
#### Evaluación Inicial
${(sda.evaluacionInicial || '').replace(/\bCOMING\b|\bCOMING\s+SOON\b/gi, '').trim()}

#### Instrumentos de Evaluación Formativa Utilizados
${sda.instrumentosEvaluacion.map((i) => `* **${i.tipo}:** ${i.descripcion} (${i.aplicacion})`).join('\n')}

#### Rúbrica de Evaluación Criterial
${rubricaMd}

### 8. Conexiones Interdisciplinares
* **Matemáticas:** Conteo de puntos, distancias y tiempos, orientación geométrica y estadísticas.
* **Lengua Castellana:** Comprensión de reglamentos, vocabulario motriz específico y asambleas reflexivas.
* **Conocimiento del Medio:** Frecuencia cardíaca/respiratoria, higiene corporal, salud activa y respeto ambiental.
* **Educación Artística:** Expresión corporal, ritmo, coordinación colectiva y diseño de retos.
* **Competencia Digital:** Análisis audiovisual y formularios interactivos de coevaluación.

### 9. Recursos Didácticos, Instalaciones y Materiales
#### Recursos Espaciales e Instalaciones
${espStr}

#### Recursos Materiales Deportivos y Escolares
${matStr}

#### Recursos Digitales y Externos
${extStr}
---`;
}
