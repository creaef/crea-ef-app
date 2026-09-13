import html2pdf from 'html2pdf.js';

// --- ESTILOS COMUNES DE IMPRESIÓN PARA LAS BARAJAS ---
const getCardDeckStyles = () => `
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm;
    }
    * {
      box-sizing: border-box;
      font-family: Arial, -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .deck-container {
      width: 700px;
      margin: 0 auto;
      padding: 4px;
      background: #ffffff;
      color: #0f172a;
      box-sizing: border-box;
    }
    .deck-page {
      page-break-after: always;
      break-after: page;
      padding: 6px;
      margin-bottom: 16px;
    }
    .deck-page:last-child {
      page-break-after: avoid;
      break-after: avoid;
      margin-bottom: 0;
    }
    .deck-header {
      border-bottom: 3px solid #0a2240;
      padding-bottom: 6px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .deck-header h1 {
      margin: 0;
      font-size: 16px;
      font-weight: 900;
      color: #0a2240;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .deck-header p {
      margin: 2px 0 0 0;
      font-size: 10.5px;
      color: #64748b;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .card-item {
      border: 2px dashed #94a3b8;
      border-radius: 8px;
      padding: 8px 10px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 220px;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      box-sizing: border-box;
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .card-title {
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .card-badge {
      font-size: 8.5px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .card-body {
      flex: 1;
      font-size: 9.5px;
      line-height: 1.4;
      color: #334155;
    }
    .card-svg-container {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 4px;
      margin: 4px 0 6px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      color: #94a3b8;
      font-weight: 600;
    }
  </style>
`;

/**
 * Genera el fragmento HTML puro de las Tarjetas DUA (apto para html2pdf sin tags <html> externos)
 */
