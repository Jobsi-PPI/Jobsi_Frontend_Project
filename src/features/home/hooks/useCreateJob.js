import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { crearJob, obtenerJobs } from "../../../services/jobsServices/jobPublicService";
import { useAuth } from "/src/context/AuthContext.jsx";

export const useCreateJob = () => {
const { token } = useAuth();

// States para el formulario de creación de job
const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("");
const [pago, setPago] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [categoria, setCategoria] = useState("ASESORIAS");
const [tipoPago, setTipoPago] = useState("EFECTIVO");

// Otros states
const [errors, setErrors] = useState({});
const [jobs, setJobs] = useState([]);

// States para el modal
const [showModal, setShowModal] = useState(false);
const [closing, setClosing] = useState(false);
const [opening, setOpening] = useState(false);
const [loadingJobs, setLoadingJobs] = useState(true);

// Para filtrar por categoría
const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODAS");


// Cargar jobs
useEffect(() => {
    const loadJobs = async () => {
        setLoadingJobs(true);

        try {
            await Promise.all([
                obtenerJobs().then(setJobs),
                new Promise(resolve => setTimeout(resolve, 3000)) // Simular latencia de skeleton loading
            ]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingJobs(false);
        }
    };

    loadJobs();
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


//Animación para abrir el modal
const openModal = () => {
    setShowModal(true);
    setOpening(true);
    setTimeout(() => setOpening(false), 10);
};

//Animación para cerrar el modal
const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
    setShowModal(false);
    setClosing(false);
    setErrors({});
    }, 250);
};

// Modal de Crear Job y validación de swal alert
const handleCreateJob = async (e, onSuccess) => {
    e.preventDefault();

    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "Sesión no válida",
            text: "Por favor inicia sesión nuevamente.",
        });
        return;
    }

    if (!validateFields()) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Revisa los campos marcados en rojo",
        });
        return;
    }

    const jobData = {
    titulo,
    descripcion,
    pago: Number(pago),
    tipoPago,
    ubicacion,
    categoria,
    };

    try {
    const nuevoJob = await crearJob(jobData, token);
    console.log("Job creado:", nuevoJob); 

    Swal.fire({
        icon: "success",
        title: "Job publicado 🎉",
        text: "Tu Job fue publicado exitosamente.",
        timer: 1500,
        showConfirmButton: false,
    });

    // limpiar todo
    setTitulo("");
    setDescripcion("");
    setPago("");
    setUbicacion("");
    setCategoria("ASESORIAS");
    setTipoPago("EFECTIVO");
    setErrors({});

    // agregar el job recién creado sin recargar
    setJobs((prev) => [...prev, nuevoJob]);

    if (onSuccess) onSuccess(nuevoJob);

    closeModal();
    } catch (error) {
    Swal.fire({
        icon: "error",
        title: "Error publicando el Job",
        text: "Intenta nuevamente.",
    });
    }
};

// Función para actualizar el estado del job cuando alguien lo toma
const handleTomarJob = (jobActualizado) => {
    setJobs((prevJobs) =>
        prevJobs.map((j) =>
            j.id === jobActualizado.id ? jobActualizado : j
        )
    );
};

//Jobs ordenados por fecha de creación (los más recientes primero)
const jobsRecientes = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//Jobs ordenados por pago (de mayor a menor)
const jobsMejorPagados  = [...jobs].sort((a, b) => b.pago - a.pago).slice(0, 8);

//Jobs por categoría
const jobsPorCategoria = categoriaSeleccionada === "TODAS" 
    ? jobs 
    : jobs.filter(job => job.categoria === categoriaSeleccionada);



return {
    // States
    titulo, descripcion, pago, ubicacion, categoria, tipoPago,
    errors, jobs, showModal, closing, opening, loadingJobs,

    // setters
    setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago, setShowModal, setLoadingJobs, setCategoriaSeleccionada,


    // funciones
    handleCreateJob,
    handleTomarJob,
    closeModal,
    openModal,

    // Filtrados
    jobsRecientes,
    jobsMejorPagados,

    // Filtro por categoría
    categoriaSeleccionada,
    jobsPorCategoria
};
};
