/* 
  TablaExamenes - Tabla de resultados de exámenes médicos.
  Migrado de: portal.js (renderizarExamenes)
  Usa .map() en JSX en vez de concatenación de strings con innerHTML.
*/
import { datosExamenes } from '../../utils/mockData';

export default function TablaExamenes({ onVolver }) {
    return (
        <div className="auth-content portal-submodule">
            <button className="btn-volver-portal btn-outline portal-back-btn" onClick={onVolver}>
                ⬅ Volver al Panel
            </button>
            <h3 className="tab-title text-left portal-subtitle">Resultados de Exámenes</h3>

            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Examen</th>
                            <th>Médico Solicitante</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosExamenes.map((examen, index) => {
                            const badgeClass = examen.estado === 'Disponible' ? 'badge-success' : 'badge-warning';
                            return (
                                <tr key={index}>
                                    <td>{examen.fecha}</td>
                                    <td><strong>{examen.tipo}</strong></td>
                                    <td>{examen.medico}</td>
                                    <td><span className={`badge ${badgeClass}`}>{examen.estado}</span></td>
                                    <td>
                                        {examen.estado === 'Disponible' ? (
                                            <button className="btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}>
                                                Ver PDF
                                            </button>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Pendiente</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
