/**
 * Calculates chain overlap, matter, and alpha based on noise fraction.
 * @param {number} noiseFraction - A value between 0 and 1 representing the noise.
 * @returns {object} - { overlap, matter, alpha }
 */
function calculateChainMetrics(noiseFraction) {
    // Ensure noiseFraction is a number and within reasonable bounds
    // We treat any non-numeric input as 0
    let noise = parseFloat(noiseFraction);
    if (isNaN(noise)) {
        noise = 0;
    }

    const baseOverlap = 0.9999;
    let overlap = baseOverlap - (noise * 0.0002);

    // Safety clamp for overlap to avoid NaN in sqrt if it ever exceeds 1 or goes below -1
    overlap = Math.max(-1, Math.min(1, overlap));

    const matter = Math.sqrt(1 - overlap * overlap);
    const alpha = Math.min(0.8, Math.max(0, 8 * matter));

    return {
        overlap: overlap,
        matter: matter,
        alpha: alpha
    };
}

if (typeof exports !== 'undefined') {
    exports.calculateChainMetrics = calculateChainMetrics;
}
