import { useState, useEffect } from "react";

/**
 * useIsMobile
 * Indica si la pantalla está por debajo del breakpoint md de Tailwind (768px)
 * y se actualiza si cambia el tamaño de la ventana o la orientación.
 *
 * @returns {boolean}
 */
export const useIsMobile = () => {
    const query = "(max-width: 767px)";
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const onChange = (e) => setIsMobile(e.matches);

        mediaQuery.addEventListener("change", onChange);
        return () => mediaQuery.removeEventListener("change", onChange);
    }, []);

    return isMobile;
};
