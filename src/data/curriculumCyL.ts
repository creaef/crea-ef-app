import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

export const COMPETENCIAS_ESPECIFICAS_CYL_PRIMARIA: CompetenciaEspecifica[] = [
  {
    "id": "CE.EF.1",
    "numero": 1,
    "nombre": "Vida activa y saludable",
    "descripcion": "Adoptar un estilo de vida activo y saludable, incorporando la práctica regular de actividad física, valorando los beneficios físicos, psíquicos y sociales para la salud global."
  },
  {
    "id": "CE.EF.2",
    "numero": 2,
    "nombre": "Resolución de situaciones motrices",
    "descripcion": "Adaptar las capacidades físicas, coordinativas y perceptivo-motrices a las exigencias de situaciones motrices variadas mediante el dominio del cuerpo en el espacio y en el tiempo."
  },
  {
    "id": "CE.EF.3",
    "numero": 3,
    "nombre": "Relaciones interpersonales",
    "descripcion": "Desarrollar relaciones interpersonales inclusivas, respetuosas y colaborativas durante la práctica de actividades motrices, gestionando las emociones y previniendo la discriminación y la violencia."
  },
  {
    "id": "CE.EF.4",
    "numero": 4,
    "nombre": "Cultura motriz",
    "descripcion": "Valorar e integrar la cultura motriz, sus manifestaciones tradicionales, lúdicas, deportivas y artísticas como parte fundamental del patrimonio cultural y de la propia identidad."
  },
  {
    "id": "CE.EF.5",
    "numero": 5,
    "nombre": "Interacción con el entorno",
    "descripcion": "Interactuar de forma sostenible, autónoma y segura en el medio natural y urbano a través de la práctica motriz respetuosa con el entorno."
  }
];

export const COMPETENCIAS_ESPECIFICAS_CYL_ESO: CompetenciaEspecifica[] = [
  {
    "id": "CE.EF.1",
    "numero": 1,
    "nombre": "Vida activa y saludable",
    "descripcion": "Planificar y autorregular una práctica de actividad física orientada a la salud, consolidando un estilo de vida activo y saludable que prevenga riesgos y mejore la calidad de vida."
  },
  {
    "id": "CE.EF.2",
    "numero": 2,
    "nombre": "Resolución de situaciones motrices",
    "descripcion": "Desarrollar la capacidad de adaptación motriz mediante la ejecución de habilidades específicas en contextos sociomotores complejos con eficacia, fluidez y creatividad."
  },
  {
    "id": "CE.EF.3",
    "numero": 3,
    "nombre": "Relaciones interpersonales",
    "descripcion": "Promover e integrar valores sociales y personales de inclusión, respeto a la diversidad, equidad de género, juego limpio y resolución pacífica de conflictos en la práctica motriz."
  },
  {
    "id": "CE.EF.4",
    "numero": 4,
    "nombre": "Cultura motriz",
    "descripcion": "Analizar, valorar y participar activamente en manifestaciones histórico-culturales, dancísticas y deportivas como elemento integrador de la propia identidad cultural."
  },
  {
    "id": "CE.EF.5",
    "numero": 5,
    "nombre": "Interacción con el entorno",
    "descripcion": "Organizar y llevar a cabo actividades físicas en el medio natural y urbano de manera autónoma, segura y ambientalmente sostenible."
  }
];

