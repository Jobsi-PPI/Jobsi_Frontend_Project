import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi"; // react-icons (Feather)
const Home = () => {
const navigate = useNavigate();
const username = localStorage.getItem("username") || "Juancho";

return (
    <>
    {/* Header */}
    <div className="w-full py-13 shadow-md bg-[#1e3a8a] relative">
        {/* Left: logo */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <img
            src="/src/assets/Jobsi_home_logo.png"
            alt="Logo Jobsi Home"
            //className="w-[200px] h-[80px] object-cover"
            className="w-[270px] h-[100px] object-cover"
            />
        </div>

        {/* Center: buscador (exactamente centrado) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-[700px]">
            <form className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Escribe un Job que estés buscando"
                    className="flex-1 h-16 px-6 text-lg border-2 border-[#6b7280] rounded-full text-black bg-white"
                />
                <button
                    type="button"
                    aria-label="Buscar"
                    className="p-3 rounded-full bg-white text-white flex items-center justify-center shadow-sm"
                    onClick={() => { /* acción de búsqueda */ }}
                >
                    <FiSearch className="w-8 h-8" />
                </button>
            </form>
        </div>

        {/* Right: botón menú (tres líneas) en blanco */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => { /* abrir menú */ }}
            className="p-2 text-white"
            style={{ backgroundColor: '#1e3a8a' }} // inline asegura que se vea
            >
            <FiMenu className="w-15 h-15" />
            </button>
        </div>
    </div>

    {/* Bienvenida usuario */}
    <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-16 gap-6">
            <h1 className="text-3xl font-bold">
                <span className="text-yellow-400">Bienvenido/a </span>
                <span className="text-blue-600">{username}</span>
                <span className="text-blue-600"> a Jobsi</span>
            </h1>

            <h3 className="font-light text-[24px] text-black">
                ¡Parchate y adentrate en el lugar para generar ingresos en tus tiempos libres!
            </h3>

            <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="w-full sm:w-1/2 btn-amarillo text-black transition !text-[24px] "
            >
                ¡Explora los Jobs Ahora!
            </button>
        </div>
    </div>

    {/* Jobsi Info */}
    <div className="w-full bg-[#1e3a8a] relative overflow-visible">
        <div className="max-w-[900px] mx-auto py-70">
            {/* caja desplazada hacia la izquierda la mitad de su ancho, sin scroll */}
            <div className="absolute left-0 -translate-x-1/2 w-full max-w-3xl bg-[#fbfdff] py-15 rounded-[100px] shadow-md z-0">
                    <h2 className="text-black font-bold text-[24px] text-right pr-30">
                        ¿Muy desparchado y <br /> sin nada que hacer?
                    </h2>
            </div>
        </div>
    </div>

</>
);
};

export default Home;