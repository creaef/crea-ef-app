import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// ASTURIAS - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_ASTURIAS_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia Específica 1', descripcion: 'Adoptar un estilo de vida activo y saludable, seleccionando e incorporando intencionalmente actividades físicas y deportivas en las rutinas diarias a partir de un análisis crítico de los modelos corporales y del rechazo de las prácticas que carezcan de base científica, para hacer un uso saludable y autónomo del tiempo libre y así mejorar la calidad de vida.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia Específica 2', descripcion: 'Resolver situaciones motrices en diferentes contextos, adaptando con progresiva autonomía los fundamentos técnicos y tácticos, y aplicando procesos de percepción, decisión y ejecución, para dar respuesta a demandas de carácter motor con diferentes finalidades.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia Específica 3', descripcion: 'Consolidar actitudes de superación, crecimiento, resiliencia y aceptación de la propia realidad corporal y la de los demás, mediante el desafío físico y la gestión adecuada de las emociones en la práctica de actividades físico-deportivas, para favorecer el autoconocimiento y la autoestima.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia Específica 4', descripcion: 'Interactuar con eficiencia y respeto en diferentes contextos motrices, fomentando el diálogo, la empatía y la resolución pacífica de conflictos, y rechazando los comportamientos antisociales o discriminatorios, para propiciar la inclusión y la convivencia positiva.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia Específica 5', descripcion: 'Valorar la riqueza de la cultura motriz mediante el conocimiento, la práctica y la conservación de juegos, deportes, danzas y otras manifestaciones de carácter motor de Asturias y de otras culturas, reconociendo su valor patrimonial, histórico y social.' },
  { id: 'CE.EF.6', numero: 6, nombre: 'Competencia Específica 6', descripcion: 'Participar de forma sostenible en actividades físico-deportivas, aplicando principios básicos de conservación y mejora del entorno urbano y natural, y asumiendo responsabilidades en su cuidado, para minimizar el impacto ambiental.' }
];

export const CRITERIOS_EVALUACION_ASTURIAS_PRIMARIA: CriterioEvaluacion[] = [
  // PRIMER CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Incorporar hábitos posturales e higiénicos saludables en las rutinas de la práctica motriz.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer los beneficios de la práctica diaria de actividad física y del juego activo.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Explorar las propias capacidades perceptivas y coordinativas en contextos de juego.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Resolver situaciones motrices sencillas aplicando habilidades básicas (desplazamientos, saltos, giros y lanzamientos).' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Reconocer y aceptar las propias características corporales y las de los demás.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Expresar y gestionar emociones básicas en situaciones de juego y actividad física.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Participar en juegos cooperativos respetando las normas básicas de convivencia y juego limpio.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Mostrar actitudes de empatía y respeto hacia los compañeros y compañeras.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Conocer y practicar juegos tradicionales y populares de Asturias y de otras culturas.' },
  { id: '6.1', codigo: 'EFI.6.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.6', descripcion: 'Utilizar de forma adecuada y cuidadosa los espacios escolares y el material deportivo.' },
  
  // SEGUNDO CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Consolidar hábitos de activación corporal, dosificación del esfuerzo e higiene en la práctica física.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer la importancia de una alimentación equilibrada y la hidratación para la salud.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar habilidades motrices específicas en situaciones de complejidad variable.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Resolver problemas motores en contextos lúdicos y deportivos aplicando procesos básicos de decisión.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Mostrar confianza y seguridad en las propias capacidades motrices, aceptando las diferencias individuales.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Gestionar la frustración y el esfuerzo ante retos físicos de dificultad moderada.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Colaborar activamente en actividades grupales y juegos colectivos, asumiendo diferentes roles.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Resolver conflictos cotidianos mediante el diálogo y la negociación en el entorno motriz.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Practicar y valorar los juegos y deportes tradicionales asturianos, reconociendo su valor histórico y cultural.' },
  { id: '6.1', codigo: 'EFI.6.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.6', descripcion: 'Practicar actividades físicas en el medio natural y urbano respetando el entorno y minimizando el impacto ambiental.' },
  
  // TERCER CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Diseñar planes sencillos de actividad física y salud adaptados a las características personales.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente los modelos corporales de la publicidad y rechazar prácticas nocivas o sin base científica.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Resolver eficazmente situaciones motrices complejas aplicando con precisión fundamentos técnicos y tácticos.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Adaptar las respuestas motrices ante contextos de incertidumbre.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Afrontar los retos motores con actitud de superación y resiliencia.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Gestionar las emociones de forma constructiva en situaciones de competición o esfuerzo físico.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Fomentar la inclusión, la igualdad de género y la deportividad en cualquier práctica motriz.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Coordinar acciones colectivas para alcanzar objetivos comunes en proyectos motores.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Investigar, difundir y practicar manifestaciones culturales y motrices representativas de Asturias y de otras culturas.' },
  { id: '6.1', codigo: 'EFI.6.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.6', descripcion: 'Diseñar y llevar a cabo prácticas físico-deportivas sostenibles que minimicen el impacto ambiental en el medio natural.' }
];

