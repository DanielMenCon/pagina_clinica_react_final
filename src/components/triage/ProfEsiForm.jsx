/* 
  ProfEsiForm - Formulario ESI para profesionales de salud.
  Migrado de: triage.html (clinic-form) + triage.js (calculateESI)
  Usa calculateESILevel() para la lógica de clasificación.
*/
import { useState } from 'react';
import { calculateESILevel } from '../../utils/triageLogic';

export default function ProfEsiForm() {
    // Estado de los campos
    const [painLevel, setPainLevel] = useState(0);
    const [walk, setWalk] = useState('yes');
    const [consciousness, setConsciousness] = useState('normal');
    const [timeEvo, setTimeEvo] = useState('minutes');
    const [resources, setResources] = useState('0');
    const [breath, setBreath] = useState(false);
    const [bleed, setBleed] = useState(false);
    const [chestPain, setChestPain] = useState(false);
    const [vitals, setVitals] = useState(false);

    // Estado del resultado
    const [resultado, setResultado] = useState(null);

    // UX: Color dinámico del display de dolor
    const painColor = painLevel >= 7 ? 'var(--alert-red)' : 'var(--primary-blue)';
    const painBorderColor = painLevel >= 7 ? 'var(--alert-red)' : 'var(--secondary-blue)';

    function handleCalculate() {
        const result = calculateESILevel({
            isApneic: breath,
            isBleeding: bleed,
            isChestPain: chestPain,
            isVitalsCompromised: vitals,
            consciousness,
            walk,
            timeEvo,
            resources,
            painLevel: parseInt(painLevel)
        });
        setResultado(result);
    }

    return (
        <div className="triage-content">
            <h3 className="tab-title">Categorización Médica Restringida (Índice ESI)</h3>
            <p className="section-desc tab-desc">
                Sistema oficial de clasificación de nivel de energía y dotación de enfermería.
            </p>

            <form className="professional-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="clin-pain">Escala Visual Analógica de Dolor (EVA 0-10):</label>
                        <div className="range-controls">
                            <input
                                type="range"
                                id="clin-pain"
                                min="0"
                                max="10"
                                value={painLevel}
                                onChange={(e) => setPainLevel(e.target.value)}
                            />
                            <span className="value-badge" style={{ color: painColor, borderColor: painBorderColor }}>
                                {painLevel}/10
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clin-walk">Movilidad Ambulatoria:</label>
                        <select id="clin-walk" className="standard-select" value={walk} onChange={(e) => setWalk(e.target.value)}>
                            <option value="yes">Paciente logra deambular</option>
                            <option value="no">Requiere soporte físico / camilla</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="clin-conscious">Nivel de Conciencia / Estado Mental:</label>
                        <select id="clin-conscious" className="standard-select" value={consciousness} onChange={(e) => setConsciousness(e.target.value)}>
                            <option value="normal">Alerta y Orientado (Normal)</option>
                            <option value="altered">Letárgico / Confuso / Alterado</option>
                            <option value="unconscious">Inconsciente / No responde</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clin-time">Tiempo de Evolución Sintomática:</label>
                        <select id="clin-time" className="standard-select" value={timeEvo} onChange={(e) => setTimeEvo(e.target.value)}>
                            <option value="minutes">Agudo (Minutos)</option>
                            <option value="hours">Subagudo (Horas recientes)</option>
                            <option value="days">Días de evolución</option>
                            <option value="weeks">Crónico (Semanas o más)</option>
                        </select>
                    </div>
                </div>

                <div className="full-width-group">
                    <fieldset className="critical-fieldset">
                        <legend>Señales de Riesgo Crítico (Seleccione si aplican):</legend>
                        <div className="checkbox-grid">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={breath} onChange={(e) => setBreath(e.target.checked)} />
                                <span>Distrés Respiratorio Severo (Asfixia o SatO2 &lt;92%)</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={bleed} onChange={(e) => setBleed(e.target.checked)} />
                                <span>Hemorragia Exanguinante Activa</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={chestPain} onChange={(e) => setChestPain(e.target.checked)} />
                                <span>Dolor Torácico de características isquémicas</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={vitals} onChange={(e) => setVitals(e.target.checked)} />
                                <span>Descompensación Hemodinámica (FC &gt;100)</span>
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div className="form-row mt-15">
                    <div className="form-group">
                        <label htmlFor="clin-resources">Estimación de Recursos Necesarios:</label>
                        <select id="clin-resources" className="standard-select" value={resources} onChange={(e) => setResources(e.target.value)}>
                            <option value="0">Ninguno (Radiografía no requerida, sin Labs, Px Básico)</option>
                            <option value="1">Un recurso (Ej: Solo examen de sangre o Rx simple)</option>
                            <option value="many">Múltiples recursos (Politrauma, Labs + Imágen, UCI)</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-primary btn-alt large-action" onClick={handleCalculate}>
                        Aplicar Protocolo de Clasificación
                    </button>
                </div>
            </form>

            {/* Resultado ESI */}
            {resultado && (
                <div className="result-container" aria-live="polite">
                    <h3>Veredicto ESI Institucional</h3>
                    <div className={`esi-box esi-${resultado.esiLevel}`}>
                        ESI {resultado.esiLevel}
                    </div>
                    <p className="esi-description">{resultado.explanation}</p>
                </div>
            )}
        </div>
    );
}
