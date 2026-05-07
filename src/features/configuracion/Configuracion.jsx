import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiShield, FiTool } from "react-icons/fi";

import HeaderConfiguracion from "../../components/layout/HeaderConfiguracion.jsx";
import Footer from "../../components/layout/footer.jsx";
import Button from "../../components/ui/Button.jsx";
import Perfil from "../perfil/Perfil.jsx";

const ITEMS = [
    { id: "perfil",     label: "Perfil",     icon: <FiUser /> },
    { id: "seguridad",  label: "Seguridad",  icon: <FiLock /> },
    { id: "privacidad", label: "Privacidad", icon: <FiShield /> },
];

const ProximamenteSeccion = ({ titulo }) => (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-gray-500">
        <FiTool size={40} className="text-[#1e3a8a]" />
        <p className="text-lg font-semibold">{titulo}</p>
        <p className="text-sm">Esta sección estará disponible próximamente.</p>
    </div>
);

const Configuracion = () => {
    const navigate = useNavigate();
    const [seccionActiva, setSeccionActiva] = useState("perfil");

    const renderSeccion = () => {
        switch (seccionActiva) {
            case "perfil":     return <Perfil />;
            case "seguridad":  return <ProximamenteSeccion titulo="Seguridad" />;
            case "privacidad": return <ProximamenteSeccion titulo="Privacidad" />;
            default:           return null;
        }
    };

    return (
        <>
            <HeaderConfiguracion />


            {/* Contenido */}
            <div className="w-full bg-white relative overflow-x-hidden">
                <div className="w-full max-w-screen-2xl	 mx-auto flex justify-center mt-6 pb-20">
                    <div className="w-full bg-[#eef0f5] p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col sm:flex-row gap-6">

                        {/* Sidebar izquierdo */}
                        <nav className="w-full sm:w-[200px] flex-shrink-0 flex flex-row sm:flex-col gap-2">
                            {ITEMS.map(({ id, label, icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setSeccionActiva(id)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition w-full text-left
                                        ${seccionActiva === id
                                            ? "!bg-[#1e3a8a] text-white"
                                            : "text-gray-600 hover:!bg-gray-200"
                                        }`}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                        </nav>

                        {/* Divisor vertical */}
                        <div className="hidden sm:block w-px bg-gray-300 self-stretch" />

                        {/* Sección activa */}
                        <div className="flex-1 min-w-0">
                            {renderSeccion()}
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <Button variant="primary" size="sm" onClick={() => navigate("/home")}>
                        Volver
                    </Button>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Configuracion;
