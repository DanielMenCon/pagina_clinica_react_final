/* UrgencyBanner - Banner rojo de urgencias con badge de tiempo de espera. */

export default function UrgencyBanner() {
    return (
        <div className="urgency-banner">
            <div className="container urgency-flex">
                <div className="urgency-text">
                    <h2 className="urgency-title">Servicio de Urgencias 24/7</h2>
                    <p className="urgency-subtitle">Atención inmediata para adultos y niños. Siempre preparados para ti.</p>
                </div>
                <div className="wait-time-badge" aria-live="polite">
                    <span className="wait-label">Tiempo Espera Promedio:</span>
                    <span className="wait-time">12 min</span>
                </div>
            </div>
        </div>
    );
}