export const SABERES_BASICOS_ASTURIAS_PRIMARIA: SaberBasico[] = [
  // PRIMER CICLO
  { codigo: 'EFI.PRI.1.1', bloque: 'Vida activa y saludable', bloqueNombre: 'Vida activa y saludable', ciclo: 'Primer Ciclo', descripcion: 'Salud física y bienestar. Hábitos de higiene y posturas corporales saludables. Tiempo libre y juego activo diario.' },
  { codigo: 'EFI.PRI.1.2', bloque: 'Resolución motriz', bloqueNombre: 'Resolución motriz', ciclo: 'Primer Ciclo', descripcion: 'Esquema corporal y percepción espacial-temporal. Capacidades perceptivo-motrices. Habilidades motrices básicas (locomotoras y manipulación).' },
  { codigo: 'EFI.PRI.1.3', bloque: 'Autoconcepto y emoción', bloqueNombre: 'Autoconcepto y emoción', ciclo: 'Primer Ciclo', descripcion: 'Aceptación del propio cuerpo y diversidad corporal. Gestión elemental de emociones en el juego.' },
  { codigo: 'EFI.PRI.1.4', bloque: 'Interacción social', bloqueNombre: 'Interacción social', ciclo: 'Primer Ciclo', descripcion: 'Convivencia, cooperación y respeto mutuo. Normas básicas de juego limpio y resolución pacífica de conflictos.' },
  { codigo: 'EFI.PRI.1.5', bloque: 'Cultura motriz', bloqueNombre: 'Cultura motriz', ciclo: 'Primer Ciclo', descripcion: 'Juegos populares y tradicionales de Asturias. Manifestaciones culturales motrices del entorno.' },
  { codigo: 'EFI.PRI.1.6', bloque: 'Sostenibilidad', bloqueNombre: 'Sostenibilidad', ciclo: 'Primer Ciclo', descripcion: 'Cuidado del material y de los espacios de práctica motriz.' },
  
  // SEGUNDO CICLO
  { codigo: 'EFI.PRI.2.1', bloque: 'Vida activa y saludable', bloqueNombre: 'Vida activa y saludable', ciclo: 'Segundo Ciclo', descripcion: 'Estilos de vida activos y saludables. Calentamiento y vuelta a la calma autónomos. Nutrición, alimentación y salud.' },
  { codigo: 'EFI.PRI.2.2', bloque: 'Resolución motriz', bloqueNombre: 'Resolución motriz', ciclo: 'Segundo Ciclo', descripcion: 'Refinamiento de habilidades motrices básicas y específicas. Iniciación a la táctica y lógica interna del juego.' },
  { codigo: 'EFI.PRI.2.3', bloque: 'Autoconcepto y emoción', bloqueNombre: 'Autoconcepto y emoción', ciclo: 'Segundo Ciclo', descripcion: 'Autoconcepto y autoestima motriz. Regulación emocional, resiliencia y esfuerzo.' },
  { codigo: 'EFI.PRI.2.4', bloque: 'Interacción social', bloqueNombre: 'Interacción social', ciclo: 'Segundo Ciclo', descripcion: 'Habilidades sociales y trabajo en equipo. Prevención y resolución pacífica de conflictos.' },
  { codigo: 'EFI.PRI.2.5', bloque: 'Cultura motriz', bloqueNombre: 'Cultura motriz', ciclo: 'Segundo Ciclo', descripcion: 'Juegos y deportes autóctonos de Asturias. Danzas y expresiones corporales tradicionales.' },
  { codigo: 'EFI.PRI.2.6', bloque: 'Sostenibilidad', bloqueNombre: 'Sostenibilidad', ciclo: 'Segundo Ciclo', descripcion: 'Educación ambiental y práctica motriz sostenible en el medio natural y urbano.' },
  
  // TERCER CICLO
  { codigo: 'EFI.PRI.3.1', bloque: 'Vida activa y saludable', bloqueNombre: 'Vida activa y saludable', ciclo: 'Tercer Ciclo', descripcion: 'Planificación autónoma de la actividad física saludable. Espíritu crítico ante cánones estéticos y prácticas sin base científica. Prevención de lesiones y primeros auxilios básicos.' },
  { codigo: 'EFI.PRI.3.2', bloque: 'Resolución motriz', bloqueNombre: 'Resolución motriz', ciclo: 'Tercer Ciclo', descripcion: 'Aplicación avanzada de habilidades motrices y deportivas. Toma de decisiones tácticas en situaciones de cooperación-oposición.' },
  { codigo: 'EFI.PRI.3.3', bloque: 'Autoconcepto y emoción', bloqueNombre: 'Autoconcepto y emoción', ciclo: 'Tercer Ciclo', descripcion: 'Resiliencia, superación personal y autoconocimiento. Regulación emocional en la victoria y la derrota.' },
  { codigo: 'EFI.PRI.3.4', bloque: 'Interacción social', bloqueNombre: 'Interacción social', ciclo: 'Tercer Ciclo', descripcion: 'Coeducación, inclusión y respeto a la diversidad en el deporte. Liderazgo positivo y cooperación grupal.' },
  { codigo: 'EFI.PRI.3.5', bloque: 'Cultura motriz', bloqueNombre: 'Cultura motriz', ciclo: 'Tercer Ciclo', descripcion: 'Patrimonio cultural motor asturiano (juegos, bolos, danzas). Diversidad cultural a través del movimiento y el juego.' },
  { codigo: 'EFI.PRI.3.6', bloque: 'Sostenibilidad', bloqueNombre: 'Sostenibilidad', ciclo: 'Tercer Ciclo', descripcion: 'Ecosostenibilidad en actividades en el medio natural. Respeto y conservación del entorno natural asturiano.' }
];

