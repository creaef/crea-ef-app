import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// PAÍS VASCO - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_PAIS_VASCO_PRIMARIA: CompetenciaEspecifica[] = [
  { id: "CE.EF.1", numero: 1, nombre: "Salud Integral y Gestión Dialógica", descripcion: "Reconocer los efectos de la actividad física en la salud global, trabajando la gestión de emociones y conflictos para potenciar la salud física, emocional y social." },
  { id: "CE.EF.2", numero: 2, nombre: "Situaciones Psicomotrices", descripcion: "Actuar en situaciones psicomotrices en entornos sin incertidumbre, interiorizando esquemas de acción para conocerse, autorregularse y mejorar las capacidades físicas." },
  { id: "CE.EF.3", numero: 3, nombre: "Situaciones Socio-motrices de Oposición", descripcion: "Adaptarse a las exigencias de las situaciones sociomotrices de oposición en entornos sin incertidumbre, priorizando el respeto hacia los participantes y las reglas sobre los resultados, para regular las conductas asociadas al desafío y contribuir a la adquisición y creación de una cultura motriz." },
  { id: "CE.EF.4", numero: 4, nombre: "Situaciones Socio-motrices de Cooperación", descripcion: "Desenvolverse en situaciones sociomotrices de cooperación en entornos sin incertidumbre, desarrollando procesos de autorregulación, con actitud empática e inclusiva, haciendo uso de habilidades sociales y actitudes de cooperación y respeto, para contribuir a la convivencia social y al compromiso ético en los diferentes espacios en los que se participa." },
  { id: "CE.EF.5", numero: 5, nombre: "Situaciones Socio-motrices de Oposición-Colaboración", descripcion: "Interactuar en situaciones sociomotrices de oposición-colaboración en entornos sin incertidumbre, asimilando las reglas y principios de acción propios de este tipo de actividades para empezar a ajustar la conducta motriz en situaciones con alta demanda informacional, y contribuir a la adquisición de una cultura motriz." },
  { id: "CE.EF.6", numero: 6, nombre: "Situaciones Motrices en Entornos con Incertidumbre", descripcion: "Descubrir y aprovechar las opciones de acción en situaciones motrices en entornos con incertidumbre, realizando una práctica respetuosa con el entorno desde un enfoque sostenible, y que priorice la seguridad sobre el riesgo, para valorar diferentes medios naturales y urbanos como contextos de práctica motriz y participar en su cuidado y mejora." },
  { id: "CE.EF.7", numero: 7, nombre: "Situaciones Motrices Artísticas y de Expresión", descripcion: "Valerse del cuerpo como instrumento de expresión y comunicación valorando su influencia y sus aportaciones estéticas y creativas a la cultura tradicional y contemporánea para integrarlas dentro del repertorio de actuaciones motrices que se utilizan regularmente en la vida cotidiana." }
];

