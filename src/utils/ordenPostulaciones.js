export const ORDENES = [
    { id: "mejorValorados", label: "Mejor valorados" },
    { id: "recientes", label: "Más recientes" },
];

const fechaEnMs = (candidato) => new Date(candidato.fechaSolicitud).getTime() || 0;

// Las calificaciones reales van de 1 a 5: un 0 o un valor ausente significa "sin calificación"
export const tieneValoracion = (candidato) => Number(candidato.valoracionPromedio) > 0;

const valoracion = (candidato) => (tieneValoracion(candidato) ? Number(candidato.valoracionPromedio) : -1);

const porMasReciente = (a, b) => fechaEnMs(b) - fechaEnMs(a);

// En un empate gana quien se postuló primero; sin fecha válida pierde el desempate
const porMasAntiguo = (a, b) => (fechaEnMs(a) || Infinity) - (fechaEnMs(b) || Infinity);
const porMejorValorado = (a, b) => valoracion(b) - valoracion(a) || porMasAntiguo(a, b);

export const ordenarCandidatos = (candidatos, orden) =>
    [...candidatos].sort(orden === "mejorValorados" ? porMejorValorado : porMasReciente);

export const mejorCandidato = (candidatos) => {
    const [mejor] = [...candidatos].sort(porMejorValorado);
    return candidatos.length > 1 && mejor && tieneValoracion(mejor) ? mejor : null;
};
