/* 
  TriagePage - Página de urgencias con pestañas (Paciente, Profesional, ESI).
  Migrado de: triage.html + triage.js
  Maneja tabs y autenticación profesional con useState.
*/
import { useState } from 'react';
import './TriagePage.css';
import Toast from '../components/ui/Toast';
import UrgencyBanner from '../components/triage/UrgencyBanner';
import PatientForm from '../components/triage/PatientForm';
import ProfLoginForm from '../components/triage/ProfLoginForm';
import ProfEsiForm from '../components/triage/ProfEsiForm';

export default function TriagePage() {
    // Tab activa: 'patient', 'login', 'prof'
    const [activeTab, setActiveTab] = useState('patient');
    const [showToast, setShowToast] = useState(false);

    function handleProfLoginExitoso() {
        setActiveTab('prof');
        setShowToast(true);
    }

    return (
        <section id="urgencias" className="urgency-section">
            <UrgencyBanner />

            {/* Tabs de navegación */}
            <div className="triage-tabs">
                <button
                    className={`btn-primary tab-btn ${activeTab !== 'patient' ? 'outline' : ''}`}
                    onClick={() => setActiveTab('patient')}
                >
                    Autoevaluación Paciente
                </button>
                <button
                    className={`btn-primary tab-btn ${activeTab !== 'login' && activeTab !== 'prof' ? 'outline' : ''}`}
                    onClick={() => setActiveTab(activeTab === 'prof' ? 'prof' : 'login')}
                >
                    Acceso Profesionales
                </button>
            </div>

            <div className="triage-section bg-light">
                <div className="container">
                    {activeTab === 'patient' && <PatientForm />}
                    {activeTab === 'login' && <ProfLoginForm onLoginExitoso={handleProfLoginExitoso} />}
                    {activeTab === 'prof' && <ProfEsiForm />}
                </div>
            </div>

            {/* Toast de notificación */}
            {showToast && (
                <Toast
                    message="Autenticación exitosa. Bienvenido al panel ESI."
                    onClose={() => setShowToast(false)}
                />
            )}
        </section>
    );
}
