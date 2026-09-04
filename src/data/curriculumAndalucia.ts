import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// ANDALUCÍA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_ANDALUCIA_PRIMARIA: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Estilo de vida activo y saludable', descripcion: 'Adoptar un estilo de vida activo y saludable, practicando regularmente actividades físicas, lúdicas y deportivas, adoptando comportamientos que potencien la salud física, mental y social, así como medidas de responsabilidad individual y colectiva durante la práctica motriz, para interiorizar e integrar hábitos de actividad física sistemática que contribuyan al bienestar.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Esquema corporal y habilidades motrices', descripcion: 'Adaptar los elementos propios del esquema corporal, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones, para dar respuesta a las demandas de proyectos motores y de prácticas motrices con distintas finalidades en contextos de la vida diaria.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Autorregulación e interacción social', descripcion: 'Desarrollar procesos de autorregulación e interacción en el marco de la práctica motriz, con actitud empática e inclusiva, haciendo uso de habilidades sociales y actitudes de cooperación, respeto, inclusión, trabajo en equipo y deportividad, con independencia de las diferencias etnoculturales, sociales, de género y de habilidad de los participantes, para contribuir a la convivencia social y al compromiso ético en los diferentes espacios en los que se participa.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Manifestaciones de la cultura motriz', descripcion: 'Reconocer y practicar diferentes manifestaciones lúdicas, físico-deportivas y artístico-expresivas propias de la cultura motriz, valorando su influencia y sus aportaciones estéticas y creativas a la cultura tradicional y contemporánea, para integrarlas dentro del repertorio de actuaciones motrices que se utilizan regularmente en la vida cotidiana.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Interacción sostenible con el entorno', descripcion: 'Valorar diferentes medios naturales y urbanos como contextos de práctica motriz, interactuando con ellos y comprendiendo la importancia de su conservación desde un enfoque sostenible, adoptando medidas de responsabilidad individual durante la práctica de juegos y actividades físico-deportivas, para realizar una práctica eficiente y respetuosa con el entorno y participar en su cuidado y mejora.' }
];

