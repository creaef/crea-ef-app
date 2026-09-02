import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: "object",
  properties: {
    competenciasEspecificas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          numero: { type: "integer" },
          nombre: { type: "string" },
          descripcion: { type: "string" }
        }
      }
    },
    criteriosEvaluacion: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          codigo: { type: "string" },
          ciclo: { type: "string" },
          competenciaId: { type: "string" },
          descripcion: { type: "string" }
        }
      }
    },
    saberesBasicos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          codigo: { type: "string" },
          bloque: { type: "string" },
          bloqueNombre: { type: "string" },
          ciclo: { type: "string" },
          descripcion: { type: "string" }
        }
      }
    }
  }
};

async function parseFile(txtFile, isESO, communityPrefix) {
  const text = fs.readFileSync(txtFile, 'utf-8');
  
  const prompt = `
Extract the Competencias Específicas, Criterios de Evaluación, and Saberes Básicos from this Catalunya text.
Return JSON.
  `;

  console.log(`Parsing ${txtFile}...`);
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: prompt + "\nTEXT:\n" + text,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.1
    }
  });

  return JSON.parse(response.text);
}

async function run() {
  try {
    const catPrim = await parseFile('scratch/cat_prim.txt', false, 'CATALUNYA');
    fs.writeFileSync('scratch/cat_prim.json', JSON.stringify(catPrim, null, 2));
    console.log('Saved cat_prim.json');
  } catch (error) {
    console.error('Error generating AI content', error);
  }
}

run();
