/* CtaRegistro - Call to Action para crear cuenta de paciente. */
import { Link } from 'react-router-dom';

export default function CtaRegistro() {
    return (
        <section id="registro-cta" className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2>Tu Salud, a un Clic de Distancia</h2>
                    <p className="section-desc center-desc">
                        Al registrarte de forma gratuita en <strong>Mi Portal Universitario</strong>{' '}
                        obtienes acceso instantáneo a tu historial médico, reserva ágil de horas con
                        especialistas, visualización de resultados de exámenes en línea y una
                        comunicación directa con nuestro equipo médico.
                    </p>
                    <Link to="/registro" className="cta-btn">Crear Cuenta de Paciente</Link>
                </div>
            </div>
        </section>
    );
}
