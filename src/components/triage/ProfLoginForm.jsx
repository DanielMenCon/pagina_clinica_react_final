/* 
  ProfLoginForm - Login de profesionales para acceder al panel ESI.
  Migrado de: triage.js (attemptLogin)
  Simula latencia de red con setTimeout y spinner visual.
*/
import { useState } from 'react';

export default function ProfLoginForm({ onLoginExitoso }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        // UX: Deshabilitar botón y mostrar spinner
        setLoading(true);
        setError(false);

        // Simular latencia de red (1 segundo)
        setTimeout(() => {
            setLoading(false);

            // Validación simple (Usuario: admin / Pass: 1234)
            if (username === 'admin' && password === '1234') {
                // Limpiar campos por seguridad
                setUsername('');
                setPassword('');
                // Notificar al padre para cambiar la vista
                if (onLoginExitoso) onLoginExitoso();
            } else {
                setError(true);
            }
        }, 1000);
    }

    return (
        <div className="triage-content">
            <h3 className="tab-title">Plataforma Clínica ESI</h3>
            <p className="section-desc tab-desc">
                Acceso exclusivo para categorización oficial. Ingrese sus credenciales.
            </p>
            <form className="professional-form form-centered-sm" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="username">Usuario (Ej: admin):</label>
                    <input
                        type="text"
                        id="username"
                        className="standard-select"
                        placeholder="Ingrese su rut o código"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group mt-15">
                    <label htmlFor="password">Contraseña (Ej: 1234):</label>
                    <input
                        type="password"
                        id="password"
                        className="standard-select"
                        placeholder="Clave de seguridad"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <p className="login-error-msg">Credenciales incorrectas.</p>
                )}

                <div className="form-actions mt-20">
                    <button
                        type="button"
                        className="btn-primary large-action"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <><span className="spinner"></span> Verificando...</>
                        ) : (
                            'Ingresar al Sistema'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
