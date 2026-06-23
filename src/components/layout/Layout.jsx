/* 
  Layout - Wrapper que compone TopBar + Header + contenido dinámico + Footer.
  Usa <Outlet> de React Router para renderizar las páginas hijas.
*/
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import AccessibilityReader from '../ui/AccessibilityReader';

export default function Layout() {
    return (
        <>
            <AccessibilityReader />
            {/* ENLACE DE ACCESIBILIDAD: Permite saltar al contenido principal (WCAG) */}
            <a className="skip-link" href="#main-content">Saltar al contenido</a>
            
            <TopBar />
            <Header />
            
            <main id="main-content" role="main">
                <Outlet />
            </main>
            
            <Footer />
        </>
    );
}
