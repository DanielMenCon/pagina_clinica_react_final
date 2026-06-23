/* 
  PatientForm - Autoevaluación de gravedad para pacientes.
  Migrado de: triage.html (patient-form) + triage.js (calculatePatient)
  Usa useState para cada campo y llama a calculatePatientTriage().
*/
import { useState } from 'react';
import { calculatePatientTriage } from '../../utils/triageLogic';

export default function PatientForm() {
    // Estado de los campos del formulario
    const [pain, setPain] = useState(0);
    const [walk, setWalk] = useState('yes');
    const [conscious, setConscious] = useState('normal');
    const [timeEvo, setTimeEvo] = useState('minutes');
    const [breath, setBreath] = useState(false);
    const [bleed, setBleed] = useState(false);
    const [chest, setChest] = useState(false);
    const [trauma, setTrauma] = useState(false);
    const [fever, setFever] = useState(false);

    // Estado del resultado
    const [resultado, setResultado] = useState(null);

    // UX: Color dinámico del display de dolor
    const painColor = pain >= 7 ? 'var(--alert-red)' : 'var(--primary-blue)';
    const painBorderColor = pain >= 7 ? 'var(--alert-red)' : 'var(--secondary-blue)';

    function handleCalculate() {
        const result = calculatePatientTriage({
            pain: parseInt(pain),
            conscious,
            timeEvo,
            breath,
            bleed,
            chest,
            trauma,
            fever
        });
        setResultado(result);
    }

    return (
        <div className="triage-content">
            <h3 className="tab-title">Autoevaluación de Gravedad</h3>
            <p className="section-desc tab-desc">
                Descubra un tiempo estimado de espera sugerido según sus síntomas urgentes.
            </p>

            <form className="professional-form form-centered" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="pat-pain">¿Qué nivel de dolor siente (Escala 0-10)?</label>
                    <div className="range-controls">
                        <input
                            type="range"
                            id="pat-pain"
                            min="0"
                            max="10"
                            value={pain}
                            onChange={(e) => setPain(e.target.value)}
                        />
                        <span
                            className="value-badge"
                            style={{ color: painColor, borderColor: painBorderColor }}
                        >
                            {pain}/10
                        </span>
                    </div>
                </div>

                <div className="form-group mt-15">
                    <label htmlFor="pat-walk">¿Puede caminar o desplazarse por su cuenta?</label>
                    <select id="pat-walk" className="standard-select" value={walk} onChange={(e) => setWalk(e.target.value)}>
                        <option value="yes">Sí, puedo moverme</option>
                        <option value="no">No, necesito soporte / silla de ruedas</option>
                    </select>
                </div>

                <div className="form-group mt-15">
                    <label htmlFor="pat-conscious">Estado de Conciencia Actual:</label>
                    <select id="pat-conscious" className="standard-select" value={conscious} onChange={(e) => setConscious(e.target.value)}>
                        <option value="normal">Normal (Despierto y orientado)</option>
                        <option value="altered">Alterado (Confusión o desorientación)</option>
                        <option value="unconscious">Inconsciente / No responde</option>
                    </select>
                </div>

                <div className="form-group mt-15">
                    <label htmlFor="pat-time">¿Hace cuánto comenzaron los síntomas?</label>
                    <select id="pat-time" className="standard-select" value={timeEvo} onChange={(e) => setTimeEvo(e.target.value)}>
                        <option value="minutes">De forma repentina / Hace unos minutos</option>
                        <option value="hours">Hace unas horas</option>
                        <option value="days">Hace unos días</option>
                        <option value="weeks">Hace semanas o meses</option>
                    </select>
                </div>

                <div className="full-width-group mt-15">
                    <fieldset className="critical-fieldset">
                        <legend>Señales de Riesgo Crítico (Seleccione si aplican):</legend>
                        <div className="checkbox-grid">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={breath} onChange={(e) => setBreath(e.target.checked)} />
                                <span>Falta de aliento / Ahogo</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={bleed} onChange={(e) => setBleed(e.target.checked)} />
                                <span>Hemorragia activa / Sangrado</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={chest} onChange={(e) => setChest(e.target.checked)} />
                                <span>Presión pesada en el pecho</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={trauma} onChange={(e) => setTrauma(e.target.checked)} />
                                <span>Accidente fuerte o caída reciente</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" checked={fever} onChange={(e) => setFever(e.target.checked)} />
                                <span>Fiebre alta sostenida</span>
                            </label>
                        </div>
                    </fieldset>
                </div>

                <div className="form-actions mt-25">
                    <button type="button" className="btn-primary large-action" onClick={handleCalculate}>
                        Obtener Estimación
                    </button>
                </div>
            </form>

            {/* Resultado del paciente */}
            {resultado && (
                <div className={`result-container ${resultado.colorClass}`} style={{ color: 'white' }} aria-live="polite">
                    <h4 style={{ color: 'white', fontSize: '1.4rem' }}>Orientación para usted:</h4>
                    <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>{resultado.result}</p>
                </div>
            )}
        </div>
    );
}
