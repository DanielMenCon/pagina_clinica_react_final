/* 
  Toast - Notificación flotante temporal.
  Reemplaza: showToast() de triage.js
  Se auto-destruye después de 3 segundos.
*/
import { useState, useEffect } from 'react';

export default function Toast({ message, onClose }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Programar desaparición tras 3 segundos
        const timer = setTimeout(() => {
            setFadeOut(true);
            // Llamar onClose tras la animación (300ms)
            setTimeout(() => {
                if (onClose) onClose();
            }, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast-notification ${fadeOut ? 'fade-out' : ''}`}>
            <span>✅</span>
            <span>{message}</span>
        </div>
    );
}
