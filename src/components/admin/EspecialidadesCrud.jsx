import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext';

export default function EspecialidadesCrud() {
    const { especialidades, agregarEspecialidad, eliminarEspecialidad } = useAppointments();
    const [nombre, setNombre] = useState('');
    const [icono, setIcono] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !icono.trim()) return;

        agregarEspecialidad({ nombre, icono });
        setNombre('');
        setIcono('');
    };

    return (
        <div className="admin-crud-panel fade-in">
            <h3 className="text-center" style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem' }}>
                Gestión de Especialidades (Áreas Médicas)
            </h3>

            {/* Formulario de Creación */}
            <form onSubmit={handleSubmit} className="admin-form" style={{ background: 'var(--bg-light)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #dcdcdc' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Crear Nueva Área</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <label className="form-label" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Nombre del Área</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Ej. Dermatología"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #ccc', borderRadius: '8px', fontFamily: 'var(--font-body)' }}
                        />
                    </div>
                    <div style={{ flex: '1 1 100px' }}>
                        <label className="form-label" style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Ícono (Emoji)</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Ej. 🧴"
                            value={icono}
                            onChange={(e) => setIcono(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', border: '2px solid #ccc', borderRadius: '8px', fontFamily: 'var(--font-body)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button type="submit" className="btn-primary" style={{ height: '48px', padding: '0 2rem' }}>
                            Añadir
                        </button>
                    </div>
                </div>
            </form>

            {/* Lista de Especialidades */}
            <div className="admin-list" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {especialidades.map(esp => (
                    <div key={esp.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #dcdcdc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '2rem' }}>{esp.icono}</span>
                            <strong style={{ color: 'var(--text-dark)' }}>{esp.nombre}</strong>
                        </div>
                        <button 
                            className="btn-cancel" 
                            onClick={() => eliminarEspecialidad(esp.id)}
                            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: 'var(--alert-red)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                            title="Eliminar especialidad"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
            {especialidades.length === 0 && (
                <p className="text-center" style={{ color: 'var(--text-muted)' }}>No hay especialidades registradas.</p>
            )}
        </div>
    );
}
