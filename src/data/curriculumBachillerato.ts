import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

export const COMPETENCIAS_ESPECIFICAS_BACHILLERATO: CompetenciaEspecifica[] = [
  {
    id: 'CE.EF.1',
    numero: 1,
    nombre: 'Estilo de vida activo y saludable',
    descripcion: 'Integrar la práctica de actividad física y el deporte en el propio estilo de vida de forma autónoma y saludable, evaluando críticamente los factores que influyen en la salud y adoptando decisiones responsables para el bienestar personal y social.',
  },
  {
    id: 'CE.EF.2',
    numero: 2,
    nombre: 'Resolución de problemas en situaciones motrices',
    descripcion: 'Resolver situaciones motrices complejas de forma eficaz, creativa y segura, transfiriendo aprendizajes y aplicando procesos cognitivos, tácticos y técnicos en diferentes modalidades motrices y deportivas.',
  },
  {
    id: 'CE.EF.3',
    numero: 3,
    nombre: 'Autorregulación emocional e interacción social',
    descripcion: 'Interactuar con empatía, equidad y respeto en contextos motrices, liderando dinámicas de grupo, regulando las emociones, resolviendo conflictos de forma pacífica y promoviendo la inclusión y la igualdad de género.',
  },
  {
    id: 'CE.EF.4',
    numero: 4,
    nombre: 'Manifestaciones de la cultura motriz',
    descripcion: 'Diseñar, participar y valorar prácticas motrices, deportivas y artístico-expresivas, reconociendo su impacto sociocultural, estético y comunicativo, y contribuyendo a la preservación y evolución de la cultura motriz.',
  },
  {
    id: 'CE.EF.5',
    numero: 5,
    nombre: 'Interacción eficiente y sostenible con el entorno',
    descripcion: 'Planificar y participar en actividades físicas en el medio natural y urbano, promoviendo su conservación y mejora, evaluando el impacto ambiental y aplicando principios de sostenibilidad y seguridad comunitaria.',
  }
];

export const CRITERIOS_EVALUACION_BACHILLERATO: CriterioEvaluacion[] = [
  // 1º Bachillerato (Único curso obligatorio de EF en Bachillerato en LOMLOE / Andalucía)
  { id: '1.1.BACH', codigo: 'EFI.1.1.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.1', descripcion: 'Planificar, llevar a cabo y autogestionar un programa de actividad física para la mejora de la condición física y la salud, fundamentado en bases científicas.' },
  { id: '1.2.BACH', codigo: 'EFI.1.2.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente el impacto de prácticas sociales vinculadas a la actividad física, cuestionando falsas creencias y estereotipos estéticos.' },
  { id: '1.3.BACH', codigo: 'EFI.1.3.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.1', descripcion: 'Actuar de forma eficaz ante accidentes, aplicando protocolos de prevención, primeros auxilios y técnicas de soporte vital básico (RCP).' },
  { id: '2.1.BACH', codigo: 'EFI.2.1.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.2', descripcion: 'Resolver situaciones motrices complejas con eficacia, fluidez y creatividad, optimizando la toma de decisiones en contextos deportivos reales.' },
  { id: '2.2.BACH', codigo: 'EFI.2.2.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.2', descripcion: 'Transferir conocimientos técnicos y principios tácticos entre diferentes modalidades deportivas y situaciones motrices.' },
  { id: '2.3.BACH', codigo: 'EFI.2.3.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.2', descripcion: 'Analizar y evaluar críticamente la ejecución técnica y táctica propia y ajena, utilizando herramientas de observación.' },
  { id: '3.1.BACH', codigo: 'EFI.3.1.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.3', descripcion: 'Gestionar eficazmente las emociones y la tensión en contextos de alta demanda motriz y competitiva, manteniendo la motivación.' },
  { id: '3.2.BACH', codigo: 'EFI.3.2.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.3', descripcion: 'Asumir roles de liderazgo, arbitraje y mediación en actividades colectivas, garantizando la equidad, la inclusión y la participación.' },
  { id: '3.3.BACH', codigo: 'EFI.3.3.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.3', descripcion: 'Actuar con deportividad y respeto, promoviendo activamente el juego limpio y rechazando cualquier comportamiento violento o discriminatorio.' },
  { id: '4.1.BACH', codigo: 'EFI.4.1.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente el deporte como fenómeno sociocultural contemporáneo, valorando su evolución histórica y su impacto mediático.' },
  { id: '4.2.BACH', codigo: 'EFI.4.2.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.4', descripcion: 'Diseñar, dirigir y ejecutar de forma colaborativa producciones coreográficas, expresivas o artísticas complejas, con intencionalidad comunicativa.' },
  { id: '5.1.BACH', codigo: 'EFI.5.1.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.5', descripcion: 'Promover estilos de vida sostenibles a través del diseño y participación en proyectos vinculados a la actividad física en el entorno.' },
  { id: '5.2.BACH', codigo: 'EFI.5.2.BACH', ciclo: 'Bachillerato', competenciaId: 'CE.EF.5', descripcion: 'Liderar y organizar de manera autónoma actividades físicas y deportivas en el medio natural y urbano, aplicando normativas de seguridad y bajo impacto ecológico.' }
];

