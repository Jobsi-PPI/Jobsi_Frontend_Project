import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiSliders } from "react-icons/fi";

import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";

const Header = ({ onFilterClick }) => { // recibe prop para cuando se implemente

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

return (
    <div>
        <div className="w-full bg-[#1e3a8a] shadow-md px-4 py-4 lg:px-10">
            <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    
                {/* Logo */}
                <div className="flex justify-center lg:justify-start xl:justify-start">
                    <img src="/src/assets/Jobsi_home_logo.png" alt="Logo Jobsi Home" className="w-[200px] lg:w-[260px] object-contain" />
                </div>
    
                {/* Buscador */}
                <div className="w-full lg:max-w-[600px]">
                    <form className="flex items-center gap-3">
                        <input type="text" placeholder="Escribe un Job que estés buscando" className="flex-1 h-12 lg:h-14 px-5 text-base lg:text-lg border-2 border-[#6b7280] rounded-full text-black bg-white" />
                        
                        {/* Botón buscar */}
                        <button type="button" aria-label="Buscar" className="p-3 rounded-full text-white flex items-center justify-center">
                            <FiSearch className="w-6 h-6 lg:w-7 lg:h-7" />
                        </button>

                        {/* Botón filtro */}
                        <button
                            type="button"
                            aria-label="Filtrar jobs"
                            onClick={onFilterClick}
                            className="p-3 rounded-full text-white flex items-center justify-center hover:bg-white/10 transition"
                        >
                            <FiSliders className="w-6 h-6 lg:w-7 lg:h-7" />
                        </button>
                    </form>
                </div>
    
                {/* Menú */}
                <div className="flex justify-center lg:justify-end xl:justify-end">
                    <button 
                        type="button" 
                        aria-label="Abrir menú" 
                        onClick={() => setMenuOpen(true)} 
                        className="p-2 text-white rounded-full"
                    >
                        <FiMenu className="w-8 h-8" />
                    </button>
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