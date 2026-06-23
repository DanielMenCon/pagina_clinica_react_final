/* 
  ============================================================================
  LÓGICA DE TRIAGE (PACIENTE Y ESI PROFESIONAL)
  ============================================================================
  Migrado de: triage.js (calculatePatient y calculateESI)
  Funciones puras que devuelven resultados sin manipular el DOM.
*/

/**
 * calculatePatientTriage(datos)
 * Evalúa el formulario que llenan los pacientes y devuelve un resultado.
 * Migrado de la función calculatePatient() de triage.js
 * @param {Object} datos - { pain, conscious, timeEvo, breath, bleed, chest, trauma, fever }
 * @returns {Object} - { result, colorClass }
 */
export function calculatePatientTriage(datos) {
    const { pain, conscious, timeEvo, breath, bleed, chest, trauma, fever } = datos;

    let result = "";
    let colorClass = "";

    // LÓGICA DE DECISIÓN CLÍNICA
    // Si hay síntomas críticos vitales (inconsciencia, sin respirar, sangrado profuso o dolor de pecho)
    if (conscious === 'unconscious' || breath || bleed || chest) {
        result = "Condición de Riesgo Inminente. Será derivado al reanimador de forma inmediata. Diríjase a urgencias ya.";
        colorClass = "esi-1"; // Rojo

    // Si hay riesgo alto pero no inminente
    } else if (conscious === 'altered' || pain >= 8 || timeEvo === 'minutes' || trauma || fever) {
        result = "Condición de Alta Prioridad. Tiempo estimado de categorización y espera: 15 a 30 minutos.";
        colorClass = "esi-2"; // Naranja

    // Dolor moderado
    } else if (pain >= 5) {
        result = "Condición de Atención Media. Tiempo estimado de categorización y espera: 30 a 60 minutos.";
        colorClass = "esi-3"; // Amarillo

    // Condiciones leves
    } else {
        result = "Condición Leve a Baja. Tiempo estimado de categorización y espera: 2 a 4 horas en sala general.";
        colorClass = "esi-5"; // Verde
    }

    return { result, colorClass };
}

/**
 * calculateESILevel(datos)
 * Algoritmo ESI Internacional utilizado por médicos/enfermeros.
 * Migrado de la función calculateESI() de triage.js
 * @param {Object} datos - { isApneic, isBleeding, isChestPain, isVitalsCompromised, consciousness, walk, timeEvo, resources, painLevel }
 * @returns {Object} - { esiLevel, explanation }
 */
export function calculateESILevel(datos) {
    const { isApneic, isBleeding, isChestPain, isVitalsCompromised, consciousness, walk, timeEvo, resources, painLevel } = datos;

    // Valores por defecto
    let finalESI = 5;
    let explanation = "Atención No Urgente. Derivación rápida.";

    // LÓGICA ESI INTERNACIONAL
    // Nivel 1: Riesgo Vital Inminente
    if (isApneic || isBleeding || consciousness === 'unconscious' || isVitalsCompromised) {
        finalESI = 1;
        explanation = "Nivel 1: RESUCITACIÓN. Existe inminente peligro de muerte o deterioro severo. Requiere box de reanimación y atención inmediata.";
    }
    // Nivel 2: Alto Riesgo
    else if (isChestPain || consciousness === 'altered' || painLevel >= 7 || timeEvo === 'minutes') {
        finalESI = 2;
        explanation = "Nivel 2: EMERGENCIA. Alto riesgo de deterioro. Atención médica urgente en < 15 minutos.";
    }
    // Si no es Nivel 1 ni 2, la decisión se toma en base a la cantidad de Recursos
    else {
        if (resources === 'many') {
            finalESI = 3;
            explanation = "Nivel 3: URGENCIA. Signos vitales estables, pero requiere múltiples recursos diagnósticos (Sangre, Rayos X, Scanner).";
        } else if (resources === '1') {
            finalESI = 4;
            explanation = "Nivel 4: MENOS URGENTE. Requiere solo un recurso diagnóstico o terapéutico menor.";
        } else {
            finalESI = 5;
            explanation = "Nivel 5: NO URGENTE. Examen clínico único. Sin riesgo inminente.";
        }
    }

    return { esiLevel: finalESI, explanation };
}