export function buildDuaCardsFragmentHtml(): string {
  return `
    <div class="deck-container">
      ${getCardDeckStyles()}

      <!-- PÁGINA 1: ROLES INCLUSIVOS Y SEMÁFORO DE AUTORREGULACIÓN -->
      <div class="deck-page">
        <div class="deck-header">
          <div>
            <h1>🎒 Baraja DUA: Apoyos e Inclusión en Educación Física</h1>
            <p>Material complementario recortable para la atención a la diversidad y fomento de la autonomía motriz.</p>
          </div>
          <span style="background: #047857; color: white; padding: 3px 6px; border-radius: 4px; font-size: 9.5px; font-weight: bold; white-space: nowrap;">
            HOJA 1 / 2 • CREA-EF
          </span>
        </div>

        <div class="cards-grid">
          <!-- Tarjeta 1: Capitán/a de Material -->
          <div class="card-item" style="border-color: #0284c7;">
            <div class="card-top">
              <span class="card-title" style="color: #0369a1;">📦 Rol: Capitán/a de Material</span>
              <span class="card-badge" style="background: #e0f2fe; color: #0369a1;">Inclusión DUA</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="25" y="45" width="35" height="25" fill="#bae6fd" stroke="#0284c7" stroke-width="2" rx="3" />
                  <path d="M 32 45 L 32 38 Q 42 32 52 38 L 52 45" fill="none" stroke="#0284c7" stroke-width="2" />
                  <circle cx="105" cy="28" r="10" fill="#fbcfe8" stroke="#0284c7" stroke-width="2" />
                  <path d="M 105 38 L 105 60 M 105 45 L 90 52 M 105 45 L 120 52 M 105 60 L 95 76 M 105 60 L 115 76" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
                  <text x="30" y="62" font-size="9" fill="#0369a1" font-weight="bold">PETOS</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> Supervisa el reparto equitativo del material y garantiza que todos sus compañeros disponen de lo necesario para jugar.</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Fomenta la responsabilidad, organización y protagonismo activo sin exclusión física.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>

          <!-- Tarjeta 2: Árbitro de Fair Play -->
          <div class="card-item" style="border-color: #059669;">
            <div class="card-top">
              <span class="card-title" style="color: #047857;">🤝 Juez / Árbitro de Fair Play</span>
              <span class="card-badge" style="background: #d1fae5; color: #065f46;">Valores</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <circle cx="80" cy="24" r="10" fill="#fef08a" stroke="#059669" stroke-width="2" />
                  <path d="M 80 34 L 80 58 M 80 42 L 55 35 M 80 42 L 105 35 M 80 58 L 70 76 M 80 58 L 90 76" stroke="#059669" stroke-width="2.5" stroke-linecap="round" />
                  <rect x="105" y="24" width="14" height="20" rx="2" fill="#10b981" stroke="#047857" stroke-width="1.5" />
                  <text x="45" y="18" font-size="9" fill="#059669" font-weight="bold">¡JUEGO LIMPIO!</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> Premia las conductas de compañerismo mostrando la tarjeta verde. Resuelve dudas y desacuerdos de forma dialogada.</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Potencia la autorregulación emocional y el liderazgo positivo para alumnos con dificultades motoras transitorias.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>

          <!-- Tarjeta 3: Semáforo de Autorregulación -->
          <div class="card-item" style="border-color: #d97706;">
            <div class="card-top">
              <span class="card-title" style="color: #b45309;">🚦 Semáforo de Esfuerzo y Fatiga</span>
              <span class="card-badge" style="background: #fef3c7; color: #92400e;">Salud</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="20" y="10" width="30" height="60" rx="6" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
                  <circle cx="35" cy="22" r="7" fill="#ef4444" />
                  <circle cx="35" cy="40" r="7" fill="#f59e0b" />
                  <circle cx="35" cy="58" r="7" fill="#10b981" />
                  <text x="65" y="25" font-size="9" fill="#b91c1c" font-weight="bold">🔴 Pausa / Beber Agua</text>
                  <text x="65" y="43" font-size="9" fill="#d97706" font-weight="bold">🟡 Ritmo Controlado</text>
                  <text x="65" y="61" font-size="9" fill="#047857" font-weight="bold">🟢 Máxima Energía</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> Señala el color en el que te encuentras para regular tu esfuerzo físico y saber cuándo necesitas hidratarte o respirar.</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Conciencia corporal y escucha de las propias sensaciones biológicas sin juzgar.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>

          <!-- Tarjeta 4: Comodín de Apoyo / Adaptación -->
          <div class="card-item" style="border-color: #7c3aed;">
            <div class="card-top">
              <span class="card-title" style="color: #6d28d9;">🃏 Comodín de Adaptación de Reglas</span>
              <span class="card-badge" style="background: #ede9fe; color: #5b21b6;">Flexibilidad</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="40" y="15" width="80" height="50" rx="5" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2" />
                  <circle cx="80" cy="35" r="12" fill="#ddd6fe" />
                  <text x="75" y="41" font-size="16" fill="#6d28d9" font-weight="bold">★</text>
                  <text x="48" y="58" font-size="9" fill="#6d28d9" font-weight="bold">+1 BOTE / ZONA LIBRE</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> Permite utilizar una regla adaptada acordada con el docente (dar 2 pasos más con el balón, zona libre sin persecución o lanzar desde menor distancia).</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Múltiples formas de acción y expresión motriz garantizando el éxito de todos.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PÁGINA 2: PAUSAS SENSORIALES Y COOPERACIÓN -->
      <div class="deck-page">
        <div class="deck-header">
          <div>
            <h1>🎒 Baraja DUA: Apoyos e Inclusión en Educación Física</h1>
            <p>Pautas visuales universales de comunicación y cooperación motriz.</p>
          </div>
          <span style="background: #047857; color: white; padding: 3px 6px; border-radius: 4px; font-size: 9.5px; font-weight: bold; white-space: nowrap;">
            HOJA 2 / 2 • CREA-EF
          </span>
        </div>

        <div class="cards-grid">
          <!-- Tarjeta 5: Pausa Sensorial -->
          <div class="card-item" style="border-color: #0891b2;">
            <div class="card-top">
              <span class="card-title" style="color: #0e7490;">🧘 Pausa Sensorial y Calma</span>
              <span class="card-badge" style="background: #cffafe; color: #155e75;">Bienestar</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <circle cx="80" cy="25" r="9" fill="#fed7aa" stroke="#0891b2" stroke-width="2" />
                  <path d="M 80 34 L 80 54 M 80 40 L 60 48 M 80 40 L 100 48 M 80 54 Q 60 68 55 58 M 80 54 Q 100 68 105 58" stroke="#0891b2" stroke-width="2.5" stroke-linecap="round" fill="none" />
                  <text x="50" y="75" font-size="8" fill="#0e7490" font-weight="bold">RESPIRACIÓN 4-4-4</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> El alumno puede solicitar 2 minutos en la "Zona de Tranquilidad" del gimnasio para reordenar estímulos sonoros o sobrecarga motriz.</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Prevención de crisis y fomento de la autorregulación en alumnado TEA y NEAE.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>

          <!-- Tarjeta 6: Pase Obligatorio Colectivo -->
          <div class="card-item" style="border-color: #ea580c;">
            <div class="card-top">
              <span class="card-title" style="color: #c2410c;">🏐 Regla: "Todos Tocan el Balón"</span>
              <span class="card-badge" style="background: #ffedd5; color: #9a3412;">Cooperación</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <circle cx="40" cy="40" r="10" fill="#bae6fd" stroke="#0284c7" stroke-width="2" />
                  <circle cx="80" cy="22" r="10" fill="#fbcfe8" stroke="#db2777" stroke-width="2" />
                  <circle cx="120" cy="40" r="10" fill="#d1fae5" stroke="#059669" stroke-width="2" />
                  <path d="M 52 35 L 68 28 M 92 28 L 108 35 M 110 50 L 50 50" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,3" />
                  <polygon points="50,47 50,53 44,50" fill="#ea580c" />
                  <text x="45" y="70" font-size="9" fill="#c2410c" font-weight="bold">¡MIN. 3 PASES ANTES DE ANOTAR!</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Misión:</strong> Ningún jugador puede finalizar la jugada sin que hayan participado al menos 3 compañeros distintos del equipo.</p>
              <p style="margin: 2px 0;"><strong>Pauta DUA:</strong> Elimina el monopolio del juego por parte de los más habilidosos e integra a todos.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • DUA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Genera el documento HTML completo de las Tarjetas DUA (para ventana de impresión directa)
 */
export function buildDuaCardsFullHtml(): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Tarjetas DUA para Educación Física</title>
      <style>
        body { margin: 0; padding: 10px; background: #ffffff; }
      </style>
    </head>
    <body>
      ${buildDuaCardsFragmentHtml()}
    </body>
    </html>
  `;
}

