import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PortalPacientePage.css';

import ReservaWizard from '../components/reserva/ReservaWizard';
import ListaCitas from '../components/reserva/ListaCitas';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function PortalPacientePage() {
    const { isLoggedIn, usuarioActivo } = useAuth();
    const navigate = useNavigate();
    
    // Si el usuario es administrador, renderizar el dashboard directamente
    const isAdmin = usuarioActivo?.rol === 'admin';

    // Tabs para el paciente: 'reservar' o 'mis-horas'
    const [activeTab, setActiveTab] = useState('mis-horas');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/registro?tab=login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    if (isAdmin) {
        return <AdminDashboard />;
    }

    return (
        <div className="portal-container">
            <div className="portal-header">
                <h2>Mi Portal de Salud</h2>
                <p>Bienvenido, {usuarioActivo?.username}. Agenda y administra tus citas médicas en un solo lugar.</p>
            </div>

            <div className="portal-tabs">
                <button 
                    className={`portal-tab ${activeTab === 'mis-horas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mis-horas')}
                >
                    Mis Citas Agendadas
                </button>
                <button 
                    className={`portal-tab ${activeTab === 'reservar' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reservar')}
                >
                    Nueva Reserva
                </button>
            </div>

            <div className="portal-content">
                {activeTab === 'mis-horas' && (
                    <ListaCitas onNuevaReserva={() => setActiveTab('reservar')} />
                )}
                
                {activeTab === 'reservar' && (
                    <ReservaWizard onReservaCompletada={() => setActiveTab('mis-horas')} />
                )}
            </div>
        </div>
    );
}
