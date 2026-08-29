const fs = require('fs');
const path = require('path');
const pdfParseModule = require('pdf-parse');
const pdfParse = pdfParseModule.default || pdfParseModule;

const LEGISLACION_DIR = path.join(process.cwd(), 'src/data/legislacion');
const OUTPUT_DIR = path.join(process.cwd(), 'src/data');

async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

function generateTsFile(region, data) {
  let content = `// Generado automáticamente a partir de los documentos oficiales\n`;
  content += `import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';\n\n`;

  content += `export const COMPETENCIAS_ESPECIFICAS_${region}: CompetenciaEspecifica[] = [\n`;
  for (const ce of data.competencias) {
    content += `  { id: '${ce.id}', numero: ${ce.numero}, nombre: '${ce.nombre.replace(/'/g, "\\'")}', descripcion: '${ce.descripcion.replace(/'/g, "\\'")}' },\n`;
  }
  content += `];\n\n`;

  content += `export const CRITERIOS_EVALUACION_${region}: CriterioEvaluacion[] = [\n`;
  for (const cr of data.criterios) {
    content += `  { id: '${cr.id}', codigo: '${cr.codigo}', ciclo: '${cr.ciclo}' as any, competenciaId: '${cr.competenciaId}', descripcion: '${cr.descripcion.replace(/'/g, "\\'")}' },\n`;
  }
  content += `];\n\n`;

  content += `export const SABERES_BASICOS_${region}: SaberBasico[] = [\n`;
  for (const sb of data.saberes) {
    content += `  { codigo: '${sb.codigo}', bloque: '${sb.bloque}' as any, bloqueNombre: '${sb.bloqueNombre.replace(/'/g, "\\'")}', ciclo: '${sb.ciclo}' as any, descripcion: '${sb.descripcion.replace(/'/g, "\\'")}' },\n`;
  }
  content += `];\n\n`;

  return content;
}

async function processRegion(filename, regionCode) {
  const text = await parsePdf(path.join(LEGISLACION_DIR, filename));
  
  const competencias = [];
  const ceMatches = [...text.matchAll(/CE\.?EF\.?(\d+):?\s*([^]+?)(?=CE\.?EF\.?\d+:?|3\. CRITERIOS|CRIT\.|PRIMER|SEGUNDO|TERCER|Bloque|CE1|CE2|CE3|CE4|CE5|SABERES|4\.)/gi)];
  for (const m of ceMatches) {
    let desc = m[2].replace(/\n/g, ' ').trim();
    competencias.push({
      id: `CE.EF.${m[1]}`,
      numero: parseInt(m[1]),
      nombre: `Competencia ${m[1]}`,
      descripcion: desc
    });
  }

  const criterios = [];
  const critMatches = [...text.matchAll(/Crit\.?(?:EF\.)?(\d+)\.(\d+)\.?(\d+)?\.?\s*([^]+?)(?=Crit\.|CE\.EF|SEGUNDO CICLO|TERCER CICLO|4\. SABERES|Bloque|Saberes|1\.|2\.|3\.|4\.|5\.)/gi)];
  for (const m of critMatches) {
    let cicloNum = parseInt(m[1]);
    let compNum = parseInt(m[2]);
    let itemNum = m[3] ? parseInt(m[3]) : 1;
    
    let cicloStr = cicloNum === 1 ? 'Primer Ciclo' : (cicloNum === 2 ? 'Segundo Ciclo' : 'Tercer Ciclo');
    if (regionCode.includes('ESO')) {
       cicloStr = cicloNum === 1 || cicloNum === 2 || cicloNum === 3 ? '1º Ciclo ESO' : '2º Ciclo ESO';
    }

    criterios.push({
      id: `${cicloNum}.${compNum}.${itemNum}`,
      codigo: `EFI.${cicloNum}.${compNum}.${itemNum}`,
      ciclo: cicloStr,
      competenciaId: `CE.EF.${compNum}`, 
      descripcion: m[4].replace(/\n/g, ' ').trim()
    });
  }

  const saberes = [];
  let currentBloque = '';
  let currentBloqueName = '';
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('Bloque ') || line.match(/^[A-F]\./)) {
      const match = line.match(/(?:Bloque |)([A-F])[.:]\s*(.*)/);
      if (match) {
        currentBloque = match[1];
        currentBloqueName = match[2];
      }
    } else if (line.match(/(Primer|Segundo|Tercer) Ciclo:/) || line.match(/(1\.º|2\.º|3\.º|4\.º) ESO/)) {
      const match = line.match(/(Primer|Segundo|Tercer|1\.º|2\.º|3\.º|4\.º) (?:Ciclo|ESO):?\s*(.*)/);
      if (match) {
        let cicloStr = match[1] + (match[1].includes('Ciclo') ? '' : (regionCode.includes('ESO') ? ' ESO' : ' Ciclo'));
        if (cicloStr === '1.º ESO' || cicloStr === '2.º ESO' || cicloStr === '3.º ESO') cicloStr = '1º Ciclo ESO';
        if (cicloStr === '4.º ESO') cicloStr = '2º Ciclo ESO';

        let desc = match[2];
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().match(/(Primer|Segundo|Tercer) Ciclo:/) && !lines[j].trim().startsWith('Bloque ') && !lines[j].trim().match(/^[A-F]\./) && !lines[j].trim().match(/(1\.º|2\.º|3\.º|4\.º) ESO/)) {
          desc += ' ' + lines[j].trim();
          j++;
        }
        saberes.push({
          codigo: `EFI.${currentBloque}.1`,
          bloque: currentBloque || 'A',
          bloqueNombre: currentBloqueName || 'Bloque',
          ciclo: cicloStr.replace('1.º', '1º').replace('2.º', '2º').replace('3.º', '3º').replace('4.º', '4º'),
          descripcion: desc.trim()
        });
      }
    }
  }

  const tsContent = generateTsFile(regionCode, { competencias, criterios, saberes });
  fs.writeFileSync(path.join(OUTPUT_DIR, `curriculum${regionCode.replace(/_/g, '')}.ts`), tsContent);
  console.log(`${regionCode} done`);
}

async function run() {
  try {
    await processRegion('Curriculo_Educacion_Fisica_Primaria_CLM.pdf', 'CLM_PRIMARIA');
    await processRegion('Curriculo_Educacion_Fisica_ESO_CLM.pdf', 'CLM_ESO');
    await processRegion('Curriculo_Educacion_Fisica_Primaria_Extremadura.pdf', 'EXTREMADURA_PRIMARIA');
    await processRegion('Curriculo_Educacion_Fisica_ESO_Extremadura.pdf', 'EXTREMADURA_ESO');
    await processRegion('Curriculo_Educacion_Fisica_Murcia_Primaria.pdf', 'MURCIA_PRIMARIA');
  } catch (e) {
    console.error(e);
  }
}

run();
