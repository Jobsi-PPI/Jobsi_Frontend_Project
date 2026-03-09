import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiSliders } from "react-icons/fi";
import { MdSchool, MdBuild, MdSportsBasketball, MdWork, MdCategory } from "react-icons/md";
import { PiBookOpenTextBold } from "react-icons/pi";

import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";

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

    const handleFilterClick = () => {
        setFilterOpen(prev => !prev);
        if (onFilterClick) onFilterClick();
    };

return (
    <div>
        <div className="w-full bg-[#1e3a8a] shadow-md px-4 py-4 lg:px-10">
            <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    
                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                    <img src="/src/assets/Jobsi_home_logo.png" alt="Logo Jobsi Home" className="w-[200px] lg:w-[260px] object-contain" />
                </div>
    
                {/* Buscador */}
                <div className="w-full lg:max-w-[600px]">
                    <form className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Escribe un Job que estés buscando"
                                className="w-full h-12 lg:h-14 px-5 pr-14 text-base lg:text-lg border-2 border-[#6b7280] rounded-full text-black bg-white"
                            />
                            <button type="button" aria-label="Buscar"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 !bg-white/10 text-black hover:!bg-black/30 transition">
                                <FiSearch className="w-5 h-5 lg:w-6 lg:h-6" />
                            </button>
                        </div>

                        {/* Botón filtro */}
                        <button
                            type="button"
                            aria-label="Filtrar jobs"
                            onClick={handleFilterClick}
                            className={`p-3 rounded-full text-white flex items-center justify-center transition
                                ${filterOpen ? "!bg-white/20" : "hover:!bg-white/10"}`}
                        >
                            <FiSliders className="w-6 h-6 lg:w-7 lg:h-7" />
                        </button>
                    </form>
                </div>
    
                {/* Menú */}
                <div className="flex justify-center lg:justify-end">
                    <button type="button" aria-label="Abrir menú"
                        onClick={() => setMenuOpen(true)}
                        className="p-2 text-white rounded-full">
                        <FiMenu className="w-8 h-8" />
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
        />
    </div>
)
}

export default Header;