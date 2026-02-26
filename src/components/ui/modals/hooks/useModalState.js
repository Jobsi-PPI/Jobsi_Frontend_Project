import { useState } from "react";

/**
 * useModalState
 * Hook reutilizable para manejar el estado de apertura y cierre
 * animado de cualquier modal en Jobsi.
 *
 * @returns {Object} { isOpen, closing, opening, openModal, closeModal }
 */
export const useModalState = () => {  

    const [isOpen, setIsOpen]     = useState(false);
    const [closing, setClosing]   = useState(false);
    const [opening, setOpening]   = useState(false);

    const openModal = () => {
        setOpening(true);
        setIsOpen(true);
        setTimeout(() => setOpening(false), 10); // Dispara la transición de entrada
    };

    const closeModal = () => {
        setClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setClosing(false);
        }, 300); // Debe coincidir con duration-300 de Tailwind
    };

    return {
        isOpen,
        closing,
        opening,
        openModal,
        closeModal,
    };
};

