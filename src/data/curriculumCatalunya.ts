import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';
import { COMPETENCIAS_ESPECIFICAS_ESO, CRITERIOS_EVALUACION_ESO, SABERES_BASICOS_ESO } from './curriculumESO';
import { COMPETENCIAS_ESPECIFICAS_BACHILLERATO, CRITERIOS_EVALUACION_BACHILLERATO, SABERES_BASICOS_BACHILLERATO } from './curriculumBachillerato';

// ==========================================
// CATALUNYA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_CATALUNYA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Vida activa y saludable', descripcion: 'Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física, el cuidado del cuerpo, la higiene postural y la prevención de riesgos, valorando los beneficios para la salud integral (física, mental y social).' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Resolución motriz', descripcion: 'Adaptar el esquema corporal, las capacidades perceptivo-motrices, físicas y coordinativas, así como las habilidades motrices básicas y específicas, a situaciones motrices variadas con eficacia, iniciativa y seguridad.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Autorregulación e interacción social', descripcion: 'Desarrollar procesos de autorregulación emocional y habilidades sociales durante la práctica motriz, fomentando la inclusión, el respeto a la diversidad, la igualdad de género y el juego limpio para una convivencia pacífica.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Cultura motriz catalana y contemporánea', descripcion: 'Valorar e integrar la cultura motriz tradicional catalana y contemporánea, reconociendo y practicando juegos populares (jocs tradicionals de Catalunya: bitlles, castells/figuras cooperativas), danzas tradicionales y expresiones artístico-expresivas.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Interacción con el medio y sostenibilidad', descripcion: 'Interactuar en el medio natural y urbano de manera autónoma, segura y ecosostenible a través de la práctica de actividades motrices, promoviendo el cuidado ambiental y la movilidad activa.' }
];

