import { CREA_EF_LOGO_URL } from '../components/CreaEfLogo';
import { CREA_EF_LOGO_BASE64 } from './logoBase64';
import { EtapaEducativa } from '../types';

export function getNormativaForEtapa(etapa: EtapaEducativa): string {
  switch (etapa) {
    case 'Infantil': return 'Decreto 100/2023 de Psicomotricidad en Andalucía';
    case 'ESO': return 'Decreto 102/2023 de Educación Física en Andalucía';
    case 'Bachillerato': return 'Decreto 103/2023 de Educación Física en Andalucía';
    default: return 'Decreto 101/2023 de Educación Física en Andalucía';
  }
}

export const OFFICIAL_LOGO_SRC = CREA_EF_LOGO_BASE64 || 'https://lh3.googleusercontent.com/d/10xARAH1teV4NN9a3E7C2wQ44eFtB02QU=s220';

export const OFFICIAL_LOGO_IMG_HTML = `<img src="${OFFICIAL_LOGO_SRC}" alt="Logo" style="height: 40px; width: auto; max-width: 44px; object-fit: contain; border-radius: 6px; display: block;" />`;

/**
 * Genera el encabezado oficial de página con el logotipo de Crea-Ef,
 * nombre de la aplicación, lema oficial LOMLOE Decreto 101/2023 y membrete de registro.
 */
export function renderOfficialDocumentHeaderHtml(
  docTitle: string = 'DOCUMENTO OFICIAL PROGRAMACIÓN',
  regId: string = 'SDA-EF-2026',
  etapa: EtapaEducativa = 'Primaria'
): string {
  const dateStr = new Date().toLocaleDateString('es-ES');
  return `
    <table style="width: 100%; border-bottom: 2.5px solid #007A33; margin-bottom: 18px; font-family: Arial, sans-serif; border-collapse: collapse; page-break-after: avoid; break-after: avoid;">
      <tr>
        <td style="width: 44px; vertical-align: middle; padding-right: 10px; padding-bottom: 12px; border: none;">
          ${OFFICIAL_LOGO_IMG_HTML}
        </td>
        <td style="vertical-align: middle; text-align: left; padding-bottom: 12px; border: none;">
          <h1 style="margin: 0; font-size: 15px; font-weight: 900; color: #0A2240; font-family: Arial, sans-serif; line-height: 1.1;">
            <span style="color: #E85D04;">Crea-</span><span style="color: #0284C7;">Ef</span>
          </h1>
          <p style="margin: 1px 0 0 0; font-size: 9.5px; font-weight: bold; color: #334155; line-height: 1.2;">
            Diseña y personaliza tus Situaciones de Aprendizaje de EF
          </p>
          <p style="margin: 1px 0 0 0; font-size: 8.5px; color: #007A33; font-weight: 600; line-height: 1.2;">
            Programación Oficial LOMLOE • ${getNormativaForEtapa(etapa)}
          </p>
        </td>
        <td style="text-align: right; vertical-align: middle; padding-bottom: 12px; font-size: 8.5px; color: #64748b; line-height: 1.3; border: none; white-space: nowrap;">
          <div style="font-weight: bold; color: #0A2240; font-size: 9px;">${docTitle}</div>
          <div>Fecha: ${dateStr}</div>
          <div>ID Registro: ${regId}</div>
        </td>
      </tr>
    </table>
  `;
}

