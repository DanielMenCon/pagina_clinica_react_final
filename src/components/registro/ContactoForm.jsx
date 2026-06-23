/* 
  ContactoForm - Formulario de contacto con contador de caracteres en tiempo real.
  Migrado de: registro.js (Sección 6)
  El contador se actualiza cada vez que el usuario escribe (evento onChange).
*/
import { useState } from 'react';
import { validarDatos, sanitizarDatos } from '../../utils/validaciones';
import FormMessage from '../ui/FormMessage';

export default function ContactoForm() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensajeTexto, setMensajeTexto] = useState('');
    const [feedback, setFeedback] = useState({ text: '', isError: false });

    // Contador de caracteres en tiempo real
    const charCount = mensajeTexto.length;
    const limitReached = charCount >= 200;

    function handleSubmit(event) {
        event.preventDefault();

        const nombreSanit = sanitizarDatos(nombre.trim());
        const emailSanit = sanitizarDatos(email.trim());
        const mensajeSanit = sanitizarDatos(mensajeTexto.trim());

        // Validar campos
        const resultado = validarDatos('contacto', {
            nombre: nombreSanit,
            email: emailSanit,
            mensaje: mensajeSanit
        });

        if (!resultado.valido) {
            setFeedback({ text: resultado.mensaje, isError: true });
            return;
        }

        // Mostrar éxito, limpiar formulario y reiniciar contador
        setFeedback({ text: 'Tu mensaje ha sido enviado correctamente.', isError: false });
        setNombre('');
        setEmail('');
        setMensajeTexto('');
    }

    return (
        <div className="auth-content">
            <h3 className="tab-title">Contáctanos</h3>
            <form onSubmit={handleSubmit} aria-label="Formulario de contacto">
                <div className="form-group">
                    <label htmlFor="cont-nombre">Nombre Completo</label>
                    <input
                        type="text"
                        id="cont-nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cont-email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="cont-email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cont-mensaje">Mensaje</label>
                    <textarea
                        id="cont-mensaje"
                        name="mensaje"
                        rows="4"
                        placeholder="Escribe tu mensaje aquí..."
                        maxLength="200"
                        value={mensajeTexto}
                        onChange={(e) => setMensajeTexto(e.target.value)}
                    ></textarea>
                    <div className={`char-counter ${limitReached ? 'limit-reached' : ''}`}>
                        <span>{charCount}</span>/200 caracteres
                    </div>
                </div>

                <FormMessage message={feedback.text} isError={feedback.isError} />
                <button type="submit" className="btn-primary w-100 mt-15">Enviar Mensaje</button>
            </form>
        </div>
    );
}