export const SABERES_BASICOS_BACHILLERATO: SaberBasico[] = [
  { codigo: 'BACH.A.1', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Bachillerato', descripcion: 'Principios fisiológicos y metodológicos del entrenamiento. Diseño y control de planes individualizados para el desarrollo de capacidades motrices.' },
  { codigo: 'BACH.A.2', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Bachillerato', descripcion: 'Nutrición deportiva, ergogenia e hidratación. Análisis crítico de modas corporales y suplementación.' },
  { codigo: 'BACH.A.3', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Bachillerato', descripcion: 'Posturología avanzada aplicada. Técnicas de relajación y respiración para la gestión del estrés.' },
  { codigo: 'BACH.B.1', bloque: 'B', bloqueNombre: 'Organización y Gestión de la Actividad Física', ciclo: 'Bachillerato', descripcion: 'Protocolos de actuación ante emergencias. Soporte Vital Básico (SVB), RCP y manejo del Desfibrilador Externo Semiautomático (DESA).' },
  { codigo: 'BACH.C.1', bloque: 'C', bloqueNombre: 'Resolución de Problemas en Situaciones Motrices', ciclo: 'Bachillerato', descripcion: 'Perfeccionamiento técnico y aplicación táctica en deportes colectivos, individuales y de raqueta. Biomecánica básica aplicada.' },
  { codigo: 'BACH.C.2', bloque: 'C', bloqueNombre: 'Resolución de Problemas en Situaciones Motrices', ciclo: 'Bachillerato', descripcion: 'Diseño e innovación en modalidades deportivas alternativas y emergentes, promoviendo la coeducación.' },
  { codigo: 'BACH.D.1', bloque: 'D', bloqueNombre: 'Autorregulación Emocional e Interacción Social', ciclo: 'Bachillerato', descripcion: 'Técnicas de liderazgo, arbitraje y gestión de la dinámica de grupos. Psicología aplicada al rendimiento motor.' },
  { codigo: 'BACH.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la Cultura Motriz', ciclo: 'Bachillerato', descripcion: 'Proyectos coreográficos grupales avanzados, teatros físicos, danzas urbanas y montajes de gimnasia acrobática o acrosport.' },
  { codigo: 'BACH.E.2', bloque: 'E', bloqueNombre: 'Manifestaciones de la Cultura Motriz', ciclo: 'Bachillerato', descripcion: 'Evolución histórica y sociocultural del deporte contemporáneo en España y Andalucía. Valores olímpicos.' },
  { codigo: 'BACH.F.1', bloque: 'F', bloqueNombre: 'Interacción Eficiente y Sostenible con el Entorno', ciclo: 'Bachillerato', descripcion: 'Planificación autónoma de actividades físicas en el medio natural (escalada deportiva, carreras de orientación, senderismo prolongado).' },
  { codigo: 'BACH.F.2', bloque: 'F', bloqueNombre: 'Interacción Eficiente y Sostenible con el Entorno', ciclo: 'Bachillerato', descripcion: 'Gestión de riesgos en la naturaleza y ecología deportiva. Participación en proyectos de preservación ambiental a través del movimiento.' }
];
