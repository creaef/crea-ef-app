import { getCriteriosByEtapa } from './src/utils/curriculumHelpers';

const crit = getCriteriosByEtapa('Primaria', 'Castilla y León');
console.log('Total criterios para CyL Primaria:', crit.length);

const primerCiclo = crit.filter(c => c.ciclo === 'Primer Ciclo');
console.log('Total criterios para Primer Ciclo:', primerCiclo.length);

// Count how many have cursoRef = '1º Primaria'
const primero = crit.filter(c => c.cursoRef === '1º Primaria');
console.log('Total criterios para 1º Primaria:', primero.length);