export const CRITERIOS_EVALUACION_ANDALUCIA_PRIMARIA: CriterioEvaluacion[] = [
  // PRIMER CICLO (1º y 2º de Primaria)
  // 1º Primaria
  { id: '1.1.a', codigo: 'EFI.1.1.1.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Identificar los desplazamientos activos como práctica saludable, buscando la posibilidad de integrar normas de seguridad y hábitos de higiene en prácticas motrices cotidianas, conociendo sus beneficios para el establecimiento de un estilo de vida activo.' },
  { id: '1.2.a', codigo: 'EFI.1.1.2.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Explorar las posibilidades de la propia motricidad a través del juego, practicando en distintas situaciones cotidianas, medidas básicas de cuidado de la salud personal a través de la higiene corporal y la educación postural.' },
  { id: '1.3.a', codigo: 'EFI.1.1.3.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Vivenciar juegos de activación y vuelta a la calma identificando su utilidad para adaptar el cuerpo a la actividad física y evitar lesiones, manteniendo la calma y sabiendo cómo actuar en caso de que se produzca algún accidente en contextos de práctica motriz.' },
  { id: '1.4.a', codigo: 'EFI.1.1.4.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Identificar los valores positivos que fomenta la práctica motriz compartida, vivenciando y disfrutando sus beneficios en contextos variados e inclusivos y respetando a todos los participantes con independencia de sus diferencias individuales.' },
  { id: '2.1.a', codigo: 'EFI.1.2.1.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Vivenciar la importancia de establecer metas claras a la hora de desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, identificando su consecución a partir de un análisis de los resultados obtenidos.' },
  { id: '2.2.a', codigo: 'EFI.1.2.2.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Explorar situaciones variadas en contextos de práctica motriz de manera ajustada según las circunstancias.' },
  { id: '2.3.a', codigo: 'EFI.1.2.3.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Vivenciar y emplear los componentes cualitativos y cuantitativos de la motricidad de manera lúdica e integrada en diferentes situaciones y contextos, mejorando progresivamente su control y su dominio corporal.' },
  { id: '3.1.a', codigo: 'EFI.1.3.1.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Vivenciar las emociones que se producen durante el juego y la actividad física, iniciándose en la gestión positiva de las mismas.' },
  { id: '3.2.a', codigo: 'EFI.1.3.2.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Acordar normas y reglas de juegos consensuadas en clase, interactuando con diálogo y aceptando las diferencias individuales.' },
  { id: '3.3.a', codigo: 'EFI.1.3.3.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Iniciarse en prácticas motrices cotidianas cooperativas, mostrando actitudes de respeto y responsabilidad.' },
  { id: '4.1.a', codigo: 'EFI.1.4.1.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Vivenciar juegos y manifestaciones artístico-expresivas de carácter cultural del entorno cercano, valorando su componente lúdico y disfrutando de su puesta en práctica.' },
  { id: '4.2.a', codigo: 'EFI.1.4.2.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Conocer a referentes del deporte de ambos géneros del entorno cercano, reconociendo el esfuerzo y la dedicación requeridos para alcanzar el éxito.' },
  { id: '4.3.a', codigo: 'EFI.1.4.3.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Explorar las posibilidades expresivas del cuerpo y del movimiento en actividades rítmico-musicales de carácter expresivo.' },
  { id: '5.1.a', codigo: 'EFI.1.5.1.a', ciclo: 'Primer Ciclo', cursoRef: '1º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Explorar el entorno natural y urbano, aprendiendo a utilizarlo de forma segura, conociendo otros usos desde la motricidad, adoptando actitudes de respeto hacia ellos durante el desarrollo de distintas prácticas lúdico-recreativas en contextos terrestres o acuáticos e iniciándose en su cuidado y conservación.' },
  
  // 2º Primaria
  { id: '1.1.b', codigo: 'EFI.1.1.1.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Identificar los desplazamientos activos como práctica saludable, integrando normas de seguridad y hábitos de higiene en prácticas motrices cotidianas, conociendo sus beneficios físicos para el establecimiento de un estilo de vida activo.' },
  { id: '1.2.b', codigo: 'EFI.1.1.2.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Explorar las posibilidades de la propia motricidad a través del juego, aplicando en distintas situaciones cotidianas, medidas básicas de cuidado de la salud personal a través de la higiene corporal y la educación postural.' },
  { id: '1.3.b', codigo: 'EFI.1.1.3.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Participar en juegos de activación y vuelta a la calma reconociendo su utilidad para adaptar el cuerpo a la actividad física y evitar lesiones, manteniendo la calma y sabiendo cómo actuar en caso de que se produzca algún accidente en contextos de práctica motriz.' },
  { id: '1.4.b', codigo: 'EFI.1.1.4.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Conocer los valores positivos que fomenta la práctica motriz compartida, reconociendo, vivenciando y disfrutando sus beneficios en contextos variados e inclusivos y respetando a todos los participantes con independencia de sus diferencias individuales.' },
  { id: '2.1.b', codigo: 'EFI.1.2.1.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Reconocer la importancia de establecer metas claras a la hora de desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, valorando su consecución a partir de un análisis de los resultados obtenidos.' },
  { id: '2.2.b', codigo: 'EFI.1.2.2.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Adoptar decisiones en contextos de práctica motriz de manera ajustada según las circunstancias.' },
  { id: '2.3.b', codigo: 'EFI.1.2.3.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Descubrir, reconocer y emplear los componentes cualitativos y cuantitativos de la motricidad de manera lúdica e integrada en diferentes situaciones y contextos, mejorando progresivamente su control y su dominio corporal.' },
  { id: '3.1.b', codigo: 'EFI.1.3.1.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Identificar las emociones que se producen durante el juego, intentando gestionarlas y disfrutando de la actividad física.' },
  { id: '3.2.b', codigo: 'EFI.1.3.2.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Respetar las normas consensuadas en clase, así como las reglas de juego y actuar desde los parámetros de la deportividad y el juego limpio, aceptando las características y niveles de los participantes.' },
  { id: '3.3.b', codigo: 'EFI.1.3.3.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Participar en las prácticas motrices cotidianas, comenzando a desarrollar habilidades sociales de acogida, inclusión, ayuda y cooperación, iniciándose en la resolución de conflictos personales de forma dialógica y justa, y mostrando un compromiso activo frente a las actuaciones contrarias a la convivencia.' },
  { id: '4.1.b', codigo: 'EFI.1.4.1.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Participar activamente en juegos y otras manifestaciones artístico-expresivas de carácter cultural propias del entorno, valorando su componente lúdico-festivo y disfrutando de su puesta en práctica.' },
  { id: '4.2.b', codigo: 'EFI.1.4.2.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Conocer y valorar los logros de distintos referentes del deporte andaluz de ambos géneros, reconociendo el esfuerzo, la dedicación y los sacrificios requeridos para alcanzar dichos éxitos.' },
  { id: '4.3.b', codigo: 'EFI.1.4.3.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Adecuar los distintos usos comunicativos de la corporalidad y sus manifestaciones a diferentes ritmos y contextos expresivos.' },
  { id: '5.1.b', codigo: 'EFI.1.5.1.b', ciclo: 'Primer Ciclo', cursoRef: '2º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Participar en actividades lúdicos-recreativas de forma segura en los entornos natural y urbano y en contextos terrestres o acuáticos, conociendo otros usos desde la motricidad y adoptando actitudes de respeto, cuidado y conservación de dichos entornos.' },
  
  // SEGUNDO CICLO (3º y 4º de Primaria)
  // 3º Primaria
  { id: '1.1.a-2c', codigo: 'EFI.2.1.1.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer la actividad física como alternativa de ocio saludable, practicando desplazamientos activos y sostenibles e identificando los efectos beneficiosos a nivel físico y mental que posee adoptar un estilo de vida activo.' },
  { id: '1.2.a-2c', codigo: 'EFI.2.1.2.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Practicar medidas de educación postural, alimentación saludable, higiene corporal, normas de seguridad y preparación de la práctica motriz, asumiendo responsabilidades y generando hábitos y rutinas en situaciones cotidianas.' },
  { id: '1.3.a-2c', codigo: 'EFI.2.1.3.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Ejecutar medidas de precaución y prevención de lesiones en relación con la conservación y mantenimiento del material en el marco de distintas prácticas físico-deportivas y lúdicas, vivenciando protocolos básicos de actuación ante accidentes que se puedan producir en este contexto.' },
  { id: '1.4.a-2c', codigo: 'EFI.2.1.4.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer la propia imagen corporal y la de los demás, aceptando y respetando las diferencias individuales que puedan existir, identificando y rechazando las conductas discriminatorias que se puedan producir en contextos de práctica motriz.' },
  { id: '2.1.a-2c', codigo: 'EFI.2.2.1.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Vivenciar la importancia de establecer metas claras a la hora de desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, identificando su consecución a partir de un análisis de los resultados obtenidos.' },
  { id: '2.2.a-2c', codigo: 'EFI.2.2.2.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Participar en proyectos motores de carácter individual, cooperativo o colaborativo identificando estrategias de monitorización y seguimiento que permitan analizar los resultados obtenidos.' },
  { id: '2.3.a-2c', codigo: 'EFI.2.2.3.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Participar en proyectos motores de carácter individual, cooperativo o colaborativo, definiendo metas, secuenciando acciones, analizando si es preciso cambios durante el proceso y generando producciones motrices de calidad, a través del análisis del grado de ajuste al proceso seguido y al resultado obtenido.' },
  { id: '3.1.a-2c', codigo: 'EFI.2.3.1.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Mostrar una disposición positiva hacia el juego, controlando las emociones negativas en contextos lúdicos de práctica motriz.' },
  { id: '3.2.a-2c', codigo: 'EFI.2.3.2.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Respetar las normas consensuadas en clase, así como las reglas de juego, actuando con deportividad y juego limpio desde el diálogo y el debate, expresando y escuchando propuestas y pensamientos de manera activa.' },
  { id: '3.3.a-2c', codigo: 'EFI.2.3.3.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Identificar en prácticas motrices variadas habilidades sociales de acogida, inclusión, ayuda y cooperación, proponiendo soluciones a conflictos individuales y colectivos de forma dialógica y justa, y mostrando un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia.' },
  { id: '4.1.a-2c', codigo: 'EFI.2.4.1.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Participar activamente en juegos motores y otras manifestaciones artístico-expresivas con arraigo en la cultura andaluza, tradicional o actual, contextualizando su origen, su aparición y su transmisión a lo largo del tiempo.' },
  { id: '4.2.a-2c', codigo: 'EFI.2.4.2.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Experimentar prácticas deportivas individuales, colectivas y mixtas, disfrutando de su práctica y conociendo las distintas posibilidades de deporte federado que existen en su entorno cercano.' },
  { id: '4.3.a-2c', codigo: 'EFI.2.4.3.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Aplicar de forma espontánea y creativa distintas combinaciones de movimientos que incorporen prácticas comunicativas que transmitan sentimientos, emociones o ideas a través del cuerpo, empleando los distintos recursos expresivos y rítmicos de la corporalidad.' },
  { id: '5.1.a-2c', codigo: 'EFI.2.5.1.a', ciclo: 'Segundo Ciclo', cursoRef: '3º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Fomentar una práctica motriz teniendo en cuenta las posibles dificultades en contextos naturales y urbanos de carácter terrestre o acuático, observando cada situación antes de realizar las acciones y atendiendo a las medidas de conservación ambiental existentes.' },

  // 4º Primaria
  { id: '1.1.b-2c', codigo: 'EFI.2.1.1.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer la actividad física como alternativa de ocio saludable, identificando desplazamientos activos y sostenibles y conociendo los efectos beneficiosos a nivel físico y mental que posee adoptar un estilo de vida activo.' },
  { id: '1.2.b-2c', codigo: 'EFI.2.1.2.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Aplicar medidas de educación postural, alimentación saludable, higiene corporal, normas de seguridad y preparación de la práctica motriz, asumiendo responsabilidades y generando hábitos y rutinas en situaciones cotidianas.' },
  { id: '1.3.b-2c', codigo: 'EFI.2.1.3.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Tomar medidas de precaución y prevención de lesiones en relación con la conservación y el mantenimiento del material en el marco de distintas prácticas físico-deportivas y lúdicas, conociendo protocolos básicos de actuación ante accidentes que se puedan producir en este contexto.' },
  { id: '1.4.b-2c', codigo: 'EFI.2.1.4.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer la propia imagen corporal y la de los demás, aceptando y respetando las diferencias individuales que puedan existir, superando y rechazando las conductas discriminatorias que se puedan producir en contextos de práctica motriz.' },
  { id: '2.1.b-2c', codigo: 'EFI.2.2.1.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Llevar a cabo proyectos motores de carácter individual, cooperativo o colaborativo, empleando estrategias de monitorización y seguimiento que permitan analizar los resultados obtenidos.' },
  { id: '2.2.b-2c', codigo: 'EFI.2.2.2.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Adoptar decisiones en situaciones lúdicas, juegos y actividades deportivas, ajustándose a las demandas derivadas de los objetivos motores, de las características del grupo y de la lógica interna de situaciones individuales, de cooperación, de oposición y de colaboración-oposición, en contextos simulados de actuación.' },
  { id: '2.3.b-2c', codigo: 'EFI.2.2.3.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa en distintos contextos y situaciones motrices, lúdicas y deportivas, adquiriendo un progresivo control y dominio corporal sobre ellos.' },
  { id: '3.1.b-2c', codigo: 'EFI.2.3.1.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Mostrar una disposición positiva hacia la práctica física y hacia el esfuerzo, controlando la impulsividad y las emociones negativas que surjan en contextos de actividad motriz.' },
  { id: '3.2.b-2c', codigo: 'EFI.2.3.2.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Respetar las normas consensuadas en clase, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, valorando la aportación de los participantes.' },
  { id: '3.3.b-2c', codigo: 'EFI.2.3.3.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Desarrollar habilidades sociales de acogida, inclusión, ayuda y cooperación al participar en prácticas motrices variadas, resolviendo los conflictos individuales y colectivos de forma dialógica y justa, y mostrando un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y cualquier tipo de violencia.' },
  { id: '4.1.b-2c', codigo: 'EFI.2.4.1.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Participar activamente en juegos motores y otras manifestaciones artístico-expresivas con arraigo en la cultura andaluza, tradicional o actual, así como otros procedentes de diversas culturas, contextualizando su origen, su aparición y su transmisión a lo largo del tiempo y valorando su importancia, repercusión e influencia en las sociedades pasadas y presentes.' },
  { id: '4.2.b-2c', codigo: 'EFI.2.4.2.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Asumir una visión abierta del deporte a partir del conocimiento de distintas ligas femeninas, masculinas o mixtas, acercándose al deporte federado e identificando y rechazando comportamientos contrarios a la convivencia independientemente del contexto en el que tengan lugar.' },
  { id: '4.3.b-2c', codigo: 'EFI.2.4.3.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Reproducir distintas combinaciones de movimientos o coreografías individuales y grupales que incorporen prácticas comunicativas que transmitan sentimientos, emociones o ideas a través del cuerpo, empleando los distintos recursos expresivos y rítmicos de la corporalidad.' },
  { id: '5.1.b-2c', codigo: 'EFI.2.5.1.b', ciclo: 'Segundo Ciclo', cursoRef: '4º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Desarrollar una práctica motriz segura en contextos naturales y urbanos de carácter terrestre o acuático, adecuando las acciones al análisis de cada situación y aplicando medidas de conservación ambiental.' },

  // TERCER CICLO (5º y 6º de Primaria)
  // 5º Primaria
  { id: '1.1.a-3c', codigo: 'EFI.3.1.1.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Identificar los efectos beneficiosos a nivel físico y mental de la actividad física, lúdica y deportiva como paso previo para su integración en la vida diaria, analizando situaciones cotidianas.' },
  { id: '1.2.a-3c', codigo: 'EFI.3.1.2.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Implementar los procesos de activación corporal, dosificación del esfuerzo, relajación e higiene y seguridad en la práctica de actividades motrices, lúdicas y deportivas, integrando las propias rutinas de una práctica motriz saludable y responsable.' },
  { id: '1.3.a-3c', codigo: 'EFI.3.1.3.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Ejecutar medidas de seguridad antes, durante y después de la práctica de actividad física, lúdica y deportiva, identificando los contextos de riesgo y actuando con precaución ante ellos.' },
  { id: '1.4.a-3c', codigo: 'EFI.3.1.4.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer conductas inapropiadas vinculadas al ámbito corporal, la actividad física, lúdica y deportiva, que resultan perjudiciales para la salud o afectan negativamente a la convivencia, integrando posturas de rechazo a la violencia, a la discriminación y a los estereotipos de género, y evitando activamente su reproducción.' },
  { id: '2.1.a-3c', codigo: 'EFI.3.2.1.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Participar en proyectos motores de carácter individual, cooperativo o colaborativo, definiendo metas, secuenciando acciones, observando los cambios durante el proceso y generando producciones motrices de calidad, analizando el grado de ajuste al proceso seguido y al resultado obtenido.' },
  { id: '2.2.a-3c', codigo: 'EFI.3.2.2.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Vivenciar principios básicos de toma de decisiones en situaciones lúdicas, juegos modificados y actividades deportivas a partir de la anticipación, ajustándolos a las demandas derivadas de los objetivos motores y a la lógica interna de situaciones individuales, de cooperación, de oposición y de colaboración-oposición, en contextos reales o simulados de actuación.' },
  { id: '2.3.a-3c', codigo: 'EFI.3.2.3.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Adquirir un progresivo control y dominio corporal, empleando los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, y haciendo frente a las demandas de resolución de problemas en situaciones motrices transferibles a su espacio vivencial.' },
  { id: '3.1.a-3c', codigo: 'EFI.3.3.1.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Participar en actividades de carácter motor, autorregulando su actuación, controlando y gestionando las emociones negativas, expresándolas de manera adecuada ante sus iguales.' },
  { id: '3.2.a-3c', codigo: 'EFI.3.3.2.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Respetar las normas consensuadas, así como las reglas de juego, actuando con deportividad y juego limpio, afrontando los conflictos de forma dialógica y con asertividad.' },
  { id: '3.3.a-3c', codigo: 'EFI.3.3.3.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Poner en juego en situaciones de prácticas motrices habilidades sociales de diálogo y resolución pacífica de conflictos, respetando cualquier tipo de diversidad, demostrando una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y la violencia, teniendo en cuenta el fomento de la igualdad de género.' },
  { id: '4.1.a-3c', codigo: 'EFI.3.4.1.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Participar activamente en juegos, deportes, danzas y otras manifestaciones artístico-expresivas con arraigo en la cultura andaluza tradicional o actual, así como otros procedentes de diversas culturas, asumiendo que forman parte del patrimonio cultural y favoreciendo su transmisión.' },
  { id: '4.2.a-3c', codigo: 'EFI.3.4.2.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Practicar juegos y deportes de otras culturas, debatiendo sobre los estereotipos de género o capacidad y adoptando una actitud crítica ante comportamientos sexistas.' },
  { id: '4.3.a-3c', codigo: 'EFI.3.4.3.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Ejecutar composiciones, con o sin soporte musical, y comunicar diferentes sensaciones, emociones e ideas, de forma estética y creativa, usando los recursos rítmicos y expresivos de la motricidad.' },
  { id: '5.1.a-3c', codigo: 'EFI.3.5.1.a', ciclo: 'Tercer Ciclo', cursoRef: '5º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Ajustar las acciones motrices del medio valorando los riesgos del medio natural y urbano en contextos terrestres o acuáticos, salvando los obstáculos, practicando las actividades físicas propuestas y actuando respetuosamente en el entorno.' },

  // 6º Primaria
  { id: '1.1.b-3c', codigo: 'EFI.3.1.1.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Reconocer los efectos beneficiosos a nivel físico y mental de la actividad física, lúdica y deportiva, como paso previo para su integración en la vida diaria, analizando situaciones cotidianas.' },
  { id: '1.2.b-3c', codigo: 'EFI.3.1.2.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Integrar los procesos de activación corporal, dosificación del esfuerzo, relajación e higiene y seguridad en la práctica de actividades motrices, interiorizando las rutinas propias de una práctica motriz saludable y responsable.' },
  { id: '1.3.b-3c', codigo: 'EFI.3.1.3.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Adoptar medidas de seguridad antes, durante y después de la práctica de actividad física, lúdica y deportiva, reconociendo los contextos de riesgo y actuando con precaución ante ellos.' },
  { id: '1.4.b-3c', codigo: 'EFI.3.1.4.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.1', descripcion: 'Identificar y abordar conductas inapropiadas vinculadas al ámbito corporal, la actividad lúdica y deportiva, que resultan perjudiciales para la salud o afectan negativamente a la convivencia, adoptando posturas de rechazo a la violencia, a la discriminación y a los estereotipos de género, y evitando activamente su reproducción.' },
  { id: '2.1.b-3c', codigo: 'EFI.3.2.1.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, definiendo metas, secuenciando acciones, introduciendo cambios, si es preciso, durante el proceso, y generando producciones motrices de calidad, valorando el grado de ajuste al proceso seguido y al resultado obtenido.' },
  { id: '2.2.b-3c', codigo: 'EFI.3.2.2.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Aplicar principios básicos de toma de decisiones en situaciones lúdicas, juegos modificados y actividades deportivas a partir de la anticipación, ajustándolos a las demandas derivadas de los objetivos motores y a la lógica interna de situaciones individuales, de cooperación, de oposición y de colaboración-oposición, en contextos reales o simulados de actuación, reflexionando sobre las soluciones obtenidas.' },
  { id: '2.3.b-3c', codigo: 'EFI.3.2.3.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.2', descripcion: 'Adquirir un progresivo control y dominio corporal, empleando los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, y haciendo frente a las demandas de resolución de problemas en situaciones motrices transferibles a su espacio vivencial.' },
  { id: '3.1.b-3c', codigo: 'EFI.3.3.1.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Participar en actividades de carácter motor, desde la autorregulación de su actuación, con predisposición, esfuerzo, perseverancia y mentalidad de crecimiento, controlando la impulsividad, gestionando las emociones y expresándolas de forma asertiva.' },
  { id: '3.2.b-3c', codigo: 'EFI.3.3.2.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Respetar las normas consensuadas, así como las reglas de juego, y actuar desde los parámetros de la deportividad y el juego limpio, reconociendo las actuaciones de compañeros y compañeras y rivales.' },
  { id: '3.3.b-3c', codigo: 'EFI.3.3.3.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.3', descripcion: 'Convivir mostrando en el contexto de las prácticas motrices habilidades sociales, diálogo en la resolución de conflictos y respeto a la diversidad, ya sea de género, de origen nacional, étnica, socioeconómica o de competencia motriz, y mostrando una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y la violencia, haciendo especial hincapié en el fomento de la igualdad de género.' },
  { id: '4.1.b-3c', codigo: 'EFI.3.4.1.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Participar activamente en juegos motores y otras manifestaciones artístico-expresivas con arraigo en la cultura andaluza, tradicional o actual, así como otros procedentes de diversas culturas, reconociendo y transmitiendo su valor cultural y su potencial como espacio generador de interacciones constructivas entre personas con orígenes diferentes y entendiendo las ventajas de su conservación.' },
  { id: '4.2.b-3c', codigo: 'EFI.3.4.2.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Valorar el deporte como fenómeno cultural analizando críticamente los estereotipos de género o capacidad y los comportamientos sexistas que a veces suceden en su contexto, rechazándolos y adoptando actitudes que eviten su reproducción en el futuro.' },
  { id: '4.3.b-3c', codigo: 'EFI.3.4.3.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.4', descripcion: 'Reproducir y crear composiciones con o sin soporte musical, y comunicar diferentes sensaciones, emociones e ideas, de forma estética y creativa, desde el uso de los recursos rítmicos y expresivos de la motricidad.' },
  { id: '5.1.b-3c', codigo: 'EFI.3.5.1.b', ciclo: 'Tercer Ciclo', cursoRef: '6º Primaria', competenciaId: 'CE.EF.5', descripcion: 'Adaptar las acciones motrices a la incertidumbre propia del medio natural y urbano en contextos terrestres o acuáticos de forma eficiente y segura, valorando sus posibilidades para la práctica de actividad física y actuando desde una perspectiva ecosostenible del entorno y comunitaria.' }
];


