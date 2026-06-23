/* 
  LoginForm - Formulario de inicio de sesión.
  Migrado de: registro.js (Sección 5)
  Busca credenciales en el arreglo de usuarios con .find()
*/
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { validarDatos, sanitizarDatos } from '../../utils/validaciones';
import FormMessage from '../ui/FormMessage';

export default function LoginForm({ onLoginExitoso }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState({ text: '', isError: false });

    const { login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();

        const emailSanit = sanitizarDatos(email.trim());

        // Validar campos obligatorios
        const resultado = validarDatos('login', {
            email: emailSanit,
            pass: password
        });

        if (!resultado.valido) {
            setMensaje({ text: resultado.mensaje, isError: true });
            return;
        }

        // BÚSQUEDA EN EL ARREGLO (login es async porque compara hashes)
        const usuario = await login(emailSanit, password);

        if (usuario) {
            setMensaje({ text: 'Autenticando...', isError: false });
            setEmail('');
            setPassword('');

            // Transición al portal después de 500ms
            setTimeout(() => {
                if (onLoginExitoso) onLoginExitoso(usuario);
            }, 500);
        } else {
            setMensaje({ text: 'Correo o contraseña incorrectos.', isError: true });
        }
    }

    return (
        <div className="auth-content">
            <h3 className="tab-title">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión" noValidate>
                <div className="form-group">
                    <label htmlFor="log-email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="log-email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="log-password">Contraseña</label>
                    <input
                        type="password"
                        id="log-password"
                        name="password"
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <FormMessage message={mensaje.text} isError={mensaje.isError} />
                <button type="submit" className="btn-primary w-100 mt-15">Ingresar</button>
            </form>
        </div>
    );
}
