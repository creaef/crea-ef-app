const fs = require('fs');
const path = require('path');
const pdfParseModule = require('pdf-parse');
let pdfParse = pdfParseModule.default || pdfParseModule;
if (typeof pdfParse !== 'function' && typeof pdfParseModule === 'function') {
  pdfParse = pdfParseModule;
}

async function extract() {
  const files = [
    { name: 'Extremadura Primaria', in: 'src/data/legislacion/Curriculo_Educacion_Fisica_Primaria_Extremadura.pdf', out: 'scratch/ext_prim.txt' },
    { name: 'Extremadura ESO', in: 'src/data/legislacion/Curriculo_Educacion_Fisica_ESO_Extremadura.pdf', out: 'scratch/ext_eso.txt' },
    { name: 'Catalunya Primaria', in: 'src/data/legislacion/Curriculo_Educacion_Fisica_Primaria_Catalunya.pdf', out: 'scratch/cat_prim.txt' }
  ];

  for (const file of files) {
    if (fs.existsSync(file.in)) {
      try {
        const buffer = fs.readFileSync(file.in);
        const parser = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;
        const data = await parser(buffer);
        fs.writeFileSync(file.out, data.text);
        console.log(`Successfully extracted ${file.name} to ${file.out}`);
      } catch (e) {
        console.error(`Error parsing ${file.name}:`, e);
      }
    } else {
      console.error(`File not found: ${file.in}`);
    }
  }
}

extract();