export const SABERES_BASICOS_ANDALUCIA_PRIMARIA: SaberBasico[] = [
  // Primer Ciclo
  {
    codigo: 'EFI.1.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: 'Primer Ciclo',
    descripcion: 'Salud física, social y mental: efectos beneficiosos de un estilo de vida activo, alimentación saludable e hidratación. Educación postural en situaciones cotidianas, cuidado del cuerpo, higiene personal y descanso tras la actividad física. Práctica social saludable e inclusiva, respeto hacia todas las personas y autoconocimiento de posibilidades motrices.'
  },
  {
    codigo: 'EFI.1.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: 'Primer Ciclo',
    descripcion: 'Elección y vivencia de diversas experiencias corporales. Cuidado del material utilizado y de las instalaciones deportivas. Preparación de la práctica motriz: vestimenta adecuada y hábitos de higiene. Planificación y autorregulación de proyectos motores sencillos con recursos digitales. Prevención de accidentes: rutinas de activación, calentamiento y vuelta a la calma.'
  },
  {
    codigo: 'EFI.1.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: 'Primer Ciclo',
    descripcion: 'Toma de decisiones motrices y adecuación de acciones individuales y cooperativas. Capacidades perceptivo-motrices: integración del esquema corporal, lateralidad, estructuración espacial y temporal, equilibrio y coordinación óculo-motriz. Habilidades y destrezas motrices básicas genéricas (locomotrices, no locomotrices y manipulativas) y capacidades físicas desde el juego lúdico.'
  },
  {
    codigo: 'EFI.1.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: 'Primer Ciclo',
    descripcion: 'Gestión emocional: identificación, experimentación y manifestación de emociones en el juego. Habilidades sociales de interacción motriz, diálogo y resolución guiada de conflictos. Respeto a las reglas de juego y a los compañeros, deportividad, juego limpio, tolerancia a la frustración y fomento activo de la convivencia e igualdad de género.'
  },
  {
    codigo: 'EFI.1.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: 'Primer Ciclo',
    descripcion: 'Aportaciones a la herencia cultural andaluza: juegos populares, tradicionales y danzas autóctonas. Usos comunicativos de la corporalidad (gestos, posturas, recursos expresivos). Práctica de actividades rítmico-musicales con carácter artístico-expresivo. Referentes del deporte andaluz de ambos géneros y visibilización de la igualdad.'
  },
  {
    codigo: 'EFI.1.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: 'Primer Ciclo',
    descripcion: 'Educación vial para peatones y movilidad activa, segura y sostenible. Posibilidades motrices de los espacios lúdicos y de esparcimiento infantil. Práctica segura de actividades físicas en el medio natural y urbano de Andalucía. Cuidado, respeto y conservación del entorno, los seres vivos y uso responsable del material físico y digital.'
  },

  // Segundo Ciclo
  {
    codigo: 'EFI.2.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Salud física: efectos físicos y psicológicos del ejercicio activo, distinción de alimentos saludables frente a ultraprocesados, educación postural y rutinas de cuidado corporal. Salud social: la actividad física como alternativa de ocio saludable, límites ante la competitividad desmedida y aceptación de la diversidad corporal. Salud mental: autoconocimiento y valoración realista de fortalezas y limitaciones motrices.'
  },
  {
    codigo: 'EFI.2.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Elección de la práctica física con finalidades recreativas, cooperativas y formativas. Cuidado, selección y preparación autónoma del material. Hábitos de higiene personal en la práctica motriz. Planificación, ejecución y autorregulación de proyectos motores sencillos con herramientas digitales. Mecanismos de prevención y control corporal para evitar lesiones y protocolos básicos ante accidentes.'
  },
  {
    codigo: 'EFI.2.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Toma de decisiones tácticas en situaciones individuales, cooperativas y de oposición/colaboración (espacio, tiempo y móvil). Capacidades perceptivo-motrices: integración del esquema corporal, control tónico-postural, lateralidad y coordinación dinámica general y segmentaria. Capacidades físicas básicas y combinación de habilidades motrices. Creatividad motriz ante estímulos diversos.'
  },
  {
    codigo: 'EFI.2.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Gestión y canalización de emociones en la victoria y la derrota. Habilidades sociales: escucha activa, asertividad y negociación dialógica de conflictos en contextos motrices. Deportividad, respeto estricto a las normas, a los adversarios y al arbitraje. Rechazo activo y estrategias de identificación de conductas discriminatorias o sexistas en el deporte escolar.'
  },
  {
    codigo: 'EFI.2.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Herencia cultural andaluza: juegos tradicionales, populares y danzas folclóricas como manifestación de interculturalidad. Usos expresivos del cuerpo: comunicación de sensaciones, emociones e ideas simples mediante ritmo y movimiento. Conocimiento de ligas mixtas, masculinas y femeninas, referentes deportivos andaluces y valoración de la cultura del esfuerzo.'
  },
  {
    codigo: 'EFI.2.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: 'Segundo Ciclo',
    descripcion: 'Movilidad segura y sostenible: educación vial con bicicletas y patines. Exploración y disfrute seguro de espacios naturales y urbanos de Andalucía. Mantenimiento y valoración del estado de los materiales. Sensibilización sobre la gestión de residuos y compromiso comunitario en el cuidado del entorno y la biodiversidad.'
  },

  // Tercer Ciclo
  {
    codigo: 'EFI.3.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Salud física: integración sistemática de la actividad física, ergonomía postural en acciones motrices complejas y responsabilidad en el cuidado corporal. Salud social: análisis crítico del sedentarismo, de los malos hábitos y del deporte profesional frente al deporte salud; superación de estereotipos corporales y de género. Salud mental: consolidación equilibrada del autoconcepto, visión crítica de modelos estéticos irreales y bienestar emocional.'
  },
  {
    codigo: 'EFI.3.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Usos y finalidades multifacéticas de la actividad física y deportiva. Consumo responsable y análisis crítico de equipamientos deportivos. Autonomía en la higiene y autorregulación de proyectos motores con apoyo digital. Seguridad activa: calentamiento general y específico, vuelta a la calma, posición lateral de seguridad (PLS), conducta PAS (Proteger, Avisar, Socorrer) y protocolos ante emergencias.'
  },
  {
    codigo: 'EFI.3.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Toma de decisiones tácticas avanzadas y anticipación en juegos predeportivos y deportes modificados (espacios libres, desmarques, apoyos). Estructuración espacio-temporal compleja, ajuste perceptivo y coordinación motriz. Iniciación a habilidades motrices específicas y desarrollo compensatorio de capacidades condicionales (fuerza, resistencia, velocidad, flexibilidad). Creatividad motriz en retos colaborativos.'
  },
  {
    codigo: 'EFI.3.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Autorregulación emocional frente a la exigencia motriz, el estrés o la frustración. Habilidades de trabajo en equipo, asunción de roles diferenciados y liderazgo cooperativo. Fair play, respeto y tolerancia ante las diferencias individuales. Compromiso ético y rechazo explícito de cualquier forma de violencia, manipulación del juego o discriminación en el deporte.'
  },
  {
    codigo: 'EFI.3.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Manifestaciones tradicionales y contemporáneas de la cultura motriz andaluza y universal. Creación de coreografías colectivas con soporte rítmico-musical. Análisis sociológico del deporte y perspectiva de género: erradicación del sexismo en el deporte profesional. Historia del movimiento olímpico y paralímpico y cultura del esfuerzo.'
  },
  {
    codigo: 'EFI.3.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: 'Tercer Ciclo',
    descripcion: 'Transporte activo y sostenible (bicicletas, patines, patinetes) y normas viales. Previsión y gestión del riesgo en actividades en la naturaleza y entorno urbano. Autoconstrucción y reutilización de materiales motrices reciclados. Práctica física ecosostenible en el entorno natural de Andalucía y acciones directas de servicio a la comunidad para su conservación.'
  }
];

