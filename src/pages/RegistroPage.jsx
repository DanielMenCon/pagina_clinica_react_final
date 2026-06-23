/* 
  RegistroPage - Página de acceso con pestañas (Registro, Login, Contacto, Portal).
  Migrado de: registro.html + registro.js + portal.js
  
  Maneja la navegación por pestañas con useState.
  Lee ?tab= de la URL con useSearchParams.
  Si hay sesión activa, muestra el portal automáticamente.
*/
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RegistroPage.css';

import RegistroForm from '../components/registro/RegistroForm';
import LoginForm from '../components/registro/LoginForm';
import ContactoForm from '../components/registro/ContactoForm';
import PortalUsuario from '../components/registro/PortalUsuario';
import TablaExamenes from '../components/registro/TablaExamenes';

export default function RegistroPage() {
    const [searchParams] = useSearchParams();
    const { isLoggedIn, logout } = useAuth();

    // Pestaña activa: 'registro', 'login', 'contacto', 'portal', 'examenes', 'horas'
    const [activeTab, setActiveTab] = useState('registro');

    // Determinar si el contenedor debe estar expandido (para tablas)
    const isExpanded = activeTab === 'examenes' || activeTab === 'horas';

    // Al cargar la página: verificar sesión y leer parámetros de URL
    useEffect(() => {
        if (isLoggedIn) {
            // Si hay sesión activa → ir al portal (o tab desde URL si es 'portal')
            setActiveTab('portal');
        } else {
            // Leer parámetro ?tab= de la URL
            const tabParam = searchParams.get('tab');
            if (tabParam && ['registro', 'login', 'contacto'].includes(tabParam)) {
                setActiveTab(tabParam);
            } else {
                setActiveTab('registro');
            }
        }
    }, [isLoggedIn, searchParams]);

    // Cambiar pestaña (solo si no hay sesión activa o es el portal)
    function handleTabChange(tab) {
        if (isLoggedIn && tab !== 'portal') return;
        setActiveTab(tab);
    }

    // Callbacks de navegación interna
    function handleRegistroExitoso() {
        setActiveTab('login');
    }

    function handleLoginExitoso() {
        setActiveTab('portal');
    }

    function handleLogout() {
        logout();
        setActiveTab('login');
    }

    return (
        <>
            <div className="auth-main">
                <div className={`auth-container ${isExpanded ? 'expanded' : ''}`}>
                    <h2 className="text-center auth-title">Portal de Acceso Clínico</h2>
                    <p className="text-center auth-subtitle">
                        Gestiona tus credenciales o contáctanos para asistencia.
                    </p>

                    {/* TABS - Solo visibles si NO hay sesión activa */}
                    {!isLoggedIn && (
                        <div className="auth-tabs">
                            <button
                                className={`btn-primary tab-btn ${activeTab !== 'registro' ? 'outline' : ''}`}
                                onClick={() => handleTabChange('registro')}
                            >
                                Registro
                            </button>
                            <button
                                className={`btn-primary tab-btn ${activeTab !== 'login' ? 'outline' : ''}`}
                                onClick={() => handleTabChange('login')}
                            >
                                Ingresar
                            </button>
                            <button
                                className={`btn-primary tab-btn ${activeTab !== 'contacto' ? 'outline' : ''}`}
                                onClick={() => handleTabChange('contacto')}
                            >
                                Contacto
                            </button>
                        </div>
                    )}

                    <div className="auth-forms-wrapper">
                        {/* Renderizado condicional de la pestaña activa */}
                        {activeTab === 'registro' && (
                            <RegistroForm onRegistroExitoso={handleRegistroExitoso} />
                        )}

                        {activeTab === 'login' && (
                            <LoginForm onLoginExitoso={handleLoginExitoso} />
                        )}

                        {activeTab === 'contacto' && (
                            <ContactoForm />
                        )}

                        {activeTab === 'portal' && (
                            <PortalUsuario
                                onVerExamenes={() => setActiveTab('examenes')}
                                onLogout={handleLogout}
                            />
                        )}

                        {activeTab === 'examenes' && (
                            <TablaExamenes onVolver={() => setActiveTab('portal')} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
