import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiSliders, FiBell } from "react-icons/fi";
import { MdSchool, MdBuild, MdSportsBasketball, MdWork, MdCategory } from "react-icons/md";
import { PiBookOpenTextBold } from "react-icons/pi";

import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";
import { useNotificacionesBadge } from "/src/features/postulaciones/hooks/useNotificacionesBadge.js";

const CATEGORIAS = [
    { label: "Todas",           value: "TODAS",          icon: <MdCategory /> },
    { label: "Asesorías",       value: "ASESORIAS",      icon: <MdSchool /> },
    { label: "Tareas",          value: "TAREAS",         icon: <PiBookOpenTextBold /> },
    { label: "Materiales",      value: "MATERIALES",     icon: <MdBuild /> },
    { label: "Entrenamientos",  value: "ENTRENAMIENTOS", icon: <MdSportsBasketball /> },
    { label: "Otro",            value: "OTRO",           icon: <MdWork /> },
];

const Header = ({ onFilterClick, onCategoriaChange, categoriaSeleccionada }) => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const notificacionesCount = useNotificacionesBadge();

    const handleFilterClick = () => {
        setFilterOpen(prev => !prev);
        if (onFilterClick) onFilterClick();
    };

return (
    <div>
        <div className="w-full bg-[#1e3a8a] shadow-md px-4 py-4 lg:px-10">
            <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    
                {/* Logo */}
                <div className="flex items-center flex-1 gap-3 lg:justify-start">
                    <img src="/src/assets/Jobsi_home_logo.png" 
                    alt="Logo Jobsi Home"
                    className="w-[100px] items-start lg:w-[260px] object-contain" />

                    <button
                        type="button"
                        aria-label="Filtrar Jobs" 
                        className={"ml-auto items-end gap-3 !bg-white/10"}
                        >
                        <FiBell className="w-7 h-7 lg:w-6 lg:h-6" />
                        {notificacionesCount > 0 && (
                            <span className="ml-auto min-w-[22px] h-[22px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                                {notificacionesCount > 99 ? "99+" : notificacionesCount}
                            </span>
                        )}
                    </button>
                </div>
    
                {/* Buscador */}
                <div className="w-full lg:max-w-[600px]">
                    <form className="flex items-center gap-3">
                        <div className="flex items-center flex-1 gap-3 h-12 lg:h-14 px-4 border-2 border-[#6b7280] rounded-full bg-white">
                            <FiSearch
                                aria-hidden="true"
                                className="shrink-0 w-5 h-5 lg:w-6 lg:h-6 text-gray-500"
                            />
                            <input
                                type="text"
                                placeholder="Escribe un Job que estés buscando"
                                className="flex-1 min-w-0 h-full text-base lg:text-lg text-black bg-transparent outline-none"
                            />
                            <button
                                type="button"
                                aria-label="Filtrar Jobs"
                                onClick={handleFilterClick}
                                className={`shrink-0 !p-2 !rounded-full !border-0 text-black transition
                                    ${filterOpen ? "!bg-gray-200" : "!bg-transparent hover:!bg-gray-100"}`}
                            >
                                <FiSliders className="w-5 h-5 lg:w-6 lg:h-6" />
                            </button>
                        </div>
                    </form>
                </div>
    
                {/* Menú */}
                <div className="hidden md:block flex justify-center lg:justify-end">
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

            {/* Barra de categorías animada */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out
                ${filterOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-wrap justify-center gap-3 pb-4">
                    {CATEGORIAS.map((cat, i) => (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => onCategoriaChange && onCategoriaChange(cat.value)}
                            style={{ animationDelay: filterOpen ? `${i * 60}ms` : "0ms", }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition
                                ${filterOpen ? "animate-bounce-in" : ""}
                                ${categoriaSeleccionada === cat.value
                                    ? "!bg-[#e6c300] !text-black"
                                    : "!bg-white/10 text-white hover:!bg-white/30"
                                }`}
                        >
                            <span className="text-lg">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
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