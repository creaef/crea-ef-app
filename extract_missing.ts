import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const pdfParse = require('pdf-parse');
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const LEGISLACION_DIR = 'c:/Users/Familia/Desktop/APP DE JAP CON DOCUMENTOS TOP/crea-ef-app/src/data/legislacion';
const OUTPUT_DIR = 'C:/Users/Familia/.gemini/antigravity-ide/brain/f7f4ba63-c714-450f-8629-029a0720f1fb/scratch';

async function parsePdf(filePath: string) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function extractJSON(prompt: string, text: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `${prompt}\n\nDOCUMENT TEXT:\n${text}`,
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
    }
  });
  return response.text;
}

async function main() {
  try {
    console.log('Extracting Valencia ESO Criterios...');
    const valenciaESO = await parsePdf(path.join(LEGISLACION_DIR, 'Curriculo_Educacion_Fisica_ESO_Valencia.pdf'));
    const valenciaESOCrit = await extractJSON(
      `Extract all "Criterios de Evaluación" for Educación Física from the provided curriculum text for ESO.
      Format the output as a JSON array of objects with the following keys:
      "id": string (e.g. "1.1"),
      "codigo": string (e.g. "EFI.1.1"),
      "ciclo": string (either "1º Ciclo ESO" or "2º Ciclo ESO"),
      "competenciaId": string (e.g. "CE.EF.1"),
      "descripcion": string`,
      valenciaESO
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, 'valencia_eso_crit.json'), valenciaESOCrit || '[]');
    console.log('Valencia ESO Criterios done.');

    console.log('Extracting Madrid ESO Criterios and Saberes...');
    const madridESO = await parsePdf(path.join(LEGISLACION_DIR, 'Curriculo_Educacion_Fisica_ESO_Madrid.pdf'));
    const madridESOCrit = await extractJSON(
      `Extract all "Criterios de Evaluación" for Educación Física from the provided curriculum text for ESO.
      Format the output as a JSON array of objects with the following keys:
      "id": string (e.g. "1.1"),
      "codigo": string (e.g. "EFI.1.1"),
      "ciclo": string (either "1º Ciclo ESO" or "2º Ciclo ESO" or "Bachillerato" if applicable),
      "competenciaId": string (e.g. "CE.EF.1"),
      "descripcion": string`,
      madridESO
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, 'madrid_eso_crit.json'), madridESOCrit || '[]');
    
    const madridESOSab = await extractJSON(
      `Extract all "Saberes Básicos" for Educación Física from the provided curriculum text for ESO.
      Format the output as a JSON array of objects with the following keys:
      "codigo": string (e.g. "EFI.ESO.B.1"),
      "bloque": string (e.g. "B"),
      "bloqueNombre": string (e.g. "Manifestaciones de la cultura motriz"),
      "ciclo": string (e.g. "Todos", "1º Ciclo ESO", or "2º Ciclo ESO"),
      "descripcion": string`,
      madridESO
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, 'madrid_eso_saberes.json'), madridESOSab || '[]');
    console.log('Madrid ESO done.');

    console.log('Extracting Madrid Primaria Saberes...');
    const madridPrimaria = await parsePdf(path.join(LEGISLACION_DIR, 'Curriculo_Educacion_Fisica_Primaria_Madrid.pdf'));
    const madridPrimariaSab = await extractJSON(
      `Extract all "Saberes Básicos" (or Contenidos) for Educación Física from the provided curriculum text for Primaria.
      Format the output as a JSON array of objects with the following keys:
      "codigo": string (e.g. "EFI.PRI.B.1"),
      "bloque": string (e.g. "A", "B", "C", "D", "E", "F"),
      "bloqueNombre": string (e.g. "Salud física, mental y social"),
      "ciclo": string (e.g. "Todos", "Primer Ciclo", "Segundo Ciclo", "Tercer Ciclo"),
      "descripcion": string`,
      madridPrimaria
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, 'madrid_primaria_saberes.json'), madridPrimariaSab || '[]');
    console.log('Madrid Primaria Saberes done.');

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