/**
 * Genera el fragmento HTML puro de las Tarjetas de Figuras de Acrosport
 */
export function buildAcrosportCardsFragmentHtml(): string {
  return `
    <div class="deck-container">
      ${getCardDeckStyles()}

      <!-- PÁGINA 1: SEGURIDAD Y FIGURAS POR PAREJAS -->
      <div class="deck-page">
        <div class="deck-header">
          <div>
            <h1>🤸 Baraja de Figuras de Acrosport y Pirámides Humanas</h1>
            <p>Fichas técnicas con representación visual, apoyos biomecánicos seguros y normas preventivas.</p>
          </div>
          <span style="background: #4338ca; color: white; padding: 3px 6px; border-radius: 4px; font-size: 9.5px; font-weight: bold; white-space: nowrap;">
            NIVEL 1: BÁSICO Y SEGURIDAD • CREA-EF
          </span>
        </div>

        <div class="cards-grid">
          <!-- Tarjeta 1: Normas de Seguridad Biomecánica -->
          <div class="card-item" style="border-color: #dc2626; border-width: 2.5px;">
            <div class="card-top">
              <span class="card-title" style="color: #b91c1c;">⚠️ Seguridad Biomecánica Fundamental</span>
              <span class="card-badge" style="background: #fee2e2; color: #991b1b;">OBLIGATORIO</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="25" y="15" width="20" height="50" rx="3" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
                  <rect x="27" y="17" width="16" height="12" fill="#86efac" stroke="#16a34a" />
                  <rect x="27" y="51" width="16" height="12" fill="#86efac" stroke="#16a34a" />
                  <rect x="27" y="32" width="16" height="16" fill="#fca5a5" stroke="#dc2626" />
                  <line x1="27" y1="32" x2="43" y2="48" stroke="#b91c1c" stroke-width="2" />
                  <line x1="43" y1="32" x2="27" y2="48" stroke="#b91c1c" stroke-width="2" />
                  <text x="54" y="26" font-size="8.5" fill="#15803d" font-weight="bold">✓ Apoyo en Escápulas</text>
                  <text x="54" y="42" font-size="8.5" fill="#b91c1c" font-weight="bold">✗ PROHIBIDO Lumbar</text>
                  <text x="54" y="58" font-size="8.5" fill="#15803d" font-weight="bold">✓ Apoyo en Pelvis/Sacro</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Regla de Oro:</strong> Los apoyos se realizan SIEMPRE sobre superficies óseas (hombros, escápulas y caderas). NUNCA en el centro de la espalda.</p>
              <p style="margin: 2px 0;"><strong>Brazos y Piernas a 90º:</strong> El portor debe mantener las articulaciones bloqueadas en ángulo recto para sostener el peso sin fatiga muscular.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>

          <!-- Tarjeta 2: Doble Banco por Parejas -->
          <div class="card-item" style="border-color: #2563eb;">
            <div class="card-top">
              <span class="card-title" style="color: #1d4ed8;">Figura 1: Doble Banco en Cuadrupedia</span>
              <span class="card-badge" style="background: #dbeafe; color: #1e40af;">Parejas (Verde)</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="10" y="70" width="140" height="6" rx="2" fill="#cbd5e1" />
                  <circle cx="45" cy="46" r="6" fill="#93c5fd" stroke="#1d4ed8" stroke-width="2" />
                  <line x1="45" y1="52" x2="85" y2="52" stroke="#1d4ed8" stroke-width="4" stroke-linecap="round" />
                  <line x1="50" y1="52" x2="50" y2="70" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round" />
                  <line x1="80" y1="52" x2="80" y2="70" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round" />
                  <circle cx="55" cy="22" r="6" fill="#fed7aa" stroke="#ea580c" stroke-width="2" />
                  <line x1="55" y1="28" x2="95" y2="28" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round" />
                  <line x1="60" y1="28" x2="50" y2="50" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="90" y1="28" x2="80" y2="50" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round" />
                  <text x="100" y="20" font-size="8" fill="#ea580c" font-weight="bold">ÁGIL</text>
                  <text x="95" y="65" font-size="8" fill="#1d4ed8" font-weight="bold">PORTOR</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Portor:</strong> Posición de 4 apoyos sobre la colchoneta. Espalda completamente plana y brazos alineados bajo los hombros.</p>
              <p style="margin: 2px 0;"><strong>Ágil:</strong> Coloca las manos firmemente sobre las escápulas del portor y las rodillas sobre su pelvis/sacro. Mirada al frente.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>

          <!-- Tarjeta 3: El Trineo / Balanza Frontal -->
          <div class="card-item" style="border-color: #059669;">
            <div class="card-top">
              <span class="card-title" style="color: #047857;">Figura 2: Balanza en Rodillas</span>
              <span class="card-badge" style="background: #d1fae5; color: #065f46;">Parejas (Amarillo)</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="10" y="70" width="140" height="6" rx="2" fill="#cbd5e1" />
                  <circle cx="50" cy="30" r="6" fill="#93c5fd" stroke="#059669" stroke-width="2" />
                  <line x1="50" y1="36" x2="50" y2="58" stroke="#059669" stroke-width="4" stroke-linecap="round" />
                  <line x1="50" y1="58" x2="50" y2="70" stroke="#059669" stroke-width="3.5" stroke-linecap="round" />
                  <circle cx="110" cy="32" r="6" fill="#fbcfe8" stroke="#db2777" stroke-width="2" />
                  <line x1="110" y1="38" x2="75" y2="50" stroke="#db2777" stroke-width="3" stroke-linecap="round" />
                  <line x1="50" y1="42" x2="80" y2="42" stroke="#059669" stroke-width="2.5" />
                  <line x1="110" y1="42" x2="80" y2="42" stroke="#db2777" stroke-width="2.5" />
                  <circle cx="62" cy="54" r="3" fill="#15803d" />
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Portor:</strong> De rodillas con tronco vertical bloqueado. Ofrece el muslo anterior como escalón seguro.</p>
              <p style="margin: 2px 0;"><strong>Ágil:</strong> Agarre mano a mano (presa de muñeca), extiende la pierna libre atrás en balanza equilibrada.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>

          <!-- Tarjeta 4: Roles del Trío y Ayudante -->
          <div class="card-item" style="border-color: #9333ea;">
            <div class="card-top">
              <span class="card-title" style="color: #7e22ce;">El Papel Vital del Ayudante</span>
              <span class="card-badge" style="background: #f3e8ff; color: #6b21a8;">Prevención</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="10" y="70" width="140" height="6" rx="2" fill="#cbd5e1" />
                  <line x1="40" y1="55" x2="80" y2="55" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" />
                  <circle cx="60" cy="22" r="6" fill="#f472b6" />
                  <line x1="60" y1="28" x2="60" y2="50" stroke="#db2777" stroke-width="3" />
                  <circle cx="105" cy="35" r="7" fill="#fef08a" stroke="#9333ea" stroke-width="2" />
                  <line x1="105" y1="42" x2="105" y2="65" stroke="#9333ea" stroke-width="3" />
                  <line x1="105" y1="48" x2="75" y2="38" stroke="#9333ea" stroke-width="2.5" stroke-dasharray="2,2" />
                  <text x="90" y="24" font-size="8" fill="#9333ea" font-weight="bold">AYUDANTE</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>Posición:</strong> Permanece de pie junto a la colchoneta con las manos a la altura de la cintura del ágil, sin tocar salvo pérdida de equilibrio.</p>
              <p style="margin: 2px 0;"><strong>Comunicación:</strong> Es el encargado de dar la orden de "¡Montar!", "¡Sostener!" (3 segundos) y "¡Desmontar seguro!".</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PÁGINA 2: PIRÁMIDES POR TRÍOS Y CUARTETOS -->
      <div class="deck-page">
        <div class="deck-header">
          <div>
            <h1>🤸 Baraja de Figuras de Acrosport y Pirámides Humanas</h1>
            <p>Estructuras colectivas por tríos y cuartetos con progresión cooperativa.</p>
          </div>
          <span style="background: #4338ca; color: white; padding: 3px 6px; border-radius: 4px; font-size: 9.5px; font-weight: bold; white-space: nowrap;">
            NIVEL 2: TRÍOS Y CUARTETOS • CREA-EF
          </span>
        </div>

        <div class="cards-grid">
          <!-- Tarjeta 5: Pirámide Trío Escalonada -->
          <div class="card-item" style="border-color: #d97706;">
            <div class="card-top">
              <span class="card-title" style="color: #b45309;">Figura 3: Pirámide Clásica de 3</span>
              <span class="card-badge" style="background: #fef3c7; color: #92400e;">Tríos (Amarillo)</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="10" y="70" width="140" height="6" rx="2" fill="#cbd5e1" />
                  <circle cx="35" cy="46" r="5" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5" />
                  <line x1="35" y1="52" x2="65" y2="52" stroke="#1d4ed8" stroke-width="3.5" stroke-linecap="round" />
                  <line x1="38" y1="52" x2="38" y2="70" stroke="#1d4ed8" stroke-width="2.5" />
                  <line x1="62" y1="52" x2="62" y2="70" stroke="#1d4ed8" stroke-width="2.5" />
                  <circle cx="85" cy="46" r="5" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5" />
                  <line x1="85" y1="52" x2="115" y2="52" stroke="#1d4ed8" stroke-width="3.5" stroke-linecap="round" />
                  <line x1="88" y1="52" x2="88" y2="70" stroke="#1d4ed8" stroke-width="2.5" />
                  <line x1="112" y1="52" x2="112" y2="70" stroke="#1d4ed8" stroke-width="2.5" />
                  <circle cx="75" cy="18" r="5" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5" />
                  <line x1="75" y1="23" x2="75" y2="38" stroke="#ea580c" stroke-width="3" />
                  <line x1="75" y1="38" x2="55" y2="51" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round" />
                  <line x1="75" y1="38" x2="95" y2="51" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round" />
                  <text x="60" y="12" font-size="8" fill="#ea580c" font-weight="bold">ÁGIL EN CÚPULA</text>
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>2 Portores:</strong> Dos bancos juntos en paralelo, muy unidos lateralmente sin huecos.</p>
              <p style="margin: 2px 0;"><strong>Ágil:</strong> Coloca un pie/rodilla sobre las escápulas del portor 1 y el otro pie/rodilla sobre el portor 2.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>

          <!-- Tarjeta 6: Muralla de Cuarteto con Cierre -->
          <div class="card-item" style="border-color: #0284c7;">
            <div class="card-top">
              <span class="card-title" style="color: #0369a1;">Figura 4: Muralla y Torre de 4</span>
              <span class="card-badge" style="background: #e0f2fe; color: #0369a1;">Cuartetos (Rojo)</span>
            </div>
            <div class="card-body">
              <div class="card-svg-container">
                <svg viewBox="0 0 160 80" width="160" height="80">
                  <rect x="10" y="70" width="140" height="6" rx="2" fill="#cbd5e1" />
                  <circle cx="45" cy="30" r="5" fill="#93c5fd" />
                  <line x1="45" y1="35" x2="45" y2="70" stroke="#0284c7" stroke-width="3.5" />
                  <circle cx="105" cy="30" r="5" fill="#93c5fd" />
                  <line x1="105" y1="35" x2="105" y2="70" stroke="#0284c7" stroke-width="3.5" />
                  <line x1="45" y1="45" x2="105" y2="45" stroke="#0284c7" stroke-width="3" />
                  <circle cx="65" cy="18" r="4.5" fill="#f472b6" />
                  <circle cx="85" cy="18" r="4.5" fill="#f472b6" />
                  <line x1="65" y1="22" x2="55" y2="45" stroke="#db2777" stroke-width="2.5" />
                  <line x1="85" y1="22" x2="95" y2="45" stroke="#db2777" stroke-width="2.5" />
                  <line x1="65" y1="25" x2="85" y2="25" stroke="#db2777" stroke-width="2" />
                </svg>
              </div>
              <p style="margin: 2px 0;"><strong>2 Portores:</strong> Entrecruzan sus brazos formando un asiento/bloqueo de soporte indestructible.</p>
              <p style="margin: 2px 0;"><strong>2 Ágiles:</strong> Suben simultáneamente a la cuenta del ayudante manteniendo el equilibrio simétrico.</p>
            </div>
            <div class="card-footer">
              <span>✂️ Recortar por la línea</span>
              <span>CREA-EF • ACROSPORT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Genera el documento HTML completo de las Tarjetas de Acrosport (para ventana de impresión directa)
 */
export function buildAcrosportCardsFullHtml(): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Tarjetas de Figuras y Pirámides de Acrosport</title>
      <style>
        body { margin: 0; padding: 10px; background: #ffffff; }
      </style>
    </head>
    <body>
      ${buildAcrosportCardsFragmentHtml()}
    </body>
    </html>
  `;
}

