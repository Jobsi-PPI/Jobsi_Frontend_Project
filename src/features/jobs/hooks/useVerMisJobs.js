import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {obtenerMisJobs, obtenerJobsTomados, deleteJob, abandonarJob} from "../../../services/jobsServices/misJobsService";
import { useAuth } from "/src/context/AuthContext.jsx";
import { useModalState } from "/src/components/ui/modals/hooks/useModalState.js";
import { TODOS, OPCIONES_FILTRO, etiquetaEstado, filtrarPorEstado } from "../../../utils/estadosJob.js";
import { useIsMobile } from "/src/components/ui/modals/hooks/useIsMobile.js";

export const useVerMisJobs = () => {
    const { token } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [misJobs, setMisJobs] = useState([]);
    const [jobsTomados, setJobsTomados] = useState([]);
    const [activeTab, setActiveTab] = useState("publicados");
    const [loadingPublicados, setLoadingPublicados] = useState(true);
    const [loadingPostulados, setLoadingPostulados] = useState(true);

    const errorModal = useModalState();
    const [errorCode, setErrorCode] = useState(null);

    const [filtros, setFiltros] = useState({ publicados: TODOS, postulados: TODOS });
    const [filtroAbierto, setFiltroAbierto] = useState(false);
    const filtroDisponible = useIsMobile();


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
        } catch {
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
            return error.response?.status || 500;
        }
    };

    const actualizarEstadoJob = (jobId, nuevoEstado) => {
        setMisJobs((prev) =>
            prev.map((job) => job.id === jobId ? { ...job, estado: nuevoEstado } : job)
        );
    };

    const agregarJob = (nuevoJob) => {
        setMisJobs(prev => [nuevoJob, ...prev]);
    };

    const misJobsVisibles = filtroDisponible ? filtrarPorEstado(misJobs, filtros.publicados) : misJobs;
    const jobsTomadosVisibles = filtroDisponible ? filtrarPorEstado(jobsTomados, filtros.postulados) : jobsTomados;

    const filtroActual = filtros[activeTab];

    const seleccionarFiltro = (valor) => {
        setFiltros((prev) => ({ ...prev, [activeTab]: valor }));
        setFiltroAbierto(false);
    };

    const limpiarFiltro = () => seleccionarFiltro(TODOS);

    const filtro = {
        disponible: filtroDisponible,
        activo: filtroActual !== TODOS,
        etiqueta: etiquetaEstado(filtroActual),
        abrir: () => setFiltroAbierto(true),
        limpiar: limpiarFiltro,
    };

    const filtroSheetProps = {
        open: filtroAbierto,
        onOpenChange: setFiltroAbierto,
        opciones: OPCIONES_FILTRO[activeTab].map((value) => ({ value, label: etiquetaEstado(value) })),
        valor: filtroActual,
        onChange: seleccionarFiltro,
        onLimpiar: limpiarFiltro,
    };

    const handleAbandonarConError = async (jobId) => {
        const code = await handleAbandonarJob(jobId);
        if (code) {
            setErrorCode(code);
            errorModal.openModal();
        }
    };

    const errorModalProps = {
        isOpen: errorModal.isOpen,
        closing: errorModal.closing,
        opening: errorModal.opening,
        errorCode,
        onClose: errorModal.closeModal,
        primaryAction: { label: "Entendido", onClick: errorModal.closeModal },
    };


    return {
        // estados
        menuOpen,
        misJobs,
        jobsTomados,
        misJobsVisibles,
        jobsTomadosVisibles,
        activeTab,

        loadingPublicados,
        loadingPostulados,

        // setters
        setMenuOpen,
        setActiveTab,

        // handlers
        handleDeleteJob,
        handleAbandonarConError,
        actualizarEstadoJob,
        agregarJob,

        // props listas para <ErrorBackendModal />
        errorModalProps,

        // filtro por estado
        filtro,
        filtroSheetProps,
    };
};