export const CRITERIOS_EVALUACION_CYL_PRIMARIA: CriterioEvaluacion[] = [
  { id: '1.1.cyl', codigo: 'EFI.CYL.1.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.1. Identificar pautas básicas de salud y bienestar corporal en el ámbito cotidiano y en las sesiones de Educación Física.' },
  { id: '1.2.cyl', codigo: 'EFI.CYL.1.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.2. Participar de forma activa y progresiva en juegos y actividades físicas dentro y fuera del centro educativo.' },
  { id: '2.1.cyl', codigo: 'EFI.CYL.2.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.1. Resolver situaciones motrices sencillas aplicando esquemas corporales básicos (equilibrio, lateralidad, coordinación).' },
  { id: '2.2.cyl', codigo: 'EFI.CYL.2.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.2. Utilizar habilidades motrices básicas adaptadas a diferentes entornos.' },
  { id: '3.1.cyl', codigo: 'EFI.CYL.3.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.1. Aceptar y cumplir las reglas básicas de los juegos, colaborando sin discriminación.' },
  { id: '3.2.cyl', codigo: 'EFI.CYL.3.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.2. Expresar y regular emociones básicas asociadas a la victoria, derrota o esfuerzo.' },
  { id: '4.1.cyl', codigo: 'EFI.CYL.4.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.1. Conocer y practicar juegos populares, tradicionales y motores del entorno.' },
  { id: '4.2.cyl', codigo: 'EFI.CYL.4.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.2. Experimentar el cuerpo como vehículo de expresión artística y comunicación gestual.' },
  { id: '5.1.cyl', codigo: 'EFI.CYL.5.1', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.1. Desarrollar actividades motrices en el entorno próximo aplicando pautas de seguridad básica.' },
  { id: '5.2.cyl', codigo: 'EFI.CYL.5.2', ciclo: 'Primer Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.2. Adoptar hábitos elementales de cuidado y respeto hacia las instalaciones y el entorno.' },
  { id: '1.1.cyl', codigo: 'EFI.CYL.1.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.1. Reconocer los beneficios fisiológicos y psicológicos directos del ejercicio físico sobre la salud e higiene.' },
  { id: '1.2.cyl', codigo: 'EFI.CYL.1.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.2. Consolidar hábitos de práctica física semanal continuada de manera autorregulada.' },
  { id: '2.1.cyl', codigo: 'EFI.CYL.2.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.1. Seleccionar y aplicar combinaciones de habilidades motrices básicas para resolver retos motores.' },
  { id: '2.2.cyl', codigo: 'EFI.CYL.2.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.2. Regular el esfuerzo motriz adaptando el control postural, la orientación espacial y el ritmo.' },
  { id: '3.1.cyl', codigo: 'EFI.CYL.3.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.1. Demostrar actitudes cooperativas e inclusivas en tareas grupales y juegos modificados.' },
  { id: '3.2.cyl', codigo: 'EFI.CYL.3.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.2. Resolver conflictos interpersonales mediante el diálogo activo y el respeto a las diferencias.' },
  { id: '4.1.cyl', codigo: 'EFI.CYL.4.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.1. Identificar y practicar juegos tradicionales de Castilla y León y de otras culturas.' },
  { id: '4.2.cyl', codigo: 'EFI.CYL.4.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.2. Crear composiciones expresivas corporales individuales o grupales.' },
  { id: '5.1.cyl', codigo: 'EFI.CYL.5.1', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.1. Orientarse y desplazarse con seguridad en espacios no habituales utilizando mapas sencillos o pistas.' },
  { id: '5.2.cyl', codigo: 'EFI.CYL.5.2', ciclo: 'Segundo Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.2. Desarrollar comportamientos responsables de residuo cero y conservación del espacio.' },
  { id: '1.1.cyl', codigo: 'EFI.CYL.1.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.1. Planificar y evaluar de manera guiada rutinas autónomas de actividad física integrada en un estilo de vida saludable.' },
  { id: '1.2.cyl', codigo: 'EFI.CYL.1.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.1', descripcion: '1.2. Identificar y prevenir riesgos posturales y de sobreesfuerzo durante las actividades físicas cotidianas.' },
  { id: '2.1.cyl', codigo: 'EFI.CYL.2.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.1. Adaptar las habilidades motrices específicas y combinadas en situaciones de juego deportivo, reto o expresión.' },
  { id: '2.2.cyl', codigo: 'EFI.CYL.2.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.2', descripcion: '2.2. Aplicar estrategias de anticipación, toma de decisiones e interpretación del espacio-tiempo.' },
  { id: '3.1.cyl', codigo: 'EFI.CYL.3.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.1. Liderar y participar en dinámicas colaborativas promoviendo la equidad de género y el juego limpio.' },
  { id: '3.2.cyl', codigo: 'EFI.CYL.3.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.3', descripcion: '3.2. Emplear herramientas de regulación emocional reflexivas ante situaciones de presión o competitividad.' },
  { id: '4.1.cyl', codigo: 'EFI.CYL.4.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.1. Valorar el origen e importancia cultural de los juegos y deportes autóctonos de Castilla y León.' },
  { id: '4.2.cyl', codigo: 'EFI.CYL.4.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.4', descripcion: '4.2. Elaborar producciones escénicas y dancísticas mostrando capacidad expresiva.' },
  { id: '5.1.cyl', codigo: 'EFI.CYL.5.1', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.1. Organizar y realizar actividades físicas sostenibles y seguras en el medio natural o urbano.' },
  { id: '5.2.cyl', codigo: 'EFI.CYL.5.2', ciclo: 'Tercer Ciclo', competenciaId: 'CE.EF.5', descripcion: '5.2. Analizar críticamente el impacto medioambiental derivado del uso recreativo y deportivo.' },
];

export const CRITERIOS_EVALUACION_CYL_ESO: CriterioEvaluacion[] = [
  { id: '1.1.1.cyl', codigo: 'ESO.CYL.1.1.1', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.1', descripcion: '1.1. Identificar los componentes de la condición física orientada a la salud.' },
  { id: '1.1.2.cyl', codigo: 'ESO.CYL.1.1.2', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.1', descripcion: '1.2. Aplicar sistemas básicos de calentamiento general e higiene postural antes y después de la práctica.' },
  { id: '1.2.1.cyl', codigo: 'ESO.CYL.1.2.1', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.2', descripcion: '2.1. Ejecutar habilidades motrices específicas en situaciones de oposición y/o cooperación con precisión.' },
  { id: '1.2.2.cyl', codigo: 'ESO.CYL.1.2.2', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.2', descripcion: '2.2. Aplicar soluciones tácticas básicas en juegos reducidos e iniciación deportiva.' },
  { id: '1.3.1.cyl', codigo: 'ESO.CYL.1.3.1', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.3', descripcion: '3.1. Mostrar respeto y empatía hacia los compañeros, rechazando cualquier discriminación.' },
  { id: '1.3.2.cyl', codigo: 'ESO.CYL.1.3.2', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.3', descripcion: '3.2. Respetar y acatar el reglamento arbitral en competiciones escolares.' },
  { id: '1.4.1.cyl', codigo: 'ESO.CYL.1.4.1', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.4', descripcion: '4.1. Conocer y practicar juegos y deportes tradicionales autóctonos de Castilla y León.' },
  { id: '1.4.2.cyl', codigo: 'ESO.CYL.1.4.2', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.4', descripcion: '4.2. Reproducir secuencias rítmicas y corporales básicas de forma coordinada.' },
  { id: '1.5.1.cyl', codigo: 'ESO.CYL.1.5.1', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.5', descripcion: '5.1. Realizar desplazamientos y carreras de orientación en el entorno escolar/urbano siguiendo un mapa.' },
  { id: '1.5.2.cyl', codigo: 'ESO.CYL.1.5.2', ciclo: '1º Ciclo ESO', cursoRef: '1º ESO', competenciaId: 'CE.EF.5', descripcion: '5.2. Aplicar protocolos elementales de prevención de riesgos en el medio natural.' },
  { id: '2.1.1.cyl', codigo: 'ESO.CYL.2.1.1', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.1', descripcion: '1.1. Diseñar y poner en práctica calentamientos específicos orientados al tipo de sesión motriz.' },
  { id: '2.1.2.cyl', codigo: 'ESO.CYL.2.1.2', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.1', descripcion: '1.2. Autoevaluar de forma guiada la intensidad del trabajo cardiovascular usando escalas de percepción e indicadores fisiológicos.' },
  { id: '2.2.1.cyl', codigo: 'ESO.CYL.2.2.1', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.2', descripcion: '2.1. Adaptar gestos técnicos y coordinativos en situaciones dinámicas no estandarizadas.' },
  { id: '2.2.2.cyl', codigo: 'ESO.CYL.2.2.2', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.2', descripcion: '2.2. Resolver problemas tácticos de ataque y defensa aplicando principios grupales de desmarque y cobertura.' },
  { id: '2.3.1.cyl', codigo: 'ESO.CYL.2.3.1', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.3', descripcion: '3.1. Favorecer activamente la integración e inclusión de todo el alumnado en los grupos de trabajo.' },
  { id: '2.3.2.cyl', codigo: 'ESO.CYL.2.3.2', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.3', descripcion: '3.2. Asumir con responsabilidad diferentes roles de organización y arbitraje en competiciones internas.' },
  { id: '2.4.1.cyl', codigo: 'ESO.CYL.2.4.1', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.4', descripcion: '4.1. Practicar bailes de salón, danzas tradicionales regionales y urbanas con adecuación rítmica.' },
  { id: '2.4.2.cyl', codigo: 'ESO.CYL.2.4.2', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.4', descripcion: '4.2. Analizar la evolución histórica de las modalidades deportivas locales e internacionales.' },
  { id: '2.5.1.cyl', codigo: 'ESO.CYL.2.5.1', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.5', descripcion: '5.1. Completar itinerarios en la naturaleza utilizando herramientas de orientación (brújula, GPS).' },
  { id: '2.5.2.cyl', codigo: 'ESO.CYL.2.5.2', ciclo: '1º Ciclo ESO', cursoRef: '2º ESO', competenciaId: 'CE.EF.5', descripcion: '5.2. Evaluar el impacto ambiental de las actividades físicas adoptando normas de residuo cero.' },
  { id: '3.1.1.cyl', codigo: 'ESO.CYL.3.1.1', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.1', descripcion: '1.1. Elaborar un plan sistemático personal de trabajo para la mejora de una capacidad física orientada a la salud.' },
  { id: '3.1.2.cyl', codigo: 'ESO.CYL.3.1.2', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.1', descripcion: '1.2. Analizar críticamente el impacto del consumo, ergonomía y mitos de la nutrición en el bienestar.' },
  { id: '3.2.1.cyl', codigo: 'ESO.CYL.3.2.1', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.2', descripcion: '2.1. Demostrar fluidez técnica en modalidades deportivas individuales, de raqueta o de equipo avanzadas.' },
  { id: '3.2.2.cyl', codigo: 'ESO.CYL.3.2.2', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.2', descripcion: '2.2. Crear y aplicar sistemas tácticos elaborados respondiendo a la lectura estratégica de los rivales.' },
  { id: '3.3.1.cyl', codigo: 'ESO.CYL.3.3.1', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.3', descripcion: '3.1. Prevenir, mediar y erradicar comportamientos violentos, antideportivos o machistas durante la práctica motriz.' },
  { id: '3.3.2.cyl', codigo: 'ESO.CYL.3.3.2', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.3', descripcion: '3.2. Dinamizar actividades colaborativas garantizando el liderazgo compartido y la cooperación activa.' },
  { id: '3.4.1.cyl', codigo: 'ESO.CYL.3.4.1', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.4', descripcion: '4.1. Crear montajes expresivos o coreográficos combinando distintas técnicas dancísticas, acrosport o mimo.' },
  { id: '3.4.2.cyl', codigo: 'ESO.CYL.3.4.2', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.4', descripcion: '4.2. Analizar el sesgo de género y la mercantilización en el deporte profesional y en los medios.' },
  { id: '3.5.1.cyl', codigo: 'ESO.CYL.3.5.1', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.5', descripcion: '5.1. Planificar recorridos en el medio natural contemplando previsiones meteorológicas y rutas alternativas.' },
  { id: '3.5.2.cyl', codigo: 'ESO.CYL.3.5.2', ciclo: '2º Ciclo ESO', cursoRef: '3º ESO', competenciaId: 'CE.EF.5', descripcion: '5.2. Aplicar técnicas básicas de auxilio en el medio natural y socorrismo básico escolar.' },
  { id: '4.1.1.cyl', codigo: 'ESO.CYL.4.1.1', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.1', descripcion: '1.1. Consolidar e integrar un programa autónomo de actividad física y salud basado en la autorregulación.' },
  { id: '4.1.2.cyl', codigo: 'ESO.CYL.4.1.2', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.1', descripcion: '1.2. Valorar la importancia de la actividad física como factor protector integral frente a enfermedades no transmisibles.' },
  { id: '4.2.1.cyl', codigo: 'ESO.CYL.4.2.1', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.2', descripcion: '2.1. Ejecutar proyectos motores complejos de tipo expresivo, deportivo o acrobático con alto grado de autonomía.' },
  { id: '4.2.2.cyl', codigo: 'ESO.CYL.4.2.2', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.2', descripcion: '2.2. Ajustar la toma de decisiones motrices ante situaciones imprevistas o variables con eficacia.' },
  { id: '4.3.1.cyl', codigo: 'ESO.CYL.4.3.1', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.3', descripcion: '3.1. Demostrar autonomía ética en la gestión de conflictos y en el fomento permanente del fair-play.' },
  { id: '4.3.2.cyl', codigo: 'ESO.CYL.4.3.2', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.3', descripcion: '3.2. Proyectar y gestionar eventos deportivo-recreativos inclusivos dirigidos a la comunidad escolar.' },
  { id: '4.4.1.cyl', codigo: 'ESO.CYL.4.4.1', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.4', descripcion: '4.1. Valorar de forma crítica las manifestaciones motrices como fenómeno socio-cultural y patrimonio inmaterial.' },
  { id: '4.4.2.cyl', codigo: 'ESO.CYL.4.4.2', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.4', descripcion: '4.2. Producir y presentar proyectos escénicos comunitarios vinculando movimiento, música y tecnología.' },
  { id: '4.5.1.cyl', codigo: 'ESO.CYL.4.5.1', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.5', descripcion: '5.1. Organizar de forma autónoma jornadas en la naturaleza minimizando la huella ecológica y gestionando riesgos.' },
  { id: '4.5.2.cyl', codigo: 'ESO.CYL.4.5.2', ciclo: '2º Ciclo ESO', cursoRef: '4º ESO', competenciaId: 'CE.EF.5', descripcion: '5.2. Promover la movilidad activa y sostenible en el diseño urbano y cotidiano.' },
];

export const SABERES_BASICOS_CYL_PRIMARIA: SaberBasico[] = [
  { codigo: 'EFI.CYL.1.A', bloque: 'A' as any, bloqueNombre: 'Salud física, mental y social', ciclo: 'Primer Ciclo', descripcion: 'Estilos de vida activos; educación postural y calentamiento; alimentación, hidratación e higiene corporal.' },
  { codigo: 'EFI.CYL.1.B', bloque: 'B' as any, bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Primer Ciclo', descripcion: 'Habilidades sociales, respeto y juego limpio; gestión de la frustración; resolución pacífica de conflictos.' },
  { codigo: 'EFI.CYL.1.C', bloque: 'C' as any, bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Primer Ciclo', descripcion: 'Vestimenta y calzado adecuado; normas de uso de material y espacios; percepción subjetiva del esfuerzo.' },
  { codigo: 'EFI.CYL.1.D', bloque: 'D' as any, bloqueNombre: 'Resolver situaciones motrices', ciclo: 'Primer Ciclo', descripcion: 'Esquema corporal, orientación y equilibrio; habilidades motrices básicas y específicas; principios tácticos elementales.' },
  { codigo: 'EFI.CYL.1.E', bloque: 'E' as any, bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Primer Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de CyL; expresión corporal, dramatización y danzas.' },
  { codigo: 'EFI.CYL.1.F', bloque: 'F' as any, bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Primer Ciclo', descripcion: 'Orientación básica y mapas; prevención de riesgos; movilidad sostenible y residuo cero.' },
  { codigo: 'EFI.CYL.2.A', bloque: 'A' as any, bloqueNombre: 'Salud física, mental y social', ciclo: 'Segundo Ciclo', descripcion: 'Estilos de vida activos; educación postural y calentamiento; alimentación, hidratación e higiene corporal.' },
  { codigo: 'EFI.CYL.2.B', bloque: 'B' as any, bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Segundo Ciclo', descripcion: 'Habilidades sociales, respeto y juego limpio; gestión de la frustración; resolución pacífica de conflictos.' },
  { codigo: 'EFI.CYL.2.C', bloque: 'C' as any, bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Segundo Ciclo', descripcion: 'Vestimenta y calzado adecuado; normas de uso de material y espacios; percepción subjetiva del esfuerzo.' },
  { codigo: 'EFI.CYL.2.D', bloque: 'D' as any, bloqueNombre: 'Resolver situaciones motrices', ciclo: 'Segundo Ciclo', descripcion: 'Esquema corporal, orientación y equilibrio; habilidades motrices básicas y específicas; principios tácticos elementales.' },
  { codigo: 'EFI.CYL.2.E', bloque: 'E' as any, bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Segundo Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de CyL; expresión corporal, dramatización y danzas.' },
  { codigo: 'EFI.CYL.2.F', bloque: 'F' as any, bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Segundo Ciclo', descripcion: 'Orientación básica y mapas; prevención de riesgos; movilidad sostenible y residuo cero.' },
  { codigo: 'EFI.CYL.3.A', bloque: 'A' as any, bloqueNombre: 'Salud física, mental y social', ciclo: 'Tercer Ciclo', descripcion: 'Estilos de vida activos; educación postural y calentamiento; alimentación, hidratación e higiene corporal.' },
  { codigo: 'EFI.CYL.3.B', bloque: 'B' as any, bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: 'Tercer Ciclo', descripcion: 'Habilidades sociales, respeto y juego limpio; gestión de la frustración; resolución pacífica de conflictos.' },
  { codigo: 'EFI.CYL.3.C', bloque: 'C' as any, bloqueNombre: 'Organización y gestión de la actividad física', ciclo: 'Tercer Ciclo', descripcion: 'Vestimenta y calzado adecuado; normas de uso de material y espacios; percepción subjetiva del esfuerzo.' },
  { codigo: 'EFI.CYL.3.D', bloque: 'D' as any, bloqueNombre: 'Resolver situaciones motrices', ciclo: 'Tercer Ciclo', descripcion: 'Esquema corporal, orientación y equilibrio; habilidades motrices básicas y específicas; principios tácticos elementales.' },
  { codigo: 'EFI.CYL.3.E', bloque: 'E' as any, bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: 'Tercer Ciclo', descripcion: 'Juegos populares, tradicionales y autóctonos de CyL; expresión corporal, dramatización y danzas.' },
  { codigo: 'EFI.CYL.3.F', bloque: 'F' as any, bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: 'Tercer Ciclo', descripcion: 'Orientación básica y mapas; prevención de riesgos; movilidad sostenible y residuo cero.' },
];

export const SABERES_BASICOS_CYL_ESO: SaberBasico[] = [
  { codigo: 'ESO.CYL.1.A', bloque: 'A' as any, bloqueNombre: 'Salud física, mental y social', ciclo: '1º Ciclo ESO', descripcion: 'Capacidades físicas condicionantes y coordinativas; nutrición deportiva, ergonomía y descanso; prevención de conductas adictivas.' },
  { codigo: 'ESO.CYL.1.B', bloque: 'B' as any, bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: '1º Ciclo ESO', descripcion: 'Cohesión de grupo y resolución dialógica de conflictos; coeducación y equidad de género; autogestión emocional.' },
  { codigo: 'ESO.CYL.1.C', bloque: 'C' as any, bloqueNombre: 'Organización y gestión de la actividad física', ciclo: '1º Ciclo ESO', descripcion: 'Sistemas de competición, liguillas y juzgamiento; primeros auxilios (P.A.S., R.C.P.); tecnología aplicada al deporte.' },
  { codigo: 'ESO.CYL.1.D', bloque: 'D' as any, bloqueNombre: 'Resolver situaciones motrices', ciclo: '1º Ciclo ESO', descripcion: 'Táctica deportiva individual y colectiva; reglamento técnico de modalidades deportivas; actividades acrobáticas y malabares.' },
  { codigo: 'ESO.CYL.1.E', bloque: 'E' as any, bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: '1º Ciclo ESO', descripcion: 'Danza contemporánea, urbana y bailes tradicionales; análisis del Deporte Espectáculo e inclusión paralímpica.' },
  { codigo: 'ESO.CYL.1.F', bloque: 'F' as any, bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: '1º Ciclo ESO', descripcion: 'Lectura de mapas y curvas de nivel; deportes de deslizamiento y senderismo; movilidad activa urbana.' },
  { codigo: 'ESO.CYL.2.A', bloque: 'A' as any, bloqueNombre: 'Salud física, mental y social', ciclo: '2º Ciclo ESO', descripcion: 'Capacidades físicas condicionantes y coordinativas; nutrición deportiva, ergonomía y descanso; prevención de conductas adictivas.' },
  { codigo: 'ESO.CYL.2.B', bloque: 'B' as any, bloqueNombre: 'Autorregulación emocional e interacción social', ciclo: '2º Ciclo ESO', descripcion: 'Cohesión de grupo y resolución dialógica de conflictos; coeducación y equidad de género; autogestión emocional.' },
  { codigo: 'ESO.CYL.2.C', bloque: 'C' as any, bloqueNombre: 'Organización y gestión de la actividad física', ciclo: '2º Ciclo ESO', descripcion: 'Sistemas de competición, liguillas y juzgamiento; primeros auxilios (P.A.S., R.C.P.); tecnología aplicada al deporte.' },
  { codigo: 'ESO.CYL.2.D', bloque: 'D' as any, bloqueNombre: 'Resolver situaciones motrices', ciclo: '2º Ciclo ESO', descripcion: 'Táctica deportiva individual y colectiva; reglamento técnico de modalidades deportivas; actividades acrobáticas y malabares.' },
  { codigo: 'ESO.CYL.2.E', bloque: 'E' as any, bloqueNombre: 'Manifestaciones de la cultura motriz', ciclo: '2º Ciclo ESO', descripcion: 'Danza contemporánea, urbana y bailes tradicionales; análisis del Deporte Espectáculo e inclusión paralímpica.' },
  { codigo: 'ESO.CYL.2.F', bloque: 'F' as any, bloqueNombre: 'Interacción eficiente y sostenible con el entorno', ciclo: '2º Ciclo ESO', descripcion: 'Lectura de mapas y curvas de nivel; deportes de deslizamiento y senderismo; movilidad activa urbana.' },
];
