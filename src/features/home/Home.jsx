import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi"; // react-icons
import Swal from "sweetalert2";

import JobCard from "/src/features/home/JobCard.jsx";
import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import { useCreateJob } from "./hooks/useCreateJob";
import SidebarMenu from "/src/features/home/layouts/SidebarMenu.jsx";


const Home = () => {
const navigate = useNavigate();
const username = localStorage.getItem("username");
const [menuOpen, setMenuOpen] = useState(false);


//Se importa la lógica del hook personalizado
const {
    titulo, descripcion, pago, ubicacion, categoria, tipoPago,
    errors, jobs, showModal, closing, opening,
    setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago,
    handleCreateJob, closeModal, openModal
} = useCreateJob();

return (
    <>
    {/* Header */}
    <div className="w-full py-13 shadow-md bg-[#1e3a8a] relative">
        {/* Left: logo */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <img
            src="/src/assets/Jobsi_home_logo.png"
            alt="Logo Jobsi Home"
            className="w-[270px] h-[100px] object-cover"
            />
        </div>

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
                    className="p-3 rounded-full text-white flex items-center justify-center shadow-sm"
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
                onClick={() => setMenuOpen(true)}
                className="p-2 text-white rounded-full bg-transparent focus:outline-none"
            >
                <FiMenu className="w-9 h-9" />
            </button>
        </div>
    </div>

    {/* Bienvenida usuario */}
    <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-16 gap-6">
            <h1 className="text-3xl font-bold">
                <span className="text-yellow-400">Bienvenido/a </span>
                <span className="text-[#1e3a8a]">{username}</span>
                <span className="text-[#1e3a8a]"> a Jobsi</span>
            </h1>

            <h3 className="font-light text-[24px] text-black">
                ¡Parchate y adentrate en el lugar para generar ingresos en tus tiempos libres!
            </h3>

            <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="w-full sm:w-auto max-w-[480px] h-14 flex items-center justify-center btn-amarillo text-black transition !text-[24px] px-6 overflow-hidden"
            >
                ¡Explora los Jobs Ahora!
            </button>
        </div>
    </div>

    {/* Jobsi Info */}
    <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">
        <div className="max-w-[900px] mx-auto py-70">

            {/* Mensaje de caja de la izquierda */}
            <div
                className="absolute left-0 -translate-x-1/2 w-full max-w-3xl bg-[#fbfdff] rounded-[100px] shadow-md z-0 overflow-hidden"
                style={{ height: 100 }} // fija la altura de la caja.
            >
                <div className="h-full flex items-center justify-center px-8">
                    <h2 className="text-black font-bold text-4xl md:text-5xl lg:text-3xl leading-tight text-right pl-85">
                        ¿Muy desparchado y <br /> sin nada que hacer?
                    </h2>
                </div>
            </div>

            {/* Caja blanca ¿Necesitas una mano? */}
            <div
                className="absolute left-1/2 -translate-x-1/2 w-full max-w-[330px] bg-[#fbfdff] rounded-[100px] shadow-md z-10 overflow-hidden"
                style={{ height: 100 }} // misma altura que la caja izquierda
            >
                <div className="h-full flex items-center justify-center px-6">
                    <h2 className="text-black font-bold text-4xl md:text-5xl lg:text-3xl leading-tight text-center">
                        ¿Necesitas una mano?
                    </h2>
                </div>
            </div>

            <div
                className="absolute right-[-22%] top-[22%] -translate-x-1/2 w-full max-w-[730px] bg-[#fbfdff] rounded-[100px] shadow-md z-10 overflow-hidden"
                style={{ height: 350 }} // misma altura que la caja izquierda
            >
                <div className="h-full flex items-center justify-center px-6"> 
                    <img
                        src="/src/assets/burbuja_voz.png"
                        alt="Logo Jobsi"
                        className="absolute right-[35%] top-[-18%] w-[450px] h-[420px] object-cover z-10"
                    />
                    <h2 className="absolute left-[8%] top-[14%] text-black font-bold text-4xl md:text-5xl lg:text-3xl leading-tight text-center">
                        Relajado compa, <br />
                        <span className="text-[#1e3a8a]">¡Nosotros te resolvemos!</span>
                        <br /> todo al alcance de un <span className="text-yellow-400">click</span>
                    </h2>
                    <img
                        src="/src/assets/jobsi-mascota-jobito_render.png"
                        alt="Logo Jobsi"
                        className="absolute right-[15%] top-[57%] w-[180px] h-[140px] object-cover"
                    />
                </div>
            </div>
        </div>
    </div>

    <div className="w-full bg-white relative overflow-x-hidden">
        <div className="w-full px-10 py-20">
            {/* Apartado de jobs */}
            <div className="mt-20 flex flex-col">
                <h1 className="text-3xl font-bold text-[#1e3a8a] mb-10 text-left pl-22">
                    Jobs disponibles
                </h1>

                {/* Listado de Jobs */}
                <div className="flex flex-wrap gap-8 pl-2">
                    {jobs.length === 0 ? (
                        <p className="text-gray-600 text-lg">Cargando jobs...</p>
                    ) : (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                    )}
                </div>
            </div>

            {/* Apartado publicar Job */}
            <div className="absolute top-30 right-1/9 -translate-x-1/2mt-40 flex flex-col items-center text-center gap-6">
                <h1 className=" text-3xl font-bold text-[#1e3a8a]">Si necesitas ayuda, <br />sube un Job</h1>
                <button
                type="button"
                onClick={openModal} 
                className="w-full sm:w-auto max-w-[480px] h-14 flex items-center justify-center btn-amarillo text-black transition !text-[24px] px-6 overflow-hidden"
            >
                Publicalo
            </button>
            </div>
        </div>
        
    </div>

<CreateJobModal
    show={showModal}
    closing={closing}
    closeModal={closeModal}
    handleCreateJob={handleCreateJob}

    titulo={titulo}
    setTitulo={setTitulo}
    descripcion={descripcion}
    setDescripcion={setDescripcion}
    pago={pago}
    setPago={setPago}
    ubicacion={ubicacion}
    setUbicacion={setUbicacion}
    categoria={categoria}
    setCategoria={setCategoria}
    tipoPago={tipoPago}
    setTipoPago={setTipoPago}

    errors={errors}
/>

<SidebarMenu 
    open={menuOpen} 
    closeMenu={() => setMenuOpen(false)}
    navigate={navigate}
/>



</>
);
};

console.log("RESPUESTA LOGIN:", response);


export default Home;