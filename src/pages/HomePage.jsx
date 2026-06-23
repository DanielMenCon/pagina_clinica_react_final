/* 
  HomePage - Página principal que compone todas las secciones de index.html.
  Cada sección es un componente independiente y reutilizable.
*/
import './HomePage.css';
import HeroCarousel from '../components/home/HeroCarousel';
import Especialidades from '../components/home/Especialidades';
import Nosotros from '../components/home/Nosotros';
import Investigacion from '../components/home/Investigacion';
import CtaRegistro from '../components/home/CtaRegistro';
import BlogSection from '../components/home/BlogSection';
import ContactoInfo from '../components/home/ContactoInfo';

export default function HomePage() {
    return (
        <>
            <HeroCarousel />
            <Especialidades />
            <Nosotros />
            <Investigacion />
            <CtaRegistro />
            <BlogSection />
            <ContactoInfo />
        </>
    );
}
