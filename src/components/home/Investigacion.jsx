/* Investigacion - Sección de Investigación y Desarrollo Docente. */

export default function Investigacion() {
    return (
        <section id="investigacion" className="info-section">
            <div className="container">
                <div className="grid-2-cols rtl-layout">
                    <div className="image-block ltr-layout">
                        <figure>
                            <img
                                src="/images/laboratorio.png"
                                alt="Investigadores trabajando en el laboratorio de la Clínica Universitaria"
                                loading="lazy"
                                decoding="async"
                                width="720"
                                height="480"
                                className="rounded-shadow-img"
                            />
                            <figcaption className="sr-only">
                                Laboratorio de investigación y desarrollo de la Clínica Universitaria
                            </figcaption>
                        </figure>
                    </div>
                    <div className="text-block ltr-layout">
                        <h2>Investigación y Desarrollo Docente</h2>
                        <p>
                            Inspirados en los principales centros académicos de salud, somos un
                            pionero polo de desarrollo científico. Colaboramos directamente con las
                            facultades de Medicina y Ciencias para realizar ensayos clínicos de
                            frontera.
                        </p>
                        <p>
                            Tus médicos no solo te tratan; también descubren y enseñan los
                            tratamientos del mañana.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
