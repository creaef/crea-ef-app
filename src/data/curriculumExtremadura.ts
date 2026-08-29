import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// EXTREMADURA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia 1', descripcion: 'Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física y el cuidado del cuerpo, valorando los beneficios físicos, mentales y sociales.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia 2', descripcion: 'Resolver situaciones motrices con eficacia, iniciativa y creatividad en diversos contextos, aplicando habilidades motrices, perceptivo-motrices y capacidades físicas.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia 3', descripcion: 'Desarrollar procesos de autorregulación emocional y habilidades sociales a través del juego y las actividades motrices, fomentando el respeto, la inclusión y el trabajo en equipo.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia 4', descripcion: 'Reconocer y practicar diversas manifestaciones del movimiento (juegos tradicionales, expresiones corporales y danzas), comprendiendo su valor cultural y patrimonial.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia 5', descripcion: 'Interactuar con el medio natural y urbano a través de actividades motrices, promoviendo su cuidado, conservación y la sostenibilidad.' }
];

export const CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA: CriterioEvaluacion[] = [
  { id: '1.1.1', codigo: 'EFI.1.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar los efectos beneficiosos de la actividad física y del juego sobre la salud física y mental en su vida cotidiana.' },
  { id: '1.1.2', codigo: 'EFI.1.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Adoptar hábitos básicos de higiene corporal, posturales y de alimentación saludable tras la práctica de actividad física.' },
  { id: '1.2.1', codigo: 'EFI.1.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Emplear habilidades motrices básicas (desplazamientos, saltos, giros, lanzamientos) y capacidades perceptivo motrices en juegos simples.' },
  { id: '1.2.2', codigo: 'EFI.1.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Proponer soluciones motrices creativas ante situaciones de juego estructurado o libre.' },
  { id: '1.3.1', codigo: 'EFI.1.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Reconocer y manifestar emociones básicas en actividades motrices y juegos cooperativos.' },
  { id: '1.3.2', codigo: 'EFI.1.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Aceptar y respetar las reglas de los juegos, colaborando activamente con el grupo sin discriminación.' },
  { id: '1.4.1', codigo: 'EFI.1.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Participar en juegos populares y tradicionales propios del entorno de Extremadura de forma activa.' },
  { id: '1.4.2', codigo: 'EFI.1.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Utilizar el cuerpo y el movimiento como medio de expresión artística y comunicación sencilla.' },
  { id: '1.5.1', codigo: 'EFI.1.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Realizar actividades motrices en entornos naturales o urbanos próximos respetando las normas básicas de seguridad.' },
  { id: '1.5.2', codigo: 'EFI.1.5.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Desarrollar conductas básicas de respeto y cuidado hacia los espacios naturales y el medio ambiente.' },

  { id: '2.1.1', codigo: 'EFI.2.1.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Distinguir hábitos saludables de aquellos nocivos para la salud en relación con la práctica física y la alimentación.' },
  { id: '2.1.2', codigo: 'EFI.2.1.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Aplicar de forma autónoma hábitos de calentamiento, higiene corporal y postura correcta en la práctica motriz.' },
  { id: '2.2.1', codigo: 'EFI.2.2.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Combinar y ajustar habilidades motrices básicas y genéricas en el marco de actividades físicas y juegos reglados.' },
  { id: '2.2.2', codigo: 'EFI.2.2.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Resolver problemas motrices adoptando decisiones tácticas básicas y adecuadas al contexto.' },
  { id: '2.3.1', codigo: 'EFI.2.3.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Gestionar adecuadamente la frustración y la agresividad en situaciones competitivas y de juego.' },
  { id: '2.3.2', codigo: 'EFI.2.3.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Mostrar actitudes inclusivas y cooperativas, rechazando conductas de exclusión o discriminación en las sesiones.' },
  { id: '2.4.1', codigo: 'EFI.2.4.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Valorar la riqueza del patrimonio cultural extremeño a través de la práctica de sus juegos y manifestaciones folclóricas.' },
  { id: '2.4.2', codigo: 'EFI.2.4.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Elaborar y representar pequeñas composiciones corporales o danzas grupales de forma coordinada.' },
  { id: '2.5.1', codigo: 'EFI.2.5.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Desplazarse con soltura y orientación en el medio natural o urbano utilizando técnicas básicas de exploración.' },
  { id: '2.5.2', codigo: 'EFI.2.5.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Aplicar medidas activas para la conservación de los espacios naturales donde se desarrolla la actividad física.' },

  { id: '3.1.1', codigo: 'EFI.3.1.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Planificar de forma guiada rutinas sencillas de actividad física vinculadas a un estilo de vida saludable y activo.' },
  { id: '3.1.2', codigo: 'EFI.3.1.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Analizar de forma crítica los riesgos derivados del sedentarismo y la utilización no autorregulada de las tecnologías.' },
  { id: '3.2.1', codigo: 'EFI.3.2.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Utilizar habilidades motrices específicas y capacidades físicas condicionales con precisión y adaptabilidad.' },
  { id: '3.2.2', codigo: 'EFI.3.2.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar estrategias tácticas individuales y colectivas orientadas a la resolución eficiente de situaciones de juego o deporte.' },
  { id: '3.3.1', codigo: 'EFI.3.3.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Utilizar estrategias de autorregulación emocional para resolver conflictos de forma pacífica y mediada en la práctica motriz.' },
  { id: '3.3.2', codigo: 'EFI.3.3.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Liderar o cooperar activamente en equipos heterogéneos fomentando el juego limpio y la equidad de género.' },
  { id: '3.4.1', codigo: 'EFI.3.4.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Practicar y analizar juegos tradicionales de Extremadura y de otras culturas, reconociéndolos como patrimonio inmaterial.' },
  { id: '3.4.2', codigo: 'EFI.3.4.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Crear y ejecutar propuestas dramáticas o expresivas colectivas integrando música, vestuario o escenografía básica.' },
  { id: '3.5.1', codigo: 'EFI.3.5.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Organizar y llevar a cabo actividades en el medio natural o urbano (senderismo, orientación) respetando normas de seguridad y preservación.' },
  { id: '3.5.2', codigo: 'EFI.3.5.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Adoptar un compromiso activo con el desarrollo sostenible, minimizando la huella ecológica durante las prácticas físicas al aire libre.' }
];

