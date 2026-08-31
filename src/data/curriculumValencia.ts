import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// COMUNIDAD VALENCIANA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_VALENCIA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: "CE.EF.1", numero: 1, nombre: "Estilo de vida activo, saludable y bienestar global", descripcion: "Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física lúdico-deportiva, el cuidado del cuerpo y la higiene postural, reconociendo los beneficios físicos, psicológicos y sociales para el bienestar integral." },
  { id: "CE.EF.2", numero: 2, nombre: "Adaptación motriz, resolución de retos y manifestación expresiva", descripcion: "Adaptar el esquema corporal, las capacidades perceptivo-motrices, físicas y coordinativas, así como las habilidades motrices básicas y específicas, a las exigencias de situaciones motrices variadas con eficacia, iniciativa, creatividad y seguridad." },
  { id: "CE.EF.3", numero: 3, nombre: "Autorregulación emocional, inclusión y convivencia pacífica", descripcion: "Desarrollar procesos de autorregulación emocional y habilidades sociales durante la práctica motriz, fomentando la inclusión, el respeto a la diversidad, la igualdad de género, el trabajo cooperativo y el juego limpio para una convivencia pacífica." },
  { id: "CE.EF.4", numero: 4, nombre: "Cultura motriz, patrimonio tradicional y Pilota Valenciana", descripcion: "Valorar e integrar la cultura motriz tradicional y contemporánea, reconociendo los juegos populares, los deportes autóctonos (con especial relevancia de la Pilota Valenciana y sus modalidades) y las expresiones artístico-expresivas como parte del patrimonio sociocultural." },
  { id: "CE.EF.5", numero: 5, nombre: "Interacción ecosostenible con el medio natural y urbano", descripcion: "Interactuar en el medio natural y urbano de manera autónoma, segura y ecosostenible a través de la práctica de actividades físicas, promoviendo la conservación del medio ambiente, la movilidad activa y el residuo cero." }
];

