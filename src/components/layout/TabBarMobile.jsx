import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBriefcase, FiPlus, FiBell, FiMenu } from "react-icons/fi";

import Button from "../ui/Button.jsx";
import SidebarMenu from "../../features/home/layouts/SidebarMenu.jsx";
import { useNotificacionesBadge } from "../../features/postulaciones/hooks/useNotificacionesBadge.js";

// Los "!" son necesarios: index.css define estilos globales para <a> y <button> fuera de @layer y ganan sobre las utilidades
const itemBase = "flex w-full flex-col items-center justify-center gap-1 !text-xs";
const colorItem = (activo) => (activo ? "!text-[#1e3a8a] !font-bold" : "!text-black !font-medium");
const botonSinEstilo = "!bg-transparent !border-0 !p-0";

export default function TabBarMobile({ onPublicar }) {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const notificacionesCount = useNotificacionesBadge();

    return (
        <>
            <nav
                aria-label="Navegación principal"
                className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
            >
                <ul className="mx-auto flex h-16 max-w-md items-stretch px-2">

                    <li className="flex flex-1">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => `${itemBase} ${colorItem(isActive)}`}
                        >
                            <FiHome size={22} />
                            Inicio
                        </NavLink>
                    </li>

                    <li className="flex flex-1">
                        <NavLink
                            to="/mis-jobs"
                            className={({ isActive }) => `${itemBase} ${colorItem(isActive)}`}
                        >
                            <FiBriefcase size={22} />
                            Mis Jobs
                        </NavLink>
                    </li>

                    <li className="flex flex-1 flex-col items-center justify-center gap-1">
                        <Button
                            variant="warning"
                            aria-label="Publicar Job"
                            onClick={onPublicar}
                            className="-mt-8 !rounded-2xl !p-4 shadow-[0_0_20px_4px_rgba(255,185,6,0.45)]"
                        >
                            <FiPlus size={26} />
                        </Button>
                        <span className="text-xs font-bold text-black">Publicar</span>
                    </li>

                    <li className="flex flex-1">
                        <NavLink
                            to="/mis-postulaciones"
                            className={({ isActive }) => `${itemBase} ${colorItem(isActive)}`}
                        >
                            <span className="relative">
                                <FiBell size={22} />
                                {notificacionesCount > 0 && (
                                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                        {notificacionesCount > 99 ? "99+" : notificacionesCount}
                                    </span>
                                )}
                            </span>
                            Avisos
                        </NavLink>
                    </li>

                    <li className="flex flex-1">
                        <button
                            type="button"
                            aria-label="Abrir menú"
                            onClick={() => setMenuOpen(true)}
                            className={`${itemBase} ${botonSinEstilo} ${colorItem(menuOpen)}`}
                        >
                            <FiMenu size={22} />
                            Menú
                        </button>
                    </li>

                </ul>
            </nav>

            <div
                aria-hidden="true"
                className="h-[calc(6rem+env(safe-area-inset-bottom))] bg-[#1e3a8a] md:hidden"
            />

            <SidebarMenu
                open={menuOpen}
                closeMenu={() => setMenuOpen(false)}
                navigate={navigate}
                notificacionesCount={notificacionesCount}
            />
        </>
    );
}
