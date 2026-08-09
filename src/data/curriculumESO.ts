import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

export const COMPETENCIAS_ESPECIFICAS_ESO: CompetenciaEspecifica[] = [
  {
    id: 'CE.EF.1',
    numero: 1,
    nombre: 'Estilo de vida activo y saludable',
    descripcion: 'Adoptar un estilo de vida activo y saludable, consolidando la práctica regular de actividades físicas, lúdicas y deportivas, y regulando comportamientos para potenciar la salud física, mental y social, así como medidas de responsabilidad.',
  },
  {
    id: 'CE.EF.2',
    numero: 2,
    nombre: 'Resolución de problemas en situaciones motrices',
    descripcion: 'Adaptar los elementos físicos, perceptivos y coordinativos, aplicando procesos de percepción, decisión y ejecución, adecuados a la lógica interna y a los objetivos de diferentes situaciones, para resolver situaciones motrices.',
  },
  {
    id: 'CE.EF.3',
    numero: 3,
    nombre: 'Autorregulación emocional e interacción social',
    descripcion: 'Desarrollar procesos de autorregulación e interacción en el marco de la práctica motriz, con actitud empática e inclusiva, demostrando habilidades sociales y estrategias de mediación en conflictos.',
  },
  {
    id: 'CE.EF.4',
    numero: 4,
    nombre: 'Manifestaciones de la cultura motriz',
    descripcion: 'Reconocer, participar y analizar críticamente diferentes manifestaciones lúdicas, físico-deportivas y artístico-expresivas, valorando su influencia y aportaciones estéticas a la cultura contemporánea y tradicional.',
  },
  {
    id: 'CE.EF.5',
    numero: 5,
    nombre: 'Interacción eficiente y sostenible con el entorno',
    descripcion: 'Interactuar con el entorno urbano y natural desde una perspectiva sostenible y responsable, evaluando los impactos ambientales y adoptando medidas de conservación en la práctica motriz.',
  }
];