export const CRITERIOS_EVALUACION_VALENCIA_PRIMARIA: CriterioEvaluacion[] = [
  // 1º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Identificar las sensaciones corporales asociadas al ejercicio y los beneficios básicos de la actividad física diaria." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Adquirir hábitos elementales de higiene corporal, educación postural y vestimenta deportiva adecuada." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Aplicar pautas básicas de seguridad y prevención de accidentes en los juegos motores escolares." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Afianzar el esquema corporal, la dominancia lateral y el equilibrio estático y dinámico en tareas motrices lúdicas." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Resolver situaciones motrices sencillas aplicando habilidades motrices básicas (desplazamientos, saltos, giros y lanzamientos)." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Experimentar el cuerpo y el movimiento como vehículos de expresión, comunicación gestual y dramatización simple." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.3", descripcion: "Aceptar y cumplir las reglas de los juegos, demostrando actitudes de juego limpio y respeto hacia los compañeros." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.3", descripcion: "Participar activamente en juegos grupales cooperando sin discriminación por razones de género o habilidad." },
  { id: "3.3", codigo: "EFI.3.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.3", descripcion: "Expresar y regular emociones básicas asociadas a la victoria, la derrota o el esfuerzo en el juego." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.4", descripcion: "Conocer y participar en juegos tradicionales y populares de la Comunitat Valenciana y de otras culturas." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.4", descripcion: "Reproducir danzas infantiles sencillas y secuencias rítmicas coordinadas con y sin soporte musical." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.5", descripcion: "Realizar actividades motrices en entornos naturales o urbanos cercanos aplicando normas de seguridad básica." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.5", descripcion: "Adoptar conductas elementales de cuidado y respeto hacia el entorno y los materiales deportivos." },

  // 2º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Reconocer las adaptaciones fisiológicas inmediatas del cuerpo al esfuerzo (frecuencia cardíaca y respiratoria)." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Consolidar rutinas de calentamiento general, vuelta a la calma, hidratación y alimentación saludable." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Identificar factores de riesgo en la práctica de juegos y adoptar medidas preventivas de seguridad." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Combinar y adaptar habilidades motrices básicas para superar retos motores y resolver juegos modificados." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Ajustar el control postural, la orientación espacial y la estructuración temporal a situaciones cambiantes." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Crear y representar secuencias expresivas y rítmicas grupales con intención comunicativa y estética." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.3", descripcion: "Demostrar deportividad asumiendo diferentes roles (participante, árbitro/juez) y respetando las decisiones del grupo." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.3", descripcion: "Colaborar en tareas colectivas anteponiendo el objetivo común al éxito personal y mediando en conflictos." },
  { id: "3.3", codigo: "EFI.3.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.3", descripcion: "Gestionar la frustración y canalizar las emociones hacia la superación constructiva." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.4", descripcion: "Identificar, practicar y valorar juegos tradicionales valencianos e iniciarse en modalidades de Pilota Valenciana (raspall, raspall adaptat)." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.4", descripcion: "Participar en danzas populares y tradicionales valencianas mostrando adecuación rítmica y respeto patrimonial." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.5", descripcion: "Orientarse y desplazarse en espacios naturales o urbanos utilizando mapas sencillos, planos escolares o pistas." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.5", descripcion: "Aplicar normas de residuo cero y conservación activa del medio ambiente durante las salidas al aire libre." },

  // 3º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Diseñar y autorregular planes sencillos de actividad física orientados a la salud y a la condición física general." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Valorar de forma crítica el impacto del sedentarismo, la alimentación ultraprocesada y el uso excesivo de pantallas." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Conocer y aplicar protocolos elementales de auxilio y prevención de accidentes en la práctica motriz (conducta PAS)." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Adaptar habilidades motrices específicas y combinadas con eficacia en situaciones deportivas individuales y colectivas." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Aplicar soluciones tácticas básicas de anticipación, ocupación espacial y toma de decisiones en deportes reglados." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Elaborar y presentar montajes expresivos grupales complejos (acrosport, danzas urbanas, dramatizaciones) con fluidez." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.3", descripcion: "Liderar y participar en dinámicas colaborativas promoviendo activamente la equidad de género y la inclusión efectiva." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.3", descripcion: "Asumir responsabilidades en la organización de eventos y encuentros deportivos escolares bajo premisas de juego limpio." },
  { id: "3.3", codigo: "EFI.3.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.3", descripcion: "Emplear estrategias de autorregulación emocional reflexiva ante momentos de presión o competitividad." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.4", descripcion: "Valorar el origen histórico y patrimonial de los juegos autóctonos y consolidar fundamentos de la Pilota Valenciana." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.4", descripcion: "Analizar críticamente los estereotipos de género y comportamientos sexistas o mercantiles en el deporte contemporáneo." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.5", descripcion: "Planificar y realizar recorridos de senderismo y orientación en la naturaleza con autonomía y seguridad." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.5", descripcion: "Promover la movilidad activa y sostenible (desplazamientos en bicicleta o a pie) en la vida comunitaria escolar." }
];

