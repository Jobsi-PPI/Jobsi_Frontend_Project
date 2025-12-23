import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {obtenerMisJobs, obtenerJobsTomados, deleteJob, abandonarJob} from "../../../services/jobsServices/misJobsService";
import { useAuth } from "/src/context/AuthContext.jsx";

export const useVerMisJobs = () => {
    const { token } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [misJobs, setMisJobs] = useState([]);
    const [jobsTomados, setJobsTomados] = useState([]);
    const [activeTab, setActiveTab] = useState("publicados");
    const [loadingPublicados, setLoadingPublicados] = useState(true);
    const [loadingPostulados, setLoadingPostulados] = useState(true);


    //Publicados
    useEffect(() => {
        obtenerMisJobs(token)
            .then(setMisJobs)
            .catch(console.error)
            .finally(() => setLoadingPublicados(false));
    }, []);

    //Postulados
    useEffect(() => {
        obtenerJobsTomados(token)
            .then(setJobsTomados)
            .catch(console.error)
            .finally(() => setLoadingPostulados(false));
    }, []);


    // Cargar los jobs publicados por el usuario 
    useEffect(() => {
    if (!token) return;
        obtenerMisJobs(token)
            .then(setMisJobs)
            .catch((err) => console.error("Error cargando mis jobs", err));
    }, [token]);


    // Cargar los jobs tomados por el usuario
    useEffect(() => {
    if (!token) return;
        obtenerJobsTomados(token)
        .then(setJobsTomados)
        .catch((err) => console.error("Error cargando jobs tomados", err));
    }, [token]);

    // Eliminar un job publicado por el usuario
    const handleDeleteJob = async (jobId) => {
        try {
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
            await abandonarJob(jobId, token);

            setJobsTomados(prev => prev.filter(job => job.id !== jobId));

            Swal.fire({
                icon: "success",
                title: "Has abandonado el Job",
                text: "Ya no estás asignado a este trabajo.",
                timer: 1500,
                showConfirmButton: false,
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

        loadingPublicados,
        loadingPostulados, 

        // setters
        setMenuOpen,
        setActiveTab,

        // handlers
        handleDeleteJob,
        handleAbandonarJob,
    };
};