// ==========================================
// ANDALUCÍA - ESO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_ANDALUCIA_ESO: CompetenciaEspecifica[] = [
  { id: 'CE.EF.1', numero: 1, nombre: 'Estilo de vida activo y saludable', descripcion: 'Adoptar un estilo de vida activo y saludable, seleccionando e incorporando intencionalmente actividades físicas y deportivas en las rutinas diarias, a partir de un análisis crítico de los modelos corporales y del rechazo de las prácticas que carezcan de base científica, para hacer un uso saludable y autónomo de su tiempo libre y así mejorar la calidad de vida.' },
  { id: 'CE.EF.2', numero: 2, nombre: 'Resolución de problemas en situaciones motrices', descripcion: 'Adaptar, con progresiva autonomía en su ejecución, las capacidades físicas, perceptivo-motrices y coordinativas, así como las habilidades y destrezas motrices, aplicando procesos de percepción, decisión y ejecución adecuados a la lógica interna y a los objetivos de diferentes situaciones con dificultad variable, para resolver situaciones de carácter motor vinculadas con distintas actividades físicas funcionales, deportivas, expresivas y recreativas, y para consolidar actitudes de superación, crecimiento y resiliencia al enfrentarse a desafíos físicos.' },
  { id: 'CE.EF.3', numero: 3, nombre: 'Autorregulación emocional e interacción social', descripcion: 'Compartir espacios de práctica físico-deportiva con independencia de las diferencias culturales, sociales, de género y de habilidad, priorizando el respeto entre participantes y a las reglas sobre los resultados, adoptando una actitud crítica ante comportamientos antideportivos o contrarios a la convivencia y desarrollando procesos de autorregulación emocional que canalicen el fracaso y el éxito en estas situaciones, para contribuir con progresiva autonomía al entendimiento social y al compromiso ético en los diferentes espacios en los que se participa.' },
  { id: 'CE.EF.4', numero: 4, nombre: 'Manifestaciones de la cultura motriz', descripcion: 'Practicar, analizar y valorar distintas manifestaciones de la cultura motriz, aprovechando las posibilidades y recursos expresivos que ofrecen el cuerpo y el movimiento y profundizando en las consecuencias del deporte como fenómeno social, analizando críticamente sus manifestaciones desde la perspectiva de género y desde los intereses económico-políticos que lo rodean, para alcanzar una visión más realista, contextualizada y justa de la motricidad en el marco de las sociedades actuales y, en particular, la andaluza.' },
  { id: 'CE.EF.5', numero: 5, nombre: 'Interacción eficiente y sostenible con el entorno', descripcion: 'Adoptar un estilo de vida sostenible y ecosocialmente responsable aplicando medidas de seguridad individuales y colectivas en la práctica físico-deportiva según el entorno y desarrollando colaborativa y cooperativamente acciones de servicio a la comunidad vinculadas a la actividad física y al deporte, para contribuir activamente a la conservación del medio natural y urbano, reconociendo la importancia de preservar el entorno natural de Andalucía.' }
];