export const CRITERIOS_EVALUACION_CATALUNYA_PRIMARIA: CriterioEvaluacion[] = [
  // PRIMER CICLO (1º y 2º de Primaria)
  { id: '1.1', codigo: 'EFI.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar las sensaciones corporales asociadas al ejercicio y sus beneficios para la salud cotidiana.' },
  { id: '1.2', codigo: 'EFI.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Adquirir hábitos básicos de higiene corporal, educación postural y vestimenta deportiva adecuada.' },
  { id: '1.3', codigo: 'EFI.1.3', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Aplicar pautas básicas de seguridad y prevención de accidentes en los juegos escolares.' },
  { id: '2.1', codigo: 'EFI.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Afianzar el esquema corporal, la lateralidad y el equilibrio estático y dinámico en juegos sencillos.' },
  { id: '2.2', codigo: 'EFI.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar habilidades motrices básicas (desplazamientos, saltos, giros, lanzamientos) en tareas lúdicas.' },
  { id: '2.3', codigo: 'EFI.2.3', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Experimentar el cuerpo como vehículo de expresión gestual, ritmo y dramatización simple.' },
  { id: '3.1', codigo: 'EFI.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Aceptar y cumplir las reglas de los juegos, colaborando activamente sin discriminación.' },
  { id: '3.2', codigo: 'EFI.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Expresar y regular emociones básicas asociadas al esfuerzo, la victoria o la derrota en el juego.' },
  { id: '4.1', codigo: 'EFI.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Conocer y participar en juegos tradicionales y populares de Catalunya y de otras culturas.' },
  { id: '4.2', codigo: 'EFI.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Reproducir danzas infantiles y secuencias rítmicas corporales elementales de forma coordinada.' },
  { id: '5.1', codigo: 'EFI.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Realizar actividades motrices en entornos naturales o urbanos próximos aplicando pautas de seguridad.' },
  { id: '5.2', codigo: 'EFI.5.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Adoptar hábitos elementales de cuidado y respeto hacia los materiales y espacios deportivos.' },

  // SEGUNDO CICLO (3º y 4º de Primaria)
  { id: '1.1b', codigo: 'EFI.1.1b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Reconocer las adaptaciones fisiológicas inmediatas del cuerpo ante el esfuerzo continuado.' },
  { id: '1.2b', codigo: 'EFI.1.2b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Consolidar rutinas de calentamiento general, vuelta a la calma, hidratación y alimentación saludable.' },
  { id: '1.3b', codigo: 'EFI.1.3b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Identificar situaciones de riesgo en la práctica físico-deportiva y aplicar medidas de autoprotección.' },
  { id: '2.1b', codigo: 'EFI.2.1b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Combinar y ajustar habilidades motrices básicas para resolver retos motores y juegos modificados.' },
  { id: '2.2b', codigo: 'EFI.2.2b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Regular el control postural, la orientación espacial y el ritmo ante situaciones imprevistas.' },
  { id: '2.3b', codigo: 'EFI.2.3b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Crear y representar secuencias expresivas y rítmicas individuales y colectivas con intención comunicativa.' },
  { id: '3.1b', codigo: 'EFI.3.1b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Demostrar deportividad asumiendo diferentes roles (participante, árbitro/juez) y respetando decisiones colectivas.' },
  { id: '3.2b', codigo: 'EFI.3.2b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Resolver discrepancias interpersonales mediante el diálogo activo, la empatía y el respeto a las diferencias.' },
  { id: '4.1b', codigo: 'EFI.4.1b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Identificar, practicar y valorar juegos tradicionales y deportes autóctonos catalanes (bitlles catalanes, juegos de calle tradicionales).' },
  { id: '4.2b', codigo: 'EFI.4.2b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Participar en danzas tradicionales de Catalunya (sardanes, balls de bastons) y bailes colectivos mostrando ajuste rítmico.' },
  { id: '5.1b', codigo: 'EFI.5.1b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Orientarse y desplazarse en espacios naturales o urbanos utilizando mapas sencillos, planos escolares o pistas.' },
  { id: '5.2b', codigo: 'EFI.5.2b', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Desarrollar comportamientos responsables de residuo cero y conservación del entorno durante las salidas.' },

  // TERCER CICLO (5º y 6º de Primaria)
  { id: '1.1c', codigo: 'EFI.1.1c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular rutinas guiadas de actividad física orientadas a la salud y condición física general.' },
  { id: '1.2c', codigo: 'EFI.1.2c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Analizar críticamente los riesgos del sedentarismo, malos hábitos posturales y el uso abusivo de pantallas.' },
  { id: '1.3c', codigo: 'EFI.1.3c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: 'Conocer y aplicar protocolos elementales de auxilio y primeros auxilios ante accidentes en la práctica motriz (conducta PAS).' },
  { id: '2.1c', codigo: 'EFI.2.1c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Adaptar habilidades motrices específicas y combinadas con eficacia en situaciones deportivas individuales y colectivas.' },
  { id: '2.2c', codigo: 'EFI.2.2c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Aplicar soluciones tácticas de anticipación, ocupación espacial y toma de decisiones rápida en deportes reglados.' },
  { id: '2.3c', codigo: 'EFI.2.3c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: 'Diseñar y presentar montajes expresivos grupales complejos (acrosport/figuras cooperativas, danzas urbanas, dramatizaciones).' },
  { id: '3.1c', codigo: 'EFI.3.1c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Liderar y participar en dinámicas colaborativas promoviendo activamente la equidad de género y la inclusión efectiva.' },
  { id: '3.2c', codigo: 'EFI.3.2c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Asumir responsabilidades en la organización de encuentros deportivos escolares bajo premisas de juego limpio y fair play.' },
  { id: '3.3c', codigo: 'EFI.3.3c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: 'Emplear estrategias de autorregulación emocional reflexiva ante momentos de presión o competitividad.' },
  { id: '4.1c', codigo: 'EFI.4.1c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Valorar el origen e importancia cultural de los juegos y tradiciones lúdicas catalanas como patrimonio inmaterial.' },
  { id: '4.2c', codigo: 'EFI.4.2c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: 'Analizar críticamente los estereotipos de género y comportamientos comerciales en el deporte actual.' },
  { id: '5.1c', codigo: 'EFI.5.1c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Planificar y realizar recorridos de orientación y senderismo en el medio natural con autonomía y seguridad.' },
  { id: '5.2c', codigo: 'EFI.5.2c', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: 'Promover la movilidad activa y sostenible (desplazamientos en bicicleta o a pie) en la vida comunitaria escolar.' }
];

export const SABERES_BASICOS_CATALUNYA_PRIMARIA: SaberBasico[] = [
  { codigo: 'EFI.PRI.A', bloque: 'A', bloqueNombre: 'Salud física, mental y social', ciclo: 'Todos', descripcion: 'Efectos del ejercicio sobre la salud física y psicológica; higiene corporal integral y atuendo adecuado; educación postural y descanso; nutrición equilibrada e hidratación; prevención del sedentarismo y riesgos derivados de las pantallas; imagen corporal positiva y bienestar emocional.' },
  { codigo: 'EFI.PRI.B', bloque: 'B', bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Todos', descripcion: 'Fases de la sesión (activación/calentamiento, desarrollo, vuelta a la calma); normas de uso y cuidado responsable del material e instalaciones; pautas de prevención de accidentes y primeros auxilios básicos (conducta PAS).' },
  { codigo: 'EFI.PRI.C', bloque: 'C', bloqueNombre: 'Resolución de problemas en situaciones motrices', ciclo: 'Todos', descripcion: 'Esquema corporal, dominancia lateral, orientación y equilibrio; habilidades motrices básicas y específicas; iniciación técnico-táctica en deportes individuales, de adversario y colectivos; toma de decisiones y lógica interna de los juegos.' },
  { codigo: 'EFI.PRI.D', bloque: 'D', bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Todos', descripcion: 'Gestión emocional ante el éxito, el fracaso y la frustración; habilidades sociales, empatía y trabajo cooperativo; juego limpio, asunción de roles arbitrales y respeto a las normas; coeducación, equidad de género y resolución pacífica de conflictos.' },
  { codigo: 'EFI.PRI.E', bloque: 'E', bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Todos', descripcion: 'Jocs tradicionals de Catalunya (bitlles catalanes, mocador, curses de sacs); expresión corporal, mimo, dramatización y acrosport/estructures cooperatives; bailes tradicionales catalanes (sardanes, balls de bastons) y danzas del mundo; análisis social del deporte.' },
  { codigo: 'EFI.PRI.F', bloque: 'F', bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Todos', descripcion: 'Técnicas de orientación espacial con planos y mapas; actividades de senderismo y actividades en el medio natural y litoral; prevención de riesgos al aire libre; movilidad activa, desplazamientos sostenibles y cultura de residuo cero.' }
];

// ==========================================
// CATALUNYA - ESO Y BACHILLERATO (Real Decreto)
// ==========================================
// Según las indicaciones, se mantiene el currículo del Real Decreto para Secundaria y Bachillerato.
export const COMPETENCIAS_ESPECIFICAS_CATALUNYA_ESO = COMPETENCIAS_ESPECIFICAS_ESO;
export const CRITERIOS_EVALUACION_CATALUNYA_ESO = CRITERIOS_EVALUACION_ESO;
export const SABERES_BASICOS_CATALUNYA_ESO = SABERES_BASICOS_ESO;
