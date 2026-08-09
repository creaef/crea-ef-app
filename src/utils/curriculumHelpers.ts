import { EtapaEducativa, CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';
import { COMPETENCIAS_ESPECIFICAS_EF, CRITERIOS_EVALUACION_EF, SABERES_BASICOS_EF } from '../data/curriculumData';
import { COMPETENCIAS_ESPECIFICAS_INFANTIL, CRITERIOS_EVALUACION_INFANTIL, SABERES_BASICOS_INFANTIL } from '../data/curriculumInfantil';
import { COMPETENCIAS_ESPECIFICAS_ESO, CRITERIOS_EVALUACION_ESO, SABERES_BASICOS_ESO } from '../data/curriculumESO';
import { COMPETENCIAS_ESPECIFICAS_BACHILLERATO, CRITERIOS_EVALUACION_BACHILLERATO, SABERES_BASICOS_BACHILLERATO } from '../data/curriculumBachillerato';

export function getCompetenciasByEtapa(etapa: EtapaEducativa): CompetenciaEspecifica[] {
  switch (etapa) {
    case 'Infantil': return COMPETENCIAS_ESPECIFICAS_INFANTIL;
    case 'ESO': return COMPETENCIAS_ESPECIFICAS_ESO;
    case 'Bachillerato': return COMPETENCIAS_ESPECIFICAS_BACHILLERATO;
    default: return COMPETENCIAS_ESPECIFICAS_EF;
  }
}

export function getCriteriosByEtapa(etapa: EtapaEducativa): CriterioEvaluacion[] {
  switch (etapa) {
    case 'Infantil': return CRITERIOS_EVALUACION_INFANTIL;
    case 'ESO': return CRITERIOS_EVALUACION_ESO;
    case 'Bachillerato': return CRITERIOS_EVALUACION_BACHILLERATO;
    default: return CRITERIOS_EVALUACION_EF;
  }
}

export function getSaberesByEtapa(etapa: EtapaEducativa): SaberBasico[] {
  switch (etapa) {
    case 'Infantil': return SABERES_BASICOS_INFANTIL;
    case 'ESO': return SABERES_BASICOS_ESO;
    case 'Bachillerato': return SABERES_BASICOS_BACHILLERATO;
    default: return SABERES_BASICOS_EF;
  }
}

// Para utilidades genéricas donde no sabemos la etapa y buscamos por ID,
// podemos unificarlas todas en tiempo de ejecución.
export const TODAS_LAS_COMPETENCIAS = [
  ...COMPETENCIAS_ESPECIFICAS_EF,
  ...COMPETENCIAS_ESPECIFICAS_INFANTIL,
  ...COMPETENCIAS_ESPECIFICAS_ESO,
  ...COMPETENCIAS_ESPECIFICAS_BACHILLERATO
];

export const TODOS_LOS_CRITERIOS = [
  ...CRITERIOS_EVALUACION_EF,
  ...CRITERIOS_EVALUACION_INFANTIL,
  ...CRITERIOS_EVALUACION_ESO,
  ...CRITERIOS_EVALUACION_BACHILLERATO
];

export const TODOS_LOS_SABERES = [
  ...SABERES_BASICOS_EF,
  ...SABERES_BASICOS_INFANTIL,
  ...SABERES_BASICOS_ESO,
  ...SABERES_BASICOS_BACHILLERATO
];
