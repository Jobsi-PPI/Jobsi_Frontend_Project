const EstrellasCalificacion = ({ calificacion }) => {
    if (!calificacion) {
        return <span className="text-sm text-gray-400">Sin calificación aún</span>;
    }

    const llenas = Math.round(calificacion);

    return (
        <span className="flex items-center gap-0.5 text-sm">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= llenas ? "text-yellow-400" : "text-gray-300"}>
                    ★
                </span>
            ))}
            <span className="text-gray-500 ml-1">({calificacion.toFixed(1)})</span>
        </span>
    );
};

export default EstrellasCalificacion;
