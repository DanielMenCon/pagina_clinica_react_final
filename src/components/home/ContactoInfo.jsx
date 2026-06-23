/* ContactoInfo - Ubicación, contacto y mapa del campus. */
import { Link } from 'react-router-dom';

export default function ContactoInfo() {
    return (
        <section id="contacto" className="info-section dark-blue text-white">
            <div className="container">
                <h2>Nuestra Ubicación y Contacto</h2>
                <div className="contact-grid">
                    <div className="contact-details">
                        <p><strong>Sede Principal:</strong> Av. Salud Pública Universitaria 1234.</p>
                        <p><strong>Mesa Central:</strong> +56 2 2000 0000</p>
                        <p><strong>Reserva de Horas:</strong> +56 9 8000 1234</p>
                        <p className="mt-20">
                            Comprometidos con el desarrollo médico y el bienestar de la comunidad
                            desde 1999.
                        </p>
                        <Link to="/registro?tab=contacto" className="btn-outline mt-15">
                            Déjanos un Mensaje
                        </Link>
                    </div>
                    <div className="contact-map">
                        <figure>
                            <img
                                src="/images/campus_map.png"
                                alt="Mapa del campus médico con ubicación de la Clínica Universitaria"
                                loading="lazy"
                                decoding="async"
                                width="640"
                                height="480"
                                className="rounded-shadow-img-heavy"
                            />
                            <figcaption className="sr-only">
                                Mapa isométrico que muestra la ubicación del campus médico
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
