import { useState, useEffect } from 'react';

export interface ColorTheme {
  id: string;
  optionLabel: string; // 'OPCIÓN 1', 'OPCIÓN 2', 'OPCIÓN 3'
  name: string; // 'The Balanced Academic-Athletic', etc.
  focusLabel: string; // 'Foco en Equilibrio', 'Foco en Alta Energía', etc.
  description: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  greenHex: string;
  motifs: string[]; // e.g. ['Cronómetro', 'Libros Apilados', 'Atleta Saltando', 'Laurel']
  typographyStyle: string; // e.g. 'Sans-Serif Limpia / Crea (amigable) + Ef (estructurado)'
  badgeBg: string;
  headerBgClass: string;
  bodyBgClass: string;
  heroTextGradient: string;
  buttonClass: string;
  cardBgClass: string;
  activeBorderClass: string;
  docHeaderBg: string;
  docHeaderColor: string;
  docAccentBorder: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'option_1_balanced',
    optionLabel: 'MODO CLARO',
    name: 'Luz y Claridad Editorial (Modo Claro)',
    focusLabel: 'Foco en Claridad y Lectura',
    description: 'Diseño ultra-luminoso, limpio y descansado sobre fondo suave neutro. Tarjetas blancas, contraste nítido y acentos deportivos en azul marino y naranja.',
    primaryHex: '#0D47A1', // Azul-Teal Marino
    secondaryHex: '#E85D04', // Naranja Atlético
    accentHex: '#0284C7', // Azul Cielo
    greenHex: '#2E7D32', // Verde Bosque
    motifs: ['Cronómetro Equilibrado', 'Tarjetas Claras', 'Iconografía Ágil'],
    typographyStyle: 'Inter / Plus Jakarta Sans (Limpia y profesional)',
    badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    headerBgClass: 'bg-white/95 border-slate-200 text-slate-850 shadow-2xs backdrop-blur-md',
    bodyBgClass: 'bg-slate-100/90 text-slate-900',
    heroTextGradient: 'from-indigo-900 via-sky-600 to-orange-600',
    buttonClass: 'bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold shadow-sm',
    cardBgClass: 'bg-white border-slate-200 shadow-xs',
    activeBorderClass: 'border-indigo-600 ring-2 ring-indigo-500/20',
    docHeaderBg: '#0A2240',
    docHeaderColor: '#FFFFFF',
    docAccentBorder: '#E85D04',
  },
  {
    id: 'option_2_dynamic',
    optionLabel: 'MODO OSCURO',
    name: 'The Dynamic Athletic (Modo Oscuro)',
    focusLabel: 'Foco en Alta Energía',
    description: 'Diseño con fondo azul marino profundo (#0A2240). Utiliza Naranja vibrante para botones de acción principal y barras de progreso.',
    primaryHex: '#0A2240', // Azul Marino Profundo
    secondaryHex: '#E85D04', // Naranja Atlético
    accentHex: '#0284C7', // Turquesa / Azul Cielo
    greenHex: '#007A33', // Verde Andalucía
    motifs: ['Atleta Saltando', 'Cronómetro Deportivo', 'Antorcha Olímpica'],
    typographyStyle: 'Montserrat / Outfit (Estilo Atlético y Dinámico)',
    badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    headerBgClass: 'bg-slate-950/90 border-slate-800 text-white shadow-xl',
    bodyBgClass: 'bg-slate-900 text-slate-100',
    heroTextGradient: 'from-orange-500 via-amber-400 to-sky-400',
    buttonClass: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold shadow-lg shadow-orange-500/25',
    cardBgClass: 'bg-slate-800/80 border-slate-700 shadow-lg',
    activeBorderClass: 'border-orange-500 ring-2 ring-orange-500/20',
    docHeaderBg: '#0A2240',
    docHeaderColor: '#FFFFFF',
    docAccentBorder: '#E85D04',
  },
  {
    id: 'option_3_structured',
    optionLabel: 'OPCIÓN 3',
    name: 'The Structured Education-First',
    focusLabel: 'Foco en Estructura Educativa',
    description: 'Diseño estructurado en cuadrícula académica. Utiliza Verde Bosque (#2E7D32) como cabecera institucional de secciones, respaldado por libros apilados, laureles y birrete académico.',
    primaryHex: '#2E7D32', // Verde Bosque
    secondaryHex: '#0D47A1', // Azul Educativo
    accentHex: '#F59E0B', // Oro Laureles
    greenHex: '#007A33', // Verde Andalucía
    motifs: ['Libros Apilados', 'Rama de Laurel', 'Birrete Académico'],
    typographyStyle: 'Lexend / Source Sans Pro (Legibilidad Académica)',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    headerBgClass: 'bg-emerald-950/95 border-emerald-800 text-white shadow-md',
    bodyBgClass: 'bg-emerald-950/20 text-slate-100',
    heroTextGradient: 'from-emerald-400 via-teal-300 to-amber-400',
    buttonClass: 'bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md shadow-emerald-700/20',
    cardBgClass: 'bg-slate-900/90 border-emerald-900/50 shadow-md',
    activeBorderClass: 'border-emerald-500 ring-2 ring-emerald-500/20',
    docHeaderBg: '#2E7D32',
    docHeaderColor: '#FFFFFF',
    docAccentBorder: '#0D47A1',
  },
];

const THEME_STORAGE_KEY = 'creaef_selected_theme_id';

export function getStoredTheme(): ColorTheme {
  try {
    const savedId = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedId) {
      const found = COLOR_THEMES.find((t) => t.id === savedId);
      if (found) return found;
    }
  } catch (e) {}
  // Default to classic athletic high-contrast dark theme (Option 2)
  return COLOR_THEMES[1] || COLOR_THEMES[0];
}

export function saveTheme(themeId: string) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    window.dispatchEvent(new Event('creaef_theme_changed'));
  } catch (e) {}
}

export function useColorTheme() {
  const [theme, setTheme] = useState<ColorTheme>(getStoredTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getStoredTheme());
    };
    window.addEventListener('creaef_theme_changed', handleThemeChange);
    return () => window.removeEventListener('creaef_theme_changed', handleThemeChange);
  }, []);

  const changeTheme = (themeId: string) => {
    saveTheme(themeId);
    setTheme(getStoredTheme());
  };

  return { theme, changeTheme, themes: COLOR_THEMES };
}
