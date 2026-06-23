/* 
  FormMessage - Mensaje de feedback para formularios.
  Reemplaza: actualizarDOM() de registro.js
  Renderizado condicional con clases msg-error / msg-success.
*/

export default function FormMessage({ message, isError }) {
    if (!message) {
        return <p className="form-mensaje" aria-live="polite"></p>;
    }

    return (
        <p 
            className={`form-mensaje ${isError ? 'msg-error' : 'msg-success'}`} 
            aria-live="polite"
        >
            {message}
        </p>
    );
}
