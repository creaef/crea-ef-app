import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// MURCIA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_MURCIA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Estilo de vida saludable', descripcion: 'Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física, el cuidado del cuerpo y la alimentación saludable, para favorecer el bienestar físico, mental y social.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Resolución de situaciones motrices', descripcion: 'Adaptar las capacidades motrices y transferirlas a situaciones motrices con una lógica interna variada para responder a las demandas de la práctica física.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Gestión emocional y juego limpio', descripcion: 'Desarrollar proyectos motores individuales o grupales, gestionando las emociones, resolviendo conflictos y aplicando normas de juego justo para fomentar la convivencia pacífica y el trabajo en equipo.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Manifestaciones culturales', descripcion: 'Reconocer las manifestaciones culturales vinculadas a la motricidad, valorando su diversidad y significatividad histórica, social o artística para preservarlas y disfrutarlas.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Interacción con el entorno', descripcion: 'Interactuar con el entorno natural y urbano de manera sostenible y respetuosa, realizando actividades motrices para disfrutar del medio y colaborar en su conservación.' }
];

export const CRITERIOS_EVALUACION_MURCIA_PRIMARIA: CriterioEvaluacion[] = [
  { id: '1.1.1', codigo: 'EFI.1.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar hábitos saludables sencillos (higiene, posturales, alimentación básica) en la práctica diaria.' },
  { id: '1.1.2', codigo: 'EFI.1.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Participar de forma activa en juegos y propuestas motrices evitando el sedentarismo.' },
  { id: '1.2.1', codigo: 'EFI.1.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Descubrir y experimentar respuestas motrices adaptadas a diferentes situaciones de juego (desplazamientos, saltos, giros y lanzamientos).' },
  { id: '1.2.2', codigo: 'EFI.1.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Reajustar la posición del cuerpo ante estímulos sensoriales básicos.' },
  { id: '1.3.1', codigo: 'EFI.1.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Mostrar respeto hacia las normas de juego y hacia los compañeros de clase.' },
  { id: '1.3.2', codigo: 'EFI.1.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Identificar y manifestar las emociones propias durante la práctica de juegos sencillos.' },
  { id: '1.4.1', codigo: 'EFI.1.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Conocer y participar en juegos tradicionales y populares de la Región de Murcia.' },
  { id: '1.4.2', codigo: 'EFI.1.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Experimentar con la expresión corporal y el ritmo a través del movimiento libre.' },
  { id: '1.5.1', codigo: 'EFI.1.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Desplazarse con seguridad por el espacio escolar y entornos cercanos.' },
  { id: '1.5.2', codigo: 'EFI.1.5.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Cuidar el material utilizado y el espacio físico durante el desarrollo de la actividad.' },

  { id: '2.1.1', codigo: 'EFI.2.1.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer y aplicar pautas de higiene, ergonomía y nutrición adecuada antes, durante y después de la actividad física.' },
  { id: '2.1.2', codigo: 'EFI.2.1.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer los efectos beneficiosos del ejercicio sobre la salud física y mental.' },
  { id: '2.2.1', codigo: 'EFI.2.2.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Adaptar las habilidades motrices básicas a situaciones con diferente grado de oposición, cooperación o incertidumbre.' },
  { id: '2.2.2', codigo: 'EFI.2.2.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Resolver problemas motores ajustando el espacio, el tiempo y el uso de materiales.' },
  { id: '2.3.1', codigo: 'EFI.2.3.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Aceptar las reglas del juego, asumir los roles asignados y resolver conflictos de forma dialogada.' },
  { id: '2.3.2', codigo: 'EFI.2.3.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Controlar la frustración ante la derrota y practicar el juego limpio de forma constante.' },
  { id: '2.4.1', codigo: 'EFI.2.4.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Valorar y reproducir juegos tradicionales, bailes y danzas sencillas como patrimonio cultural.' },
  { id: '2.4.2', codigo: 'EFI.2.4.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Crear pequeñas composiciones expresivo motrices individuales o grupales con o sin soporte musical.' },
  { id: '2.5.1', codigo: 'EFI.2.5.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Orientarse y desenvolverse con autonomía en medios naturales o urbanos no habituales.' },
  { id: '2.5.2', codigo: 'EFI.2.5.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Adoptar conductas activas para la recogida de residuos y conservación del medio natural.' },

  { id: '3.1.1', codigo: 'EFI.3.1.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular la práctica de actividad física adoptando posturas correctas, hidratación y alimentación equilibrada.' },
  { id: '3.1.2', codigo: 'EFI.3.1.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Evaluar el propio nivel de condición física y diseñar metas personalizadas de mejora de forma autónoma.' },
  { id: '3.2.1', codigo: 'EFI.3.2.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar habilidades motrices específicas y combinadas en situaciones de juego, deporte escolar o actividades expresivas.' },
  { id: '3.2.2', codigo: 'EFI.3.2.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Analizar la toma de decisiones motrices tácticas y estratégicas para optimizar la eficacia en el juego.' },
  { id: '3.3.1', codigo: 'EFI.3.3.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Liderar y colaborar en proyectos motores colectivos aplicando valores de deportividad, inclusión e igualdad de género.' },
  { id: '3.3.2', codigo: 'EFI.3.3.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Gestionar las emociones y el esfuerzo individual en beneficio del objetivo compartido del grupo.' },
  { id: '3.4.1', codigo: 'EFI.3.4.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Investigar, contextualizar y practicar juegos populares, deportes tradicionales y expresiones artísticas de diferentes culturas.' },
  { id: '3.4.2', codigo: 'EFI.3.4.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Diseñar y representar secuencias de danza o expresión corporal combinando diferentes ritmos y calidades de movimiento.' },
  { id: '3.5.1', codigo: 'EFI.3.5.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Organizar y realizar recorridos y actividades motrices en la naturaleza utilizando mapas o balizas sencillas.' },
  { id: '3.5.2', codigo: 'EFI.3.5.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Promover activamente el cuidado del entorno y la movilidad sostenible en los desplazamientos cotidianos.' }
];

