import { Drawer } from "vaul";
import { FiBriefcase, FiBell, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import { useModalState } from "../ui/modals/hooks/useModalState.js";
import { useCerrarSesion } from "../../features/auth/hooks/useCerrarSesion.js";
import ComingSoonModal from "../ui/modals/ComingSoonModal.jsx";

// Vaul tarda 500ms en cerrarse y hasta entonces Radix bloquea los clics de la página: SweetAlert y el modal esperan a que termine
const DURACION_CIERRE_MS = 550;

// Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades
const opcionBase =
    "flex w-full items-center gap-4 !rounded-lg !border-0 !bg-transparent !p-3 text-left !text-base !font-medium transition hover:!bg-gray-100";

export default function MenuSheet({ open, onOpenChange, navigate, notificacionesCount = 0 }) {

    const { user } = useAuth();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();
    const cerrarSesion = useCerrarSesion();

    const nombre = user?.nombre || "Usuario";

    const irA = (ruta) => {
        onOpenChange(false);
        navigate(ruta);
    };

    const luegoDeCerrar = (accion) => {
        onOpenChange(false);
        setTimeout(accion, DURACION_CIERRE_MS);
    };

    return (
        <>
            <Drawer.Root open={open} onOpenChange={onOpenChange}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-[998] bg-black/40" />
                    <Drawer.Content className="fixed inset-x-0 bottom-0 z-[999] mx-auto flex w-full max-w-md flex-col rounded-t-3xl bg-white px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] outline-none">

                        <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />

                        <Drawer.Description className="sr-only">
                            Opciones de tu cuenta
                        </Drawer.Description>

                        <div className="flex items-center gap-3 px-3 pb-3">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffb906] text-lg font-bold text-[#1e3a8a]">
                                {nombre.charAt(0).toUpperCase()}
                            </span>
                            <Drawer.Title className="text-base font-bold text-gray-900">
                                {nombre}
                            </Drawer.Title>
                        </div>

                        <button type="button" onClick={() => irA("/mis-jobs")} className={`${opcionBase} !text-gray-800`}>
                            <FiBriefcase className="h-5 w-5 text-gray-500" />
                            Ver mis Jobs
                        </button>

                        <button type="button" onClick={() => irA("/mis-postulaciones")} className={`${opcionBase} !text-gray-800`}>
                            <FiBell className="h-5 w-5 text-gray-500" />
                            Notificaciones
                            {notificacionesCount > 0 && (
                                <span className="ml-auto flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                    {notificacionesCount > 99 ? "99+" : notificacionesCount}
                                </span>
                            )}
                        </button>

                        <button type="button" onClick={() => irA("/configuracion")} className={`${opcionBase} !text-gray-800`}>
                            <FiSettings className="h-5 w-5 text-gray-500" />
                            Configuración
                        </button>

                        <button type="button" onClick={() => luegoDeCerrar(openModal)} className={`${opcionBase} !text-gray-800`}>
                            <FiHelpCircle className="h-5 w-5 text-gray-500" />
                            Ayuda
                        </button>

                        <hr className="my-2 border-gray-200" />

                        <button type="button" onClick={() => luegoDeCerrar(cerrarSesion)} className={`${opcionBase} !text-red-600`}>
                            <FiLogOut className="h-5 w-5" />
                            Cerrar Sesión
                        </button>

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>

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
}
