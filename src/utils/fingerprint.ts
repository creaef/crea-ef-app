/**
 * Device Fingerprint Utility
 * 
 * Genera una huella digital determinista basada en el hardware, pantalla,
 * capacidades de renderizado Canvas/WebGL y configuración del sistema.
 * 
 * Esta huella persiste incluso en modo incógnito / navegación privada en la
 * misma computadora y navegador, evitando el abuso del periodo de prueba.
 */

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to positive hex representation
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return hex;
}

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas';

    // Text with lowercase, uppercase, and symbols
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial', sans-serif";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('CreaEF-Fingerprint-2026!?,#$', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('CreaEF-Fingerprint-2026!?,#$', 4, 17);

    return canvas.toDataURL();
  } catch (e) {
    return 'canvas-error';
  }
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'no-debug-info';

    const vendor = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
    return `${vendor}~${renderer}`;
  } catch (e) {
    return 'webgl-error';
  }
}

export async function getDeviceFingerprint(): Promise<string> {
  const components: string[] = [];

  // 1. Screen properties (idénticas en incógnito)
  components.push(`screen:${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`);
  components.push(`avail:${window.screen.availWidth}x${window.screen.availHeight}`);
  components.push(`pixelRatio:${window.devicePixelRatio || 1}`);

  // 2. Hardware components
  components.push(`concurrency:${navigator.hardwareConcurrency || 4}`);
  // @ts-ignore
  components.push(`deviceMemory:${navigator.deviceMemory || 8}`);

  // 3. System & Timezone
  components.push(`tz:${Intl.DateTimeFormat().resolvedOptions().timeZone || ''}`);
  components.push(`lang:${navigator.language || ''}`);
  components.push(`platform:${navigator.platform || ''}`);

  // 4. Graphics & Canvas fingerprinting
  components.push(`canvas:${hashString(getCanvasFingerprint())}`);
  components.push(`webgl:${hashString(getWebGLFingerprint())}`);

  // Combine and hash
  const rawFingerprint = components.join('|');
  const part1 = hashString(rawFingerprint);
  const part2 = hashString(rawFingerprint.split('').reverse().join(''));
  
  return `dev_${part1}${part2}`;
}
