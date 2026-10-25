import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiBriefcase, FiPlus, FiBell, FiMenu} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";


export default function TabBarMobile({ }) {

    const { logout } = useAuth();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();
    
    const mobileTabbarItems = [
        { path: "/", label: "Inicio", icon: FiHome, end: true },
        { path: "/jobs", label: "Mis Jobs", icon: FiBriefcase },
        { path: "/create-job", label: "Publicar", icon: FiPlus },
        { path: "/mis-postulaciones", label: "Avisos", icon: FiBell },
        { path: "/more", label: "Menú", icon: FiMenu },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
            {/* Tabbar solo en mobile: "md:hidden" la quita desde 768px, donde ya está el sidebar.
            4 buttons y el + en medio, el menú abre el bottom sheet (MoreSheet)*/}
            <nav className="fixed inset-x-0 bottom-0 border-t border-tinta-200 bg-white md:hidden">
                <div className="mx-auto flex max-w-md items-stretch justify-between">
                {mobileTabbarItems.map(({ path, label, icon: Icon, end }) => (
                    <NavLink
                    key={path || 'index'}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                        `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-body-sm ${
                        isActive ? 'text-primary-600' : 'text-tinta-500'
                        }`
                    }
                    >
                    <Icon size={20} />
                    {label}
                    </NavLink>
                ))}
                </div>
            </nav>

        </div>
    );
}