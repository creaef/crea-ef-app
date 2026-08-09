import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

export const COMPETENCIAS_ESPECIFICAS_INFANTIL: CompetenciaEspecifica[] = [
  {
    id: 'CE.INF.1',
    numero: 1,
    nombre: 'Conciencia e imagen corporal',
    descripcion: 'Progresar en el conocimiento y control de su cuerpo y en la adquisición de distintas estrategias, adecuando sus acciones a la realidad del entorno de una manera segura, para construir una autoimagen ajustada y positiva.',
  },
  {
    id: 'CE.INF.2',
    numero: 2,
    nombre: 'Equilibrio, coordinación y movimiento',
    descripcion: 'Reconocer, manifestar y regular progresivamente sus emociones, expresando necesidades y sentimientos a través del cuerpo y el movimiento, para lograr bienestar emocional y seguridad afectiva.',
  },
  {
    id: 'CE.INF.3',
    numero: 3,
    nombre: 'Salud y autocuidado',
    descripcion: 'Adoptar modelos, normas y hábitos, desarrollando la confianza en sus posibilidades y sentimientos de logro, para promover un estilo de vida saludable y autónomo.',
  },
  {
    id: 'CE.INF.4',
    numero: 4,
    nombre: 'Interacción a través del juego motor',
    descripcion: 'Establecer interacciones sociales en condiciones de igualdad, valorando la importancia de la empatía y el respeto a través del juego libre y dirigido, participando en actividades colectivas.',
  }
];

export const CRITERIOS_EVALUACION_INFANTIL: CriterioEvaluacion[] = [
  {
    id: '1.1.INF',
    codigo: '1.1.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.1',
    descripcion: 'Identificar y nombrar las distintas partes del cuerpo, sus elementos y funciones en sí mismo y en los demás.',
  },
  {
    id: '1.2.INF',
    codigo: '1.2.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.1',
    descripcion: 'Ajustar el tono, la postura y el equilibrio a las características del objeto, del otro, de la acción y de la situación.',
  },
  {
    id: '2.1.INF',
    codigo: '2.1.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.2',
    descripcion: 'Participar activamente en juegos de movimiento, mostrando habilidades de coordinación, equilibrio y orientación espacial.',
  },
  {
    id: '2.2.INF',
    codigo: '2.2.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.2',
    descripcion: 'Expresar necesidades, sentimientos y emociones a través del cuerpo, el gesto y el movimiento.',
  },
  {
    id: '3.1.INF',
    codigo: '3.1.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.3',
    descripcion: 'Mostrar progresiva autonomía en las rutinas de higiene corporal, alimentación y descanso, valorando su importancia para la salud.',
  },
  {
    id: '3.2.INF',
    codigo: '3.2.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.3',
    descripcion: 'Identificar situaciones de riesgo en el entorno lúdico y motor, y tomar precauciones para evitar accidentes.',
  },
  {
    id: '4.1.INF',
    codigo: '4.1.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.4',
    descripcion: 'Participar en el juego motor, interactuando con otros niños y niñas, respetando las normas y roles establecidos.',
  },
  {
    id: '4.2.INF',
    codigo: '4.2.INF',
    ciclo: 'Infantil',
    competenciaId: 'CE.INF.4',
    descripcion: 'Mostrar actitudes de ayuda, colaboración y respeto hacia los demás en actividades psicomotrices colectivas.',
  }
];

export const SABERES_BASICOS_INFANTIL: SaberBasico[] = [
  {
    codigo: 'INF.A.1',
    bloque: 'A',
    bloqueNombre: 'El cuerpo y el control de sí mismo',
    ciclo: 'Infantil',
    descripcion: 'El esquema corporal. Imagen global y segmentaria. Elementos, características y funciones.',
  },
  {
    codigo: 'INF.A.2',
    bloque: 'A',
    bloqueNombre: 'El cuerpo y el control de sí mismo',
    ciclo: 'Infantil',
    descripcion: 'Tono, postura y equilibrio. Coordinación motriz y control de los desplazamientos.',
  },
  {
    codigo: 'INF.B.1',
    bloque: 'B',
    bloqueNombre: 'El juego y la expresión',
    ciclo: 'Infantil',
    descripcion: 'El juego como actividad principal. Juegos motores, simbólicos y tradicionales.',
  },
  {
    codigo: 'INF.B.2',
    bloque: 'B',
    bloqueNombre: 'El juego y la expresión',
    ciclo: 'Infantil',
    descripcion: 'Expresión corporal, musical y dramatización. Exploración de las posibilidades motrices.',
  },
  {
    codigo: 'INF.C.1',
    bloque: 'C',
    bloqueNombre: 'Hábitos de vida saludable',
    ciclo: 'Infantil',
    descripcion: 'Necesidades básicas del cuerpo (higiene, alimentación, descanso y actividad física).',
  },
  {
    codigo: 'INF.C.2',
    bloque: 'C',
    bloqueNombre: 'Hábitos de vida saludable',
    ciclo: 'Infantil',
    descripcion: 'Normas de seguridad y prevención de accidentes en el entorno escolar y durante el juego.',
  }
];
