/* 
  RegistroForm - Formulario de registro de nuevos usuarios.
  Migrado de: registro.js (Sección 4)
  Usa useState para campos, validarDatos() para validación, y AuthContext para persistencia.
*/
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validarDatos, sanitizarDatos } from '../../utils/validaciones';
import FormMessage from '../ui/FormMessage';

export default function RegistroForm({ onRegistroExitoso }) {
    // Estado local para los campos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [mensaje, setMensaje] = useState({ text: '', isError: false });

    const { registrar, usuariosInscritos } = useAuth();

    function getPasswordStrength(pass) {
        if (!pass) return { label: '', color: 'transparent', width: '0%' };
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/\d/.test(pass)) score++;
        
        if (score <= 2) return { label: 'Débil', color: 'var(--alert-red)', width: '33%' };
        if (score === 3) return { label: 'Media', color: 'var(--alert-yellow)', width: '66%' };
        return { label: 'Fuerte', color: 'var(--medical-green)', width: '100%' };
    }

    const strength = getPasswordStrength(password);

    /**
     * Manejo del envío del formulario.
     * event.preventDefault() evita la recarga de la página.
     */
    async function handleSubmit(event) {
        event.preventDefault();

        // Limpiar mensajes anteriores
        setMensaje({ text: '', isError: false });

        // Ejecutar la validación centralizada
        // Aplicar sanitización básica antes de validar
        const userSanit = sanitizarDatos(username.trim());
        const emailSanit = sanitizarDatos(email.trim());

        const resultado = validarDatos('registro', {
            user: userSanit,
            email: emailSanit,
            pass: password,
            confirm: confirm
        }, usuariosInscritos);

        // Si la validación falla, mostrar el error
        if (!resultado.valido) {
            setMensaje({ text: resultado.mensaje, isError: true });
            return;
        }

        // CREACIÓN DE OBJETO LITERAL: Representar al nuevo usuario
        const nuevoUsuario = {
            username: userSanit,
            email: emailSanit,
            password: password
        };

        // Agregar el nuevo usuario usando el Context (registrar es async)
        await registrar(nuevoUsuario);

        // Mostrar mensaje de éxito y limpiar el formulario
        setMensaje({ text: '¡Registro completado! Ahora puedes iniciar sesión.', isError: false });
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirm('');

        // Redirigir automáticamente a la pestaña de Login después de 2 segundos
        setTimeout(() => {
            if (onRegistroExitoso) onRegistroExitoso();
        }, 2000);
    }

    return (
        <div className="auth-content">
            <h3 className="tab-title">Nuevo Usuario</h3>
            <form onSubmit={handleSubmit} aria-label="Formulario de registro">
                <div className="form-group">
                    <label htmlFor="reg-username">Nombre Completo</label>
                    <input
                        type="text"
                        id="reg-username"
                        name="username"
                        placeholder="Ej. Juan Pérez"
                        autoComplete="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reg-email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="reg-email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: password ? '0.5rem' : '1rem' }}>
                    <label htmlFor="reg-password">Contraseña</label>
                    <input
                        type="password"
                        id="reg-password"
                        name="password"
                        placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                {password && (
                    <div style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>
                        <div style={{ height: '4px', width: '100%', backgroundColor: '#eee', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                            <div style={{ height: '100%', width: strength.width, backgroundColor: strength.color, transition: 'all 0.3s' }}></div>
                        </div>
                        <span style={{ color: strength.color, fontWeight: 'bold', display: 'block', marginTop: '2px' }}>
                            Seguridad: {strength.label}
                        </span>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="reg-confirm">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="reg-confirm"
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        onPaste={(e) => { e.preventDefault(); /* Prevenir pegar contraseñas */ }}
                    />
                </div>

                <FormMessage message={mensaje.text} isError={mensaje.isError} />
                <button type="submit" className="btn-primary w-100 mt-15">Registrarse</button>
            </form>
        </div>
    );
}
