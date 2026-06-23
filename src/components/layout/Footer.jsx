/* Footer - Pie de página global. Idéntico al original. */

export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    textAlign: 'left',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '0.85em',
                    minWidth: '250px'
                }}>
                    <p style={{ margin: '2px 0' }}>Daniel Mendez Contreras</p>
                    <p style={{ margin: '2px 0' }}>Victor Vasquez Muñoz</p>
                    <p style={{ margin: '10px 0 2px 0', color: '#aaaaaa' }}>Programación Front-end</p>
                    <p style={{ margin: '2px 0', color: '#aaaaaa' }}>IEI-N3-P2-C2</p>
                </div>

                <div style={{ textAlign: 'right', flex: '1', minWidth: '250px' }}>
                    <p>&copy; 2026 Clínica Universitaria. Todos los derechos reservados.</p>
                    <p><small>Desarrollado según modelos de accesibilidad y escalabilidad clínica.</small></p>
                </div>
            </div>
        </footer>
    );
}
