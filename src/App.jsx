/* 
  App.jsx - Componente raíz de la aplicación React.
  Configura el enrutador (React Router), provee el contexto de autenticación (AuthProvider)
  y define las rutas principales de la SPA.
*/
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';

// Layout global
import Layout from './components/layout/Layout';

// Páginas
import HomePage from './pages/HomePage';
import RegistroPage from './pages/RegistroPage';
import TriagePage from './pages/TriagePage';
import PortalPacientePage from './pages/PortalPacientePage';

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter>
        <Routes>
          {/* El Layout envuelve todas las páginas para proveer TopBar, Header y Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="registro" element={<RegistroPage />} />
            <Route path="triage" element={<TriagePage />} />
            <Route path="portal" element={<PortalPacientePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
