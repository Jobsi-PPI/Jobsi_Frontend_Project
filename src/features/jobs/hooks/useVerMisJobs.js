import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {obtenerMisJobs, obtenerJobsTomados, deleteJob} from "../../../services/jobsServices/misJobsService";

export const useVerMisJobs = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [misJobs, setMisJobs] = useState([]);
    const [jobsTomados, setJobsTomados] = useState([]);
    const [activeTab, setActiveTab] = useState("publicados");

    // Cargar los jobs publicados por el usuario 
    useEffect(() => {
        const token = localStorage.getItem("token");

        obtenerMisJobs(token)
        .then(setMisJobs)
        .catch((err) => console.error("Error cargando mis jobs", err));
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("token");

        obtenerJobsTomados(token)
        .then(setJobsTomados)
        .catch((err) => console.error("Error cargando jobs tomados", err));
    }, []);

    // Eliminar un job publicado por el usuario
    const handleDeleteJob = async (jobId) => {
        try {
        const token = localStorage.getItem("token");
        await deleteJob(jobId, token);

        setMisJobs((prev) => prev.filter((job) => job.id !== jobId));

        Swal.fire({
            icon: "success",
            title: "Job eliminado",
            text: "El job se eliminó correctamente.",
            timer: 1500,
            showConfirmButton: false,
        });
        } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error al eliminar",
            text: "No se pudo eliminar el job.",
        });
        }
    };

    // Método para abandonar job tomado (cuando se tenga el servicio)
    const handleAbandonarJob = async (jobId) => {
        try {
            const token = localStorage.getItem("token");
            await abandonarJob(jobId, token);

            setJobsTomados(prev => prev.filter(job => job.id !== jobId));

            Swal.fire({
                icon: "success",
                title: "Has abandonado el Job",
                text: "Ya no estás asignado a este trabajo.",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo abandonar",
                text: "Intenta de nuevo más tarde."
            });
        }
    };

    return {
        // estados
        menuOpen,
        misJobs,
        jobsTomados,
        activeTab,

        // setters
        setMenuOpen,
        setActiveTab,

        // handlers
        handleDeleteJob,
        handleAbandonarJob,
    };
};
