/* 
  HeroCarousel - Portada con carrusel de fondo automático.
  Migrado de: index.js (lógica del carrusel)
  Usa useState para el índice, useEffect con setInterval para rotación automática,
  y useRef para mantener el interval ID.
*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { imagenesCarrusel } from '../../utils/mockData';

export default function HeroCarousel() {
    const [indiceActual, setIndiceActual] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const intervaloRef = useRef(null);

    /**
     * cambiarImagen(direccion)
     * Función modular que actualiza la imagen mostrada en el carrusel.
     * @param {number} direccion - 1 para avanzar, -1 para retroceder
     */
    const cambiarImagen = useCallback((direccion) => {
        // Efecto de transición (Fade): hacer transparente primero
        setOpacity(0);

        setTimeout(() => {
            setIndiceActual(prev => {
                let nuevoIndice = prev + direccion;
                // LÓGICA CÍCLICA
                if (nuevoIndice >= imagenesCarrusel.length) {
                    nuevoIndice = 0;
                } else if (nuevoIndice < 0) {
                    nuevoIndice = imagenesCarrusel.length - 1;
                }
                return nuevoIndice;
            });
            setOpacity(1); // Fade-in
        }, 200);
    }, []);

    /**
     * Carrusel Automático: setInterval cada 4 segundos.
     * Se reinicia al hacer clic manual en los botones.
     */
    const iniciarCarrusel = useCallback(() => {
        intervaloRef.current = setInterval(() => {
            cambiarImagen(1);
        }, 4000);
    }, [cambiarImagen]);

    const resetearTemporizador = useCallback(() => {
        clearInterval(intervaloRef.current);
        iniciarCarrusel();
    }, [iniciarCarrusel]);

    // Inicialización: Arrancar el carrusel automático al montar el componente
    useEffect(() => {
        iniciarCarrusel();
        return () => clearInterval(intervaloRef.current); // Limpieza al desmontar
    }, [iniciarCarrusel]);

    return (
        <section id="portada" className="hero-section">
            {/* Carrusel actuando como fondo */}
            <div className="hero-carrusel-bg">
                <div className="carrusel-imagen-wrapper">
                    <img
                        src={imagenesCarrusel[indiceActual]}
                        alt="Instalaciones de la clínica"
                        className="carrusel-img"
                        style={{ opacity }}
                    />
                </div>
            </div>

            {/* Capa de superposición para contraste del texto */}
            <div className="hero-overlay"></div>

            {/* Controles del carrusel */}
            <button
                className="carrusel-btn btn-anterior"
                aria-label="Imagen anterior"
                onClick={() => { cambiarImagen(-1); resetearTemporizador(); }}
            >
                &#10094;
            </button>
            <button
                className="carrusel-btn btn-siguiente"
                aria-label="Imagen siguiente"
                onClick={() => { cambiarImagen(1); resetearTemporizador(); }}
            >
                &#10095;
            </button>

            {/* Contenido principal sobre el carrusel */}
            <div className="hero-content">
                <h2>Cuidamos de ti y de tu familia</h2>
                <p>Nuestra clínica presta servicios médicos de primera necesidad con tecnología de punta y un enfoque cálido y humano.</p>
                <div className="hero-buttons">
                    <Link to="/triage" className="btn-primary">Atención Inmediata (Triage)</Link>
                    <Link to="/registro" className="btn-outline">Acceder a Mi Portal</Link>
                </div>
            </div>
        </section>
    );
}