export const SABERES_BASICOS_EXTREMADURA_PRIMARIA: SaberBasico[] = [
  { codigo: 'EFI.A.1', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Primer Ciclo', descripcion: 'Habilidades higiénico-sanitarias y postura en el ejercicio. Alimentación equilibrada, hidratación y descanso. Prevención de accidentes y autoprotección en el juego.' },
  { codigo: 'EFI.B.1', bloque: 'B', bloqueNombre: 'Eficiencia y resolución motriz', ciclo: 'Primer Ciclo', descripcion: 'Esquema corporal, estructuración espacio-temporal y equilibrio. Habilidades motrices básicas y específicas. Táctica, toma de decisiones y capacidades físicas condicionales.' },
  { codigo: 'EFI.C.1', bloque: 'C', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Primer Ciclo', descripcion: 'Gestión de emociones (frustración, éxito, fracaso) en la práctica. Juego limpio (fair play), cooperación, inclusión y coeducación. Resolución pacífica de conflictos en entornos motrices.' },
  { codigo: 'EFI.D.1', bloque: 'D', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Primer Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de Extremadura. Expresión corporal, lenguaje corporal, dramatización y danzas. Valoración del patrimonio cultural extremeño a través del juego.' },
  { codigo: 'EFI.E.1', bloque: 'E', bloqueNombre: 'Interacción con el medio natural y urbano', ciclo: 'Primer Ciclo', descripcion: 'Prácticas de orientación y exploración espacial. Normas de seguridad en entornos naturales y urbanos. Educación ambiental, cuidado del espacio público y desarrollo sostenible.' },

  { codigo: 'EFI.A.2', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Segundo Ciclo', descripcion: 'Habilidades higiénico-sanitarias y postura en el ejercicio. Alimentación equilibrada, hidratación y descanso. Prevención de accidentes y autoprotección en el juego.' },
  { codigo: 'EFI.B.2', bloque: 'B', bloqueNombre: 'Eficiencia y resolución motriz', ciclo: 'Segundo Ciclo', descripcion: 'Esquema corporal, estructuración espacio-temporal y equilibrio. Habilidades motrices básicas y específicas. Táctica, toma de decisiones y capacidades físicas condicionales.' },
  { codigo: 'EFI.C.2', bloque: 'C', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Segundo Ciclo', descripcion: 'Gestión de emociones (frustración, éxito, fracaso) en la práctica. Juego limpio (fair play), cooperación, inclusión y coeducación. Resolución pacífica de conflictos en entornos motrices.' },
  { codigo: 'EFI.D.2', bloque: 'D', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Segundo Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de Extremadura. Expresión corporal, lenguaje corporal, dramatización y danzas. Valoración del patrimonio cultural extremeño a través del juego.' },
  { codigo: 'EFI.E.2', bloque: 'E', bloqueNombre: 'Interacción con el medio natural y urbano', ciclo: 'Segundo Ciclo', descripcion: 'Prácticas de orientación y exploración espacial. Normas de seguridad en entornos naturales y urbanos. Educación ambiental, cuidado del espacio público y desarrollo sostenible.' },

  { codigo: 'EFI.A.3', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Tercer Ciclo', descripcion: 'Habilidades higiénico-sanitarias y postura en el ejercicio. Alimentación equilibrada, hidratación y descanso. Prevención de accidentes y autoprotección en el juego.' },
  { codigo: 'EFI.B.3', bloque: 'B', bloqueNombre: 'Eficiencia y resolución motriz', ciclo: 'Tercer Ciclo', descripcion: 'Esquema corporal, estructuración espacio-temporal y equilibrio. Habilidades motrices básicas y específicas. Táctica, toma de decisiones y capacidades físicas condicionales.' },
  { codigo: 'EFI.C.3', bloque: 'C', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Tercer Ciclo', descripcion: 'Gestión de emociones (frustración, éxito, fracaso) en la práctica. Juego limpio (fair play), cooperación, inclusión y coeducación. Resolución pacífica de conflictos en entornos motrices.' },
  { codigo: 'EFI.D.3', bloque: 'D', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Tercer Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de Extremadura. Expresión corporal, lenguaje corporal, dramatización y danzas. Valoración del patrimonio cultural extremeño a través del juego.' },
  { codigo: 'EFI.E.3', bloque: 'E', bloqueNombre: 'Interacción con el medio natural y urbano', ciclo: 'Tercer Ciclo', descripcion: 'Prácticas de orientación y exploración espacial. Normas de seguridad en entornos naturales y urbanos. Educación ambiental, cuidado del espacio público y desarrollo sostenible.' }
];

// ==========================================
// EXTREMADURA - ESO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_EXTREMADURA_ESO: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Vida activa y saludable', descripcion: 'Adoptar un estilo de vida activo y saludable, planificando e incorporando prácticas motrices reguladas y rutinas de autocuidado, para favorecer el bienestar físico, mental y social.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Resolución de problemas en situaciones motrices', descripcion: 'Resolver situaciones motrices con eficacia, creatividad y autonomía, aplicando habilidades motrices específicas, estrategias de juego y mecanismos de percepción, decisión y ejecución.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Autorregulación emocional e interacción social', descripcion: 'Desarrollar procesos de autorregulación emocional y habilidades sociales en la práctica motriz, fomentando el juego limpio, el trabajo en equipo, la inclusión y el rechazo a cualquier tipo de discriminación o violencia.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Manifestaciones de la cultura motriz', descripcion: 'Valorar y practicar diversas manifestaciones de la cultura motriz (deportivas, expresivas y tradicionales), analizando su evolución, su dimensión sociocultural y la perspectiva de género.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Interacción eficiente y sostenible con el entorno', descripcion: 'Interactuar de forma eficiente, segura y ecosostenible con el entorno natural y urbano en la práctica de actividades físicas, promoviendo el cuidado del medio ambiente y la movilidad activa.' }
];

export const CRITERIOS_EVALUACION_EXTREMADURA_ESO: CriterioEvaluacion[] = [
  { id: '1.1.1', codigo: 'EFI.1.1.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar rutinas sencillas de actividad física orientadas a la salud.' },
  { id: '1.1.2', codigo: 'EFI.1.1.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Aplicar autonomía en el calentamiento, higiene y alimentación.' },
  { id: '1.1.3', codigo: 'EFI.1.1.3', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Prevenir lesiones y aplicar primeros auxilios básicos.' },
  { id: '1.2.1', codigo: 'EFI.1.2.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Adaptar las habilidades motrices específicas a situaciones reales de juego.' },
  { id: '1.2.2', codigo: 'EFI.1.2.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Resolver problemas tácticos de forma coordinada y cooperativa.' },
  { id: '1.2.3', codigo: 'EFI.1.2.3', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Evaluar el desempeño motor propio y colectivo.' },
  { id: '1.3.1', codigo: 'EFI.1.3.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Controlar las emociones en situaciones de competición o frustración.' },
  { id: '1.3.2', codigo: 'EFI.1.3.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Respetar las reglas y participar activamente en tareas cooperativas.' },
  { id: '1.3.3', codigo: 'EFI.1.3.3', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Rechazar activamente cualquier conducta discriminatoria o violenta.' },
  { id: '1.4.1', codigo: 'EFI.1.4.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Practicar juegos tradicionales y deportes manifestando interés cultural.' },
  { id: '1.4.2', codigo: 'EFI.1.4.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Realizar composiciones expresivas sencillas individuales o grupales.' },
  { id: '1.5.1', codigo: 'EFI.1.5.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Realizar actividades físicas en el entorno natural/urbano con seguridad.' },
  { id: '1.5.2', codigo: 'EFI.1.5.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Utilizar el transporte activo y respetar las normas de educación vial.' },

  { id: '2.1.1', codigo: 'EFI.2.1.1', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular planes de entrenamiento orientados a la salud personal.' },
  { id: '2.1.2', codigo: 'EFI.2.1.2', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente mitos, dietas engañosas y productos milagro.' },
  { id: '2.1.3', codigo: 'EFI.2.1.3', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Aplicar protocolos específicos de emergencia y salvamento.' },
  { id: '2.2.1', codigo: 'EFI.2.2.1', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Ejecutar proyectos motores complejos con autonomía táctica y técnica.' },
  { id: '2.2.2', codigo: 'EFI.2.2.2', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Automatizar mecanismos de percepción-decisión en entornos inciertos.' },
  { id: '2.2.3', codigo: 'EFI.2.2.3', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Diseñar y autogestionar actividades de acondicionamiento físico.' },
  { id: '2.3.1', codigo: 'EFI.2.3.1', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Utilizar técnicas de mediación y resolución de conflictos en el juego.' },
  { id: '2.3.2', codigo: 'EFI.2.3.2', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Asumir roles de arbitraje y organización de torneos con imparcialidad.' },
  { id: '2.3.3', codigo: 'EFI.2.3.3', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Promover activamente la inclusión y la equidad de género en la práctica.' },
  { id: '2.4.1', codigo: 'EFI.2.4.1', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Valorar el patrimonio deportivo y la presencia de la mujer en el deporte.' },
  { id: '2.4.2', codigo: 'EFI.2.4.2', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Crear y representar espectáculos o montajes expresivos comunitarios.' },
  { id: '2.5.1', codigo: 'EFI.2.5.1', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Organizar itinerarios en la naturaleza bajo criterios de ecorresponsabilidad.' },
  { id: '2.5.2', codigo: 'EFI.2.5.2', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Adaptar la motricidad a espacios de alta incertidumbre respetando el medio.' }
];

export const SABERES_BASICOS_EXTREMADURA_ESO: SaberBasico[] = [
  { codigo: 'EFI.ESO.A.1', bloque: 'A', bloqueNombre: 'Vida activa y saludable', ciclo: '1º Ciclo ESO', descripcion: 'Hábitos de práctica activa, calentamiento autónomo, dosificación del esfuerzo, educación postural y ergonomía, alimentación saludable e hidratación. Gestión de la imagen corporal, desarrollo del autoconcepto. Análisis de hábitos de vida.' },
  { codigo: 'EFI.ESO.B.1', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: '1º Ciclo ESO', descripcion: 'Preparación autónoma de sesiones y proyectos motores. Medidas de prevención de accidentes, identificación de riesgos y aplicación de protocolos de primeros auxilios y soporte básico. Uso y cuidado responsable del material e instalaciones deportivas.' },
  { codigo: 'EFI.ESO.C.1', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: '1º Ciclo ESO', descripcion: 'Capacidades físicas condicionantes y coordinativas. Habilidades motrices específicas aplicadas a deportes individuales, adversarios y colectivos. Estrategias tácticas de ataque y defensa, toma de decisiones y creatividad en la resolución de problemas motores.' },
  { codigo: 'EFI.ESO.D.1', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: '1º Ciclo ESO', descripcion: 'Gestión del estrés y la ansiedad competitiva. Estrategias de trabajo cooperativo, mediación y resolución pacífica de conflictos. Respeto a las reglas, fair play (juego limpio) y asunción de funciones de arbitraje. Rechazo explícito a conductas violentas, racistas, sexistas o LGTBIfóbicas en el deporte.' },
  { codigo: 'EFI.ESO.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: '1º Ciclo ESO', descripcion: 'Juegos tradicionales y populares, deportes olímpicos, paralímpicos y alternativos. Expresión corporal, técnicas de comunicación gestual y montaje de composiciones rítmico-musicales o espectáculos. Análisis de la historia del deporte y la igualdad de género en el ámbito deportivo.' },
  { codigo: 'EFI.ESO.F.1', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: '1º Ciclo ESO', descripcion: 'Actividades físicas en el medio natural y urbano (senderismo, orientación, ruedas). Movilidad activa, segura y sostenible (uso de la bicicleta y normas de educación vial). Prevención de riesgos, seguridad en la naturaleza y principios de práctica ecosostenible (desperdicio cero y respeto a la biodiversidad).' },
  { codigo: 'EFI.ESO.A.2', bloque: 'A', bloqueNombre: 'Vida activa y saludable', ciclo: '2º Ciclo ESO', descripcion: 'Hábitos de práctica activa, calentamiento autónomo específico, dosificación del esfuerzo, educación postural y ergonomía, alimentación saludable e hidratación. Prevención de trastornos de la conducta alimentaria (vigorexia, anorexia, bulimia). Prevención del consumo de sustancias, dopaje y análisis crítico de estereotipos corporales y estéticos.' },
  { codigo: 'EFI.ESO.B.2', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: '2º Ciclo ESO', descripcion: 'Preparación autónoma de sesiones y proyectos motores avanzados. Medidas de prevención de accidentes, identificación de riesgos. Uso y cuidado responsable del material.' },
  { codigo: 'EFI.ESO.C.2', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: '2º Ciclo ESO', descripcion: 'Capacidades físicas condicionantes y coordinativas avanzadas. Habilidades motrices específicas aplicadas a deportes. Estrategias tácticas de ataque y defensa avanzadas.' },
  { codigo: 'EFI.ESO.D.2', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: '2º Ciclo ESO', descripcion: 'Gestión avanzada del estrés y la ansiedad competitiva. Estrategias de trabajo cooperativo. Arbitraje.' },
  { codigo: 'EFI.ESO.E.2', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: '2º Ciclo ESO', descripcion: 'Juegos tradicionales y populares, deportes alternativos. Expresión corporal, montaje de composiciones rítmico-musicales o espectáculos completos. Igualdad de género en el ámbito deportivo.' },
  { codigo: 'EFI.ESO.F.2', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: '2º Ciclo ESO', descripcion: 'Actividades físicas complejas en el medio natural y urbano. Movilidad activa y sostenible. Principios de práctica ecosostenible.' }
];
