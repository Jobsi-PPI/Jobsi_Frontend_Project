import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi"; // react-icons
import { useState } from "react";
import { useEffect } from "react";

import Swal from "sweetalert2";

import JobCard from "/src/features/home/JobCard.jsx";
import { crearJob, obtenerJobs } from "/src/services/jobService.js";



const Home = () => {
const navigate = useNavigate();
const username = localStorage.getItem("username");

const [showModal, setShowModal] = useState(false);
const [closing, setClosing] = useState(false);

const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("");
const [pago, setPago] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [categoria, setCategoria] = useState("ASESORIAS");
const [tipoPago, setTipoPago] = useState("EFECTIVO");

// Errores por campo
const [errors, setErrors] = useState({});

// Lista de jobs
const [jobs, setJobs] = useState([]);

useEffect(() => {
    const fetchJobs = async () => {
        try {
            const data = await obtenerJobs();
            setJobs(data);
        } catch (error) {
            console.error("Error cargando jobs", error);
        }
    };

    fetchJobs();
}, []);


const validateFields = () => {
    let newErrors = {};

    if (!titulo.trim()) newErrors.titulo = "El título es obligatorio";
    if (!descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!pago) newErrors.pago = "El pago es obligatorio";
    if (!ubicacion.trim()) newErrors.ubicacion = "La ubicación es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

//Animación para cerrar el modal
const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
        setShowModal(false);
        setClosing(false);
        setErrors({}); // Limpia errores al cerrar el modal
    }, 250);
};

const handleCreateJob = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
        Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Revisa los campos marcados en rojo",
        });
        return;
    }

    const token = localStorage.getItem("token");

    const jobData = {
        titulo,
        descripcion,
        pago: Number(pago),
        tipoPago,
        ubicacion,
        categoria
    };

    try {
        await crearJob(jobData, token);

        Swal.fire({
        icon: "success",
        title: "Job publicado 🎉",
        text: "Tu Job fue publicado exitosamente.",
        timer: 1500,
        showConfirmButton: false,
        });

        // 💥 Limpieza del formulario
        setTitulo("");
        setDescripcion("");
        setPago("");
        setUbicacion("");
        setTipoPago("EFECTIVO");
        setCategoria("SERVICIOS");
        setErrors({});

        // 💥 Cerrar el modal con animación
        closeModal();
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error publicando el Job",
        text: "Intenta nuevamente.",
        
        });
    }
};

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
                    className="p-3 rounded-full bg-white text-[#6b7280] flex items-center justify-center shadow-sm"
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
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto max-w-[480px] h-14 flex items-center justify-center btn-amarillo text-black transition !text-[24px] px-6 overflow-hidden"
            >
                Publicalo
            </button>
            </div>
        </div>


    </div>

    
    {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
            
            <div className={`bg-white w-[90%] max-w-[600px] rounded-2xl shadow-xl p-8 relative transition-all duration-300
            ${closing ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}>

            
                {/* Botón cerrar */}
                <button 
                    className="absolute top-4 right-4 btn-blanco text-black hover:text-red-500 text-2xl"
                    onClick={closeModal}
                >
                    <FiX className="w-9 h-9" />
                </button>

                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 text-center">
                    Publicar Job
                </h2>

                {/* Formulario del modal */}
                <form className="space-y-4" onSubmit={handleCreateJob}>
                    
                    <div>
                        <label className="block font-medium text-gray-700">Título del Job</label>
                        <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej. Arreglo de portátil"
                        className={`w-full p-3 border-2 rounded-lg text-black 
                            ${errors.titulo ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Descripción</label>
                        <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describe tu necesidad..."
                        className={`w-full p-3 border-2 border-gray-300 rounded-lg text-black h-32
                            ${errors.descripcion ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Pago ofrecido</label>
                        <input
                        type="number"
                        value={pago}
                        onChange={(e) => setPago(e.target.value)}
                        placeholder="Ej. 20.000"
                        className={`w-full p-3 border-2 border-gray-300 rounded-lg text-black
                            ${errors.pago ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Ubicación del Job</label>
                        <input
                        type="text"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        placeholder="Ej. Almendros"
                        className={`w-full p-3 border-2 border-gray-300 rounded-lg text-black
                            ${errors.ubicacion ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-bold text-black">Categoría</label>
                        <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                        <option value="ASESORIAS">ASESORIAS</option>
                        <option value="TAREAS">TAREAS</option>
                        <option value="MATERIALES">MATERIALES</option>
                        <option value="ENTRENAMIENTOS">ENTRENAMIENTOS</option>
                        <option value="OTRO">OTRO</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-base font-bold text-black">Tipo de pago</label>
                        <select
                        value={tipoPago}
                        onChange={(e) => setTipoPago(e.target.value)}
                        className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                        <option value="EFECTIVO">EFECTIVO</option>
                        <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                        <option value="INTERCAMBIO">INTERCAMBIO</option>
                        <option value="OTRO">OTRO</option>
                        </select>
                    </div>
                    
                    

                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-400 text-white font-bold rounded-lg btn-azul"
                    >
                        Publicar
                    </button>

                </form>

            </div>

        </div>
    )}

</>
);
};

export default Home;