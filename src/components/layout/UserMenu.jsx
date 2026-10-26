import { useEffect } from "react";

import { useModalState } from "../ui/modals/hooks/useModalState.js";
import ComingSoonModal from "../ui/modals/ComingSoonModal.jsx";
import { useCerrarSesion } from "../../features/auth/hooks/useCerrarSesion.js";

// Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades
const opcionBase =
    "block w-full !rounded-none !border-0 !bg-transparent !px-4 !py-2.5 text-left !text-sm !font-medium transition hover:!bg-gray-100";

const UserMenu = ({ open, closeMenu, navigate }) => {

    const { isOpen, closing, opening, openModal, closeModal } = useModalState();
    const cerrarSesion = useCerrarSesion();

    useEffect(() => {
        if (!open) return;

        const cerrarConEsc = (e) => {
            if (e.key === "Escape") closeMenu();
        };

        document.addEventListener("keydown", cerrarConEsc);
        return () => document.removeEventListener("keydown", cerrarConEsc);
    }, [open, closeMenu]);

    const irA = (ruta) => {
        closeMenu();
        navigate(ruta);
    };

    return (
        <>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={closeMenu} aria-hidden="true" />

                    <div
                        role="menu"
                        className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5 transition duration-150 starting:scale-95 starting:opacity-0"
                    >
                        <button role="menuitem" type="button" onClick={() => irA("/mis-jobs")} className={`${opcionBase} !text-gray-800`}>
                            Ver mis Jobs
                        </button>

                        <button role="menuitem" type="button" onClick={() => irA("/configuracion")} className={`${opcionBase} !text-gray-800`}>
                            Configuración
                        </button>

                        <button
                            role="menuitem"
                            type="button"
                            onClick={() => { closeMenu(); openModal(); }}
                            className={`${opcionBase} !text-gray-800`}
                        >
                            Ayuda
                        </button>

                        <hr className="my-2 border-gray-200" />

                        <button
                            role="menuitem"
                            type="button"
                            onClick={() => { closeMenu(); cerrarSesion(); }}
                            className={`${opcionBase} !text-red-600`}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </>
            )}

            <ComingSoonModal
                isOpen={isOpen}
                onClose={closeModal}
                closing={closing}
                opening={opening}
                primaryAction={{
                    label: "Entendido",
                    onClick: closeModal,
                }}
            />
        </>
    );
};

export default UserMenu;
