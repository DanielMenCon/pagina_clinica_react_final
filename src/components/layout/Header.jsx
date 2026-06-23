/* 
  Header - Encabezado principal con navegación.
  Migrado del <header> presente en las 3 páginas HTML originales.
  Usa <Link> de React Router en vez de <a href>.
*/
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isLoggedIn, usuarioActivo } = useAuth();

    return (
        <header className="site-header" role="banner">
            <div className="logo-container">
                <h1 className="clinic-title">Clínica Universitaria</h1>
                <p className="clinic-subtitle">Salud, Equidad y Excelencia</p>
            </div>

            <nav className="main-nav" aria-label="Navegación principal" role="navigation">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/#especialidades">Servicios</Link></li>
                    <li><Link to="/#nosotros">Nosotros</Link></li>
                    
                    {isLoggedIn && (
                        <li>
                            <Link to="/portal" style={{ color: 'var(--alert-yellow)', fontWeight: 'bold' }}>
                                {usuarioActivo?.rol === 'admin' ? '⚙️ Panel Admin' : '📅 Agendar Hora'}
                            </Link>
                        </li>
                    )}
                    
                    <li><Link to="/#contacto">Contacto</Link></li>
                    <li><Link to="/triage" className="btn-highlight">Urgencias y Triage</Link></li>
                </ul>
            </nav>
        </header>
    );
}
