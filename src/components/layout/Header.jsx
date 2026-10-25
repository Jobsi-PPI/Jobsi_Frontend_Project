import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiSliders, FiBell, FiChevronDown, FiUser, FiPlus } from "react-icons/fi";
import { MdSchool, MdBuild, MdSportsBasketball, MdWork, MdCategory } from "react-icons/md";
import { PiBookOpenTextBold } from "react-icons/pi";

import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";
import { useNotificacionesBadge } from "/src/features/postulaciones/hooks/useNotificacionesBadge.js";
import { useAuth } from "/src/context/AuthContext.jsx";

const CATEGORIAS = [
    { label: "Todas",           value: "TODAS",          icon: <MdCategory /> },
    { label: "Asesorías",       value: "ASESORIAS",      icon: <MdSchool /> },
    { label: "Tareas",          value: "TAREAS",         icon: <PiBookOpenTextBold /> },
    { label: "Materiales",      value: "MATERIALES",     icon: <MdBuild /> },
    { label: "Entrenamientos",  value: "ENTRENAMIENTOS", icon: <MdSportsBasketball /> },
    { label: "Otro",            value: "OTRO",           icon: <MdWork /> },
];

const Header = ({ onFilterClick, onCategoriaChange, categoriaSeleccionada, onPublicarJob }) => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const notificacionesCount = useNotificacionesBadge();
    const { user } = useAuth();

    const nombre = user?.nombre || "Usuario";
    const rol = user?.role ? user.role.replace("ROLE_", "").toLowerCase() : "user";

    const handleFilterClick = () => {
        setFilterOpen(prev => !prev);
        if (onFilterClick) onFilterClick();
    };

    const handlePublicarJob = () => {
        if (onPublicarJob) onPublicarJob();
        else navigate("/home");
    };

return (
    <header className="w-full bg-[#1e3a8a]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 px-4 py-3 lg:flex-nowrap lg:gap-6 lg:px-10 lg:py-4">

            {/* Logo */}
            <button
                type="button"
                onClick={() => navigate("/home")}
                aria-label="Ir al inicio"
                className="order-1 shrink-0 !rounded-none !border-0 !bg-transparent !p-0"
            >
                <img
                    src="/src/assets/Jobsi_home_logo.png"
                    alt="Logo Jobsi Home"
                    className="h-10 w-auto object-contain lg:h-12"
                />
            </button>

            {/* Acciones */}
            <div className="order-3 ml-auto flex items-center gap-2 lg:order-3 lg:ml-0">

                <button
                    type="button"
                    onClick={handlePublicarJob}
                    className="hidden h-10 items-center gap-2 !rounded-xl !border-0 !bg-[#ffb906] !px-4 !py-0 text-sm font-semibold text-black transition hover:!bg-[#f59e0b] sm:flex"
                >
                    <FiPlus className="h-4 w-4" />
                    Publicar Job
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/mis-postulaciones")}
                    aria-label="Notificaciones"
                    className="relative flex h-10 w-10 items-center justify-center !rounded-xl !border-0 !bg-[#2c4a99] !p-0 text-white transition hover:!bg-[#3a5cb3]"
                >
                    <FiBell className="h-5 w-5" />
                    {notificacionesCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffb906] px-1 text-[10px] font-bold text-[#1e3a8a]">
                            {notificacionesCount > 99 ? "99+" : notificacionesCount}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Abrir menú de usuario"
                    className="flex h-10 items-center gap-2 !rounded-full !border-0 !bg-[#2c4a99] !py-1 !pl-1 !pr-2 text-white transition hover:!bg-[#3a5cb3] sm:!pr-3"
                >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffb906] text-[#1e3a8a]">
                        <FiUser className="h-4 w-4" />
                    </span>
                    <span className="hidden text-left leading-tight sm:block">
                        <span className="block max-w-[110px] truncate text-xs font-semibold text-white">{nombre}</span>
                        <span className="block text-[10px] text-white/70">{rol}</span>
                    </span>
                    <FiChevronDown className="hidden h-4 w-4 text-white/70 sm:block" />
                </button>
            </div>

            {/* Buscador */}
            <div className="order-4 w-full lg:order-2 lg:max-w-[620px] lg:flex-1">
                <form
                    className="flex w-full items-center gap-1 rounded-full bg-white p-1.5 pl-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <FiSearch className="h-5 w-5 shrink-0 text-[#1e3a8a]" />
                    <input
                        type="text"
                        placeholder="Escribe un Job que estés buscando"
                        className="h-9 w-full min-w-0 bg-transparent px-2 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none lg:text-base"
                    />
                    <button
                        type="button"
                        aria-label="Filtrar jobs"
                        onClick={handleFilterClick}
                        className={`flex shrink-0 items-center gap-1.5 !rounded-full !border-0 !px-3 !py-2 text-sm font-semibold text-[#1e3a8a] transition lg:!px-4
                            ${filterOpen ? "!bg-[#dbe4f7]" : "!bg-[#eef2fb] hover:!bg-[#dbe4f7]"}`}
                    >
                        <FiSliders className="h-4 w-4" />
                        <span className="hidden sm:inline">Filtros</span>
                    </button>
                </form>
            </div>
        </div>

        {/* Barra de categorías animada */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${filterOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mx-auto flex max-w-[1500px] flex-wrap justify-center gap-3 px-4 pb-4 lg:px-10">
                {CATEGORIAS.map((cat, i) => (
                    <button
                        key={cat.value}
                        type="button"
                        onClick={() => onCategoriaChange && onCategoriaChange(cat.value)}
                        style={{ animationDelay: filterOpen ? `${i * 60}ms` : "0ms", }}
                        className={`flex items-center gap-2 !rounded-full !px-4 !py-2 text-sm font-semibold transition
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

        <SidebarMenu
            open={menuOpen}
            closeMenu={() => setMenuOpen(false)}
            navigate={navigate}
            notificacionesCount={notificacionesCount}
        />
    </header>
)
}

export default Header;
