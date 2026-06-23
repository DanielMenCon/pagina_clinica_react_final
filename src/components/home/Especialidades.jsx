/* Especialidades - Grid de tarjetas de servicios médicos. */
import { especialidades } from '../../utils/mockData';

export default function Especialidades() {
    return (
        <section id="especialidades" className="info-section">
            <div className="container text-center">
                <h2>Especialidades Médicas</h2>
                <p className="section-desc center-desc">
                    Contamos con una red integral de expertos para resolver todas tus necesidades de salud.
                </p>

                <div className="services-grid">
                    {especialidades.map((esp, index) => (
                        <div className="service-card" key={index}>
                            <img
                                src={esp.icono}
                                alt={`Icono - ${esp.nombre}`}
                                className="service-icon-img"
                                loading="lazy"
                                decoding="async"
                                width="64"
                                height="64"
                            />
                            <h3>{esp.nombre}</h3>
                            <p>{esp.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