export const CRITERIOS_EVALUACION_ANDALUCIA_ESO: CriterioEvaluacion[] = [
  // 1º ESO
  { id: '1.1.1', codigo: 'EFI.1.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y establecer secuencias sencillas de actividad física, orientada al concepto integral de salud y al estilo de vida activo, a partir de una valoración del nivel inicial, aplicando con progresiva autonomía instrumentos de autoevaluación para ello, respetando y aceptando la propia realidad e identidad corporal.' },
  { id: '1.1.2', codigo: 'EFI.1.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Comenzar a incorporar procesos de activación corporal, dosificación del esfuerzo, alimentación saludable, educación postural, relajación, respiración, seguridad e higiene durante la práctica de actividades motrices, interiorizando las rutinas propias de una práctica motriz saludable y responsable.' },
  { id: '1.1.3', codigo: 'EFI.1.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y adoptar de manera responsable medidas generales para la prevención de lesiones antes, durante y después de la práctica de actividad física, aprendiendo a reconocer posibles situaciones de riesgo.' },
  { id: '1.1.4', codigo: 'EFI.1.4', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar los protocolos de intervención y medidas básicas de primeros auxilios que es necesario aplicar ante situaciones relacionadas con accidentes derivados de la práctica de actividad física.' },
  { id: '1.1.5', codigo: 'EFI.1.5', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y analizar la incidencia que ciertas prácticas y comportamientos tienen en nuestra salud y en la convivencia, evitando su reproducción en su entorno escolar y en las actividades de su vida cotidiana, haciendo uso para ello de herramientas informáticas.' },
  { id: '1.1.6', codigo: 'EFI.1.6', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar diferentes recursos y aplicaciones digitales reconociendo su potencial, así como sus riesgos para su uso en el ámbito de la actividad física y el deporte.' },
  { id: '1.2.1', codigo: 'EFI.2.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Participar en el proceso de creación de proyectos motores de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo, utilizando con ayuda estrategias de autoevaluación y coevaluación e iniciando actitudes de superación, crecimiento y resiliencia.' },
  { id: '1.2.2', codigo: 'EFI.2.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Actuar correctamente con una interpretación aceptable en contextos motrices variados, aplicando con ayuda principios básicos de la toma de decisiones en situaciones lúdicas, juegos modificados y actividades deportivas a partir de la anticipación, adecuándose a las demandas motrices, a la actuación del compañero o compañera y de la persona oponente (si la hubiera) y a la lógica interna en contextos de actuación facilitados, reales o simulados, reflexionando sobre los resultados obtenidos.' },
  { id: '1.2.3', codigo: 'EFI.2.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Iniciarse en la muestra de evidencias de control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad, haciendo frente a las demandas de resolución de problemas de forma guiada en situaciones motrices transferibles a su espacio vivencial.' },
  { id: '1.3.1', codigo: 'EFI.3.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Practicar una gran variedad de actividades motrices, valorando las implicaciones éticas de las actitudes antideportivas, y gestionando positivamente la competitividad en contextos diversos.' },
  { id: '1.3.2', codigo: 'EFI.3.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Colaborar en la práctica de diferentes producciones motrices, especialmente a través de juegos, para alcanzar el logro individual y grupal, participando en la toma de decisiones y asumiendo distintos roles asignados y responsabilidades.' },
  { id: '1.3.3', codigo: 'EFI.3.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Hacer uso con progresiva autonomía de habilidades sociales, diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnico, socio-económica o de competencia motriz, mostrando una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y de cualquier tipo de violencia, haciendo respetar el propio cuerpo y el de los demás.' },
  { id: '1.4.1', codigo: 'EFI.4.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Gestionar la participación en juegos propios de Andalucía, favoreciendo su conservación y valorando sus orígenes, evolución e influencia en las sociedades contemporáneas.' },
  { id: '1.4.2', codigo: 'EFI.4.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Reconocer las diferentes actividades y modalidades deportivas según sus características y requerimientos, evitando los posibles estereotipos de género o capacidad o los comportamientos sexistas vinculados a dichas manifestaciones.' },
  { id: '1.4.3', codigo: 'EFI.4.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Utilizar intencionadamente y con progresiva autonomía el cuerpo como herramienta de expresión y comunicación a través de diversas técnicas expresivas, participando activamente en la creación y representación de composiciones individuales o colectivas con y sin base musical, prestando especial atención a la educación socio-afectiva y fomento de la creatividad.' },
  { id: '1.5.1', codigo: 'EFI.5.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Participar en actividades físico-deportivas sencillas en entornos naturales de Andalucía, terrestres o acuáticos, disfrutando del entorno de manera sostenible, minimizando de forma guiada el impacto ambiental que estas puedan producir e iniciando una conciencia sobre su huella ecológica.' },
  { id: '1.5.2', codigo: 'EFI.5.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Practicar actividades físico-deportivas en el medio natural y urbano, siguiendo las normas de seguridad individuales y colectivas marcadas.' },

  // 2º ESO
  { id: '2.1.1', codigo: 'EFI.2.1.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Establecer y organizar secuencias sencillas de actividad física, orientada al concepto integral de salud y al estilo de vida activo, a partir de una valoración del nivel inicial, aplicando con autonomía instrumentos de autoevaluación para ello y haciendo uso de recursos digitales respetando, aceptando y valorando la propia realidad e identidad corporal y la de los demás.' },
  { id: '2.1.2', codigo: 'EFI.2.1.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Incorporar hábitos relacionados con procesos de activación corporal, dosificación del esfuerzo, alimentación saludable, educación postural, respiración, relajación, seguridad e higiene durante la práctica de actividades motrices, interiorizando las rutinas propias de una práctica motriz saludable y responsable.' },
  { id: '2.1.3', codigo: 'EFI.2.1.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y adoptar de manera responsable y de manera autónoma medidas generales para la prevención de lesiones antes, durante y después de la práctica de actividad física, en diferentes contextos y situaciones motrices, aprendiendo a reconocer situaciones de riesgo para actuar preventivamente, haciendo uso para ello.' },
  { id: '2.1.4', codigo: 'EFI.2.1.4', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y actuar ante situaciones relacionadas con accidentes derivados de la práctica de actividad física de acuerdo a los protocolos de intervención, aplicando medidas básicas de primeros auxilios en diferentes contextos y ante diferentes tipos de lesiones.' },
  { id: '2.1.5', codigo: 'EFI.2.1.5', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Analizar y valorar críticamente la incidencia que ciertas prácticas y comportamientos tienen en nuestra salud y en la convivencia, en diferentes contextos y situaciones, valorando su impacto y evitando activamente su reproducción en el entorno escolar y en las actividades de la vida cotidiana, haciendo uso para ello de herramientas informáticas.' },
  { id: '2.1.6', codigo: 'EFI.2.1.6', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Explorar diferentes recursos y aplicaciones digitales reconociendo su potencial, así como sus riesgos para su uso en el ámbito de la actividad física y el deporte.' },
  { id: '2.2.1', codigo: 'EFI.2.2.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Desarrollar proyectos motores sencillos de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo, utilizando con apoyo ocasional estrategias de autoevaluación y coevaluación tanto del proceso como del resultado, reconociendo y desarrollando así actitudes de superación, crecimiento y resiliencia.' },
  { id: '2.2.2', codigo: 'EFI.2.2.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Interpretar y actuar correctamente en contextos motrices variados, aplicando principios básicos de toma de decisiones en situaciones lúdicas, juegos modificados y actividades deportivas a partir de la anticipación, adecuándose a las demandas motrices, a la actuación del compañero o compañera y del oponente (si lo hubiera) y a la lógica interna en contextos reales o simulados de actuación.' },
  { id: '2.2.3', codigo: 'EFI.2.2.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Evidenciar cierto grado de control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, haciendo frente a las demandas de resolución de problemas con apoyo ocasional en situaciones motrices transferibles a su espacio vivencial con progresiva autonomía.' },
  { id: '2.3.1', codigo: 'EFI.2.3.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Practicar una gran variedad de actividades motrices, valorando las implicaciones éticas de las actitudes antideportivas, y gestionando positivamente la competitividad en contextos diversos y actuando con deportividad al asumir los roles de público, participante u otros.' },
  { id: '2.3.2', codigo: 'EFI.2.3.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Cooperar en la práctica de diferentes producciones motrices, especialmente a través de juegos y deportes no convencionales, para alcanzar el logro individual y grupal, participando en la toma de decisiones y asumiendo distintos roles asignados y responsabilidades.' },
  { id: '2.3.3', codigo: 'EFI.2.3.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Hacer uso con progresiva autonomía de habilidades sociales, diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnico, socio-económica o de competencia motriz, mostrando una actitud crítica y un compromiso activo frente a los estereotipos, las actuaciones discriminatorias y de cualquier tipo de violencia.' },
  { id: '2.4.1', codigo: 'EFI.2.4.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Practicar y apreciar las manifestaciones artístico-expresivas de Andalucía, favoreciendo su conservación y valorando sus orígenes, evolución e influencia en las sociedades contemporáneas.' },
  { id: '2.4.2', codigo: 'EFI.2.4.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Analizar objetivamente las diferentes actividades y modalidades deportivas según sus características y requerimientos, evitando los posibles estereotipos de género o capacidad vinculados a dichas manifestaciones.' },
  { id: '2.4.3', codigo: 'EFI.2.4.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Utilizar intencionadamente y con progresiva autonomía el cuerpo como herramienta de expresión y comunicación a través de diversas técnicas expresivas, participando activamente en la creación y representación de composiciones individuales o colectivas con y sin base musical, prestando especial atención a la educación socio-afectiva y desde una perspectiva crítica y creativa.' },
  { id: '2.5.1', codigo: 'EFI.2.5.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Participar en actividades físico-deportivas más complejas en entornos naturales de Andalucía, terrestres o acuáticos, disfrutando del entorno de manera sostenible, minimizando con ayuda el impacto ambiental que estas puedan producir y siendo conscientes de su huella ecológica.' },
  { id: '2.5.2', codigo: 'EFI.2.5.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Practicar actividades físico-deportivas en el medio natural y urbano de Andalucía, seleccionando y aplicando normas de seguridad individuales y colectivas establecidas con ayuda.' },

  // 3º ESO
  { id: '3.1.1', codigo: 'EFI.3.1.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular la práctica de actividad física orientada al concepto integral de salud y al estilo de vida activo, aplicando de manera autónoma diferentes herramientas informáticas que permitan la autoevaluación y el seguimiento de la evolución de la mejora motriz, según las necesidades e intereses individuales y respetando, aceptando y valorando la propia realidad e identidad corporal y la de los demás.' },
  { id: '3.1.2', codigo: 'EFI.3.1.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Incorporar de forma autónoma los procesos de activación corporal, autorregulación y dosificación del esfuerzo, alimentación saludable, educación postural, respiración, relajación, seguridad e higiene durante la práctica de actividades motrices, tomando conciencia e interiorizando las rutinas propias de una práctica motriz saludable y responsable.' },
  { id: '3.1.3', codigo: 'EFI.3.1.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Adoptar de manera responsable y autónoma medidas específicas para la prevención de lesiones antes, durante y después de la práctica de actividad física, identificando situaciones de riesgo para actuar preventivamente.' },
  { id: '3.1.4', codigo: 'EFI.3.1.4', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Actuar de acuerdo a los protocolos de intervención ante situaciones de emergencia o accidentes aplicando con apoyos puntuales medidas específicas de primeros auxilios.' },
  { id: '3.1.5', codigo: 'EFI.3.1.5', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar y valorar críticamente estereotipos sociales asociados al ámbito de lo corporal, al género y a la diversidad sexual vinculados a la actividad física y deportiva, así como los comportamientos que pongan en riesgo la salud, contrastando con autonomía e independencia cualquier información en base a criterios científicos de fiabilidad, validez y objetividad, haciendo uso para ello de herramientas informáticas.' },
  { id: '3.1.6', codigo: 'EFI.3.1.6', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.1', descripcion: 'Identificar diferentes recursos y aplicaciones digitales reconociendo su potencial, así como sus riesgos para su uso en el ámbito de la actividad física y el deporte.' },
  { id: '3.2.1', codigo: 'EFI.3.2.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo y promover una participación equilibrada, incluyendo estrategias de autoevaluación y coevaluación tanto del proceso como del resultado, mejorando con ello actitudes de superación, crecimiento y resiliencia.' },
  { id: '3.2.2', codigo: 'EFI.3.2.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Mostrar habilidades para la adaptación y la actuación ante situaciones con una creciente incertidumbre, aprovechando las propias capacidades e iniciando la automatización de procesos de percepción, decisión y ejecución en contextos reales o simulados de actuación, reflexionando de forma guiada sobre las soluciones y resultados obtenidos.' },
  { id: '3.2.3', codigo: 'EFI.3.2.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.2', descripcion: 'Evidenciar progresión en el control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, resolviendo problemas con apoyo ocasional en algún tipo de situaciones motrices transferibles a su espacio vivencial con autonomía.' },
  { id: '3.3.1', codigo: 'EFI.3.3.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Practicar y participar activamente una gran variedad de actividades motrices, valorando las implicaciones éticas de las prácticas antideportivas, gestionando positivamente la competitividad y actuando con deportividad al asumir los roles de público, participante u otros.' },
  { id: '3.3.2', codigo: 'EFI.3.3.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Cooperar o colaborar en la práctica de diferentes producciones motrices y proyectos para alcanzar el logro individual y grupal, participando con autonomía en la toma de decisiones vinculadas a la asignación de roles, la gestión del tiempo de práctica y la optimización del resultado final.' },
  { id: '3.3.3', codigo: 'EFI.3.3.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.3', descripcion: 'Relacionarse con el resto de participantes durante el desarrollo de diversas prácticas motrices con autonomía y haciendo uso efectivo de habilidades sociales de diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnica, socio-económica o de competencia motriz, y posicionándose activamente frente a los estereotipos, las actuaciones discriminatorias y la violencia.' },
  { id: '3.4.1', codigo: 'EFI.3.4.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Identificar influencia social del deporte en las sociedades actuales, valorando sus orígenes, evolución, distintas manifestaciones e intereses económico-políticos, practicando diversas modalidades relacionadas con Andalucía.' },
  { id: '3.4.2', codigo: 'EFI.3.4.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Adoptar actitudes comprometidas y conscientes acerca de los distintos estereotipos de género y comportamientos sexistas que se siguen produciendo en algunos contextos de la motricidad, ayudando a difundir referentes de distintos géneros en el ámbito físico-deportivo de Andalucía.' },
  { id: '3.4.3', codigo: 'EFI.3.4.3', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.4', descripcion: 'Representar composiciones individuales o colectivas con y sin base musical y de manera coordinada, utilizando intencionadamente y con autonomía el cuerpo y el movimiento como herramienta de expresión y comunicación a través de diversas técnicas expresivas específicas, y ayudando a difundir y compartir dichas prácticas culturales entre compañeros y compañeras u otros miembros de la comunidad, desde una pedagogía crítica y creativa.' },
  { id: '3.5.1', codigo: 'EFI.3.5.1', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Participar en actividades físico-deportivas en entornos naturales terrestres o acuáticos andaluces, disfrutando del entorno de manera sostenible, minimizando con cierto grado de autonomía el impacto ambiental que estas puedan producir, siendo conscientes de su huella ecológica y promoviendo actuaciones sencillas intencionadas dirigidas a la conservación y mejora de las condiciones de los espacios en los que se desarrollen.' },
  { id: '3.5.2', codigo: 'EFI.3.5.2', ciclo: '1º a 3º ESO', competenciaId: 'CE.EF.5', descripcion: 'Diseñar y organizar actividades físico-deportivas en el medio natural y urbano andaluz, asumiendo con ayuda algunas responsabilidades y aplicando normas de seguridad individuales y colectivas bajo supervisión.' },

  // 4º ESO
  { id: '4.1.1', codigo: 'EFI.4.1.1', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Planificar y autorregular la práctica de actividad física orientada al concepto integral de salud y al estilo de vida activo, haciendo uso de diferentes sistemas de entrenamiento y aplicando de manera autónoma diversas herramientas informáticas que permitan la autoevaluación y el seguimiento de la evolución de la mejora motriz, según las necesidades e intereses individuales y respetando, aceptando y valorando la propia realidad e identidad corporal y la de los demás, en diferentes manifestaciones motrices y contextos.' },
  { id: '4.1.2', codigo: 'EFI.4.1.2', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Incorporar de forma autónoma los procesos de activación corporal, autorregulación y dosificación del esfuerzo, alimentación saludable, educación postural, respiración, relajación, seguridad e higiene durante la práctica de actividades motrices, interiorizando y asumiendo como propias las rutinas de una práctica motriz saludable y responsable.' },
  { id: '4.1.3', codigo: 'EFI.4.1.3', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Adoptar de manera responsable y autónoma medidas específicas para la prevención de lesiones antes, durante y después de la práctica de actividad física, en diferentes contextos y situaciones motrices, identificando y valorando situaciones de riesgo y actuando de manera preventiva en su caso.' },
  { id: '4.1.4', codigo: 'EFI.4.1.4', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Actuar de acuerdo a los protocolos de intervención ante situaciones de emergencia o accidentes, valorando diferentes contextos y tipos de lesiones para aplicar de manera autónoma medidas específicas de primeros auxilios.' },
  { id: '4.1.5', codigo: 'EFI.4.1.5', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Adoptar actitudes comprometidas y transformadoras que rechacen los estereotipos sociales asociados al ámbito de lo corporal, al género y a la diversidad sexual, y los comportamientos que pongan en riesgo la salud, contrastando con autonomía e independencia cualquier información en base a criterios científicos de validez, fiabilidad y objetividad, en diferentes contextos y situaciones, haciendo uso para ello de herramientas informáticas.' },
  { id: '4.1.6', codigo: 'EFI.4.1.6', ciclo: '4º ESO', competenciaId: 'CE.EF.1', descripcion: 'Explorar diferentes recursos y aplicaciones digitales reconociendo su potencial, así como sus riesgos para su uso en el ámbito de la actividad física y el deporte.' },
  { id: '4.2.1', codigo: 'EFI.4.2.1', ciclo: '4º ESO', competenciaId: 'CE.EF.2', descripcion: 'Desarrollar proyectos motores de carácter individual, cooperativo o colaborativo, estableciendo mecanismos para reconducir los procesos de trabajo y asegurar una participación equilibrada, incluyendo estrategias de autoevaluación y coevaluación tanto del proceso como del resultado, consolidando actitudes de superación, crecimiento y resiliencia.' },
  { id: '4.2.2', codigo: 'EFI.4.2.2', ciclo: '4º ESO', competenciaId: 'CE.EF.2', descripcion: 'Mostrar habilidades para la adaptación y la actuación ante situaciones con una elevada incertidumbre, aprovechando eficientemente las propias capacidades y aplicando de manera automática procesos de percepción, decisión y ejecución en contextos reales o simulados de actuación, reflexionando sobre las soluciones y resultados obtenidos.' },
  { id: '4.2.3', codigo: 'EFI.4.2.3', ciclo: '4º ESO', competenciaId: 'CE.EF.2', descripcion: 'Evidenciar control y dominio corporal al emplear los componentes cualitativos y cuantitativos de la motricidad de manera eficiente y creativa, resolviendo problemas de forma autónoma en todo tipo de situaciones motrices transferibles a su espacio vivencial con autonomía.' },
  { id: '4.3.1', codigo: 'EFI.4.3.1', ciclo: '4º ESO', competenciaId: 'CE.EF.3', descripcion: 'Practicar y participar activamente asumiendo responsabilidades en la organización de una gran variedad de actividades motrices, valorando las implicaciones éticas de las prácticas antideportivas, gestionando positivamente la competitividad y actuando con deportividad al asumir los roles de público, participante u otros.' },
  { id: '4.3.2', codigo: 'EFI.4.3.2', ciclo: '4º ESO', competenciaId: 'CE.EF.3', descripcion: 'Cooperar o colaborar en la práctica de diferentes producciones motrices y proyectos para alcanzar el logro individual y grupal, participando con autonomía en la toma de decisiones vinculadas a la asignación de roles, la gestión del tiempo de práctica y la optimización del resultado final, valorando el proceso.' },
  { id: '4.3.3', codigo: 'EFI.4.3.3', ciclo: '4º ESO', competenciaId: 'CE.EF.3', descripcion: 'Relacionarse y entenderse con el resto de participantes durante el desarrollo de diversas prácticas motrices con autonomía y haciendo uso efectivo de habilidades sociales de diálogo en la resolución de conflictos y respeto ante la diversidad, ya sea de género, afectivo-sexual, de origen nacional, étnica, socio-económica o de competencia motriz, y posicionándose activamente frente a los estereotipos, las actuaciones discriminatorias y la violencia.' },
  { id: '4.4.1', codigo: 'EFI.4.4.1', ciclo: '4º ESO', competenciaId: 'CE.EF.4', descripcion: 'Contextualizar la influencia social del deporte en las sociedades actuales, valorando sus orígenes, evolución, distintas manifestaciones e intereses económico-políticos, practicando diversas modalidades relacionadas con Andalucía o las procedentes de otros lugares del mundo.' },
  { id: '4.4.2', codigo: 'EFI.4.4.2', ciclo: '4º ESO', competenciaId: 'CE.EF.4', descripcion: 'Adoptar actitudes comprometidas y conscientes acerca de los distintos estereotipos de género y comportamientos sexistas que se siguen produciendo en algunos contextos de la motricidad, identificando los factores que contribuyen a su mantenimiento ayudando a difundir referentes de ambos géneros en el ámbito físico-deportivo y ayudando a difundir referentes de ambos géneros en el ámbito físico-deportivo.' },
  { id: '4.4.3', codigo: 'EFI.4.4.3', ciclo: '4º ESO', competenciaId: 'CE.EF.4', descripcion: 'Crear y representar composiciones individuales o colectivas con y sin base musical y de manera coordinada, utilizando intencionadamente y con autonomía el cuerpo y el movimiento como herramienta de expresión y comunicación a través de diversas técnicas expresivas específicas, y ayudando a difundir y compartir dichas prácticas culturales entre compañeros y compañeras u otros miembros de la comunidad, desde una pedagogía crítica y creativa.' },
  { id: '4.5.1', codigo: 'EFI.4.5.1', ciclo: '4º ESO', competenciaId: 'CE.EF.5', descripcion: 'Participar en actividades físico-deportivas en entornos naturales andaluces, terrestres o acuáticos, disfrutando del entorno de manera sostenible, minimizando de forma autónoma el impacto ambiental que estas puedan producir, siendo conscientes de su huella ecológica y desarrollando colaborativa y/o cooperativamente actuaciones intencionadas dirigidas a la conservación y mejora de las condiciones de los espacios en los que se desarrollen.' },
  { id: '4.5.2', codigo: 'EFI.4.5.2', ciclo: '4º ESO', competenciaId: 'CE.EF.5', descripcion: 'Diseñar y organizar actividades físico-deportivas en el medio natural y urbano andaluz, asumiendo responsabilidades y aplicando normas de seguridad individuales y colectivas con autonomía.' }
];

export const SABERES_BASICOS_ANDALUCIA_ESO: SaberBasico[] = [
  // 1º ESO
  {
    codigo: 'EFI.1ESO.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Salud física, social y mental: volumen e intensidad de actividad física saludable, alimentación equilibrada y valor nutricional. Educación postural (core y descarga), calentamiento general autónomo. Análisis crítico de estereotipos corporales, de género y comportamientos antideportivos. Aceptación de posibilidades motrices y superación personal.'
  },
  {
    codigo: 'EFI.1ESO.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Elección de la práctica física basada en la lógica y el respeto al rival. Higiene y cuidado del material. Planificación de proyectos motores y autoevaluación guiada. Herramientas digitales en EF. Prevención de accidentes: calzado, ergonomía, medidas de seguridad y protocolo PAS (Proteger, Avisar, Socorrer 112).'
  },
  {
    codigo: 'EFI.1ESO.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Toma de decisiones tácticas en situaciones individuales, de oposición y de colaboración-oposición con móvil. Esquema corporal y capacidades perceptivo-motrices coordinadas. Desarrollo compensatorio de capacidades físicas básicas y habilidades motrices específicas. Creatividad y adaptabilidad motriz.'
  },
  {
    codigo: 'EFI.1ESO.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Gestión emocional: reconocimiento de emociones, autorregulación del esfuerzo y tolerancia a la frustración. Conductas prosociales: empatía, cooperación, solidaridad y respeto activo a las reglas como pauta de convivencia. Rechazo explícito de cualquier forma de discriminación o violencia.'
  },
  {
    codigo: 'EFI.1ESO.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Patrimonio cultural andaluz: juegos tradicionales y danzas autóctonas como manifestación intercultural. Deporte y perspectiva de género: análisis crítico de la presencia de figuras deportivas de diversos géneros en los medios de comunicación y promoción de la igualdad.'
  },
  {
    codigo: 'EFI.1ESO.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: '1º a 3º ESO',
    cursoRef: '1º ESO',
    descripcion: 'Movilidad activa y sostenible: normas viales en desplazamientos cotidianos. Prácticas motrices urbanas y naturales seguras (skate, parkour, senderismo). Análisis preventivo de riesgos y preservación ecológica de los entornos naturales de Andalucía.'
  },

  // 2º ESO
  {
    codigo: 'EFI.2ESO.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Salud física y bienestar: dosificación del esfuerzo, hábitos de alimentación saludable, respiración, relajación y fortalecimiento lumbo-pélvico. Tratamiento de molestias musculares. Superación de prejuicios estéticos, rechazo al odio en el deporte y prevención de trastornos de la conducta alimentaria.'
  },
  {
    codigo: 'EFI.2ESO.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Autoconstrucción y reparación de material deportivo con elementos reciclados. Higiene personal rigurosa. Autorregulación de proyectos motores con apoyo de plataformas digitales. Medidas colectivas de seguridad activa y protocolos de actuación ante emergencias (RCP básica y conducta PAS).'
  },
  {
    codigo: 'EFI.2ESO.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Estrategias tácticas colectivas de ataque y defensa en situaciones de colaboración-oposición e invasión. Eficiencia en la ejecución técnica y capacidades perceptivo-motrices complejas. Capacidades físicas básicas aplicadas y creatividad motriz para resolver problemas motrices no previstos.'
  },
  {
    codigo: 'EFI.2ESO.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Control de la impulsividad y asertividad ante conflictos motrices. Asunción responsable de roles de jugador, árbitro o mediador. Juego limpio, respeto incondicional a las normas y rechazo categórico a conductas sexistas, racistas o LGTBIfóbicas en las actividades físico-deportivas.'
  },
  {
    codigo: 'EFI.2ESO.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Expresión corporal: comunicación de estados de ánimo y técnicas de dramatización corporal. Ritmos y danzas de Andalucía: el flamenco como seña de identidad artístico-motriz. Análisis sociológico del deporte como fenómeno de masas e igualdad laboral en profesiones vinculadas al deporte.'
  },
  {
    codigo: 'EFI.2ESO.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: '1º a 3º ESO',
    cursoRef: '2º ESO',
    descripcion: 'Diseño de actividades motrices seguras en el medio urbano y natural andaluz. La bicicleta como medio de transporte habitual no contaminante. Uso sostenible y protección de la red de espacios naturales protegidos de Andalucía.'
  },

  // 3º ESO
  {
    codigo: 'EFI.3ESO.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Variables fisiológicas y control del esfuerzo físico. Planificación y autorregulación del acondicionamiento físico orientado a la salud. Alimentación mediterránea y análisis crítico de la publicidad de productos alimenticios o dietas milagro. Ergonomía postural en el trabajo y frente a pantallas.'
  },
  {
    codigo: 'EFI.3ESO.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Gestión autónoma de proyectos físico-deportivos: coevaluación y registro colaborativo mediante TIC. Medidas avanzadas de seguridad colectiva y gestión del riesgo. Protocolo de reanimación cardiopulmonar (RCP), maniobra de Heimlich y reconocimiento precoz de emergencias cardiovasculares.'
  },
  {
    codigo: 'EFI.3ESO.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Toma de decisiones tácticas avanzadas: anticipación, desmarques y delimitación estratégica de ataque y defensa. Métodos y sistemas de desarrollo de fuerza y resistencia aeróbica para la salud. Superación de barreras arquitectónicas que limitan la movilidad autónoma.'
  },
  {
    codigo: 'EFI.3ESO.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Estrategias de gestión del estrés, perseverancia y resiliencia ante el fracaso motriz. Habilidades de negociación y mediación pacífica de disputas. Fomento del fair play en todos los niveles y defensa activa de la inclusión y la diversidad.'
  },
  {
    codigo: 'EFI.3ESO.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Técnicas avanzadas de expresión corporal y coreografía. Manifestaciones tradicionales y contemporáneas de Andalucía (folclore y flamenco). Historia sociopolítica del deporte y análisis de la evolución de la igualdad de género en los Juegos Olímpicos y la aportación andaluza.'
  },
  {
    codigo: 'EFI.3ESO.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: '1º a 3º ESO',
    cursoRef: '3º ESO',
    descripcion: 'Diseño y desarrollo de actividades físicas en el medio natural y nuevos espacios deportivos urbanos (circuitos de calistenia, crossfit). Gestión del riesgo ambiental, movilidad activa y preservación de entornos naturales y urbanos comunitarios.'
  },

  // 4º ESO
  {
    codigo: 'EFI.4ESO.A',
    bloque: 'A',
    bloqueNombre: 'Vida activa y saludable',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Diseño autónomo de planes de actividad física para la salud basados en principios del entrenamiento. Mitos y falsas creencias en torno al cuerpo. Análisis ético y rechazo de la suplementación nociva y dopaje. Creación de una identidad corporal sólida frente a trastornos estéticos (vigorexia, anorexia).'
  },
  {
    codigo: 'EFI.4ESO.B',
    bloque: 'B',
    bloqueNombre: 'Organización y gestión de la actividad física',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Liderazgo y gestión colaborativa de proyectos y eventos deportivos con herramientas digitales. Protocolos de emergencia integrales: Soporte Vital Básico (SVB), reanimación con Desfibrilador Externo Automático (DEA/DESA) y primeros auxilios aplicados.'
  },
  {
    codigo: 'EFI.4ESO.C',
    bloque: 'C',
    bloqueNombre: 'Resolución de problemas en situaciones motrices',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Resolución autónoma y creativa de situaciones motrices complejas en deportes individuales, de adversario y colectivos. Automatización de toma de decisiones tácticas. Identificación y corrección de errores técnicos y diseño de sistemas de entrenamiento funcional.'
  },
  {
    codigo: 'EFI.4ESO.D',
    bloque: 'D',
    bloqueNombre: 'Autorregulación emocional e interacción social',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Madurez emocional, autocontrol y canalización de tensiones en situaciones competitivas. Liderazgo ético, mediación en conflictos y cooperación eficaz. Promoción activa de la equidad, erradicación de estereotipos sexistas y compromiso con los derechos humanos en el deporte.'
  },
  {
    codigo: 'EFI.4ESO.E',
    bloque: 'E',
    bloqueNombre: 'Manifestaciones de la cultura motriz',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Creación y montaje de espectáculos y producciones motrices artístico-expresivas colectivas. Análisis crítico del deporte profesional, intereses económicos y geopolíticos, y repercusión sociolaboral de la mujer en el deporte de alta competición.'
  },
  {
    codigo: 'EFI.4ESO.F',
    bloque: 'F',
    bloqueNombre: 'Interacción eficiente y sostenible con el entorno',
    ciclo: '4º ESO',
    cursoRef: '4º ESO',
    descripcion: 'Organización autónoma de actividades físico-deportivas en el medio natural terrestre y acuático andaluz. Gestión integral de la seguridad y evaluación del impacto ecológico. Movilidad activa y proyectos de aprendizaje-servicio vinculados al entorno natural.'
  }
];