// ==========================================
// ASTURIAS - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_ASTURIAS_ESO: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia Específica 1', descripcion: 'Planificar y autorregular una práctica de actividad física orientada a la salud, consolidando un estilo de vida activo y saludable, reconociendo los factores condicionantes del bienestar integral y aplicando medidas de seguridad y prevención.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia Específica 2', descripcion: 'Adaptar y ejecutar las habilidades motrices básicas y específicas a situaciones sociomotrices complejas y dinámicas, con eficacia, control postural, fluidez y creatividad en contextos individuales, de oposición y de colaboración.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia Específica 3', descripcion: 'Fomentar relaciones interpersonales inclusivas, respetuosas y asertivas en la práctica físico-deportiva, asumiendo la autorregulación emocional, el trabajo cooperativo, la equidad de género y el juego limpio para la resolución pacífica de conflictos.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia Específica 4', descripcion: 'Valorar y participar en manifestaciones de la cultura motriz tradicional asturiana, contemporánea y deportiva, analizando críticamente el deporte como fenómeno social, sus implicaciones económicas y mediáticas y preservando el patrimonio autóctono.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia Específica 5', descripcion: 'Desenvolverse de manera autónoma, eficiente y segura en el medio natural a través de actividades físico-deportivas sostenibles, promoviendo la preservación ambiental y la movilidad activa cotidiana.' }
];

