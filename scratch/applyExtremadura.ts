import fs from 'fs';
import path from 'path';

function filterValidCE(list) {
  return list.filter(ce => ce.id && ce.numero && ce.nombre && ce.descripcion);
}
function filterValidCrit(list) {
  return list.filter(c => c.id && c.codigo && c.ciclo && c.competenciaId && c.descripcion);
}
function filterValidSaberes(list) {
  return list.filter(s => s.codigo && s.bloque && s.bloqueNombre && s.ciclo && s.descripcion);
}

const extPrim = JSON.parse(fs.readFileSync('scratch/ext_prim.json', 'utf-8'));
const extEso = JSON.parse(fs.readFileSync('scratch/ext_eso.json', 'utf-8'));

let tsContent = `import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

// ==========================================
// EXTREMADURA - PRIMARIA
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_EXTREMADURA_PRIMARIA: CompetenciaEspecifica[] = ${JSON.stringify(filterValidCE(extPrim.competenciasEspecificas), null, 2)};

export const CRITERIOS_EVALUACION_EXTREMADURA_PRIMARIA: CriterioEvaluacion[] = ${JSON.stringify(filterValidCrit(extPrim.criteriosEvaluacion), null, 2)};

export const SABERES_BASICOS_EXTREMADURA_PRIMARIA: SaberBasico[] = ${JSON.stringify(filterValidSaberes(extPrim.saberesBasicos), null, 2)};

// ==========================================
// EXTREMADURA - ESO Y BACHILLERATO
// ==========================================
export const COMPETENCIAS_ESPECIFICAS_EXTREMADURA_ESO: CompetenciaEspecifica[] = ${JSON.stringify(filterValidCE(extEso.competenciasEspecificas), null, 2)};

export const CRITERIOS_EVALUACION_EXTREMADURA_ESO: CriterioEvaluacion[] = ${JSON.stringify(filterValidCrit(extEso.criteriosEvaluacion), null, 2)};

export const SABERES_BASICOS_EXTREMADURA_ESO: SaberBasico[] = ${JSON.stringify(filterValidSaberes(extEso.saberesBasicos), null, 2)};
`;

fs.writeFileSync('src/data/curriculumExtremadura.ts', tsContent, 'utf-8');
console.log('Updated src/data/curriculumExtremadura.ts');
