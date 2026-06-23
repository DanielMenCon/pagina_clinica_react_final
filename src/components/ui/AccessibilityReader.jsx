import { useState, useEffect, useRef } from 'react';

export default function AccessibilityReader() {
    const [isActive, setIsActive] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = window.speechSynthesis;
    const hoverTimer = useRef(null);

    // Activar o desactivar el lector
    const toggleReader = () => {
        setIsActive(prev => !prev);
        if (isActive) {
            synth.cancel();
            setIsSpeaking(false);
        } else {
            // Notificar al usuario que el modo ha sido activado
            const utterance = new SpeechSynthesisUtterance("Modo lectura activado. Pase el cursor sobre los textos para escucharlos.");
            utterance.lang = 'es-ES';
            synth.speak(utterance);
        }
    };

    // Función para hablar
    const speakText = (text) => {
        if (!text || text.trim() === '') return;
        synth.cancel(); // Detener lectura anterior
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        
        synth.speak(utterance);
    };

    // Manejar el clic global si el lector está activo
    useEffect(() => {
        if (!isActive) {
            document.body.classList.remove('reader-active');
            return;
        }

        document.body.classList.add('reader-active');

        let currentTarget = null;

        const handleMouseOver = (e) => {
            if (e.target.closest('.accessibility-reader-btn')) return;

            const textElement = e.target.closest('p, h1, h2, h3, h4, h5, h6, span, a, button, li, label, th, td');
            if (textElement && textElement !== currentTarget) {
                currentTarget = textElement;
                
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
                
                // Esperamos un poco para no leer si solo está pasando el ratón rápido
                hoverTimer.current = setTimeout(() => {
                    speakText(textElement.innerText || textElement.textContent);
                }, 400);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('.accessibility-reader-btn')) return;
            
            const textElement = e.target.closest('p, h1, h2, h3, h4, h5, h6, span, a, button, li, label, th, td');
            // Cancelar si salimos completamente del elemento (no si entramos a un hijo)
            if (textElement && e.relatedTarget && !textElement.contains(e.relatedTarget)) {
                currentTarget = null;
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
                synth.cancel();
                setIsSpeaking(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver, true);
        document.addEventListener('mouseout', handleMouseOut, true);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver, true);
            document.removeEventListener('mouseout', handleMouseOut, true);
            document.body.classList.remove('reader-active');
        };
    }, [isActive]);

    // Limpiar al desmontar
    useEffect(() => {
        return () => {
            synth.cancel();
        };
    }, []);

    return (
        <button 
            className={`accessibility-reader-btn ${isActive ? 'active' : ''} ${isSpeaking ? 'speaking' : ''}`}
            onClick={toggleReader}
            aria-label={isActive ? "Desactivar lector de voz" : "Activar lector de voz"}
            title={isActive ? "Desactivar lector de voz" : "Activar lector de voz"}
        >
            <span className="reader-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isActive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                )}
            </span>
            <span className="reader-text sr-only">
                {isActive ? 'Lector Activo' : 'Lector de Voz'}
            </span>
        </button>
    );
}
