import React, { useState } from 'react';
import { useAppointments, HORARIOS_DISPONIBLES } from '../../context/AppointmentContext';

export default function ListaCitas() {
    const { citasUsuario, cancelarCita, reagendarCita } = useAppointments();
    
    // Estado para saber qué cita se está editando
    const [editandoId, setEditandoId] = useState(null);
    const [nuevaFecha, setNuevaFecha] = useState('');
    const [nuevaHora, setNuevaHora] = useState('');

    const handleCancelar = (id) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            cancelarCita(id);
        }
    };

    const iniciarEdicion = (cita) => {
        setEditandoId(cita.id);
        setNuevaFecha(cita.fecha);
        setNuevaHora(cita.hora);
    };

    const guardarEdicion = (id) => {
        reagendarCita(id, nuevaFecha, nuevaHora);
        setEditandoId(null);
    };

    if (citasUsuario.length === 0) {
        return (
            <div className="empty-state fade-in">
                <span>📅</span>
                <h3>No tienes citas médicas programadas</h3>
                <p>Ve a la pestaña "Reservar Nueva Hora" para agendar tu primera cita.</p>
            </div>
        );
    }

    return (
        <div className="citas-grid fade-in">
            {citasUsuario.map(cita => (
                <div key={cita.id} className="cita-card">
                    <div className="cita-header">
                        <h4>{cita.especialidadNombre}</h4>
                        <span className="cita-estado">{cita.estado}</span>
                    </div>
                    
                    <div className="cita-info">
                        <p><strong>Profesional:</strong> {cita.profesionalNombre}</p>
                        
                        {editandoId === cita.id ? (
                            <div style={{ marginTop: '1rem', background: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
                                <label>Nueva Fecha:</label>
                                <input 
                                    type="date" 
                                    className="date-input" 
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    value={nuevaFecha}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setNuevaFecha(e.target.value)}
                                />
                                
                                <label>Nueva Hora:</label>
                                <select 
                                    className="date-input" 
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    value={nuevaHora} 
                                    onChange={(e) => setNuevaHora(e.target.value)}
                                >
                                    <option value="" disabled>Selecciona Hora</option>
                                    {HORARIOS_DISPONIBLES.map(h => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                                
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-small" style={{background: 'var(--medical-green)', color: 'white'}} onClick={() => guardarEdicion(cita.id)}>Guardar</button>
                                    <button className="btn-small" onClick={() => setEditandoId(null)}>Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p><strong>Fecha:</strong> {cita.fecha}</p>
                                <p><strong>Hora:</strong> {cita.hora}</p>
                                
                                <div className="cita-actions">
                                    <button className="btn-small btn-secondary" onClick={() => iniciarEdicion(cita)}>
                                        Reagendar
                                    </button>
                                    <button className="btn-small btn-cancel" onClick={() => handleCancelar(cita.id)}>
                                        Cancelar Cita
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
