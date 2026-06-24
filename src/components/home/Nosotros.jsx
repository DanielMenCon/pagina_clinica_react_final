/* Nosotros - Sección informativa "Conócenos". */

export default function Nosotros() {
    return (
        <section id="nosotros" className="info-section bg-light">
            <div className="container">
                <h2>Conócenos</h2>
                <div className="grid-2-cols">
                    <div className="text-block">
                        <p>
                            Somos parte de la principal red docente de salud del país. La{' '}
                            <strong>Clínica Universitaria</strong> ha capacitado a generaciones de
                            excelentes médicos y ha salvaguardado la vida de múltiples comunidades.
                        </p>
                        <p>
                            Contamos con profesionales en formación guiados exhaustivamente por
                            especialistas internacionales.
                        </p>
                    </div>
                    <div className="image-block">
                        <figure>
                            <img
                                src="/pagina_clinica_react_final/images/medical_team.png"
                                alt="Equipo de médicos y enfermeras de la Clínica Universitaria"
                                loading="lazy"
                                decoding="async"
                                width="720"
                                height="480"
                                className="rounded-shadow-img"
                            />
                            <figcaption className="sr-only">
                                Equipo de médicos y enfermeras de la Clínica Universitaria
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
