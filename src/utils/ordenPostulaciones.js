export const ORDENES = [
    { id: "mejorValorados", label: "Mejor valorados" },
    { id: "recientes", label: "Más recientes" },
];

const fechaEnMs = (candidato) => new Date(candidato.fechaSolicitud).getTime() || 0;

// Quien nunca ha sido calificado queda por debajo de cualquier calificación, incluso de 0
const valoracion = (candidato) => {
    const valor = Number(candidato.valoracionPromedio);
    return candidato.valoracionPromedio == null || !Number.isFinite(valor) ? -1 : valor;
};

const porMasReciente = (a, b) => fechaEnMs(b) - fechaEnMs(a);
const porMejorValorado = (a, b) => valoracion(b) - valoracion(a) || porMasReciente(a, b);

export const ordenarCandidatos = (candidatos, orden) =>
    [...candidatos].sort(orden === "mejorValorados" ? porMejorValorado : porMasReciente);