export const SABERES_BASICOS_MURCIA_PRIMARIA: SaberBasico[] = [
  { codigo: 'EFI.A.1', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Primer Ciclo', descripcion: 'Hábitos básicos de higiene corporal. Reconocimiento de las sensaciones corporales tras el ejercicio (frecuencia cardíaca, respiración). Pautas básicas de ergonomía postural y descanso.' },
  { codigo: 'EFI.B.1', bloque: 'B', bloqueNombre: 'Gestión emocional y social en la motricidad', ciclo: 'Primer Ciclo', descripcion: 'Identificación de emociones básicas (alegría, enfado, frustración) asociadas al éxito o fallo en el juego. Aceptación de las reglas elementales.' },
  { codigo: 'EFI.C.1', bloque: 'C', bloqueNombre: 'Resolución de situaciones motrices', ciclo: 'Primer Ciclo', descripcion: 'Esquema corporal, lateralidad, equilibrio y estructuración espacio-temporal. Habilidades motrices básicas: desplazamientos, saltos, giros, lanzamientos y recepciones.' },
  { codigo: 'EFI.D.1', bloque: 'D', bloqueNombre: 'Cultura motriz', ciclo: 'Primer Ciclo', descripcion: 'Juegos populares y tradicionales autóctonos de la Región de Murcia. Posibilidades expresivas del cuerpo (gesto y postura).' },
  { codigo: 'EFI.E.1', bloque: 'E', bloqueNombre: 'Interacción con el entorno natural y urbano', ciclo: 'Primer Ciclo', descripcion: 'Exploración motriz de espacios naturales próximos o del patio escolar. Normas básicas de seguridad y cuidado del material.' },

  { codigo: 'EFI.A.2', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Segundo Ciclo', descripcion: 'Alimentación equilibrada e hidratación en la actividad física. Calentamiento general y pautas de prevención de lesiones. Autoconcepto y aceptación de la propia realidad corporal.' },
  { codigo: 'EFI.B.2', bloque: 'B', bloqueNombre: 'Gestión emocional y social en la motricidad', ciclo: 'Segundo Ciclo', descripcion: 'Estrategias de autorregulación emocional. Resolución dialogada de desacuerdos. Coeducación, trabajo en equipo e inclusión de compañeros sin discriminación.' },
  { codigo: 'EFI.C.2', bloque: 'C', bloqueNombre: 'Resolución de situaciones motrices', ciclo: 'Segundo Ciclo', descripcion: 'Habilidades motrices genéricas y su combinación. Principios tácticos básicos en juegos cooperativos y de oposición (ataque-defensa, conservación del móvil).' },
  { codigo: 'EFI.D.2', bloque: 'D', bloqueNombre: 'Cultura motriz', ciclo: 'Segundo Ciclo', descripcion: 'Recuperación de juegos de antes y su contexto social. Danzas folclóricas y bailes sencillos. Elaboración de coreografías colectivas simples.' },
  { codigo: 'EFI.E.2', bloque: 'E', bloqueNombre: 'Interacción con el entorno natural y urbano', ciclo: 'Segundo Ciclo', descripcion: 'Actividades de orientación sencillas en el centro o parque. Prácticas motrices sostenibles y respeto por la flora y fauna local.' },

  { codigo: 'EFI.A.3', bloque: 'A', bloqueNombre: 'Vida saludable y autónoma', ciclo: 'Tercer Ciclo', descripcion: 'Acondicionamiento de las capacidades físicas relacionadas con la salud (resistencia, fuerza resistencia, flexibilidad). Diseño de rutinas saludables individuales. Análisis crítico de los estereotipos estéticos y corporales.' },
  { codigo: 'EFI.B.3', bloque: 'B', bloqueNombre: 'Gestión emocional y social en la motricidad', ciclo: 'Tercer Ciclo', descripcion: 'Asunción de roles de liderazgo y mediación en el juego. Respeto a las diferencias de nivel de competencia motriz. Promoción del fair play o juego limpio.' },
  { codigo: 'EFI.C.3', bloque: 'C', bloqueNombre: 'Resolución de situaciones motrices', ciclo: 'Tercer Ciclo', descripcion: 'Habilidades motrices específicas adaptadas a disciplinas deportivas escolares. Estrategias de toma de decisiones tácticas en tiempo real.' },
  { codigo: 'EFI.D.3', bloque: 'D', bloqueNombre: 'Cultura motriz', ciclo: 'Tercer Ciclo', descripcion: 'Deportes y juegos tradicionales de España y de otras culturas. El movimiento como medio de expresión artística y teatral (mimo, dramatización).' },
  { codigo: 'EFI.E.3', bloque: 'E', bloqueNombre: 'Interacción con el entorno natural y urbano', ciclo: 'Tercer Ciclo', descripcion: 'Lectura de mapas sencillos y uso de brújulas/tecnología para recorridos en la naturaleza. Organización de salidas al entorno natural minimizando el impacto ambiental (principios Leave No Trace). Promoción del uso activo de la bicicleta o desplazamiento a pie (educación vial).' }
];
