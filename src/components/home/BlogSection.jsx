/* BlogSection - Grid de artículos de salud preventiva. */
import { articulosBlog } from '../../utils/mockData';

export default function BlogSection() {
    return (
        <section id="blog" className="info-section">
            <div className="container text-center">
                <h2>Educación y Salud Preventiva</h2>
                <p className="section-desc center-desc">
                    Mantente informado con nuestros artículos médicos redactados por los
                    especialistas de Clínica Universitaria.
                </p>
                <div className="blog-grid">
                    {articulosBlog.map((art, index) => (
                        <article className="blog-card" key={index}>
                            <div className={`blog-img ${art.imgClass}`}></div>
                            <div className="blog-content">
                                <h3>{art.titulo}</h3>
                                <p>{art.desc}</p>
                                <a href="#blog" className="blog-link">Leer artículo completo &rarr;</a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
