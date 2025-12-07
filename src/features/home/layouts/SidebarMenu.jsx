import { FiX, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiBriefcase } from "react-icons/fi";
import Swal from "sweetalert2";

const SidebarMenu = ({ open, closeMenu, navigate }) => {
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
                        className="flex items-center gap-3 cursor-pointer hover:text-[#1e3a8a]"
                        onClick={() => navigate("/mis-jobs")}
                    >
                        <FiBriefcase /> Ver mis Jobs
                    </li>

                    <li 
                        className="flex items-center gap-3 cursor-pointer hover:text-[#1e3a8a]"
                        onClick={() => navigate("/configuracion")}
                    >
                        <FiSettings /> Configuración
                    </li>

                    <li 
                        className="flex items-center gap-3 cursor-pointer hover:text-[#1e3a8a]"
                        onClick={() => navigate("/ayuda")}
                    >
                        <FiHelpCircle /> Ayuda
                    </li>

                    <li 
                        className="flex items-center gap-3 cursor-pointer text-red-600 hover:text-red-800 mt-4"
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
                                    localStorage.clear();
                                    navigate("/login");
                                }
                            }}
                    >
                        <FiLogOut /> Cerrar Sesión
                    </li>

                </ul>
            </div>
        </>
    );
};

export default SidebarMenu;


