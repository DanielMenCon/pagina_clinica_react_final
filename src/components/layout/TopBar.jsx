/* 
  TopBar - Barra superior con accesos directos y menú de usuario.
  Migrado de: auth_global.js (lógica de menú personalizado)
  Consume AuthContext para determinar qué mostrar.
*/
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopBar() {
    const { usuarioActivo, logout, isLoggedIn } = useAuth();

    return (
        <div className="top-bar">
            <div className="container top-bar-inner">
                <span className="top-bar-text">Accesos directos para nuestros pacientes</span>
                <div className="top-bar-links">
                    {isLoggedIn ? (
                        <>
                            {/* Menú personalizado cuando hay sesión activa */}
                            <span className="top-link" style={{ color: 'var(--text-dark)', cursor: 'default', marginRight: '1rem' }}>
                                👤 Hola, <strong style={{ color: 'var(--primary-blue)' }}>{usuarioActivo.username}</strong>
                            </span>
                            <Link to="/portal" className="top-link highlight-link">⚙️ Mi Portal</Link>
                            <a
                                href="#"
                                className="top-link"
                                style={{ color: 'var(--alert-red)', fontWeight: 'bold' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            >
                                🚪 Cerrar Sesión
                            </a>
                        </>
                    ) : (
                        <>
                            {/* Enlaces genéricos sin sesión */}
                            <Link to="/portal" className="top-link">📅 Reserva de Horas</Link>
                            <Link to="/portal" className="top-link">📄 Resultados de Exámenes</Link>
                            <Link to="/portal" className="top-link highlight-link">🔐 Mi Portal Universitario</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
