import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const LEGISLACION_DIR = path.join(process.cwd(), 'src/data/legislacion');
const OUTPUT_DIR = path.join(process.cwd(), 'src/data');

const regionesToProcess = [
  { name: 'Galicia', community: 'Galicia', prefix: 'GALICIA', hasESO: true },
  { name: 'Valencia', community: 'Comunidad Valenciana', prefix: 'VALENCIA', hasESO: true },
  { name: 'Madrid', community: 'Comunidad de Madrid', prefix: 'MADRID', hasESO: true }
];

async function parsePdf(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

function extractCompetencias(text) {
  const competencias = [];
  const regex = /CE\.EF\.(\d+):\s*([\s\S]*?)(?=CE\.EF\.\d+:|3\.\s*CRITERIOS)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = match[1];
    const desc = match[2].trim().replace(/\s+/g, ' ');
    competencias.push({
      id: `CE.EF.${num}`,
      numero: parseInt(num),
      nombre: `Competencia Específica ${num}`,
      descripcion: desc
    });
  }
  return competencias;
}

function extractCriterios(text, isESO) {
  const criterios = [];
  const ciclos = isESO 
    ? [{name: '1º Ciclo ESO', prefix: 'PRIMER CICLO'}, {name: '2º Ciclo ESO', prefix: 'SEGUNDO CICLO'}, {name: 'Bachillerato', prefix: 'BACHILLERATO'}]
    : [{name: 'Primer Ciclo', prefix: 'PRIMER CICLO'}, {name: 'Segundo Ciclo', prefix: 'SEGUNDO CICLO'}, {name: 'Tercer Ciclo', prefix: 'TERCER CICLO'}];
  
  for (let i = 0; i < ciclos.length; i++) {
    const startStr = ciclos[i].prefix;
    const endStr = i + 1 < ciclos.length ? ciclos[i+1].prefix : '4. SABERES';
    
    const startIndex = text.indexOf(startStr);
    if (startIndex === -1) continue;
    let endIndex = text.indexOf(endStr, startIndex + startStr.length);
    if (endIndex === -1) endIndex = text.length;
    
    const chunk = text.substring(startIndex, endIndex);
    const regex = /(\d+)\.(\d+)\.\s*([\s\S]*?)(?=\d+\.\d+\.|$)/g;
    let match;
    while ((match = regex.exec(chunk)) !== null) {
      const compNum = match[1];
      const critNum = match[2];
      const desc = match[3].trim().replace(/\s+/g, ' ');
      // ignore anything that looks like a competency header in the chunk
      if (desc.startsWith('Integrar') || desc.startsWith('Comprender') || desc.length > 10) {
        criterios.push({
          id: `${compNum}.${critNum}`,
          codigo: `EFI.${compNum}.${critNum}`,
          ciclo: ciclos[i].name,
          competenciaId: `CE.EF.${compNum}`,
          descripcion: desc.replace(/^CE\.EF\.\d+\s*/, '')
        });
      }
    }
  }
  return criterios;
}

function extractSaberes(text, isESO) {
  const saberes = [];
  const bloques = [
    { id: 'A', name: 'Resolución de problemas en situaciones motrices', keys: ['Acciones individuales', 'Acciones de oposición', 'Acciones de cooperación', 'Acciones de colaboración-oposición', 'Acciones en el medio natural', 'Acciones artístico-expresivas'] },
    { id: 'B', name: 'Manifestaciones de la cultura motriz', keys: ['Bloque B'] },
    { id: 'C', name: 'Autorregulación emocional e interacción social', keys: ['Bloque C'] },
    { id: 'D', name: 'Interacción eficiente y sostenible con el entorno', keys: ['Bloque D'] },
    { id: 'E', name: 'Organización y gestión de la actividad física', keys: ['Bloque E'] },
    { id: 'F', name: 'Vida activa y saludable', keys: ['Bloque F'] }
  ];

  const startIndex = text.indexOf('4. SABERES');
  if (startIndex === -1) return saberes;
  const chunk = text.substring(startIndex);
  
  for (const bloque of bloques) {
    for (const key of bloque.keys) {
      const regex = new RegExp(`${key}.*?:\\s*([\\s\\S]*?)(?=${bloques.flatMap(b=>b.keys).filter(k=>k!==key).join('.*?:|')}.*?:|DIMENSIÓN|$)`, 'gi');
      let match = regex.exec(chunk);
      if (match) {
        const desc = match[1].trim().replace(/\s+/g, ' ');
        if (desc.length > 5) {
          saberes.push({
            codigo: `EFI.${isESO?'ESO':'PRI'}.${bloque.id}.${saberes.length + 1}`,
            bloque: bloque.id,
            bloqueNombre: bloque.name,
            ciclo: 'Todos',
            descripcion: desc
          });
        }
      }
    }
  }
  return saberes;
}

async function run() {
  for (const region of regionesToProcess) {
    const priPath = path.join(LEGISLACION_DIR, `Curriculo_Educacion_Fisica_Primaria_${region.name}.pdf`);
    const esoPath = path.join(LEGISLACION_DIR, `Curriculo_Educacion_Fisica_ESO_${region.name}.pdf`);
    
    let priText = await parsePdf(priPath);
    let esoText = region.hasESO ? await parsePdf(esoPath) : null;
    
    let out = `import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';\n\n`;
    out += `// ==========================================\n// ${region.community.toUpperCase()} - PRIMARIA\n// ==========================================\n`;
    
    if (priText) {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_PRIMARIA: CompetenciaEspecifica[] = ${JSON.stringify(extractCompetencias(priText), null, 2)};\n\n`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_PRIMARIA: CriterioEvaluacion[] = ${JSON.stringify(extractCriterios(priText, false), null, 2)};\n\n`;
      out += `export const SABERES_BASICOS_${region.prefix}_PRIMARIA: SaberBasico[] = ${JSON.stringify(extractSaberes(priText, false), null, 2)};\n\n`;
    }
    
    out += `// ==========================================\n// ${region.community.toUpperCase()} - ESO Y BACHILLERATO\n// ==========================================\n`;
    if (esoText) {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_ESO: CompetenciaEspecifica[] = ${JSON.stringify(extractCompetencias(esoText), null, 2)};\n\n`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_ESO: CriterioEvaluacion[] = ${JSON.stringify(extractCriterios(esoText, true), null, 2)};\n\n`;
      out += `export const SABERES_BASICOS_${region.prefix}_ESO: SaberBasico[] = ${JSON.stringify(extractSaberes(esoText, true), null, 2)};\n\n`;
    } else {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_ESO: CompetenciaEspecifica[] = [];\n\n`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_ESO: CriterioEvaluacion[] = [];\n\n`;
      out += `export const SABERES_BASICOS_${region.prefix}_ESO: SaberBasico[] = [];\n\n`;
    }
    
    fs.writeFileSync(path.join(OUTPUT_DIR, `curriculum${region.name}.ts`), out);
    console.log(`Generated curriculum${region.name}.ts`);
  }
}

run().catch(console.error);
