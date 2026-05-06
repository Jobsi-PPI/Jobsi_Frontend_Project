import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotificacionesBadge } from "/src/features/postulaciones/hooks/useNotificacionesBadge.js";
import { FiMenu } from "react-icons/fi";

import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";

const Header = ({ }) => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const notificacionesCount = useNotificacionesBadge();


return (
    <div>
        <div className="w-full bg-[#1e3a8a] shadow-md px-4 py-5 lg:px-10">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-0 items-center">

                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                    <img src="/src/assets/Jobsi_home_logo.png" alt="Logo Jobsi Home" className="w-[200px] lg:w-[260px] object-contain" />
                </div>

                {/* Título — columna central, perfectamente centrada */}
                <div className="flex flex-col items-center text-center gap-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                        Configuración
                    </h1>
                    <p className="text-sm sm:text-base font-light text-white/80 max-w-xs lg:max-w-lg">
                        Administra tu información personal y preferencias de cuenta
                    </p>
                </div>

                {/* Menú */}
                <div className="flex justify-center lg:justify-end">
                    <button type="button" aria-label="Abrir menú"
                        onClick={() => setMenuOpen(true)}
                        className="relative p-2 text-white rounded-full">
                        <FiMenu className="w-8 h-8" />
                        {notificacionesCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                                {notificacionesCount > 99 ? "99+" : notificacionesCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>

        <SidebarMenu
            open={menuOpen}
            closeMenu={() => setMenuOpen(false)}
            navigate={navigate}
            notificacionesCount={notificacionesCount}
        />
    </div>
)
}

export default Header;