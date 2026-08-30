const fs = require('fs');
const path = require('path');
const pdfParseModule = require('pdf-parse');
const pdfParse = pdfParseModule.default || pdfParseModule;

const LEGISLACION_DIR = path.join(process.cwd(), 'src/data/legislacion');
const OUTPUT_DIR = path.join(process.cwd(), 'scripts', 'texts');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function run() {
  const files = fs.readdirSync(LEGISLACION_DIR).filter(f => f.endsWith('.pdf'));
  for (const f of files) {
    if (f === 'Curriculo_Educacion_Fisica_ESO_Galicia.pdf' || f === 'Curriculo_Educacion_Fisica_ESO_Valencia.pdf' || f === 'Curriculo_Educacion_Fisica_ESO_Madrid.pdf') {
      const p = path.join(LEGISLACION_DIR, f);
      const data = await pdfParse(fs.readFileSync(p));
      fs.writeFileSync(path.join(OUTPUT_DIR, f.replace('.pdf', '.txt')), data.text);
      console.log('Extracted', f);
    }
  }
}
run();
