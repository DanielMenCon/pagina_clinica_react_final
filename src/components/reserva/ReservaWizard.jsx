import React, { useState } from 'react';
import { useAppointments, HORARIOS_DISPONIBLES } from '../../context/AppointmentContext';

export default function ReservaWizard({ onReservaCompletada }) {
    const { agendarCita, especialidades, profesionales } = useAppointments();
    
    const [step, setStep] = useState(1);
    
    // Estado de la reserva actual
    const [especialidadId, setEspecialidadId] = useState('');
    const [profesionalId, setProfesionalId] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const profesionalesFiltrados = profesionales.filter(p => p.especialidadId === especialidadId);

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleConfirmar = () => {
        const prof = profesionales.find(p => p.id === profesionalId);
        const esp = especialidades.find(e => e.id === especialidadId);

        agendarCita({
            especialidadNombre: esp.nombre,
            profesionalNombre: prof.nombre,
            fecha,
            hora
        });
        
        onReservaCompletada();
    };

    return (
        <div className="wizard-container">
            {/* Indicador de Progreso */}
            <div className="wizard-progress">
                {[1, 2, 3, 4].map(num => (
                    <div 
                        key={num} 
                        className={`wizard-step-indicator ${step === num ? 'active' : ''} ${step > num ? 'completed' : ''}`}
                    >
                        {step > num ? '✓' : num}
                    </div>
                ))}
            </div>

            {/* Paso 1: Especialidad */}
            {step === 1 && (
                <div className="wizard-step fade-in">
                    <h3>Paso 1: Elige la Especialidad</h3>
                    <div className="selection-grid">
                        {especialidades.map(esp => (
                            <div 
                                key={esp.id}
                                className={`selection-card ${especialidadId === esp.id ? 'selected' : ''}`}
                                onClick={() => {
                                    setEspecialidadId(esp.id);
                                    setProfesionalId(''); // Reset prof when changing esp
                                }}
                            >
                                <div className="card-icon">{esp.icono}</div>
                                <h4>{esp.nombre}</h4>
                            </div>
                        ))}
                    </div>
                    <div className="wizard-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn-primary" onClick={handleNext} disabled={!especialidadId}>
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Paso 2: Profesional */}
            {step === 2 && (
                <div className="wizard-step fade-in">
                    <h3>Paso 2: Selecciona un Profesional</h3>
                    <div className="selection-grid">
                        {profesionalesFiltrados.map(prof => (
                            <div 
                                key={prof.id}
                                className={`selection-card ${profesionalId === prof.id ? 'selected' : ''}`}
                                onClick={() => setProfesionalId(prof.id)}
                            >
                                <img src={prof.foto} alt={prof.nombre} className="prof-foto" />
                                <h4>{prof.nombre}</h4>
                            </div>
                        ))}
                    </div>
                    <div className="wizard-actions">
                        <button className="btn-secondary" onClick={handlePrev}>Atrás</button>
                        <button className="btn-primary" onClick={handleNext} disabled={!profesionalId}>
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Paso 3: Fecha y Hora */}
            {step === 3 && (
                <div className="wizard-step fade-in">
                    <h3>Paso 3: Fecha y Hora</h3>
                    <div className="date-picker-container">
                        <label>Selecciona una Fecha:</label>
                        <input 
                            type="date" 
                            className="date-input" 
                            value={fecha}
                            min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
                            onChange={(e) => setFecha(e.target.value)}
                        />

                        {fecha && (
                            <div style={{ width: '100%', marginTop: '1rem' }}>
                                <label>Horarios Disponibles:</label>
                                <div className="time-grid">
                                    {HORARIOS_DISPONIBLES.map(h => (
                                        <button 
                                            key={h}
                                            className={`time-btn ${hora === h ? 'selected' : ''}`}
                                            onClick={() => setHora(h)}
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="wizard-actions">
                        <button className="btn-secondary" onClick={handlePrev}>Atrás</button>
                        <button className="btn-primary" onClick={handleNext} disabled={!fecha || !hora}>
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Paso 4: Confirmación */}
            {step === 4 && (
                <div className="wizard-step fade-in">
                    <h3>Paso 4: Confirma tu Reserva</h3>
                    
                    <div className="confirmation-summary">
                        <p><strong>Especialidad:</strong> {especialidades.find(e => e.id === especialidadId)?.nombre}</p>
                        <p><strong>Profesional:</strong> {profesionales.find(p => p.id === profesionalId)?.nombre}</p>
                        <p><strong>Fecha:</strong> {fecha}</p>
                        <p><strong>Hora:</strong> {hora}</p>
                    </div>

                    <div className="wizard-actions">
                        <button className="btn-secondary" onClick={handlePrev}>Atrás</button>
                        <button className="btn-primary" onClick={handleConfirmar}>
                            Confirmar Reserva
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