export const CRITERIOS_EVALUACION_ASTURIAS_ESO: CriterioEvaluacion[] = [
  // 1º Curso ESO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar las capacidades físicas básicas (resistencia, fuerza, flexibilidad, velocidad) y su vinculación con la salud.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Realizar calentamientos generales guiados y aplicar hábitos de higiene postural y corporal tras la práctica.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Ejecutar habilidades motrices específicas en situaciones de oposición e iniciación deportiva con eficacia técnica elemental.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Tomar decisiones tácticas sencillas en juegos reducidos de cooperación-oposición y deportes colectivos.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Participar con actitud de cooperación y respeto hacia los compañeros, rechazando cualquier discriminación.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Aceptar y cumplir los reglamentos escolares, actuando con deportividad al asumir diversos roles de juego.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Conocer y practicar juegos y deportes tradicionales asturianos (modalidades de bolos asturianos y juegos tradicionales).' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Ejecutar secuencias rítmicas elementales y estructuras de movimiento expresivo corporal.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Realizar recorridos de orientación básica en el centro escolar o parques siguiendo un mapa.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Aplicar protocolos elementales de prevención de riesgos y respeto al entorno natural.' },

  // 2º Curso ESO
  { id: '1.1b', codigo: 'EFI.1.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Evaluar la condición física personal aplicando pruebas estandarizadas y registrando la evolución.' },
  { id: '1.2b', codigo: 'EFI.1.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y ejecutar calentamientos generales autónomos y aplicar pautas de nutrición deportiva e hidratación.' },
  { id: '2.1b', codigo: 'EFI.2.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Adaptar gestos técnicos y coordinativos ante situaciones dinámicas no estandarizadas y de oposición directa.' },
  { id: '2.2b', codigo: 'EFI.2.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Aplicar principios tácticos colectivos de apoyo, desmarque y cobertura en deportes de invasión.' },
  { id: '3.1b', codigo: 'EFI.3.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Asumir roles de arbitraje escolar y mediación de conflictos de forma dialogada y con juego limpio.' },
  { id: '3.2b', codigo: 'EFI.3.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Promover la inclusión y la igualdad efectiva de género en todas las dinámicas motrices del grupo.' },
  { id: '4.1b', codigo: 'EFI.4.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Practicar modalidades tradicionales de bolos asturianos (cuatreada, birle) y danzas regionales.' },
  { id: '4.2b', codigo: 'EFI.4.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Crear coreografías o montajes expresivos grupales sencillos con adecuación rítmica y música.' },
  { id: '5.1b', codigo: 'EFI.5.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Completar itinerarios en la naturaleza utilizando brújula y lectura básica de planos topográficos.' },

  // 3º Curso ESO
  { id: '1.1c', codigo: 'EFI.1.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y poner en práctica un plan sistemático personal de trabajo de una capacidad física orientada a la salud.' },
  { id: '1.2c', codigo: 'EFI.1.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Conocer y aplicar protocolos de primeros auxilios y soporte vital básico (conducta PAS, RCP y uso de DEA/DESA).' },
  { id: '2.1c', codigo: 'EFI.2.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Demostrar precisión técnica y fluidez en deportes individuales, de raqueta/implemento y colectivos avanzados.' },
  { id: '2.2c', codigo: 'EFI.2.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Elaborar y aplicar sistemas tácticos avanzados respondiendo a la lectura estratégica de los rivales.' },
  { id: '3.1c', codigo: 'EFI.3.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Organizar y dinamizar torneos escolares inclusivos promoviendo el liderazgo compartido y la cooperación.' },
  { id: '3.2c', codigo: 'EFI.3.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Autorregular la ansiedad y la frustración en contextos competitivos de juego real de forma asertiva.' },
  { id: '4.1c', codigo: 'EFI.4.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente el impacto social, mediático y mercantil del deporte profesional y sus valores éticos.' },
  { id: '4.2c', codigo: 'EFI.4.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Diseñar composiciones grupales de acrosport, danza urbana o mimo combinando calidad estética y coordinación.' },
  { id: '5.1c', codigo: 'EFI.5.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Planificar recorridos en el medio natural contemplando previsiones meteorológicas y normas de seguridad.' },
  { id: '5.2c', codigo: 'EFI.5.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Utilizar medios de transporte activos y sostenibles (bicicleta, patinete) en actividades de exploración del entorno y espacios verdes comunitarios.' },

  // 4º Curso ESO
  { id: '1.1d', codigo: 'EFI.1.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar, autorregular y evaluar un programa autónomo de actividad física orientada a la vida adulta.' },
  { id: '1.2d', codigo: 'EFI.1.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente mitos del fitness, dietas milagro, suplementación y factores de riesgo para la salud integral.' },
  { id: '2.1d', codigo: 'EFI.2.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Resolver proyectos motores complejos adaptando componentes cualitativos (ritmo, precisión, fluidez y creatividad).' },
  { id: '2.2d', codigo: 'EFI.2.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Diseñar y coordinar estrategias de equipo en deportes convencionales y alternativos con alta eficacia táctica.' },
  { id: '3.1d', codigo: 'EFI.3.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Liderar y gestionar proyectos físico-deportivos comunitarios que promuevan la inclusión y la participación activa.' },
  { id: '3.2d', codigo: 'EFI.3.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Demostrar madurez ética y autocontrol permanente ante momentos de máxima presión competitiva.' },
  { id: '4.1d', codigo: 'EFI.4.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Adoptar una postura crítica fundada sobre el dopaje, los estereotipos de género y el mercantilismo deportivo.' },
  { id: '4.2d', codigo: 'EFI.4.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Producir y presentar proyectos escénicos corporales integrales vinculando movimiento, música y tecnología.' },
  { id: '5.1d', codigo: 'EFI.5.1d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Organizar de forma autónoma actividades en el medio natural gestionando riesgos y minimizando la huella ecológica.' },
  { id: '5.2d', codigo: 'EFI.5.2d', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Promover la movilidad activa y el uso sostenible de los espacios públicos e instalaciones deportivas comunitarias.' }
];

export const SABERES_BASICOS_ASTURIAS_ESO: SaberBasico[] = [
  { codigo: 'EFI.ESO.A.1', bloque: 'A', bloqueNombre: 'Salud física, mental y social', ciclo: 'Todos', descripcion: 'Métodos y sistemas de acondicionamiento físico orientados a la salud; control de la frecuencia cardíaca y zonas de esfuerzo; nutrición deportiva, hidratación y balance energético; ergonomía y educación postural; análisis crítico de modelos estéticos y prevención de trastornos (vigorexia, anorexia); autogestión de la vida activa.' },
  { codigo: 'EFI.ESO.B.1', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Todos', descripcion: 'Planificación de calentamientos específicos autónomos; mantenimiento del equipamiento; protocolos de seguridad y primeros auxilios (conducta PAS, soporte vital básico, maniobra de Heimlich, RCP y uso de DEA/DESA).' },
  { codigo: 'EFI.ESO.C.1', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: 'Todos', descripcion: 'Técnica y táctica en deportes individuales, de adversario (red/pared, lucha) y colectivos de invasión; deportes alternativos y emergentes (Ultimate, Goubak, Kin-ball, Datchball); análisis de la lógica interna y toma de decisiones tácticas dinámicas.' },
  { codigo: 'EFI.ESO.D.1', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social en situaciones motrices', ciclo: 'Todos', descripcion: 'Gestión del estrés y competitividad; roles de organización, capitanía y arbitraje escolar; juego limpio y ética deportiva; prevención y erradicación de conductas violentas, sexistas o discriminatorias en el deporte.' },
  { codigo: 'EFI.ESO.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Todos', descripcion: 'Juegos tradicionales asturianos y modalidades de bolos (cuatreada, birle, batiente); acrosport, dramatización y danzas contemporáneas/urbanas; análisis sociológico del deporte espectáculo y coeducación.' },
  { codigo: 'EFI.ESO.F.1', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Todos', descripcion: 'Carreras de orientación en el medio natural; senderismo y cicloturismo (BTT); actividades acuáticas, de montaña y deslizamiento; escalada y cabuyería básica; normativa sobre espacios naturales protegidos, residuo cero y movilidad activa.' }
];
