/* 
  ============================================================================
  DATOS SIMULADOS (MOCK DATA)
  ============================================================================
  Migrado de: portal.js (datosExamenes, datosHoras) e index.js (imagenes)
  En un proyecto real se obtendrían de un servidor.
*/

/**
 * datosExamenes - Arreglo de objetos que representa los resultados médicos del paciente.
 * Propiedades de cada objeto:
 *   - fecha:  {string} Fecha del examen en formato DD/MM/YYYY
 *   - tipo:   {string} Nombre del examen realizado
 *   - estado: {string} 'Disponible' (puede verse) o 'En Proceso' (aún no listo)
 *   - medico: {string} Nombre del médico que solicitó el examen
 */
export const datosExamenes = [
    { fecha: '02/05/2026', tipo: 'Hemograma Completo', estado: 'Disponible', medico: 'Dra. Silva' },
    { fecha: '15/04/2026', tipo: 'Perfil Lipídico', estado: 'Disponible', medico: 'Dra. Silva' },
    { fecha: '08/05/2026', tipo: 'Radiografía Tórax', estado: 'En Proceso', medico: 'Dr. Rojas' }
];



/**
 * imagenesCarrusel - Arreglo de rutas de imágenes para el carrusel Hero
 * Cada elemento es una ruta relativa a una imagen en la carpeta /images/
 * El carrusel las recorre de forma cíclica (al llegar al final, vuelve al inicio)
 */
export const imagenesCarrusel = [
    "/pagina_clinica_react_final/images/clinic_hero.png",
    "/pagina_clinica_react_final/images/carrusel_1.png",
    "/pagina_clinica_react_final/images/carrusel_2.png",
    "/pagina_clinica_react_final/images/carrusel_3.png"
];

/**
 * especialidades - Arreglo de objetos que representa los servicios médicos
 */
export const especialidades = [
    { nombre: 'Cardiología', icono: '/pagina_clinica_react_final/images/icon_cardio.png', desc: 'Prevención, diagnóstico y tratamiento cardiovascular.' },
    { nombre: 'Traumatología', icono: '/pagina_clinica_react_final/images/icon_trauma.png', desc: 'Rehabilitación y cirugía ortopédica integral.' },
    { nombre: 'Pediatría', icono: '/pagina_clinica_react_final/images/icon_pedia.png', desc: 'Cuidado médico para niños y adolescentes.' },
    { nombre: 'Maternidad', icono: '/pagina_clinica_react_final/images/icon_mater.png', desc: 'Acompañamiento especializado durante el parto.' }
];

/**
 * articulosBlog - Arreglo de objetos que representa los artículos del blog
 */
export const articulosBlog = [
    { titulo: '¿Cómo detectar un ACV a tiempo?', desc: 'Conoce los síntomas clave (F.A.S.T) que podrían salvar una vida ante un Ataque Cerebrovascular.', imgClass: 'blog-img-acv' },
    { titulo: 'Alimentación y Corazón', desc: 'Los cardiólogos de nuestra clínica recomiendan 5 hábitos cruciales para proteger tu sistema cardiovascular.', imgClass: 'blog-img-cardio' },
    { titulo: 'Control de la Salud Mental', desc: 'Nuevos talleres y charlas comunitarias enfocadas en el manejo efectivo del estrés y la ansiedad laboral.', imgClass: 'blog-img-mental' }
];
