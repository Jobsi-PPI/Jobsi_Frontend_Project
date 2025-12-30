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
        if (!token) return;
        const loadPublicados = async () => {
            setLoadingPublicados(true);

            try {
                await Promise.all([
                    obtenerMisJobs(token).then(setMisJobs),
                    new Promise(resolve => setTimeout(resolve, 2500)) // Simular latencia de skeleton loading
                ]);
            } catch (error) {
                console.error("Error cargando mis jobs", error);
            } finally {
                setLoadingPublicados(false);
            }
        };
        loadPublicados();
    }, [token]);


    //Postulados
    useEffect(() => {
        if (!token) return;
        const loadPostulados = async () => {
            setLoadingPostulados(true);

            try {
                await Promise.all([
                    obtenerJobsTomados(token).then(setJobsTomados),
                    new Promise(resolve => setTimeout(resolve, 2500)) // Simular latencia de skeleton loading
                ]);
            } catch (error) {
                console.error("Error cargando jobs tomados", error);
            } finally {
                setLoadingPostulados(false);
            }
        };
        loadPostulados();
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
