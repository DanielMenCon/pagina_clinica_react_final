import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// --- DATOS SIMULADOS (MOCKS INICIALES) ---
const INITIAL_ESPECIALIDADES = [
    { id: 'esp-1', nombre: 'Medicina General', icono: '🩺' },
    { id: 'esp-2', nombre: 'Cardiología', icono: '❤️' },
    { id: 'esp-3', nombre: 'Pediatría', icono: '🧸' },
    { id: 'esp-4', nombre: 'Odontología', icono: '🦷' }
];

const INITIAL_PROFESIONALES = [
    { id: 'prof-1', nombre: 'Dr. Roberto Sánchez', especialidadId: 'esp-1', foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80' },
    { id: 'prof-2', nombre: 'Dra. María González', especialidadId: 'esp-1', foto: 'https://images.unsplash.com/photo-1594824419266-419b48b788a8?auto=format&fit=crop&w=150&q=80' },
    { id: 'prof-3', nombre: 'Dr. Carlos Vega', especialidadId: 'esp-2', foto: 'https://images.unsplash.com/photo-1537368910025-7028a4ce176a?auto=format&fit=crop&w=150&q=80' },
    { id: 'prof-4', nombre: 'Dra. Ana López', especialidadId: 'esp-3', foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' },
    { id: 'prof-5', nombre: 'Dr. Luis Torres', especialidadId: 'esp-4', foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80' }
];

export const HORARIOS_DISPONIBLES = [
    '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'
];

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
    const { usuarioActivo } = useAuth();
    
    // --- ESTADO DE CITAS ---
    const [citas, setCitas] = useState(() => {
        const guardadas = localStorage.getItem('citas_medicas');
        return guardadas ? JSON.parse(guardadas) : [];
    });

    useEffect(() => {
        localStorage.setItem('citas_medicas', JSON.stringify(citas));
    }, [citas]);

    const citasUsuario = usuarioActivo 
        ? citas.filter(cita => cita.userEmail === usuarioActivo.email)
        : [];

    const agendarCita = (nuevaCita) => {
        const citaConId = { ...nuevaCita, id: `cita-${Date.now()}`, userEmail: usuarioActivo.email, estado: 'Programada' };
        setCitas(prev => [...prev, citaConId]);
        return citaConId;
    };

    const reagendarCita = (citaId, nuevaFecha, nuevaHora) => {
        setCitas(prev => prev.map(cita => cita.id === citaId ? { ...cita, fecha: nuevaFecha, hora: nuevaHora } : cita));
    };

    const cancelarCita = (citaId) => {
        setCitas(prev => prev.filter(cita => cita.id !== citaId));
    };

    // --- ESTADO DE ESPECIALIDADES ---
    const [especialidades, setEspecialidades] = useState(() => {
        const guardadas = localStorage.getItem('especialidades_clinica');
        return guardadas ? JSON.parse(guardadas) : INITIAL_ESPECIALIDADES;
    });

    useEffect(() => {
        localStorage.setItem('especialidades_clinica', JSON.stringify(especialidades));
    }, [especialidades]);

    const agregarEspecialidad = (nuevaEsp) => {
        setEspecialidades(prev => [...prev, { ...nuevaEsp, id: `esp-${Date.now()}` }]);
    };

    const eliminarEspecialidad = (id) => {
        setEspecialidades(prev => prev.filter(e => e.id !== id));
        // Opcional: También podríamos eliminar/desvincular a los doctores de esa especialidad.
    };

    // --- ESTADO DE PROFESIONALES ---
    const [profesionales, setProfesionales] = useState(() => {
        const guardados = localStorage.getItem('profesionales_clinica');
        return guardados ? JSON.parse(guardados) : INITIAL_PROFESIONALES;
    });

    useEffect(() => {
        localStorage.setItem('profesionales_clinica', JSON.stringify(profesionales));
    }, [profesionales]);

    const agregarProfesional = (nuevoProf) => {
        setProfesionales(prev => [...prev, { ...nuevoProf, id: `prof-${Date.now()}` }]);
    };

    const eliminarProfesional = (id) => {
        setProfesionales(prev => prev.filter(p => p.id !== id));
    };

    const value = {
        citasUsuario, agendarCita, reagendarCita, cancelarCita,
        especialidades, agregarEspecialidad, eliminarEspecialidad,
        profesionales, agregarProfesional, eliminarProfesional
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
}

export function useAppointments() {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments debe usarse dentro de un AppointmentProvider');
    }
    return context;
}
