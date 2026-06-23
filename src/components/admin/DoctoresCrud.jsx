import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';

export default function DoctoresCrud() {
    const { profesionales, especialidades, agregarProfesional, eliminarProfesional } = useAppointments();
    
    const [nombre, setNombre] = useState('');
    const [especialidadId, setEspecialidadId] = useState('');
    const [foto, setFoto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !especialidadId || !foto.trim()) return;

        agregarProfesional({
            nombre,
            especialidadId,
            foto
        });

        setNombre('');
        setEspecialidadId('');
        setFoto('');
    };

    return (
        <div className="admin-crud-panel fade-in">
            <h3 className="text-center" style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem' }}>
                Gestión de Funcionarios (Médicos)
            </h3>

            {/* Formulario de Creación */}
            <form onSubmit={handleSubmit} className="admin-form" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #dcdcdc' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Dar de Alta a un Médico</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label className="form-label" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Nombre del Médico</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Ej. Dr. Juan Pérez"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #ccc', borderRadius: '8px', fontFamily: 'var(--font-body)' }}
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Área / Especialidad</label>
                        <select 
                            className="form-input" 
                            value={especialidadId}
                            onChange={(e) => setEspecialidadId(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #ccc', borderRadius: '8px', fontFamily: 'var(--font-body)' }}
                        >
                            <option value="" disabled>Seleccione un área...</option>
                            {especialidades.map(esp => (
                                <option key={esp.id} value={esp.id}>{esp.icono} {esp.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label className="form-label" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>URL de Fotografía</label>
                        <input 
                            type="url" 
                            className="form-input" 
                            placeholder="https://ejemplo.com/foto.jpg"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #ccc', borderRadius: '8px', fontFamily: 'var(--font-body)' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ height: '48px', padding: '0 2rem' }}>
                        Registrar Médico
                    </button>
                </div>
            </form>

            {/* Lista de Doctores */}
            <div className="admin-list" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {profesionales.map(prof => {
                    const esp = especialidades.find(e => e.id === prof.especialidadId);
                    return (
                        <div key={prof.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                            <img 
                                src={prof.foto} 
                                alt={prof.nombre} 
                                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--secondary-blue)' }} 
                            />
                            <div style={{ flex: 1 }}>
                                <h5 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)' }}>{prof.nombre}</h5>
                                <p style={{ margin: '0.2rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {esp ? `${esp.icono} ${esp.nombre}` : 'Área desconocida'}
                                </p>
                            </div>
                            <button 
                                className="btn-cancel" 
                                onClick={() => eliminarProfesional(prof.id)}
                                style={{ padding: '0.5rem', borderRadius: '8px', border: 'none', background: 'var(--alert-red)', color: 'white', cursor: 'pointer' }}
                                title="Dar de baja"
                            >
                                🗑️
                            </button>
                        </div>
                    );
                })}
            </div>
            {profesionales.length === 0 && (
                <p className="text-center" style={{ color: 'var(--text-muted)' }}>No hay médicos registrados.</p>
            )}
        </div>
    );
}
