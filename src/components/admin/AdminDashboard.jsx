import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EspecialidadesCrud from './EspecialidadesCrud';
import DoctoresCrud from './DoctoresCrud';

export default function AdminDashboard() {
    const { usuarioActivo, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('areas');

    return (
        <div className="portal-container">
            <div className="portal-header" style={{ background: 'var(--text-dark)' }}>
                <h2>Panel de Administración Clínica</h2>
                <p>Bienvenido, {usuarioActivo?.username}. Configuración del sistema.</p>
                <button 
                    onClick={logout} 
                    className="btn-cancel" 
                    style={{ marginTop: '1rem', padding: '0.5rem 2rem', borderRadius: '8px' }}
                >
                    Cerrar Sesión Segura
                </button>
            </div>

            <div className="portal-tabs">
                <button 
                    className={`portal-tab ${activeTab === 'areas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('areas')}
                >
                    🏢 Áreas Médicas
                </button>
                <button 
                    className={`portal-tab ${activeTab === 'doctores' ? 'active' : ''}`}
                    onClick={() => setActiveTab('doctores')}
                >
                    🩺 Funcionarios
                </button>
            </div>

            <div className="portal-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {activeTab === 'areas' && <EspecialidadesCrud />}
                {activeTab === 'doctores' && <DoctoresCrud />}
            </div>
        </div>
    );
}
