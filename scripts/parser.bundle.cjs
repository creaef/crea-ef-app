var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/parser.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var pdfParseModule = __toESM(require("pdf-parse"), 1);
var pdfParse = pdfParseModule.default || pdfParseModule;
var LEGISLACION_DIR = import_path.default.join(process.cwd(), "src/data/legislacion");
var OUTPUT_DIR = import_path.default.join(process.cwd(), "src/data");
var regionesToProcess = [
  { name: "Galicia", community: "Galicia", prefix: "GALICIA", hasESO: true },
  { name: "Valencia", community: "Comunidad Valenciana", prefix: "VALENCIA", hasESO: true },
  { name: "Madrid", community: "Comunidad de Madrid", prefix: "MADRID", hasESO: true }
];
async function parsePdf(filePath) {
  if (!import_fs.default.existsSync(filePath)) return null;
  const dataBuffer = import_fs.default.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}
function extractCompetencias(text) {
  const competencias = [];
  const regex = /CE\.EF\.(\d+):\s*([\s\S]*?)(?=CE\.EF\.\d+:|3\.\s*CRITERIOS)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const num = match[1];
    const desc = match[2].trim().replace(/\s+/g, " ");
    competencias.push({
      id: `CE.EF.${num}`,
      numero: parseInt(num),
      nombre: `Competencia Espec\xEDfica ${num}`,
      descripcion: desc
    });
  }
  return competencias;
}
function extractCriterios(text, isESO) {
  const criterios = [];
  const ciclos = isESO ? [{ name: "1\xBA ESO", prefix: "PRIMER CURSO" }, { name: "2\xBA ESO", prefix: "SEGUNDO CURSO" }, { name: "3\xBA ESO", prefix: "TERCER CURSO" }, { name: "4\xBA ESO", prefix: "CUARTO CURSO" }] : [{ name: "Primer Ciclo", prefix: "PRIMER CICLO" }, { name: "Segundo Ciclo", prefix: "SEGUNDO CICLO" }, { name: "Tercer Ciclo", prefix: "TERCER CICLO" }];
  for (let i = 0; i < ciclos.length; i++) {
    const startStr = ciclos[i].prefix;
    const endStr = i + 1 < ciclos.length ? ciclos[i + 1].prefix : "4. SABERES";
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
      const desc = match[3].trim().replace(/\s+/g, " ");
      if (desc.startsWith("Integrar") || desc.startsWith("Comprender") || desc.length > 10) {
        criterios.push({
          id: `${compNum}.${critNum}`,
          codigo: `EFI.${compNum}.${critNum}`,
          ciclo: ciclos[i].name,
          competenciaId: `CE.EF.${compNum}`,
          descripcion: desc.replace(/^CE\.EF\.\d+\s*/, "")
        });
      }
    }
  }
  return criterios;
}
function extractSaberes(text, isESO) {
  const saberes = [];
  const bloques = [
    { id: "A", name: "Resoluci\xF3n de problemas en situaciones motrices", keys: ["Acciones individuales", "Acciones de oposici\xF3n", "Acciones de cooperaci\xF3n", "Acciones de colaboraci\xF3n-oposici\xF3n", "Acciones en el medio natural", "Acciones art\xEDstico-expresivas"] },
    { id: "B", name: "Manifestaciones de la cultura motriz", keys: ["Bloque B"] },
    { id: "C", name: "Autorregulaci\xF3n emocional e interacci\xF3n social", keys: ["Bloque C"] },
    { id: "D", name: "Interacci\xF3n eficiente y sostenible con el entorno", keys: ["Bloque D"] },
    { id: "E", name: "Organizaci\xF3n y gesti\xF3n de la actividad f\xEDsica", keys: ["Bloque E"] },
    { id: "F", name: "Vida activa y saludable", keys: ["Bloque F"] }
  ];
  const startIndex = text.indexOf("4. SABERES");
  if (startIndex === -1) return saberes;
  const chunk = text.substring(startIndex);
  for (const bloque of bloques) {
    for (const key of bloque.keys) {
      const regex = new RegExp(`${key}.*?:\\s*([\\s\\S]*?)(?=${bloques.flatMap((b) => b.keys).filter((k) => k !== key).join(".*?:|")}.*?:|DIMENSI\xD3N|$)`, "gi");
      let match = regex.exec(chunk);
      if (match) {
        const desc = match[1].trim().replace(/\s+/g, " ");
        if (desc.length > 5) {
          saberes.push({
            codigo: `EFI.${isESO ? "ESO" : "PRI"}.${bloque.id}.${saberes.length + 1}`,
            bloque: bloque.id,
            bloqueNombre: bloque.name,
            ciclo: "Todos",
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
    const priPath = import_path.default.join(LEGISLACION_DIR, `Curriculo_Educacion_Fisica_Primaria_${region.name}.pdf`);
    const esoPath = import_path.default.join(LEGISLACION_DIR, `Curriculo_Educacion_Fisica_ESO_${region.name}.pdf`);
    let priText = await parsePdf(priPath);
    let esoText = region.hasESO ? await parsePdf(esoPath) : null;
    let out = `import { CompetenciaEspecifica, CriterioEvaluacion, SaberBasico } from '../types';

`;
    out += `// ==========================================
// ${region.community.toUpperCase()} - PRIMARIA
// ==========================================
`;
    if (priText) {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_PRIMARIA: CompetenciaEspecifica[] = ${JSON.stringify(extractCompetencias(priText), null, 2)};

`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_PRIMARIA: CriterioEvaluacion[] = ${JSON.stringify(extractCriterios(priText, false), null, 2)};

`;
      out += `export const SABERES_BASICOS_${region.prefix}_PRIMARIA: SaberBasico[] = ${JSON.stringify(extractSaberes(priText, false), null, 2)};

`;
    }
    out += `// ==========================================
// ${region.community.toUpperCase()} - ESO Y BACHILLERATO
// ==========================================
`;
    if (esoText) {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_ESO: CompetenciaEspecifica[] = ${JSON.stringify(extractCompetencias(esoText), null, 2)};

`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_ESO: CriterioEvaluacion[] = ${JSON.stringify(extractCriterios(esoText, true), null, 2)};

`;
      out += `export const SABERES_BASICOS_${region.prefix}_ESO: SaberBasico[] = ${JSON.stringify(extractSaberes(esoText, true), null, 2)};

`;
    } else {
      out += `export const COMPETENCIAS_ESPECIFICAS_${region.prefix}_ESO: CompetenciaEspecifica[] = [];

`;
      out += `export const CRITERIOS_EVALUACION_${region.prefix}_ESO: CriterioEvaluacion[] = [];

`;
      out += `export const SABERES_BASICOS_${region.prefix}_ESO: SaberBasico[] = [];

`;
    }
    import_fs.default.writeFileSync(import_path.default.join(OUTPUT_DIR, `curriculum${region.name}.ts`), out);
    console.log(`Generated curriculum${region.name}.ts`);
  }
}
run().catch(console.error);
