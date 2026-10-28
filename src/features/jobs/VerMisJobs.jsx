import { useNavigate } from "react-router-dom";
import { AiFillWarning} from "react-icons/ai";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobPublicadoCard from "./misJobs/JobPublicadoCard";
import JobPostuladoCard from "./misJobs/JobPostuladoCard";
import CalificarModal from "../calificaciones/CalificarModal.jsx";

import { useVerMisJobs } from "./hooks/useVerMisJobs";
import { useCreateJob } from "../home/hooks/useCreateJob.js";
import { useCalificarModal } from "../calificaciones/hooks/useCalificarModal.js";

//Importación de componentes
import JobPublicadoSkeleton from "../../components/loaders/JobPublicadoSkeleton";
import JobPostuladoSkeleton from "../../components/loaders/JobPostuladoSkeleton";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";
import ErrorBackendModal from "../../components/ui/modals/ErrorBackendModal.jsx";
import TabBarMobile from "../../components/layout/TabBarMobile.jsx";

const VerMisJobs = () => {
    
    const navigate = useNavigate(); 
    
    const { openModal, handleCreateJob, modalProps: createJobModalProps } = useCreateJob();

    const {
        misJobs,
        jobsTomados,
        activeTab,
        loadingPublicados,
        loadingPostulados,
        agregarJob,
        setActiveTab,
        handleDeleteJob,
        handleAbandonarConError,
        actualizarEstadoJob,
        errorModalProps,
    } = useVerMisJobs();

    const { abrirModal: abrirCalificar, modalProps: calificarModalProps } = useCalificarModal();

    const tabs = [
        { id: "publicados", label: "Publicados", cantidad: misJobs.length, cargando: loadingPublicados },
        { id: "postulados", label: "Postulados", cantidad: jobsTomados.length, cargando: loadingPostulados },
    ];

    const vacio = activeTab === "publicados"
        ? !loadingPublicados && misJobs.length === 0
        : !loadingPostulados && jobsTomados.length === 0;

return (
    <>
        {/* Header */}
        <div>
            <Header onPublicarJob={openModal} />
        </div> 

        {/* Área de Jobs */}
        <div className="w-full bg-[#1e3a8a] overflow-x-hidden">
            <div className="max-w-4xl mx-auto flex flex-col items-start py-5 px-4 sm:py-14 lg:py-18 gap-4 sm:gap-5">
                
                <h2 className="text-4xl lg:text-7xl font-bold">
                    <span className="text-yellow-400">Área de Jobs</span>
                </h2>

                <h3 className="text-base font-semibold sm:text-lg lg:text-xl text-white max-w-3xl">
                    Aquí encontrarás los jobs que has publicado y también a los que te has postulado
                </h3>

            </div>
        </div>
        
        {/* Apartado de los Jobs*/}
        <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">

            {/* Botones de publicados y postulados */}
            <div role="tablist" className="max-w-auto mx-8 py-2 px-2 flex flex-row justify-center gap-1 rounded-2xl !bg-white/18 md:gap-8 lg:gap-16">
                
                {tabs.map(({ id, label, cantidad, cargando }) => {
                    const activo = activeTab === id;

                    return (
                        <button key={id}
                            role="tab"
                            aria-selected={activo}
                            className={`w-full sm:w-[200px] h-11 sm:h-14 flex items-center justify-center gap-2 rounded-xl !font-bold transition text-lg sm:text-xl lg:!text-[30px]
                                ${activo ? "!bg-white text-[#1e3a8a]" : "!bg-transparent text-[#dbe4ff]"}`}
                            type="button"
                            onClick={() => setActiveTab(id)}
                        >
                            {label}

                            {cargando ? (
                                <span className="h-6 w-6 animate-pulse rounded-full bg-white/20 md:hidden" />
                            ) : (
                                <span className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold md:hidden
                                    ${activo ? "bg-[#ffb906] text-[#1e3a8a]" : "bg-white/20 text-white"}`}>
                                    {cantidad > 99 ? "99+" : cantidad}
                                </span>
                            )}
                        </button>
                    );
                })}

            </div>

            <section className="mt-6 rounded-t-[40px] bg-white px-4 pb-10 pt-6 sm:px-3 lg:px-10">
                    <div className={`mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-2xl md:gap-6 md:bg-[#eef0f5] md:p-6 lg:p-8
                        ${vacio ? "bg-[#f6f7fb] p-4" : ""}`}>

                {!vacio && (
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-gray-900">
                            {activeTab === "publicados" ? "Mis publicaciones" : "Mis postulaciones"}
                        </h2>

                        <button
                            type="button"
                            className="flex h-10 shrink-0 items-center gap-2 !rounded-full !border !border-gray-300 !bg-white !px-4 text-sm font-semibold !text-[#1e3a8a] transition hover:!bg-gray-50"
                        >
                            <FiFilter className="h-4 w-4" />
                            Filtrar
                        </button>
                    </div>
                )}

                {/* Aquí se muestran los jobs publicados */}
                {activeTab === "publicados" && (
                    <>
                        {loadingPublicados ? (Array.from({ length: 3 }).map((_, i) => (
                            <JobPublicadoSkeleton key={i} />
                        ))
                        ) : misJobs.length === 0 ? (
                            <EmptyState
                                title="Aún no has publicado ningún Job"
                                description="Publica tu primer Job y empieza a recibir ayuda de otros estudiantes."
                                icon = {<AiFillWarning  size={40} className="text-yellow-400" />}
                                primaryAction={{ label: "Publicar Job", onClick: () => openModal(true), variant: "warning" }}
                                secondaryAction={{ label: "Explorar Jobs", onClick: () => navigate("/home"), variant: "secondary" }}
                            />

                        ) : (
                            misJobs.map((job) => (
                                <JobPublicadoCard
                                    key={job.id}
                                    job={job}
                                    onDelete={handleDeleteJob}
                                    onFinalizar={(j) => abrirCalificar(j, () => actualizarEstadoJob(j.id, "FINALIZADO"))}
                                />
                                ))
                        )}
                    </>
                )}

                {/* Aquí se muestran los jobs TOMADOS */}
                {activeTab === "postulados" && (
                    <>
                        {loadingPostulados ? (Array.from({ length: 3 }).map((_, i) => (
                            <JobPostuladoSkeleton key={i} />
                        ))
                        ) : jobsTomados.length === 0 ? (
                            <EmptyState
                                title="Aún no te has postulado a ningún Job"
                                description="Explora los Jobs disponibles y postúlate al que más te interese para ganar dinero."
                                icon = {<MdOutlineWorkHistory size={40} className="text-[#8B4513]" />}
                                primaryAction={{ label: "Explorar", onClick: () => navigate("/home"), variant: "secondary" }}
                            />
                        ) : (
                            jobsTomados.map((job) => (
                                <JobPostuladoCard
                                    key={job.id}
                                    job={job}
                                    onAbandoned={handleAbandonarConError}
                                />
                            ))
                        )}
                    </>
                )}
                </div>
            </section>

            <Footer className="mt-0" />
            <TabBarMobile onPublicar={openModal} />

        </div> {/* Fin apartado de los Jobs */}
        
        <ErrorBackendModal {...errorModalProps} />

        <CalificarModal {...calificarModalProps} />

        <CreateJobModal
            {...createJobModalProps}
            handleCreateJob={(e) => handleCreateJob(e, agregarJob)}
        />
    </>
    )
    }

export default VerMisJobs
