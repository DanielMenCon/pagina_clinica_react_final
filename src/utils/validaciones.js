/* 
  ============================================================================
  VALIDACIONES CENTRALIZADAS CON SEGURIDAD
  ============================================================================
  Migrado de: registro.js (función validarDatos)
  Recomendación IA: Implementar sanitización de XSS y validaciones robustas.
*/

/**
 * Escapar HTML para prevención básica de XSS en el cliente.
 * Reemplaza los caracteres especiales por sus entidades.
 */
export function sanitizarDatos(texto) {
    if (typeof texto !== 'string') return texto;
    return texto
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function validarDatos(tipoFormulario, datos, usuariosInscritos = []) {
    // Expresión Regular (RegEx) para validar formato de email robusto
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Lista negra de dominios de correos temporales (desechables)
    const dominiosProhibidos = ['tempmail.com', 'yopmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com'];

    // RegEx para nombre completo: letras, espacios, acentos y ñ. Entre 3 y 50 caracteres.
    const nombreRegistroRegex = /^[a-zA-ZÀ-ÿ\s]{3,50}$/;

    // Función auxiliar para validar la seguridad de la contraseña
    const validarSeguridadPassword = (pass) => {
        if (pass.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
        if (!/[A-Z]/.test(pass)) return "La contraseña debe incluir al menos una letra mayúscula.";
        if (!/[a-z]/.test(pass)) return "La contraseña debe incluir al menos una letra minúscula.";
        if (!/\d/.test(pass)) return "La contraseña debe incluir al menos un número.";
        
        const contrasenasDebiles = ['12345678', '11111111', 'password', 'qwerty', '123456789', 'admin123'];
        if (contrasenasDebiles.includes(pass.toLowerCase())) return "La contraseña es demasiado común o débil.";
        
        return null; // Null significa que es válida y segura
    };

    // --- Validaciones para el formulario de REGISTRO ---
    if (tipoFormulario === 'registro') {
        if (!datos.user || !datos.email || !datos.pass || !datos.confirm) {
            return { valido: false, mensaje: 'Todos los campos son obligatorios.' };
        }
        
        // Validación estricta de Nombre Completo
        if (!nombreRegistroRegex.test(datos.user.trim())) {
            return { valido: false, mensaje: 'El nombre completo debe tener entre 3 y 50 caracteres y contener solo letras y espacios.' };
        }
        
        // Validación de Email y Dominio
        if (!emailRegex.test(datos.email)) {
            return { valido: false, mensaje: 'El formato del correo electrónico no es válido.' };
        }
        const dominioEmail = datos.email.split('@')[1].toLowerCase();
        if (dominiosProhibidos.includes(dominioEmail)) {
            return { valido: false, mensaje: 'No se permiten proveedores de correo temporal.' };
        }

        // Validación de Seguridad de Contraseña
        const errorPassword = validarSeguridadPassword(datos.pass);
        if (errorPassword) {
            return { valido: false, mensaje: errorPassword };
        }

        if (datos.pass !== datos.confirm) {
            return { valido: false, mensaje: 'Las contraseñas no coinciden.' };
        }
        
        const existeEmail = usuariosInscritos.some(u => u.email.toLowerCase() === datos.email.toLowerCase());
        if (existeEmail) {
            return { valido: false, mensaje: 'Este correo ya está registrado.' };
        }
    }
    // --- Validaciones para el formulario de LOGIN ---
    else if (tipoFormulario === 'login') {
        if (!datos.email || !datos.pass) {
            return { valido: false, mensaje: 'Debes ingresar correo y contraseña.' };
        }
        
        // MODO TEST: Permitir bypassear validaciones si es usuario de prueba "1" y "1" o "admin" y "admin"
        if ((datos.email === '1' && datos.pass === '1') || (datos.email === 'admin' && datos.pass === 'admin')) {
            return { valido: true, mensaje: '' };
        }

        // Validar formato de email incluso en login
        if (!emailRegex.test(datos.email)) {
            return { valido: false, mensaje: 'El formato del correo electrónico no es válido.' };
        }
    }
    // --- Validaciones para el formulario de CONTACTO ---
    else if (tipoFormulario === 'contacto') {
        if (!datos.nombre || !datos.email || !datos.mensaje) {
            return { valido: false, mensaje: 'Todos los campos son obligatorios.' };
        }
        // Validar nombre con la misma regla robusta
        if (!nombreRegistroRegex.test(datos.nombre.trim())) {
            return { valido: false, mensaje: 'El nombre debe contener solo letras y espacios (mínimo 3 caracteres).' };
        }
        if (!emailRegex.test(datos.email)) {
            return { valido: false, mensaje: 'El formato del correo electrónico no es válido.' };
        }
    }

    // Si pasó todas las validaciones, retornar objeto con valido = true
    return { valido: true, mensaje: '' };
}
