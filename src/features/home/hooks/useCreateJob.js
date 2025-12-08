import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { crearJob, obtenerJobs } from "../../../services/jobsServices/jobPublicService";

export const useCreateJob = () => {
const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("");
const [pago, setPago] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [categoria, setCategoria] = useState("ASESORIAS");
const [tipoPago, setTipoPago] = useState("EFECTIVO");

const [errors, setErrors] = useState({});
const [jobs, setJobs] = useState([]);

const [showModal, setShowModal] = useState(false);
const [closing, setClosing] = useState(false);
const [opening, setOpening] = useState(false);

// cargar jobs
useEffect(() => {
    obtenerJobs().then(setJobs).catch(console.error);
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
    categoria,
    };

    try {
    const nuevoJob = await crearJob(jobData, token);

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

    closeModal();

    } catch (error) {
    Swal.fire({
        icon: "error",
        title: "Error publicando el Job",
        text: "Intenta nuevamente.",
    });
    }
};

const handleTomarJob = (jobActualizado) => {
    setJobs((prevJobs) =>
        prevJobs.map((j) =>
            j.id === jobActualizado.id ? jobActualizado : j
        )
    );
};



return {
    // States
    titulo, descripcion, pago, ubicacion, categoria, tipoPago,
    errors, jobs, showModal, closing, opening,

    // setters
    setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago, setShowModal,

    // funciones
    handleCreateJob,
    handleTomarJob,
    closeModal,
    openModal,
};
};
