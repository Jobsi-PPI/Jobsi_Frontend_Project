export const tiempoRelativo = (fecha) => {
    if (!fecha) return "Hace poco";
    
    const ahora = new Date();
    const publicado = new Date(fecha);
    const diffMs = ahora - publicado;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffMin < 1) return "Justo ahora";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    if (diffHoras < 24) return `Hace ${diffHoras}h`;
    if (diffDias < 7) return `Hace ${diffDias} días`;
    return publicado.toLocaleDateString("es-CO");
};

export const fraseSePostulo = (fecha) => {
    const tiempo = tiempoRelativo(fecha);
    if (/^\d/.test(tiempo)) return `Se postuló el ${tiempo}`;
    return `Se postuló ${tiempo.charAt(0).toLowerCase()}${tiempo.slice(1)}`;
};