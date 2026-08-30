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

// ==========================================
// MURCIA - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_MURCIA_ESO: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia Específica 1', descripcion: 'Planificar y autorregular una práctica de actividad física orientada a la salud, consolidando un estilo de vida activo y saludable que prevenga riesgos y mejore la calidad de vida integral (física, mental y social).' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia Específica 2', descripcion: 'Desarrollar la capacidad de adaptación motriz mediante la ejecución de habilidades específicas en contextos sociomotores variados y complejos con eficacia, fluidez, control y creatividad.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia Específica 3', descripcion: 'Promover e integrar valores de inclusión, respeto a la diversidad, equidad de género, trabajo en equipo, juego limpio y resolución pacífica de conflictos en la práctica motriz.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia Específica 4', descripcion: 'Analizar, valorar y participar activamente en manifestaciones histórico-culturales, tradicionales (juegos populares y autóctonos de la Región de Murcia), artísticas y deportivas como elemento integrador del patrimonio.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia Específica 5', descripcion: 'Organizar y realizar actividades físicas en el medio natural y urbano de manera autónoma, segura y ambientalmente sostenible, promoviendo la movilidad activa y el residuo cero.' }
];

export const CRITERIOS_EVALUACION_MURCIA_ESO: CriterioEvaluacion[] = [
  // 1º Ciclo ESO (mapped from 1º and 2º ESO)
  { id: '1.1', codigo: 'EFI.1.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar las capacidades físicas y los factores de la condición física orientada a la salud.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Aplicar protocolos de calentamiento general guiado y normas de higiene postural y corporal.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Ejecutar habilidades motrices específicas en situaciones de oposición e iniciación deportiva con eficacia técnica básica.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Aplicar soluciones tácticas elementales en juegos reducidos de cancha compartida o dividida.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Mostrar actitudes cooperativas y tolerantes en tareas grupales, respetando reglas y acuerdos de aula.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Controlar emociones básicas asociadas al éxito y al fracaso en situaciones de competición escolar.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Conocer y practicar juegos populares y tradicionales de la Región de Murcia (bolos murcianos, caliche, etc.).' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Reproducir secuencias rítmicas elementales y estructuras básicas de movimiento expresivo corporal.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Realizar recorridos de orientación básica en el centro escolar o parques urbanos utilizando un mapa sencillo.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Aplicar pautas elementales de seguridad y respeto al medio natural en actividades al aire libre.' },
  { id: '1.1b', codigo: 'EFI.1.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Evaluar la condición física personal aplicando test motores estandarizados y registrando su evolución.' },
  { id: '1.2b', codigo: 'EFI.1.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y ejecutar calentamientos generales autónomos, aplicando pautas de hidratación y nutrición adecuada.' },
  { id: '2.1b', codigo: 'EFI.2.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Adaptar gestos técnicos y coordinativos ante situaciones dinámicas no estandarizadas y de oposición directa.' },
  { id: '2.2b', codigo: 'EFI.2.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Aplicar esquemas tácticos colectivos básicos de desmarque, apoyo y cobertura en deportes de invasión.' },
  { id: '3.1b', codigo: 'EFI.3.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Asumir roles de arbitraje escolar y mediación de discrepancias de forma dialogada y justa.' },
  { id: '3.2b', codigo: 'EFI.3.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Promover activamente la inclusión e igualdad efectiva de género en los grupos de práctica motriz.' },
  { id: '4.1b', codigo: 'EFI.4.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Practicar danzas tradicionales murcianas (parrandas, jotas) y compararlas con bailes urbanos contemporáneos.' },
  { id: '4.2b', codigo: 'EFI.4.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Crear pequeñas coreografías grupales utilizando técnicas básicas de improvisación corporal.' },
  { id: '5.1b', codigo: 'EFI.5.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Completar itinerarios en la naturaleza utilizando brújula y lectura básica de planos topográficos.' },
  { id: '5.2b', codigo: 'EFI.5.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Aplicar protocolos de residuo cero y conservación activa del medio ambiente en actividades de senderismo.' },

  // 2º Ciclo ESO (mapped from 3º and 4º ESO)
  { id: '1.1c', codigo: 'EFI.1.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y poner en práctica un plan personal de trabajo de una capacidad física orientada a la salud.' },
  { id: '1.2c', codigo: 'EFI.1.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Conocer y aplicar protocolos de primeros auxilios y soporte vital básico (conducta PAS, RCP y uso de DEA/DESA).' },
  { id: '2.1c', codigo: 'EFI.2.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Demostrar fluidez técnica en deportes individuales, de raqueta/implemento y colectivos avanzados.' },
  { id: '2.2c', codigo: 'EFI.2.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Elaborar y aplicar sistemas tácticos avanzados respondiendo a la lectura estratégica de los adversarios.' },
  { id: '3.1c', codigo: 'EFI.3.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Organizar y dinamizar encuentros deportivos escolares promoviendo el juego limpio y el liderazgo compartido.' },
  { id: '3.2c', codigo: 'EFI.3.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Autorregular la ansiedad y la frustración en contextos competitivos de juego real de forma asertiva.' },
  { id: '4.1c', codigo: 'EFI.4.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente el impacto social, mediático y mercantil del deporte profesional y sus valores éticos.' },
  { id: '4.2c', codigo: 'EFI.4.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Diseñar montajes grupales de acrosport, dramatización o danzas urbanas con valor estético y técnico.' },
  { id: '5.1c', codigo: 'EFI.5.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Planificar recorridos en el medio natural contemplando previsiones meteorológicas y normas de seguridad.' },
  { id: '5.2c', codigo: 'EFI.5.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Emplear medios de transporte sostenibles (bicicleta, patinete) en actividades de exploración urbana.' },
  { id: '1.1d', codigo: 'EFI.1.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar, aplicar y evaluar un programa autónomo de acondicionamiento físico proyectado hacia la vida adulta.' },
  { id: '1.2d', codigo: 'EFI.1.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente mitos del fitness, dietas fraudulentas, suplementación y factores de riesgo para la salud.' },
  { id: '2.1d', codigo: 'EFI.2.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Resolver situaciones motrices complejas adaptando componentes cualitativos (ritmo, precisión, fluidez y creatividad).' },
  { id: '2.2d', codigo: 'EFI.2.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Diseñar y coordinar estrategias de equipo en deportes alternativos y convencionales con alta eficacia táctica.' },
  { id: '3.1d', codigo: 'EFI.3.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Liderar y gestionar proyectos físico-deportivos comunitarios que promuevan la inclusión y la participación activa.' },
  { id: '3.2d', codigo: 'EFI.3.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Demostrar madurez ética y autocontrol permanente ante momentos de máxima presión competitiva.' },
  { id: '4.1d', codigo: 'EFI.4.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Adoptar una postura crítica fundada sobre el dopaje, los estereotipos de género y el mercantilismo deportivo.' },
  { id: '4.2d', codigo: 'EFI.4.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Producir y presentar proyectos escénicos corporales integrales vinculando movimiento, música y tecnología.' },
  { id: '5.1d', codigo: 'EFI.5.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Organizar actividades en el medio natural de forma autónoma gestionando riesgos y minimizando la huella ecológica.' },
  { id: '5.2d', codigo: 'EFI.5.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Fomentar la movilidad activa y el uso sostenible de los espacios públicos e instalaciones deportivas comunitarias.' }
];

export const SABERES_BASICOS_MURCIA_ESO: SaberBasico[] = [
  { codigo: 'EFI.ESO.A.1', bloque: 'A', bloqueNombre: 'Salud física, mental y social', ciclo: 'Todos', descripcion: 'Métodos de entrenamiento de las capacidades físicas orientadas a la salud; control de la frecuencia cardíaca y zonas de esfuerzo; nutrición deportiva, hidratación y balance energético; ergonomía y educación postural; análisis crítico de modelos corporales y prevención de trastornos (vigorexia, anorexia); autogestión de la vida activa.' },
  { codigo: 'EFI.ESO.B.1', bloque: 'B', bloqueNombre: 'Resolución de situaciones motrices', ciclo: 'Todos', descripcion: 'Técnica y táctica en deportes individuales, de adversario (red/pared, lucha) y colectivos de invasión; deportes alternativos y emergentes (Ultimate, Goubak, Kin-ball, Datchball); análisis de la lógica interna y toma de decisiones tácticas dinámicas.' },
  { codigo: 'EFI.ESO.C.1', bloque: 'C', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Todos', descripcion: 'Gestión del estrés y competitividad; roles de organización, capitanía y arbitraje escolar; juego limpio y ética deportiva; prevención y erradicación de conductas violentas, sexistas o discriminatorias en el deporte.' },
  { codigo: 'EFI.ESO.D.1', bloque: 'D', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Todos', descripcion: 'Planificación de calentamientos específicos autónomos; mantenimiento y seguridad del equipamiento; protocolos de seguridad y primeros auxilios (conducta PAS, soporte vital básico, maniobra de Heimlich, RCP y uso de DEA/DESA).' },
  { codigo: 'EFI.ESO.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Todos', descripcion: 'Juegos y deportes tradicionales de la Región de Murcia (bolos murcianos, caliche, petanca autóctona); acrosport, dramatización y danzas contemporáneas/urbanas; análisis sociológico del deporte espectáculo y coeducación.' },
  { codigo: 'EFI.ESO.F.1', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Todos', descripcion: 'Carreras de orientación en el medio natural y urbano; senderismo y cicloturismo (BTT); escalada y cabuyería básica; normativa sobre espacios naturales protegidos, residuo cero y movilidad activa urbana.' }
];