export const CRITERIOS_EVALUACION_ESO: CriterioEvaluacion[] = [
  // 1º Ciclo ESO (1º a 3º ESO)
  { id: '1.1.1C', codigo: 'EFI.1.1.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Analizar los efectos de un estilo de vida activo, así como las repercusiones de un estilo de vida sedentario en la salud física y mental.' },
  { id: '1.2.1C', codigo: 'EFI.1.2.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Adoptar y aplicar medidas de higiene personal, postural y alimentaria en la práctica de la actividad física.' },
  { id: '1.3.1C', codigo: 'EFI.1.3.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Desarrollar un nivel adecuado de las capacidades físicas básicas orientadas a la salud.' },
  { id: '1.4.1C', codigo: 'EFI.1.4.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y aplicar medidas de seguridad y prevención de riesgos en las diferentes prácticas motrices.' },
  { id: '2.1.1C', codigo: 'EFI.2.1.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Resolver situaciones motrices de carácter individual, de oposición, colaboración y colaboración-oposición.' },
  { id: '2.2.1C', codigo: 'EFI.2.2.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Ejecutar de forma coordinada las habilidades motrices específicas requeridas.' },
  { id: '2.3.1C', codigo: 'EFI.2.3.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Transferir los aprendizajes técnicos y tácticos adquiridos a situaciones motrices nuevas.' },
  { id: '3.1.1C', codigo: 'EFI.3.1.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Gestionar de manera constructiva las propias emociones y comportamientos en situaciones de éxito y fracaso.' },
  { id: '3.2.1C', codigo: 'EFI.3.2.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Interactuar con actitud cooperativa, inclusiva y empática con los compañeros durante la práctica.' },
  { id: '3.3.1C', codigo: 'EFI.3.3.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Resolver los conflictos que puedan surgir en la práctica mediante el diálogo y la asertividad.' },
  { id: '4.1.1C', codigo: 'EFI.4.1.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Valorar y participar activamente en manifestaciones físico-deportivas tradicionales de Andalucía.' },
  { id: '4.2.1C', codigo: 'EFI.4.2.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Elaborar y poner en práctica composiciones y secuencias de movimiento de carácter artístico-expresivo.' },
  { id: '5.1.1C', codigo: 'EFI.5.1.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Analizar el impacto medioambiental de las actividades físico-deportivas y aplicar medidas de reducción.' },
  { id: '5.2.1C', codigo: 'EFI.5.2.1C', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Diseñar y realizar prácticas motrices en el medio natural y urbano de manera segura.' },
  
  // 2º Ciclo ESO (4º ESO)
  { id: '1.1.2C', codigo: 'EFI.1.1.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar, llevar a cabo y autogestionar un plan básico de actividad física orientada a la salud.' },
  { id: '1.2.2C', codigo: 'EFI.1.2.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Evaluar el propio estilo de vida y proponer acciones de mejora en alimentación, descanso y ejercicio.' },
  { id: '1.3.2C', codigo: 'EFI.1.3.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Aplicar protocolos básicos de intervención ante lesiones comunes en la práctica motriz (primeros auxilios).' },
  { id: '2.1.2C', codigo: 'EFI.2.1.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Resolver con éxito situaciones motrices complejas en contextos deportivos y de juego.' },
  { id: '2.2.2C', codigo: 'EFI.2.2.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Analizar e interpretar críticamente las ejecuciones motrices propias y de los demás.' },
  { id: '3.1.2C', codigo: 'EFI.3.1.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Mostrar autorregulación, resiliencia y deportividad (fair play) ante situaciones adversas.' },
  { id: '3.2.2C', codigo: 'EFI.3.2.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Asumir responsabilidades en la organización y liderazgo de actividades deportivas colectivas.' },
  { id: '4.1.2C', codigo: 'EFI.4.1.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente el deporte como fenómeno sociológico, cuestionando desigualdades.' },
  { id: '4.2.2C', codigo: 'EFI.4.2.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Diseñar y ejecutar producciones artísticas y coreográficas complejas en grupo.' },
  { id: '5.1.2C', codigo: 'EFI.5.1.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Fomentar el desarrollo sostenible desde el ámbito de la Educación Física.' },
  { id: '5.2.2C', codigo: 'EFI.5.2.2C', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Liderar y organizar eventos deportivos de bajo impacto ecológico en el medio natural.' }
];

export const SABERES_BASICOS_ESO: SaberBasico[] = [
  { codigo: 'ESO.A.1', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Todos', descripcion: 'Componentes de la condición física orientada a la salud. Métodos de entrenamiento.' },
  { codigo: 'ESO.A.2', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Todos', descripcion: 'Alimentación, hidratación e higiene. Prevención de hábitos perjudiciales.' },
  { codigo: 'ESO.A.3', bloque: 'A', bloqueNombre: 'Vida Activa y Saludable', ciclo: 'Todos', descripcion: 'Higiene postural y primeros auxilios (PAS, RCP básica, vendajes).' },
  { codigo: 'ESO.B.1', bloque: 'B', bloqueNombre: 'Organización y Gestión de la Actividad Física', ciclo: 'Todos', descripcion: 'Calentamiento general y específico. Planificación de la vuelta a la calma.' },
  { codigo: 'ESO.C.1', bloque: 'C', bloqueNombre: 'Resolución de Problemas en Situaciones Motrices', ciclo: 'Todos', descripcion: 'Principios tácticos en deportes de invasión, cancha dividida y muro.' },
  { codigo: 'ESO.C.2', bloque: 'C', bloqueNombre: 'Resolución de Problemas en Situaciones Motrices', ciclo: 'Todos', descripcion: 'Práctica de deportes alternativos y aplicación táctica para la igualdad.' },
  { codigo: 'ESO.D.1', bloque: 'D', bloqueNombre: 'Autorregulación Emocional e Interacción Social', ciclo: 'Todos', descripcion: 'Identificación y control de las emociones en situaciones competitivas. Respeto al adversario.' },
  { codigo: 'ESO.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la Cultura Motriz', ciclo: 'Todos', descripcion: 'Juegos motores y deportes tradicionales de Andalucía. Conciencia del fenómeno deportivo.' },
  { codigo: 'ESO.E.2', bloque: 'E', bloqueNombre: 'Manifestaciones de la Cultura Motriz', ciclo: 'Todos', descripcion: 'Prácticas de expresión corporal, ritmo y danza. Coreografías y acrosport.' },
  { codigo: 'ESO.F.1', bloque: 'F', bloqueNombre: 'Interacción Eficiente y Sostenible con el Entorno', ciclo: 'Todos', descripcion: 'Orientación con brújula y mapa. Senderismo, cabuyería y seguridad en la naturaleza.' },
  { codigo: 'ESO.F.2', bloque: 'F', bloqueNombre: 'Interacción Eficiente y Sostenible con el Entorno', ciclo: 'Todos', descripcion: 'Conservación del medio ambiente y alternativas sostenibles (plogging).' }
];