export const SABERES_BASICOS_VALENCIA_PRIMARIA: SaberBasico[] = [
  { codigo: "EFI.PRI.A", bloque: "A", bloqueNombre: "Salud física, mental y social", ciclo: "Todos", descripcion: "Efectos fisiológicos y psicológicos de la práctica de actividad física regular; hábitos de higiene personal, postural y corporal; descanso e hidratación; alimentación saludable y prevención del sedentarismo; repercusión del uso abusivo de pantallas; imagen corporal libre de estereotipos." },
  { codigo: "EFI.PRI.B", bloque: "B", bloqueNombre: "Resolución de situaciones motrices", ciclo: "Todos", descripcion: "Esquema corporal, lateralidad, control postural, coordinación y equilibrio; habilidades motrices básicas (desplazamientos, saltos, giros, lanzamientos y recepciones); habilidades genéricas y específicas; toma de decisiones y lógica interna de juegos modificados, cooperativos y predeportivos." },
  { codigo: "EFI.PRI.C", bloque: "C", bloqueNombre: "Autorregulación emocional e interacción social", ciclo: "Todos", descripcion: "Identificación y gestión de emociones (frustración, éxito, fracaso); habilidades sociales aplicadas a situaciones de juego; juego limpio y respeto por las normas y contrincantes; asunción de roles y resolución pacífica de conflictos; coeducación, equidad e inclusión activa." },
  { codigo: "EFI.PRI.D", bloque: "D", bloqueNombre: "Organización y gestión de la actividad física", ciclo: "Todos", descripcion: "Estructura de la sesión: calentamiento general, fase principal y vuelta a la calma; uso responsable, seguro y compartido de materiales e instalaciones; pautas de prevención de riesgos y conductas básicas de primeros auxilios (protocolo PAS)." },
  { codigo: "EFI.PRI.E", bloque: "E", bloqueNombre: "Manifestaciones de la cultura motriz", ciclo: "Todos", descripcion: "Juegos populares y tradicionales de la Comunitat Valenciana y de otras culturas; iniciación y práctica del deporte autóctono de la Pilota Valenciana (raspall, modalidades adaptadas); lenguaje expresivo y rítmico corporal, mimo, dramatización y danzas tradicionales valencianas." },
  { codigo: "EFI.PRI.F", bloque: "F", bloqueNombre: "Interacción eficiente y sostenible con el entorno", ciclo: "Todos", descripcion: "Técnicas de orientación espacial en el centro educativo y espacios naturales/urbanos (mapas, planos, pistas); senderismo y actividades sobre ruedas; desplazamientos activos y seguros; concienciación ecosostenible, protección del medio y cultura de residuo cero." }
];

// ==========================================
// COMUNIDAD VALENCIANA - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_VALENCIA_ESO: CompetenciaEspecifica[] = [
  { id: "CE.EF.1", numero: 1, nombre: "Estilo de vida activo, salud integral y prevención", descripcion: "Adoptar un estilo de vida activo y saludable, planificando e implementando una práctica de actividad física regular y autónoma, reconociendo los factores que influyen en el bienestar físico, mental y social, y aplicando medidas de prevención, seguridad y primeros auxilios." },
  { id: "CE.EF.2", numero: 2, nombre: "Adaptación motriz, toma de decisiones y eficacia táctico-expresiva", descripcion: "Adaptar y aplicar de manera eficaz, autónoma y creativa las habilidades motrices básicas y específicas a contextos lúdicos, deportivos y de la vida cotidiana, tomando decisiones fundamentadas según la lógica interna y las demandas situacionales." },
  { id: "CE.EF.3", numero: 3, nombre: "Autorregulación socioemocional, juego limpio e inclusión", descripcion: "Desarrollar procesos de autorregulación emocional, habilidades sociales, inclusión activa y juego limpio en la interacción motriz, colaborando en la resolución pacífica de conflictos y erradicando actitudes discriminatorias." },
  { id: "CE.EF.4", numero: 4, nombre: "Patrimonio motriz, Pilota Valenciana y manifestación artístico-expresiva", descripcion: "Valorar, practicar y recrear manifestaciones culturales del patrimonio motriz, tradicional y contemporáneo (con especial atención al juego y deporte tradicional de la Comunitat Valenciana, como la Pilota Valenciana), así como expresiones corporales artístico-expresivas con sentido estético y crítico." },
  { id: "CE.EF.5", numero: 5, nombre: "Interacción sostenible con el entorno, medio natural y movilidad activa", descripcion: "Interactuar con el medio natural y urbano mediante actividades físicas y de desplazamiento activo y sostenible, asumiendo la responsabilidad en la conservación ambiental, la seguridad personal y comunitaria, y el uso cívico del espacio público." }
];

