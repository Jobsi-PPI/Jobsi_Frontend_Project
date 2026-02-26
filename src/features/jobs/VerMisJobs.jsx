import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { MdOutlineWorkHistory } from "react-icons/md";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobPublicadoCard from "./misJobs/JobPublicadoCard";
import JobPostuladoCard from "./misJobs/JobPostuladoCard";

import { useVerMisJobs } from "./hooks/useVerMisJobs";
import { useCreateJob } from "../home/hooks/useCreateJob.js";
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";

//Importación de componentes
import JobPublicadoSkeleton from "../../components/loaders/JobPublicadoSkeleton";
import JobPostuladoSkeleton from "../../components/loaders/JobPostuladoSkeleton";
import Header from "../../components/layout/header.jsx";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";
import ErrorBackendModal from "../../components/ui/modals/ErrorBackendModal.jsx";

const VerMisJobs = () => {
    
    const navigate = useNavigate(); 
    
    const { isOpen: isOpenError, closing: closingError, opening: openingError, 
        openModal: openModalError, closeModal: closeModalError } = useModalState();

    const [errorCode, setErrorCode] = useState(null);

    const handleAbandonarConError = async (jobId) => {
        const code = await handleAbandonarJob(jobId);
        if (code) {
            setErrorCode(code);
            openModalError();
        }
    };
    //Se importa la lógica del hook
    const {
        titulo, descripcion, pago, ubicacion, categoria, tipoPago,
        errors, showModal, closing, 

        // setters
        setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago, 
        handleCreateJob, closeModal, openModal
    } = useCreateJob();

    const {
        misJobs,
        jobsTomados,
        activeTab,
        loadingPublicados,
        loadingPostulados,
        agregarJob,
        setActiveTab,
        handleDeleteJob,
        handleAbandonarJob,
    } = useVerMisJobs();

return (
    <>
        {/* Header */}
        <div>
            <Header />
        </div> 


        {/* Área de Jobs */}
        <div className="w-full bg-white">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-10 sm:py-14 lg:py-18 gap-4 sm:gap-5">
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    <span className="text-yellow-400">Área de Jobs</span>
                </h1>

                <h3 className="text-base sm:text-lg lg:text-xl font-light text-black max-w-3xl">
                    Aquí encontrarás los jobs que has publicado y también a los que te has postulado
                </h3>

            </div>
        </div>


        
        {/* Apartado de los Jobs*/}
        <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">

            {/* Botones de publicados y postulados */}
            <div className="max-w-[900px] mx-auto py-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-16">
                
                <button className={`w-full sm:w-[200px] h-12 sm:h-14 flex items-center justify-center rounded-xl text-white font-semibold transition text-lg sm:text-xl lg:!text-[30px]
                    ${activeTab === "publicados" ? "!bg-[#4468cf]" : "!bg-blue-900"}`}
                    type="button"
                    onClick={() => setActiveTab("publicados")}
                >
                    Publicados
                </button>

                <button className={`w-full sm:w-[200px] h-12 sm:h-14 flex items-center justify-center rounded-xl text-white font-semibold transition text-lg sm:text-xl lg:!text-[30px]
                    ${activeTab === "postulados" ? "!bg-[#4468cf]" : "!bg-blue-900"}`}
                    type="button"
                    onClick={() => setActiveTab("postulados")}
                >
                    Postulados
                </button>
            </div>

            
            <div className="w-full flex justify-center mt-6 pb-20">
                <div className="w-full max-w-6xl bg-[#eef0f5] p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col gap-6">

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
                                primaryAction={{ label: "Publicar Job", onClick: () => openModal(true) }}
                                secondaryAction={{ label: "Explorar", onClick: () => navigate("/home"), variant: "secondary" }}
                            />

                        ) : (
                            misJobs.map((job) => (
                                <JobPublicadoCard key={job.id} job={job} onDelete={handleDeleteJob}/>
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
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-10">
                <Button variant="secondary" size="sm" className=" lg:-ml-90" onClick={() => navigate("/home")}>
                    Volver
                </Button>
            </div>
        </div> {/* Fin apartado de los Jobs */}
        
        <ErrorBackendModal
            isOpen={isOpenError}
            onClose={closeModalError}
            closing={closingError}
            opening={openingError}
            errorCode={errorCode}
            primaryAction={{ label: "Entendido", onClick: closeModalError }}
        />

        <CreateJobModal
            show={showModal}
            closing={closing}
            closeModal={closeModal}
            handleCreateJob={(e) => handleCreateJob(e, agregarJob)}    
            
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
    </>
    )
    }

export default VerMisJobs