/**
 * Descarga el PDF de las Tarjetas DUA sin páginas en blanco
 */
export async function downloadDuaCardsPdf(): Promise<void> {
  const container = document.createElement('div');
  container.style.width = '700px';
  container.style.boxSizing = 'border-box';
  container.style.padding = '0';
  container.style.margin = '0 auto';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.innerHTML = buildDuaCardsFragmentHtml();

  const opt = {
    margin: [6, 6, 6, 6] as [number, number, number, number],
    filename: 'Tarjetas_DUA_Inclusion_Educacion_Fisica.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 720,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: ['.card-item', '.deck-header']
    },
  };

  const h2p: any = (html2pdf as any)?.default || html2pdf || (window as any).html2pdf;
  if (typeof h2p === 'function') {
    await h2p().set(opt).from(container).save();
  } else {
    openDuaCardsPrintWindow();
  }
}

/**
 * Descarga el PDF de las Tarjetas de Acrosport sin páginas en blanco
 */
export async function downloadAcrosportCardsPdf(): Promise<void> {
  const container = document.createElement('div');
  container.style.width = '700px';
  container.style.boxSizing = 'border-box';
  container.style.padding = '0';
  container.style.margin = '0 auto';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.innerHTML = buildAcrosportCardsFragmentHtml();

  const opt = {
    margin: [6, 6, 6, 6] as [number, number, number, number],
    filename: 'Tarjetas_Figuras_Piramides_Acrosport_Seguridad.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 720,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: ['.card-item', '.deck-header']
    },
  };

  const h2p: any = (html2pdf as any)?.default || html2pdf || (window as any).html2pdf;
  if (typeof h2p === 'function') {
    await h2p().set(opt).from(container).save();
  } else {
    openAcrosportCardsPrintWindow();
  }
}

/**
 * Abre la baraja DUA en una ventana nueva para imprimir directamente
 */
export function openDuaCardsPrintWindow(): void {
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(buildDuaCardsFullHtml());
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
  }
}

/**
 * Abre la baraja de Acrosport en una ventana nueva para imprimir directamente
 */
export function openAcrosportCardsPrintWindow(): void {
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(buildAcrosportCardsFullHtml());
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
  }
}