export const CRITERIOS_EVALUACION_VALENCIA_ESO: CriterioEvaluacion[] = [
  // 1º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.1", descripcion: "Identificar las capacidades físicas básicas relacionadas con la salud y experimentar de forma guiada métodos elementales para su desarrollo." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.1", descripcion: "Realizar rutinas de calentamiento general pautadas e incorporar hábitos de higiene corporal y educación postural en las sesiones." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.2", descripcion: "Aplicar habilidades motrices específicas en situaciones sociomotrices y de oposición sencillas con ajuste técnico." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.2", descripcion: "Tomar decisiones tácticas básicas en juegos modificados y deportes colectivos atendiendo a compañeros, adversarios y espacio." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.3", descripcion: "Participar con actitud cooperativa y de respeto mutuo hacia los iguales, rechazando cualquier conducta discriminatoria." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.3", descripcion: "Aplicar las reglas y normas del juego con deportividad, asumiendo con naturalidad los diferentes roles asignados." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.4", descripcion: "Participar en juegos populares y tradicionales de la Comunitat Valenciana, iniciándose en modalidades básicas de Pilota Valenciana." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.4", descripcion: "Explorar y reproducir secuencias sencillas de expresión corporal adecuando el movimiento a ritmos y estructuras sonoras." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.5", descripcion: "Realizar recorridos de orientación básica en el centro escolar o parques urbanos interpretando croquis o planos simples." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.5", descripcion: "Aplicar protocolos elementales de prevención de riesgos y respeto medioambiental en espacios urbanos y periurbanos." },

  // 2º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.1", descripcion: "Valorar la condición física personal mediante pruebas orientadas a la salud, interpretando los registros de evolución." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.1", descripcion: "Diseñar y dirigir calentamientos generales autónomos aplicando principios de nutrición e hidratación equilibrada." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.2", descripcion: "Ajustar las respuestas técnicas y coordinativas ante situaciones dinámicas de oposición directa y colaboración." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.2", descripcion: "Aplicar principios tácticos colectivos (apoyo, desmarque, ocupación racional del espacio) en deportes convencionales y alternativos." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.3", descripcion: "Desempeñar tareas de arbitraje escolar básico y mediación dialogada ante situaciones de conflicto en el juego." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.3", descripcion: "Promover activamente la inclusión, la coeducación y la equidad de género en todas las dinámicas grupales del aula." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.4", descripcion: "Practicar y valorar modalidades tradicionales de la Comunitat Valenciana (raspall) y danzas populares del patrimonio cultural." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.4", descripcion: "Diseñar y ejecutar coreografías grupales sencillas combinando técnicas corporales y soporte musical." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.5", descripcion: "Completar itinerarios de orientación en espacios naturales y parques periurbanos utilizando mapa y brújula de forma segura." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.5", descripcion: "Aplicar pautas ecológicas de minimización de huella ambiental y uso cívico de las infraestructuras recreativas." },

  // 3º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.1", descripcion: "Planificar e implementar un programa personal básico de trabajo de las capacidades físicas orientado a la salud." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.1", descripcion: "Conocer y aplicar protocolos de primeros auxilios y soporte vital básico (conducta PAS, RCP y uso de DEA/DESA)." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.2", descripcion: "Demostrar precisión técnica y adaptabilidad en deportes individuales, de adversario (raqueta/lucha) y colectivos." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.2", descripcion: "Diseñar y poner en práctica estrategias tácticas grupales basadas en el análisis de sistemas de juego propios y rivales." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.3", descripcion: "Organizar y dinamizar torneos escolares inclusivos asumiendo roles organizativos y de liderazgo colaborativo." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.3", descripcion: "Autorregular la frustración y la presión competitiva en contextos de juego real de manera constructiva y asertiva." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.4", descripcion: "Analizar críticamente el impacto social, mediático y mercantilista del deporte profesional contemporáneo." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.4", descripcion: "Crear y presentar montajes escénicos colectivos (acrosport, danzas urbanas o dramatización) con calidad estética y expresiva." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.5", descripcion: "Planificar y realizar actividades en el entorno natural considerando previsión meteorológica, seguridad y logística básica." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.5", descripcion: "Promover y utilizar medios de transporte activo (bicicleta, patinete) en actividades cotidianas y de exploración urbana." },

  // 4º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.1", descripcion: "Diseñar, autorregular y evaluar con autonomía un plan de actividad física orientada a la salud transferible a la vida adulta." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.1", descripcion: "Analizar críticamente mitos del fitness, dietas milagro, suplementación, dopaje y trastornos corporales (anorexia, vigorexia)." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.2", descripcion: "Resolver proyectos y retos motores complejos optimizando los componentes cualitativos (ritmo, precisión, fluidez y economía)." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.2", descripcion: "Planificar, coordinar y evaluar estrategias tácticas avanzadas en deportes tradicionales y alternativos con alta eficacia." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.3", descripcion: "Liderar proyectos físico-deportivos comunitarios o de aprendizaje-servicio fomentando la participación, equidad y cohesión social." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.3", descripcion: "Demostrar autocontrol y madurez ética ante situaciones de máxima exigencia competitiva, promoviendo el juego limpio colectivo." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.4", descripcion: "Adoptar una postura fundada frente a problemáticas socioculturales del deporte (dopaje, estereotipos de género, mercantilismo)." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.4", descripcion: "Producir, escenificar y evaluar proyectos artísticos interdisciplinares integrando movimiento, música y tecnología digital." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.5", descripcion: "Organizar de forma autónoma estancias o travesías en la naturaleza gestionando integralmente la seguridad y minimizando el impacto." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.5", descripcion: "Diseñar y promover propuestas de movilidad activa cotidiana y uso sostenible de los espacios públicos e instalaciones comunitarias." }
];

