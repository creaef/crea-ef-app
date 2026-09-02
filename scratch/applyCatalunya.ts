import fs from 'fs';

function filterValidCE(list) {
  return list.filter(ce => ce.id && ce.numero && ce.nombre && ce.descripcion);
}
function filterValidCrit(list) {
  return list.filter(c => c.id && c.codigo && c.ciclo && c.competenciaId && c.descripcion);
}
function filterValidSaberes(list) {
  return list.filter(s => s.codigo && s.bloque && s.bloqueNombre && s.ciclo && s.descripcion);
}

const catPrim = JSON.parse(fs.readFileSync('scratch/cat_prim.json', 'utf-8'));

let tsContent = `import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';
import { COMPETENCIAS_ESPECIFICAS_ESO, CRITERIOS_EVALUACION_ESO, SABERES_BASICOS_ESO } from './curriculumESO';
import { COMPETENCIAS_ESPECIFICAS_BACHILLERATO, CRITERIOS_EVALUACION_BACHILLERATO, SABERES_BASICOS_BACHILLERATO } from './curriculumBachillerato';

// ==========================================
// CATALUNYA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_CATALUNYA_PRIMARIA: CompetenciaEspecifica[] = ${JSON.stringify(filterValidCE(catPrim.competenciasEspecificas), null, 2)};

export const CRITERIOS_EVALUACION_CATALUNYA_PRIMARIA: CriterioEvaluacion[] = ${JSON.stringify(filterValidCrit(catPrim.criteriosEvaluacion), null, 2)};

export const SABERES_BASICOS_CATALUNYA_PRIMARIA: SaberBasico[] = ${JSON.stringify(filterValidSaberes(catPrim.saberesBasicos), null, 2)};

// ==========================================
// CATALUNYA - ESO Y BACHILLERATO (Real Decreto)
// ==========================================
// Según las indicaciones, se mantiene el currículo del Real Decreto para Secundaria y Bachillerato.
export const COMPETENCIAS_ESPECIFICAS_CATALUNYA_ESO = COMPETENCIAS_ESPECIFICAS_ESO;
export const CRITERIOS_EVALUACION_CATALUNYA_ESO = CRITERIOS_EVALUACION_ESO;
export const SABERES_BASICOS_CATALUNYA_ESO = SABERES_BASICOS_ESO;
`;

fs.writeFileSync('src/data/curriculumCatalunya.ts', tsContent, 'utf-8');
console.log('Updated src/data/curriculumCatalunya.ts');
