import { FiX, FiSettings, FiHelpCircle, FiLogOut, FiBriefcase, FiBell } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";

import Swal from "sweetalert2";
import ComingSoonModal from "../../../components/ui/modals/ComingSoonModal";


const SidebarMenu = ({ open, closeMenu, navigate, notificacionesCount = 0 }) => {

    const { logout } = useAuth();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    return (
        <>
            {/* Overlay oscuro */}
            {open && (
                <div 
                    className="fixed inset-0 bg-black/40 z-[998]" 
                    onClick={closeMenu}
                ></div>
            )}

            {/* Menú lateral */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-[999] p-6 
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Cerrar */}
                <button 
                    onClick={closeMenu}
                    className="absolute top-4 right-4 btn-blanco text-black hover:text-red-500 text-2xl"
                >
                    <FiX size={28} />
                </button>

                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-10">
                    Menú
                </h2>

                {/* Opciones */}
                <ul className="flex flex-col gap-6 text-lg text-gray-700">

                    <li
                        className="flex flex-col gap-0.5 cursor-pointer group"
                        onClick={() => navigate("/mis-jobs")}
                    >
                        <span className="flex items-center gap-3 group-hover:text-[#1e3a8a]">
                            <FiBriefcase /> Ver mis Jobs
                        </span>
                        <span className="text-xs text-gray-400 ml-7 hidden group-hover:block">
                            Administra los jobs que publicaste y a los que te postulaste
                        </span>
                    </li>

                    <li
                        className="flex flex-col gap-0.5 cursor-pointer group"
                        onClick={() => { closeMenu(); navigate("/mis-postulaciones"); }}
                    >
                        <span className="flex items-center gap-3 group-hover:text-[#1e3a8a]">
                            <FiBell /> Notificaciones
                            {notificacionesCount > 0 && (
                                <span className="ml-auto min-w-[22px] h-[22px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                                    {notificacionesCount > 99 ? "99+" : notificacionesCount}
                                </span>
                            )}
                        </span>
                        <span className="text-xs text-gray-400 ml-7 hidden group-hover:block">
                            Revisa quiénes se postularon a tus jobs activos
                        </span>
                    </li>

                    <li
                        className="flex flex-col gap-0.5 cursor-pointer group"
                        onClick={() => { closeMenu(); navigate("/configuracion"); }}
                    >
                        <span className="flex items-center gap-3 group-hover:text-[#1e3a8a]">
                            <FiSettings /> Configuración
                        </span>
                        <span className="text-xs text-gray-400 ml-7 hidden group-hover:block">
                            Edita tu perfil, seguridad y preferencias de cuenta
                        </span>
                    </li>

                    <li
                        className="flex flex-col gap-0.5 cursor-pointer group"
                        onClick={() => openModal()}
                    >
                        <span className="flex items-center gap-3 group-hover:text-[#1e3a8a]">
                            <FiHelpCircle /> Ayuda
                        </span>
                        <span className="text-xs text-gray-400 ml-7 hidden group-hover:block">
                            ¿Tienes dudas? Consulta cómo funciona Jobsi
                        </span>
                    </li>

                    <li
                        className="flex flex-col gap-0.5 cursor-pointer group mt-4"
                        onClick={async() => {
                            const result = await Swal.fire({
                                    title: "Cerrar sesión",
                                    text: "¿Estás seguro de que quieres cerrar sesión?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#1e3a8a",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Sí, salir",
                                    cancelButtonText: "Cancelar"
                                });

                                if (result.isConfirmed) {
                                    logout();
                                    navigate("/login", { replace: true }); 
                                }
                            }}
                    >
                        <span className="flex items-center gap-3 text-red-600 group-hover:text-red-800">
                            <FiLogOut /> Cerrar Sesión
                        </span>
                        <span className="text-xs text-gray-400 ml-7 hidden group-hover:block">
                            Salir de tu cuenta de forma segura
                        </span>
                    </li>

                </ul>
            </div>

            <ComingSoonModal
                isOpen={isOpen}
                onClose={closeModal}
                closing={closing}
                opening={opening}
                primaryAction={{
                    label: "Entendido",
                    onClick: closeModal
                }}
            />
        </>
    );
};

export default SidebarMenu;


