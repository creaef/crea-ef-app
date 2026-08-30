import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// CANTABRIA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_CANTABRIA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia Específica 1', descripcion: 'Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física, el cuidado del cuerpo, la higiene postural y la prevención de riesgos, valorando los beneficios para la salud global.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia Específica 2', descripcion: 'Adaptar los elementos del propio esquema corporal, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices básicas y específicas, a las exigencias de situaciones motrices variadas.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia Específica 3', descripcion: 'Desarrollar procesos de autorregulación emocional y habilidades sociales durante la práctica motriz, fomentando la inclusión, el respeto a la diversidad, la igualdad de género y el juego limpio para la convivencia pacífica.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia Específica 4', descripcion: 'Valorar e integrar la cultura motriz tradicional y contemporánea, reconociendo los juegos populares, los deportes autóctonos cántabros (como las modalidades de bolos, el salto pasiego y los deportes tradicionales) y las manifestaciones artístico-expresivas.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia Específica 5', descripcion: 'Interactuar en el medio natural y urbano de manera autónoma, segura y ecosostenible a través de la práctica de actividades físicas, promoviendo el cuidado del entorno y la movilidad activa.' }
];

export const CRITERIOS_EVALUACION_CANTABRIA_PRIMARIA: CriterioEvaluacion[] = [
  // PRIMER CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar las sensaciones corporales asociadas al ejercicio y los efectos positivos de la actividad física.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Adquirir hábitos básicos de higiene corporal, educación postural y vestimenta adecuada para la práctica.' },
  { id: '1.3', codigo: 'EFI.1.3', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Aplicar pautas elementales de seguridad y prevención de accidentes en los juegos escolares.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Afianzar el esquema corporal, la lateralidad y el equilibrio estático y dinámico en juegos sencillos.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar habilidades motrices básicas (desplazamientos, saltos, giros y lanzamientos) en diferentes tareas lúdicas.' },
  { id: '2.3', codigo: 'EFI.2.3', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Experimentar el cuerpo como vehículo de expresión gestual, ritmo y dramatización elemental.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Aceptar y cumplir las normas de los juegos, colaborando activamente sin discriminación.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Reconocer y regular emociones básicas asociadas al esfuerzo, la victoria o la derrota en situaciones lúdicas.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Conocer y participar en juegos tradicionales y populares de Cantabria y de otras culturas.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Reproducir danzas infantiles y secuencias rítmicas coordinadas de forma elemental.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Realizar actividades motrices en entornos naturales o urbanos cercanos aplicando normas de seguridad.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Adoptar hábitos elementales de cuidado y respeto hacia los materiales y espacios deportivos.' },
  // SEGUNDO CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer las respuestas fisiológicas inmediatas del organismo ante el esfuerzo físico.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Consolidar rutinas de calentamiento general, vuelta a la calma, hidratación y alimentación saludable.' },
  { id: '1.3', codigo: 'EFI.1.3', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar situaciones de riesgo en la práctica físico-deportiva y aplicar medidas de autoprotección.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Combinar y ajustar habilidades motrices básicas para resolver retos motores y juegos modificados.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Regular el control postural, la orientación espacial y el ritmo adaptándolos a situaciones imprevistas.' },
  { id: '2.3', codigo: 'EFI.2.3', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Crear y representar secuencias expresivas y rítmicas individuales y colectivas con intención comunicativa.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Demostrar deportividad asumiendo diferentes roles (participante, árbitro/juez) y respetando las decisiones colectivas.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Resolver discrepancias interpersonales mediante el diálogo activo, la empatía y el respeto a las diferencias.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Identificar, practicar y valorar juegos tradicionales y deportes autóctonos cántabros (iniciación al bolo palma y juegos tradicionales).' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Participar en danzas tradicionales de Cantabria y bailes colectivos mostrando ajuste rítmico y respeto patrimonial.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Orientarse y desplazarse en espacios naturales o urbanos utilizando mapas sencillos, planos escolares o pistas.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Desarrollar comportamientos responsables de residuo cero y conservación del entorno durante las salidas.' },
  // TERCER CICLO
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular rutinas guiadas de actividad física orientadas a la mejora de la salud y condición física general.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente los riesgos derivados del sedentarismo, los malos hábitos posturales y el uso abusivo de pantallas.' },
  { id: '1.3', codigo: 'EFI.1.3', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Conocer y aplicar protocolos elementales de auxilio y primeros auxilios ante accidentes en la práctica motriz (conducta PAS).' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Adaptar habilidades motrices específicas y combinadas con eficacia en situaciones deportivas individuales y colectivas.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar soluciones tácticas de anticipación, ocupación espacial y toma de decisiones rápida en deportes reglados.' },
  { id: '2.3', codigo: 'EFI.2.3', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Diseñar y presentar montajes expresivos grupales complejos (acrosport, danzas urbanas, dramatizaciones) con fluidez.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Liderar y participar en dinámicas colaborativas promoviendo activamente la equidad de género y la inclusión efectiva.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Asumir responsabilidades en la organización de encuentros deportivos escolares bajo premisas de juego limpio y fair play.' },
  { id: '3.3', codigo: 'EFI.3.3', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Emplear estrategias de autorregulación emocional reflexiva ante momentos de presión o competitividad.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Valorar el origen e importancia cultural de los juegos y modalidades de bolos cántabros (bolo palma, pasiego, pasabolo) como patrimonio inmaterial.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente los estereotipos de género y comportamientos antideportivos o comerciales en el deporte actual.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Planificar y realizar recorridos de orientación y senderismo en el medio natural y de montaña de forma autónoma y segura.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Promover la movilidad activa y sostenible (desplazamientos en bicicleta o a pie) en la vida comunitaria escolar.' }
];

export const SABERES_BASICOS_CANTABRIA_PRIMARIA: SaberBasico[] = [
  { codigo: 'EFI.PRI.A.1', bloque: 'A', bloqueNombre: 'Salud física, mental y social', ciclo: 'Todos', descripcion: 'Efectos del ejercicio sobre la salud física y psicológica; higiene corporal integral y atuendo adecuado; educación postural y descanso; nutrición equilibrada e hidratación; prevención del sedentarismo y riesgos derivados de las pantallas; imagen corporal positiva y bienestar emocional.' },
  { codigo: 'EFI.PRI.B.1', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Todos', descripcion: 'Fases de la sesión (activación/calentamiento, desarrollo, vuelta a la calma); normas de uso y cuidado responsable del material e instalaciones; pautas de prevención de accidentes y primeros auxilios básicos (conducta PAS).' },
  { codigo: 'EFI.PRI.C.1', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: 'Todos', descripcion: 'Esquema corporal, dominancia lateral, orientación y equilibrio; habilidades motrices básicas y específicas; iniciación técnico-táctica en deportes individuales, de adversario y colectivos; toma de decisiones y lógica interna de los juegos.' },
  { codigo: 'EFI.PRI.D.1', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social en situaciones motrices', ciclo: 'Todos', descripcion: 'Gestión emocional ante el éxito, el fracaso y la frustración; habilidades sociales, empatía y trabajo cooperativo; juego limpio, asunción de roles arbitrales y respeto a las normas; coeducación, equidad de género y resolución pacífica de conflictos.' },
  { codigo: 'EFI.PRI.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Todos', descripcion: 'Juegos populares y tradicionales de Cantabria; modalidades tradicionales de bolos (bolo palma, pasabolo tablón, pasabolo losa, bolo pasiego) y salto pasiego; expresión corporal, mimo, dramatización y acrosport; bailes tradicionales cántabros y danzas del mundo; análisis social del deporte.' },
  { codigo: 'EFI.PRI.F.1', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Todos', descripcion: 'Técnicas de orientación espacial con planos y mapas; actividades de senderismo y montaña en el entorno cántabro; prevención de riesgos al aire libre; movilidad activa, desplazamientos sostenibles y cultura de residuo cero.' }
];

// ==========================================
// CANTABRIA - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_CANTABRIA_ESO: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Competencia Específica 1', descripcion: 'Planificar y autorregular una práctica de actividad física orientada a la salud, consolidando un estilo de vida activo y saludable, reconociendo los factores condicionantes del bienestar integral y aplicando medidas de seguridad y prevención.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Competencia Específica 2', descripcion: 'Adaptar y ejecutar las habilidades motrices básicas y específicas a situaciones sociomotrices complejas y dinámicas, con eficacia, control postural, fluidez y creatividad en contextos individuales, de oposición y de colaboración.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Competencia Específica 3', descripcion: 'Fomentar relaciones interpersonales inclusivas, respetuosas y asertivas en la práctica físico-deportiva, asumiendo la autorregulación emocional, el trabajo cooperativo, la equidad de género y el juego limpio para la resolución pacífica de conflictos.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Competencia Específica 4', descripcion: 'Valorar y participar en manifestaciones de la cultura motriz tradicional cántabra, contemporánea y deportiva, analizando críticamente el deporte como fenómeno social, sus implicaciones económicas y mediáticas y preservando el patrimonio autóctono.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Competencia Específica 5', descripcion: 'Desenvolverse de manera autónoma, eficiente y segura en el medio natural y urbano a través de actividades físico-deportivas sostenibles, promoviendo la preservación ambiental y la movilidad activa cotidiana.' }
];

export const CRITERIOS_EVALUACION_CANTABRIA_ESO: CriterioEvaluacion[] = [
  // 1º Ciclo ESO (mapped from 1º and 2º ESO)
  { id: '1.1', codigo: 'EFI.1.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar las capacidades físicas básicas (resistencia, fuerza, flexibilidad, velocidad) y su vinculación con la salud.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Realizar calentamientos generales guiados y aplicar hábitos de higiene postural y corporal tras la práctica.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Ejecutar habilidades motrices específicas en situaciones de oposición e iniciación deportiva con eficacia técnica elemental.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Tomar decisiones tácticas sencillas en juegos reducidos de cooperación-oposición y deportes colectivos.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Participar con actitud de cooperación y respeto hacia los compañeros, rechazando cualquier discriminación.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Aceptar y cumplir los reglamentos escolares, actuando con deportividad al asumir diversos roles de juego.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Conocer y practicar juegos y deportes tradicionales cántabros (modalidades de bolos y juegos tradicionales).' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Ejecutar secuencias rítmicas elementales y estructuras de movimiento expresivo corporal.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Realizar recorridos de orientación básica en el centro escolar o parques urbanos siguiendo un mapa.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Aplicar protocolos elementales de prevención de riesgos y respeto al entorno natural.' },
  { id: '1.1b', codigo: 'EFI.1.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Evaluar la condición física personal aplicando pruebas estandarizadas y registrando la evolución.' },
  { id: '1.2b', codigo: 'EFI.1.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y ejecutar calentamientos generales autónomos y aplicar pautas de nutrición deportiva e hidratación.' },
  { id: '2.1b', codigo: 'EFI.2.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Adaptar gestos técnicos y coordinativos ante situaciones dinámicas no estandarizadas y de oposición directa.' },
  { id: '2.2b', codigo: 'EFI.2.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Aplicar principios tácticos colectivos de apoyo, desmarque y cobertura en deportes de invasión.' },
  { id: '3.1b', codigo: 'EFI.3.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Asumir roles de arbitraje escolar y mediación de conflictos de forma dialogada y con juego limpio.' },
  { id: '3.2b', codigo: 'EFI.3.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Promover la inclusión y la igualdad efectiva de género en todas las dinámicas motrices del grupo.' },
  { id: '4.1b', codigo: 'EFI.4.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Practicar modalidades de bolos cántabros (bolo palma, pasabolo) y danzas regionales.' },
  { id: '4.2b', codigo: 'EFI.4.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Crear coreografías o montajes expresivos grupales sencillos con adecuación rítmica y música.' },
  { id: '5.1b', codigo: 'EFI.5.1b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Completar itinerarios en la naturaleza utilizando brújula y lectura básica de planos topográficos.' },
  { id: '5.2b', codigo: 'EFI.5.2b', ciclo: '1º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Aplicar medidas de residuo cero y conservación activa del medio ambiente en actividades de senderismo.' },

  // 2º Ciclo ESO (mapped from 3º and 4º ESO)
  { id: '1.1c', codigo: 'EFI.1.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Diseñar y poner en práctica un plan sistemático personal de trabajo de una capacidad física orientada a la salud.' },
  { id: '1.2c', codigo: 'EFI.1.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.1', descripcion: 'Conocer y aplicar protocolos de primeros auxilios y soporte vital básico (conducta PAS, RCP y uso de DEA/DESA).' },
  { id: '2.1c', codigo: 'EFI.2.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Demostrar precisión técnica y fluidez en deportes individuales, de raqueta/implemento y colectivos avanzados.' },
  { id: '2.2c', codigo: 'EFI.2.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.2', descripcion: 'Elaborar y aplicar sistemas tácticos avanzados respondiendo a la lectura estratégica de los rivales.' },
  { id: '3.1c', codigo: 'EFI.3.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Organizar y dinamizar torneos escolares inclusivos promoviendo el liderazgo compartido y la cooperación.' },
  { id: '3.2c', codigo: 'EFI.3.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.3', descripcion: 'Autorregular la ansiedad y la frustración en contextos competitivos de juego real de forma asertiva.' },
  { id: '4.1c', codigo: 'EFI.4.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente el impacto social, mediático y mercantil del deporte profesional y sus valores éticos.' },
  { id: '4.2c', codigo: 'EFI.4.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.4', descripcion: 'Diseñar composiciones grupales de acrosport, danza urbana o mimo combinando calidad estética y coordinación.' },
  { id: '5.1c', codigo: 'EFI.5.1c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Planificar recorridos en el medio natural contemplando previsiones meteorológicas y normas de seguridad.' },
  { id: '5.2c', codigo: 'EFI.5.2c', ciclo: '2º Ciclo ESO', competenciaId: 'CE.EF.5', descripcion: 'Utilizar medios de transporte activos y sostenibles (bicicleta, patinete) en actividades de exploración urbana.' },
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

export const SABERES_BASICOS_CANTABRIA_ESO: SaberBasico[] = [
  { codigo: 'EFI.ESO.A.1', bloque: 'A', bloqueNombre: 'Salud física, mental y social', ciclo: 'Todos', descripcion: 'Métodos y sistemas de acondicionamiento físico orientados a la salud; control de la frecuencia cardíaca y zonas de esfuerzo; nutrición deportiva, hidratación y balance energético; ergonomía y educación postural; análisis crítico de modelos estéticos y prevención de trastornos (vigorexia, anorexia); autogestión de la vida activa.' },
  { codigo: 'EFI.ESO.B.1', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Todos', descripcion: 'Planificación de calentamientos específicos autónomos; mantenimiento del equipamiento; protocolos de seguridad y primeros auxilios (conducta PAS, soporte vital básico, maniobra de Heimlich, RCP y uso de DEA/DESA).' },
  { codigo: 'EFI.ESO.C.1', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: 'Todos', descripcion: 'Técnica y táctica en deportes individuales, de adversario (red/pared, lucha) y colectivos de invasión; deportes alternativos y emergentes (Ultimate, Goubak, Kin-ball, Datchball); análisis de la lógica interna y toma de decisiones tácticas dinámicas.' },
  { codigo: 'EFI.ESO.D.1', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social en situaciones motrices', ciclo: 'Todos', descripcion: 'Gestión del estrés y competitividad; roles de organización, capitanía y arbitraje escolar; juego limpio y ética deportiva; prevención y erradicación de conductas violentas, sexistas o discriminatorias en el deporte.' },
  { codigo: 'EFI.ESO.E.1', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Todos', descripcion: 'Juegos tradicionales cántabros y modalidades de bolos (bolo palma, pasabolo) y salto pasiego; acrosport, dramatización y danzas contemporáneas/urbanas; análisis sociológico del deporte espectáculo y coeducación.' },
  { codigo: 'EFI.ESO.F.1', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Todos', descripcion: 'Carreras de orientación en el medio natural y urbano; senderismo y cicloturismo (BTT); actividades de montaña, deslizamiento y náuticas; escalada y cabuyería básica; normativa sobre espacios naturales protegidos, residuo cero y movilidad activa urbana.' }
];
