/* 
  ============================================================================
  CONTEXTO GLOBAL DE AUTENTICACIÓN (AuthContext)
  ============================================================================
  Reemplaza: auth_global.js + lógica de sesión de registro.js
  
  Responsabilidades:
    - Verificar si hay un usuario logueado en localStorage
    - Proveer funciones de login, logout y registro a toda la app
    - Persistir sesión en localStorage (mismo formato que el proyecto original)
*/

import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword } from '../utils/crypto';

// Crear el Context
const AuthContext = createContext(null);

/**
 * AuthProvider - Wrapper que provee el estado de autenticación a toda la aplicación.
 * Maneja: usuarioActivo (sesión), usuariosInscritos (base de datos local).
 */
export function AuthProvider({ children }) {
    // Estado del usuario actualmente logueado (null si no hay sesión)
    const [usuarioActivo, setUsuarioActivo] = useState(() => {
        const saved = localStorage.getItem('usuario_activo');
        return saved ? JSON.parse(saved) : null;
    });

    // Arreglo global de usuarios registrados (persistido en localStorage)
    const [usuariosInscritos, setUsuariosInscritos] = useState(() => {
        const saved = localStorage.getItem('usuarios_clinica');
        return saved ? JSON.parse(saved) : [];
    });

    // Sincronizar cambios del usuario activo con localStorage
    useEffect(() => {
        if (usuarioActivo) {
            localStorage.setItem('usuario_activo', JSON.stringify(usuarioActivo));
        } else {
            localStorage.removeItem('usuario_activo');
        }
    }, [usuarioActivo]);

    // Sincronizar cambios de usuarios inscritos con localStorage
    useEffect(() => {
        localStorage.setItem('usuarios_clinica', JSON.stringify(usuariosInscritos));
    }, [usuariosInscritos]);

    /**
     * registrar(nuevoUsuario)
     * Agrega un nuevo usuario al arreglo y lo persiste.
     * @param {Object} nuevoUsuario - { username, email, password }
     */
    async function registrar(nuevoUsuario) {
        // Hash de la contraseña antes de persistir (refuerzo en cliente).
        const hashed = await hashPassword(nuevoUsuario.password);
        const usuarioSeguro = { ...nuevoUsuario, password: hashed, rol: 'paciente' };
        const actualizado = [...usuariosInscritos, usuarioSeguro];
        setUsuariosInscritos(actualizado);
    }

    /**
     * login(email, password)
     * Busca las credenciales en el arreglo de usuarios inscritos.
     * Si encuentra coincidencia, establece la sesión activa.
     * @returns {Object|null} - El usuario encontrado o null si fallan las credenciales.
     */
    async function login(email, password) {
        // =====================================================================
        // ATENCIÓN: MODO TEST (SOLO PARA DESARROLLO/PRUEBAS)
        // Bypassea la validación del localStorage. 
        // Permite acceso rápido si el correo es "1" y contraseña "1"
        // TODO: Eliminar esto antes de pasar a producción real.
        // =====================================================================
        if (email === '1' && password === '1') {
            const usuarioTest = {
                username: 'Usuario Tester Rápido',
                email: 'test@clinica.com',
                password: 'test_hash', // Contraseña simulada
                rol: 'paciente'
            };
            setUsuarioActivo(usuarioTest);
            return usuarioTest;
        }

        // Bypass Admin
        if (email === 'admin' && password === 'admin') {
            const usuarioAdmin = {
                username: 'Administrador Principal',
                email: 'admin@clinica.com',
                password: 'admin_hash',
                rol: 'admin'
            };
            setUsuarioActivo(usuarioAdmin);
            return usuarioAdmin;
        }
        // =====================================================================

        const hashed = await hashPassword(password);
        const usuarioEncontrado = usuariosInscritos.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === hashed
        );
        if (usuarioEncontrado) {
            setUsuarioActivo(usuarioEncontrado);
            return usuarioEncontrado;
        }
        return null;
    }

    /**
     * logout()
     * Cierra la sesión eliminando el usuario activo.
     */
    function logout() {
        setUsuarioActivo(null);
    }

    // Valor del contexto expuesto a todos los componentes hijos
    const value = {
        usuarioActivo,
        usuariosInscritos,
        registrar,
        login,
        logout,
        isLoggedIn: !!usuarioActivo
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth() - Hook personalizado para acceder al contexto de autenticación.
 * Uso: const { usuarioActivo, login, logout, registrar } = useAuth();
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}
