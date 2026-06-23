/* 
  PortalUsuario - Dashboard del paciente después del login.
  Migrado de: registro.js (mostrarPortal) y portal.js (navegación interna)
  Muestra datos del usuario desde AuthContext.
*/
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PortalUsuario({ onVerExamenes, onVerHoras, onLogout }) {
    const { usuarioActivo } = useAuth();

    return (
        <div className="auth-content">
            <h3 className="tab-title">Bienvenido a Mi Portal</h3>
            <div className="portal-dashboard text-center">
                <img src="/images/icon_cardio.png" alt="Icono Usuario" className="portal-avatar" />
                <h4 className="portal-username">{usuarioActivo?.username || 'Cargando...'}</h4>
                <p className="portal-email">{usuarioActivo?.email || '...'}</p>

                <div className="portal-actions">
                    {usuarioActivo?.rol === 'admin' ? (
                        <Link to="/portal" className="btn-primary w-100" style={{ marginBottom: '10px' }}>
                            ⚙️ Panel de Administración
                        </Link>
                    ) : (
                        <>
                            <Link to="/portal" className="btn-primary w-100" style={{ marginBottom: '10px' }}>
                                📅 Agendar Nueva Hora
                            </Link>
                            <Link to="/portal" className="btn-primary outline w-100" style={{ marginBottom: '10px' }}>
                                🕒 Mis Horas Médicas
                            </Link>
                            <button className="btn-primary outline w-100" onClick={onVerExamenes} style={{ marginBottom: '10px' }}>
                                Resultados de Exámenes
                            </button>
                            <Link to="/triage" className="btn-primary w-100" style={{ marginBottom: '10px' }}>
                                Autoevaluación de Gravedad (Triage)
                            </Link>
                        </>
                    )}
                </div>

                <button className="btn-primary btn-danger w-100" onClick={onLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
