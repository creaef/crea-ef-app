import { EtapaEducativa, ComunidadAutonoma, CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';
import { COMPETENCIAS_ESPECIFICAS_EF, CRITERIOS_EVALUACION_EF, SABERES_BASICOS_EF } from '../data/curriculumData';
import { COMPETENCIAS_ESPECIFICAS_INFANTIL, CRITERIOS_EVALUACION_INFANTIL, SABERES_BASICOS_INFANTIL } from '../data/curriculumInfantil';
import { COMPETENCIAS_ESPECIFICAS_ESO, CRITERIOS_EVALUACION_ESO, SABERES_BASICOS_ESO } from '../data/curriculumESO';
import { COMPETENCIAS_ESPECIFICAS_BACHILLERATO, CRITERIOS_EVALUACION_BACHILLERATO, SABERES_BASICOS_BACHILLERATO } from '../data/curriculumBachillerato';
import { 
  COMPETENCIAS_ESPECIFICAS_CYL_PRIMARIA, 
  COMPETENCIAS_ESPECIFICAS_CYL_ESO,
  CRITERIOS_EVALUACION_CYL_PRIMARIA,
  CRITERIOS_EVALUACION_CYL_ESO,
  SABERES_BASICOS_CYL_PRIMARIA,
  SABERES_BASICOS_CYL_ESO 
} from '../data/curriculumCyL';

import {
  COMPETENCIAS_ESPECIFICAS_CLM_PRIMARIA, COMPETENCIAS_ESPECIFICAS_CLM_ESO,
  CRITERIOS_EVALUACION_CLM_PRIMARIA, CRITERIOS_EVALUACION_CLM_ESO,
  SABERES_BASICOS_CLM_PRIMARIA, SABERES_BASICOS_CLM_ESO
} from '../data/curriculumCLM';

import {
  COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA, COMPETENCIAS_ESPECIFICAS_EXTREMADURA_ESO,
  CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA, CRITERIOS_EVALUACION_EXTREMADURA_ESO,
  SABERES_BASICOS_EXTREMADURA_PRIMARIA, SABERES_BASICOS_EXTREMADURA_ESO
} from '../data/curriculumExtremadura';

import {
  COMPETENCIAS_ESPECIFICAS_MURCIA_PRIMARIA,
  CRITERIOS_EVALUACION_MURCIA_PRIMARIA,
  SABERES_BASICOS_MURCIA_PRIMARIA
} from '../data/curriculumMurcia';

export function getCompetenciasByEtapa(etapa: EtapaEducativa, comunidad: ComunidadAutonoma = 'Andalucía'): CompetenciaEspecifica[] {
  if (comunidad === 'Castilla y León') {
    switch (etapa) {
      case 'Primaria': return COMPETENCIAS_ESPECIFICAS_CYL_PRIMARIA;
      case 'ESO': return COMPETENCIAS_ESPECIFICAS_CYL_ESO;
      default: return COMPETENCIAS_ESPECIFICAS_CYL_PRIMARIA; 
    }
  }
  if (comunidad === 'Castilla-La Mancha') {
    switch (etapa) {
      case 'Primaria': return COMPETENCIAS_ESPECIFICAS_CLM_PRIMARIA;
      case 'ESO': return COMPETENCIAS_ESPECIFICAS_CLM_ESO;
      default: return COMPETENCIAS_ESPECIFICAS_CLM_PRIMARIA;
    }
  }
  if (comunidad === 'Extremadura') {
    switch (etapa) {
      case 'Primaria': return COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA;
      case 'ESO': return COMPETENCIAS_ESPECIFICAS_EXTREMADURA_ESO;
      default: return COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA;
    }
  }
  if (comunidad === 'Región de Murcia') {
    return COMPETENCIAS_ESPECIFICAS_MURCIA_PRIMARIA; // Solo Primaria de momento
  }

  // Andalucía (Fallback)
  switch (etapa) {
    case 'Infantil': return COMPETENCIAS_ESPECIFICAS_INFANTIL;
    case 'ESO': return COMPETENCIAS_ESPECIFICAS_ESO;
    case 'Bachillerato': return COMPETENCIAS_ESPECIFICAS_BACHILLERATO;
    default: return COMPETENCIAS_ESPECIFICAS_EF;
  }
}

export function getCriteriosByEtapa(etapa: EtapaEducativa, comunidad: ComunidadAutonoma = 'Andalucía'): CriterioEvaluacion[] {
  if (comunidad === 'Castilla y León') {
    switch (etapa) {
      case 'Primaria': return CRITERIOS_EVALUACION_CYL_PRIMARIA;
      case 'ESO': return CRITERIOS_EVALUACION_CYL_ESO;
      default: return CRITERIOS_EVALUACION_CYL_PRIMARIA;
    }
  }
  if (comunidad === 'Castilla-La Mancha') {
    switch (etapa) {
      case 'Primaria': return CRITERIOS_EVALUACION_CLM_PRIMARIA;
      case 'ESO': return CRITERIOS_EVALUACION_CLM_ESO;
      default: return CRITERIOS_EVALUACION_CLM_PRIMARIA;
    }
  }
  if (comunidad === 'Extremadura') {
    switch (etapa) {
      case 'Primaria': return CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA;
      case 'ESO': return CRITERIOS_EVALUACION_EXTREMADURA_ESO;
      default: return CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA;
    }
  }
  if (comunidad === 'Región de Murcia') {
    return CRITERIOS_EVALUACION_MURCIA_PRIMARIA;
  }

  switch (etapa) {
    case 'Infantil': return CRITERIOS_EVALUACION_INFANTIL;
    case 'ESO': return CRITERIOS_EVALUACION_ESO;
    case 'Bachillerato': return CRITERIOS_EVALUACION_BACHILLERATO;
    default: return CRITERIOS_EVALUACION_EF;
  }
}

export function getSaberesByEtapa(etapa: EtapaEducativa, comunidad: ComunidadAutonoma = 'Andalucía'): SaberBasico[] {
  if (comunidad === 'Castilla y León') {
    switch (etapa) {
      case 'Primaria': return SABERES_BASICOS_CYL_PRIMARIA;
      case 'ESO': return SABERES_BASICOS_CYL_ESO;
      default: return SABERES_BASICOS_CYL_PRIMARIA;
    }
  }
  if (comunidad === 'Castilla-La Mancha') {
    switch (etapa) {
      case 'Primaria': return SABERES_BASICOS_CLM_PRIMARIA;
      case 'ESO': return SABERES_BASICOS_CLM_ESO;
      default: return SABERES_BASICOS_CLM_PRIMARIA;
    }
  }
  if (comunidad === 'Extremadura') {
    switch (etapa) {
      case 'Primaria': return SABERES_BASICOS_EXTREMADURA_PRIMARIA;
      case 'ESO': return SABERES_BASICOS_EXTREMADURA_ESO;
      default: return SABERES_BASICOS_EXTREMADURA_PRIMARIA;
    }
  }
  if (comunidad === 'Región de Murcia') {
    return SABERES_BASICOS_MURCIA_PRIMARIA;
  }

  switch (etapa) {
    case 'Infantil': return SABERES_BASICOS_INFANTIL;
    case 'ESO': return SABERES_BASICOS_ESO;
    case 'Bachillerato': return SABERES_BASICOS_BACHILLERATO;
    default: return SABERES_BASICOS_EF;
  }
}

// Para utilidades genéricas donde no sabemos la etapa y buscamos por ID,
// unificamos todas en tiempo de ejecución.
export const TODAS_LAS_COMPETENCIAS = [
  ...COMPETENCIAS_ESPECIFICAS_EF,
  ...COMPETENCIAS_ESPECIFICAS_INFANTIL,
  ...COMPETENCIAS_ESPECIFICAS_ESO,
  ...COMPETENCIAS_ESPECIFICAS_BACHILLERATO,
  ...COMPETENCIAS_ESPECIFICAS_CYL_PRIMARIA,
  ...COMPETENCIAS_ESPECIFICAS_CYL_ESO,
  ...COMPETENCIAS_ESPECIFICAS_CLM_PRIMARIA,
  ...COMPETENCIAS_ESPECIFICAS_CLM_ESO,
  ...COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA,
  ...COMPETENCIAS_ESPECIFICAS_EXTREMADURA_ESO,
  ...COMPETENCIAS_ESPECIFICAS_MURCIA_PRIMARIA
];

export const TODOS_LOS_CRITERIOS = [
  ...CRITERIOS_EVALUACION_EF,
  ...CRITERIOS_EVALUACION_INFANTIL,
  ...CRITERIOS_EVALUACION_ESO,
  ...CRITERIOS_EVALUACION_BACHILLERATO,
  ...CRITERIOS_EVALUACION_CYL_PRIMARIA,
  ...CRITERIOS_EVALUACION_CYL_ESO,
  ...CRITERIOS_EVALUACION_CLM_PRIMARIA,
  ...CRITERIOS_EVALUACION_CLM_ESO,
  ...CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA,
  ...CRITERIOS_EVALUACION_EXTREMADURA_ESO,
  ...CRITERIOS_EVALUACION_MURCIA_PRIMARIA
];

export const TODOS_LOS_SABERES = [
  ...SABERES_BASICOS_EF,
  ...SABERES_BASICOS_INFANTIL,
  ...SABERES_BASICOS_ESO,
  ...SABERES_BASICOS_BACHILLERATO,
  ...SABERES_BASICOS_CYL_PRIMARIA,
  ...SABERES_BASICOS_CYL_ESO,
  ...SABERES_BASICOS_CLM_PRIMARIA,
  ...SABERES_BASICOS_CLM_ESO,
  ...SABERES_BASICOS_EXTREMADURA_PRIMARIA,
  ...SABERES_BASICOS_EXTREMADURA_ESO,
  ...SABERES_BASICOS_MURCIA_PRIMARIA
];