export const SABERES_BASICOS_VALENCIA_ESO: SaberBasico[] = [
  { codigo: "EFI.ESO.A", bloque: "A", bloqueNombre: "Salud física, mental y social", ciclo: "Todos", descripcion: "Métodos de acondicionamiento físico orientados a la salud; control de la frecuencia cardíaca y del esfuerzo; nutrición equilibrada, hidratación y balance energético; ergonomía y educación postural; análisis crítico de modelos corporales y prevención de trastornos (vigorexia, anorexia); autogestión de la práctica activa." },
  { codigo: "EFI.ESO.B", bloque: "B", bloqueNombre: "Resolución de situaciones motrices", ciclo: "Todos", descripcion: "Capacidades coordinativas y habilidades motrices específicas; análisis de la lógica interna y toma de decisiones tácticas en deportes individuales, de adversario (red/pared, lucha) y colectivos de invasión; deportes alternativos y emergentes (Ultimate, Goubak, Kin-ball, Datchball)." },
  { codigo: "EFI.ESO.C", bloque: "C", bloqueNombre: "Autorregulación emocional e interacción social", ciclo: "Todos", descripcion: "Habilidades socioafectivas en la práctica deportiva; gestión de la competitividad, el éxito y el fracaso; asunción equitativa de roles (jugador, capitán, árbitro/mediador); juego limpio y prevención de conductas violentas, sexistas o discriminatorias." },
  { codigo: "EFI.ESO.D", bloque: "D", bloqueNombre: "Organización y gestión de la actividad física", ciclo: "Todos", descripcion: "Planificación autónoma de calentamientos específicos; uso y mantenimiento del equipamiento; protocolos de prevención de riesgos y primeros auxilios (conducta PAS, soporte vital básico, RCP y uso de DEA/DESA)." },
  { codigo: "EFI.ESO.E", bloque: "E", bloqueNombre: "Manifestaciones de la cultura motriz", ciclo: "Todos", descripcion: "Juegos populares y tradicionales de la Comunitat Valenciana; modalidades de Pilota Valenciana (raspall, galotxa, llargues); técnicas de expresión corporal, danzas populares y contemporáneas, acrosport y dramatización; análisis crítico del deporte espectáculo." },
  { codigo: "EFI.ESO.F", bloque: "F", bloqueNombre: "Interacción eficiente y sostenible con el entorno", ciclo: "Todos", descripcion: "Carreras de orientación en el medio natural y urbano; senderismo, cicloturismo y BTT; técnicas de acampada y cabuyería básica; protocolos ecológicos de residuo cero; movilidad activa urbana y seguridad vial." }
];