export const CRITERIOS_EVALUACION_PAIS_VASCO_PRIMARIA: CriterioEvaluacion[] = [
  // 1º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Experimentar los beneficios de la actividad física empezando a establecer las bases de un estilo de vida activo." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Adoptar medidas básicas de cuidado de la salud personal a través de la higiene corporal, el descanso, la educación postural y la alimentación saludable." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Participar en juegos de activación/calentamiento y vuelta a la calma de forma segura." },
  { id: "1.4", codigo: "EFI.1.4", ciclo: "Primer Ciclo", competenciaId: "CE.EF.1", descripcion: "Expresar emociones experimentadas en las prácticas motrices y resolver desacuerdos con diálogo." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Explorar las posibilidades del propio cuerpo y afianzar la lateralidad y el equilibrio estático y dinámico." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Resolver situaciones psicomotrices aplicando habilidades motrices básicas genéricas (desplazamientos, saltos, giros, lanzamientos y recepciones)." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.2", descripcion: "Experimentar la dosificación del esfuerzo y la perseverancia ante las dificultades motrices." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.3", descripcion: "Adecuar la acción motriz para intentar superar al adversario en juegos de uno contra uno y grupales sencillos." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.3", descripcion: "Participar activamente en juegos motores y deportes de carácter cultural propios del entorno (juegos tradicionales vascos), gestionando las emociones asociadas a ganar y perder." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.4", descripcion: "Llevar a cabo acciones motrices coordinadas con compañeros/as para alcanzar una meta común en juegos cooperativos." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.4", descripcion: "Participar en dinámicas grupales con actitud de ayuda, respeto a las normas y sin discriminación." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.5", descripcion: "Comprender y respetar las reglas en juegos colectivos sencillos, adaptando la posición según el rol (atacante/defensor)." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.5", descripcion: "Experimentar juegos de pase y recepción respetando a los compañeros y oponentes." },
  { id: "5.3", codigo: "EFI.5.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.5", descripcion: "Conocer referentes deportivos de distintos géneros reconociendo el esfuerzo y la dedicación." },
  { id: "6.1", codigo: "EFI.6.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.6", descripcion: "Realizar desplazamientos y juegos en espacios exteriores y naturales cercanos con seguridad y respeto." },
  { id: "6.2", codigo: "EFI.6.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.6", descripcion: "Interpretar pistas y croquis básicos en juegos de orientación sencillos en el patio escolar." },
  { id: "6.3", codigo: "EFI.6.3", ciclo: "Primer Ciclo", competenciaId: "CE.EF.6", descripcion: "Aplicar hábitos de cuidado del entorno y recogida de materiales utilizados." },
  { id: "7.1", codigo: "EFI.7.1", ciclo: "Primer Ciclo", competenciaId: "CE.EF.7", descripcion: "Utilizar el cuerpo y el gesto para representar personajes, objetos, emociones e historias sencillas." },
  { id: "7.2", codigo: "EFI.7.2", ciclo: "Primer Ciclo", competenciaId: "CE.EF.7", descripcion: "Participar en danzas infantiles y tradicionales vascas sencillas (euskal dantzak) con adecuación al ritmo." },

  // 2º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Reconocer la actividad física como alternativa de ocio saludable, conociendo los efectos a nivel físico y mental y mostrando disposición positiva hacia el esfuerzo." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Consolidar hábitos de higiene, postura, hidratación y alimentación equilibrada." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Diseñar y poner en práctica calentamientos generales y vueltas a la calma pautadas." },
  { id: "1.4", codigo: "EFI.1.4", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.1", descripcion: "Gestionar la frustración y resolver conflictos motrices mediante la mediación y el diálogo activo." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Ajustar el control postural, la orientación espacial y la estructuración temporal a retos motores más complejos." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Combinar habilidades motrices básicas con precisión y fluidez para resolver situaciones individuales." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.2", descripcion: "Regular la dosificación de la energía en tareas físicas de intensidad creciente." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.3", descripcion: "Aplicar tácticas de engaño, fintas y cambios de ritmo para desequilibrar al rival en juegos de oposición directa y de cancha dividida." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.3", descripcion: "Participar en juegos tradicionales vascos de oposición y modalidades básicas de Euskal Pilota y Herri Kirolak controlando la impulsividad." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.4", descripcion: "Resolver desafíos físicos cooperativos y retos colectivos diseñando estrategias compartidas." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.4", descripcion: "Cooperar activamente en montajes grupales y juegos de rescate anteponiendo el éxito grupal al lucimiento individual." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.5", descripcion: "Desempeñar funciones de ataque (desmarque, pase al hueco) y defensa (marcaje, cobertura) en deportes modificados colectivos." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.5", descripcion: "Asumir roles de arbitraje escolar respetando las decisiones colectivas y aplicando el juego limpio." },
  { id: "5.3", codigo: "EFI.5.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.5", descripcion: "Analizar críticamente la visibilidad del deporte practicado por mujeres y hombres en los medios." },
  { id: "6.1", codigo: "EFI.6.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.6", descripcion: "Orientarse y desplazarse en parques o espacios naturales utilizando mapas con simbología básica y brújula." },
  { id: "6.2", codigo: "EFI.6.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.6", descripcion: "Evaluar riesgos y aplicar medidas de autoprotección en salidas al medio natural vasco." },
  { id: "6.3", codigo: "EFI.6.3", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.6", descripcion: "Mantener una conducta estricta de residuo cero y cuidado de la flora y fauna local." },
  { id: "7.1", codigo: "EFI.7.1", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.7", descripcion: "Crear y representar secuencias rítmicas colectivas y dramatizaciones integrando música, vestuario u objetos." },
  { id: "7.2", codigo: "EFI.7.2", ciclo: "Segundo Ciclo", competenciaId: "CE.EF.7", descripcion: "Ejecutar danzas tradicionales vascas (euskal dantzak) y populares del mundo mostrando adecuación rítmica." },

  // 3º Ciclo
  { id: "1.1", codigo: "EFI.1.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Reconocer los efectos beneficiosos de la actividad física como paso previo para su integración en la vida diaria, mostrando perseverancia y mentalidad de crecimiento." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Planificar de forma guiada rutinas de actividad física orientadas a la salud y valorar de forma crítica el impacto del sedentarismo y las pantallas." },
  { id: "1.3", codigo: "EFI.1.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Conocer y aplicar protocolos elementales de auxilio y primeros auxilios ante accidentes (conducta PAS)." },
  { id: "1.4", codigo: "EFI.1.4", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.1", descripcion: "Regular la impulsividad y autorregular las emociones ante situaciones de alta exigencia motriz." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Adaptar habilidades motrices específicas asociadas a la técnica en actividades físico-deportivas individuales con eficacia y economía energética." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Planificar secuencias de acción anticipando las respuestas motrices y reajustándolas ante estímulos imprevistos." },
  { id: "2.3", codigo: "EFI.2.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.2", descripcion: "Evaluar la propia competencia motriz reconociendo puntos fuertes y aspectos de mejora." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.3", descripcion: "Tomar decisiones estratégicas complejas de anticipación, ocupación espacial y gestión del tiempo en situaciones de oposición." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.3", descripcion: "Participar en juegos y deportes tradicionales con arraigo en la cultura vasca (Euskal Pilota en frontón, Herri Kirolak) y de otras culturas, reconociendo su valor generador de interacciones y gestionando la presión competitiva." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.4", descripcion: "Liderar y participar activamente en proyectos cooperativos motores complejos (acrosport, retos de aventura) distribuyendo roles equitativamente." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.4", descripcion: "Promover el compromiso ético, la empatía, la inclusión de todo el alumnado y la mediación dialogada en conflictos." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.5", descripcion: "Aplicar soluciones tácticas avanzadas de ataque y defensa en deportes colectivos reglados y deportes alternativos." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.5", descripcion: "Organizar encuentros y torneos escolares autogestionados asumiendo roles organizativos, arbitrales y de mesa bajo premisas de juego limpio." },
  { id: "5.3", codigo: "EFI.5.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.5", descripcion: "Valorar el deporte como fenómeno cultural analizando críticamente estereotipos de género, mercantilismo y conductas violentas." },
  { id: "6.1", codigo: "EFI.6.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.6", descripcion: "Planificar y realizar recorridos de senderismo y orientación en el medio natural vasco con autonomía, seguridad y uso adecuado de mapas y brújula." },
  { id: "6.2", codigo: "EFI.6.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.6", descripcion: "Promover la movilidad activa y sostenible (desplazamientos en bicicleta o a pie) en la vida escolar y comunitaria." },
  { id: "6.3", codigo: "EFI.6.3", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.6", descripcion: "Actuar con responsabilidad activa para la preservación de la biodiversidad y la reducción del impacto ambiental." },
  { id: "7.1", codigo: "EFI.7.1", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.7", descripcion: "Elaborar, ensayar y presentar montajes escénicos expresivos complejos (acrosport, danzas urbanas, dramatizaciones) con fluidez y sentido estético." },
  { id: "7.2", codigo: "EFI.7.2", ciclo: "Tercer Ciclo", competenciaId: "CE.EF.7", descripcion: "Valorar el origen patrimonial de las danzas tradicionales vascas (euskal dantzak) y contemporáneas integrándolas en el repertorio personal." }
];

export const SABERES_BASICOS_PAIS_VASCO_PRIMARIA: SaberBasico[] = [
  { codigo: "EFI.PRI.A", bloque: "A", bloqueNombre: "Situaciones psicomotrices", ciclo: "Todos", descripcion: "Esquema corporal, conciencia y control corporal, lateralidad; capacidades físicas básicas y coordinativas (equilibrio, agilidad); habilidades y destrezas motrices básicas y específicas; regulación del esfuerzo y gasto energético; creatividad motriz ante estímulos internos/externos." },
  { codigo: "EFI.PRI.B", bloque: "B", bloqueNombre: "Situaciones socio-motrices de oposición", ciclo: "Todos", descripcion: "Principios de acción para superar al adversario: posición corporal, distancia, reducción/aumento de espacios y tiempos, fintas, anticipación y desequilibrio; juegos de lucha tradicionales; asunción de reglas, deportividad y respeto al oponente." },
  { codigo: "EFI.PRI.C", bloque: "C", bloqueNombre: "Situaciones socio-motrices de cooperación", ciclo: "Todos", descripcion: "Principios de acción en tareas colaborativas: sincronización, ocupación equitativa del espacio, comunicación motriz, rescates; proyectos grupales de cuentos motores, retos cooperativos y combas; empatía, corresponsabilidad y cohesión." },
  { codigo: "EFI.PRI.D", bloque: "D", bloqueNombre: "Situaciones socio-motrices de oposición-colaboración", ciclo: "Todos", descripcion: "Toma de decisiones tácticas en deportes colectivos y tradicionales: apoyos, desmarques, conservación/recuperación del móvil, ataque y defensa; respeto a normas y arbitraje educativo; análisis crítico de estereotipos sexistas en el deporte institucionalizado." },
  { codigo: "EFI.PRI.E", bloque: "E", bloqueNombre: "Situaciones motrices en entornos con incertidumbre", ciclo: "Todos", descripcion: "Actividades físicas en el medio natural y urbano: técnicas de orientación (croquis, mapas, pistas), gestión del riesgo, senderismo, bicicleta; autoprotección y seguridad; desplazamientos activos y respeto ecosostenible (cultura de residuo cero)." },
  { codigo: "EFI.PRI.F", bloque: "F", bloqueNombre: "Situaciones motrices artísticas y de expresión", ciclo: "Todos", descripcion: "Usos comunicativos de la corporalidad: emociones, sentimientos e ideas; actividades rítmico-musicales, danzas infantiles y tradicionales vascas (euskal dantzak), danzas del mundo; montajes de acrosport, dramatización y mimo." },
  { codigo: "EFI.PRI.G", bloque: "G", bloqueNombre: "Salud, Coeducación y Cultura Motriz (Transversal)", ciclo: "Todos", descripcion: "Salud física (higiene, descanso, postura, prevención de accidentes, calentamiento/vuelta a la calma); salud mental y gestión emocional; salud social; Euskal Herriko jolas eta kirolak (pelota vasca, herri kirolak); perspectiva de género y juego limpio." }
];

// ==========================================
// PAÍS VASCO - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_PAIS_VASCO_ESO: CompetenciaEspecifica[] = [
  { id: "CE.EF.1", numero: 1, nombre: "Planificación, Condición Física Saludable, Prevención y Primeros Auxilios", descripcion: "Planificar y autorregular una práctica de actividad física orientada a la salud, consolidando un estilo de vida activo y saludable, reconociendo los factores condicionantes del bienestar integral y aplicando medidas de seguridad y prevención." },
  { id: "CE.EF.2", numero: 2, nombre: "Habilidades Específicas, Técnica, Táctica y Situaciones Motrices Complejas", descripcion: "Adaptar y ejecutar las habilidades motrices básicas y específicas a situaciones sociomotrices complejas y dinámicas, con eficacia, control postural, fluidez y creatividad en contextos individuales, de oposición y de colaboración." },
  { id: "CE.EF.3", numero: 3, nombre: "Autorregulación Emocional, Cooperación, Inclusión y Juego Limpio", descripcion: "Fomentar relaciones interpersonales inclusivas, respetuosas y asertivas en la práctica físico-deportiva, asumiendo la autorregulación emocional, el trabajo cooperativo, la equidad de género y el juego limpio para la resolución pacífica de conflictos." },
  { id: "CE.EF.4", numero: 4, nombre: "Cultura Motriz Vasca, Expresión Corporal y Análisis Sociocultural del Deporte", descripcion: "Valorar y participar en manifestaciones de la cultura motriz tradicional vasca, contemporánea y deportiva, analizando críticamente el deporte como fenómeno social, sus implicaciones económicas y mediáticas y preservando el patrimonio autóctono." },
  { id: "CE.EF.5", numero: 5, nombre: "Actividades en el Medio Natural y Urbano, Sostenibilidad y Movilidad Activa", descripcion: "Desenvolverse de manera autónoma, eficiente y segura en el medio natural y urbano a través de actividades físico-deportivas sostenibles, promoviendo la preservación ambiental y la movilidad activa cotidiana." }
];

export const CRITERIOS_EVALUACION_PAIS_VASCO_ESO: CriterioEvaluacion[] = [
  // 1º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.1", descripcion: "Identificar las capacidades físicas básicas (resistencia, fuerza, flexibilidad, velocidad) y su vinculación con la salud." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.1", descripcion: "Realizar calentamientos generales guiados y aplicar hábitos de higiene postural y corporal tras la práctica." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.2", descripcion: "Ejecutar habilidades motrices específicas en situaciones de oposición e iniciación deportiva con eficacia técnica elemental." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.2", descripcion: "Tomar decisiones tácticas sencillas en juegos reducidos de cooperación-oposición y deportes colectivos." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.3", descripcion: "Participar con actitud de cooperación y respeto hacia los compañeros, rechazando cualquier discriminación." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.3", descripcion: "Aceptar y cumplir los reglamentos escolares, actuando con deportividad al asumir diversos roles de juego." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.4", descripcion: "Conocer y practicar juegos y modalidades tradicionales vascas (pelota a mano, juegos rurales)." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.4", descripcion: "Ejecutar secuencias rítmicas elementales y estructuras de movimiento expresivo corporal." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.5", descripcion: "Realizar recorridos de orientación básica en el centro escolar o parques urbanos siguiendo un mapa." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "1º ESO", competenciaId: "CE.EF.5", descripcion: "Aplicar protocolos elementales de prevención de riesgos y respeto al entorno natural." },

  // 2º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.1", descripcion: "Evaluar la condición física personal aplicando pruebas estandarizadas y registrando la evolución." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.1", descripcion: "Diseñar y ejecutar calentamientos generales autónomos y aplicar pautas de nutrición deportiva e hidratación." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.2", descripcion: "Adaptar gestos técnicos y coordinativos ante situaciones dinámicas no estandarizadas y de oposición directa." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.2", descripcion: "Aplicar principios tácticos colectivos de apoyo, desmarque y cobertura en deportes de invasión." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.3", descripcion: "Asumir roles de arbitraje escolar y mediación de conflictos de forma dialogada y con juego limpio." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.3", descripcion: "Promover la inclusión y la igualdad efectiva de género en todas las dinámicas motrices del grupo." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.4", descripcion: "Practicar modalidades tradicionales de Euskal Pilota (pala, frontenis) y Herri Kirolak." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.4", descripcion: "Crear coreografías o montajes expresivos grupales sencillos con adecuación rítmica y música." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.5", descripcion: "Completar itinerarios en la naturaleza utilizando brújula y lectura básica de planos topográficos." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "2º ESO", competenciaId: "CE.EF.5", descripcion: "Aplicar medidas de residuo cero y conservación activa del medio ambiente en actividades de senderismo." },

  // 3º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.1", descripcion: "Diseñar y poner en práctica un plan sistemático personal de trabajo de una capacidad física orientada a la salud." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.1", descripcion: "Conocer y aplicar protocolos de primeros auxilios y soporte vital básico (conducta PAS, RCP y uso de DEA/DESA)." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.2", descripcion: "Demostrar precisión técnica y fluidez en deportes individuales, de raqueta/implemento y colectivos avanzados." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.2", descripcion: "Elaborar y aplicar sistemas tácticos avanzados respondiendo a la lectura estratégica de los rivales." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.3", descripcion: "Organizar y dinamizar torneos escolares inclusivos promoviendo el liderazgo compartido y la cooperación." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.3", descripcion: "Autorregular la ansiedad y la frustración en contextos competitivos de juego real de forma asertiva." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.4", descripcion: "Analizar críticamente el impacto social, mediático y mercantil del deporte profesional y sus valores éticos." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.4", descripcion: "Diseñar composiciones grupales de acrosport, danza urbana o mimo combinando calidad estética y coordinación." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.5", descripcion: "Planificar recorridos en el medio natural contemplando previsiones meteorológicas y normas de seguridad." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "1º Ciclo ESO", cursoRef: "3º ESO", competenciaId: "CE.EF.5", descripcion: "Utilizar medios de transporte activos y sostenibles (bicicleta, patinete) en actividades de exploración urbana." },

  // 4º ESO
  { id: "1.1", codigo: "EFI.1.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.1", descripcion: "Planificar, autorregular y evaluar un programa autónomo de actividad física orientada a la vida adulta." },
  { id: "1.2", codigo: "EFI.1.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.1", descripcion: "Analizar críticamente mitos del fitness, dietas milagro, suplementación y factores de riesgo para la salud integral." },
  { id: "2.1", codigo: "EFI.2.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.2", descripcion: "Resolver proyectos motores complejos adaptando componentes cualitativos (ritmo, precisión, fluidez y creatividad)." },
  { id: "2.2", codigo: "EFI.2.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.2", descripcion: "Diseñar y coordinar estrategias de equipo en deportes convencionales y alternativos con alta eficacia táctica." },
  { id: "3.1", codigo: "EFI.3.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.3", descripcion: "Liderar y gestionar proyectos físico-deportivos comunitarios que promuevan la inclusión y la participación activa." },
  { id: "3.2", codigo: "EFI.3.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.3", descripcion: "Demostrar madurez ética y autocontrol permanente ante momentos de máxima presión competitiva." },
  { id: "4.1", codigo: "EFI.4.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.4", descripcion: "Adoptar una postura crítica fundada sobre el dopaje, los estereotipos de género y el mercantilismo deportivo." },
  { id: "4.2", codigo: "EFI.4.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.4", descripcion: "Producir y presentar proyectos escénicos corporales integrales vinculando movimiento, música y tecnología." },
  { id: "5.1", codigo: "EFI.5.1", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.5", descripcion: "Organizar de forma autónoma actividades en el medio natural gestionando riesgos y minimizando la huella ecológica." },
  { id: "5.2", codigo: "EFI.5.2", ciclo: "2º Ciclo ESO", cursoRef: "4º ESO", competenciaId: "CE.EF.5", descripcion: "Promover la movilidad activa y el uso sostenible de los espacios públicos e instalaciones deportivas comunitarias." }
];

export const SABERES_BASICOS_PAIS_VASCO_ESO: SaberBasico[] = [
  { codigo: "EFI.ESO.A", bloque: "A", bloqueNombre: "Condición Física", ciclo: "Todos", descripcion: "Concepto de condición física orientada a la salud; factores que influyen en el bienestar corporal. Ergonomía e higiene postural en la vida cotidiana. Baterías de test de aptitud física; control de la frecuencia cardíaca y zonas de esfuerzo aeróbico. Métodos y sistemas de entrenamiento." },
  { codigo: "EFI.ESO.B", bloque: "B", bloqueNombre: "Planificación, Prevención y Primeros Auxilios", ciclo: "Todos", descripcion: "Estructura y ejecución guiada o autónoma del calentamiento general y específico; uso y cuidado del material deportivo. Primeros auxilios: Conducta PAS, maniobra de Heimlich, soporte vital básico (SVB/RCP) y funcionamiento de desfibriladores (DEA/DESA)." },
  { codigo: "EFI.ESO.C", bloque: "C", bloqueNombre: "Resolución de Problemas Motrices", ciclo: "Todos", descripcion: "Iniciación técnica a los gestos fundamentales de deportes individuales y colectivos. Toma de decisiones tácticas en juegos reducidos y deportes alternativos (Ultimate, Datchball, Kin-ball). Análisis biomecánico elemental y autorregulación del gesto motriz." },
  { codigo: "EFI.ESO.D", bloque: "D", bloqueNombre: "Interacción Social y Emociones", ciclo: "Todos", descripcion: "Habilidades sociales y de empatía en el trabajo en equipo; aceptación de la diversidad y juego limpio. Roles de mediación y arbitraje escolar. Mecanismos psicológicos de afrontamiento ante la presión. Erradicación de conductas machistas y LGTBIfóbicas." },
  { codigo: "EFI.ESO.E", bloque: "E", bloqueNombre: "Cultura Motriz y Expresión", ciclo: "Todos", descripcion: "Deportes y juegos autóctonos de Euskal Herria (pelota vasca, sokatira, txinga erutea, etc.). Sociología del deporte espectáculo: mercantilización y discriminación mediática. Creación coreográfica colectiva, acrosport, dramatización y mimo." },
  { codigo: "EFI.ESO.F", bloque: "F", bloqueNombre: "Medio Natural y Urbano", ciclo: "Todos", descripcion: "Carreras de orientación con mapa y simbología. Senderismo escolar, residuo cero (Leave No Trace) y espacios naturales protegidos de Euskadi. Cicloturismo, bicicleta de montaña (BTT), patinaje y movilidad activa sostenible." }
];
