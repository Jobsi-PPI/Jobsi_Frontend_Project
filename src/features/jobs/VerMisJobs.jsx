import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";

import SidebarMenu from "../home/layouts/SidebarMenu";
import JobPublicadoCard from "./misJobs/JobPublicadoCard";
import JobPostuladoCard from "./misJobs/JobPostuladoCard";
import { useVerMisJobs } from "./hooks/useVerMisJobs";

import JobPublicadoSkeleton from "../../components/loaders/JobPublicadoSkeleton";
import JobPostuladoSkeleton from "../../components/loaders/JobPostuladoSkeleton";

const VerMisJobs = () => {
    
    const navigate = useNavigate(); 
    
    const {
        menuOpen,
        setMenuOpen,
        misJobs,
        jobsTomados,
        activeTab,
        loadingPublicados,
        loadingPostulados,
        setActiveTab,
        handleDeleteJob,
        handleAbandonarJob,
    } = useVerMisJobs();

return (
    <>
        {/* Header */}
        <div className="w-full bg-[#1e3a8a] shadow-md px-4 py-4 lg:px-10">
            <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Logo */}
                <div className="flex justify-center lg:justify-start xl:justify-start">
                    <img src="/src/assets/Jobsi_home_logo.png" alt="Logo Jobsi Home" className="w-[200px] lg:w-[260px] object-contain" />
                </div>

                {/* Buscador */}
                <div className="w-full lg:max-w-[600px]">
                    <form className="flex items-center gap-3">
                        <input type="text" placeholder="Escribe un Job que estés buscando" className="flex-1 h-12 lg:h-14 px-5 text-base lg:text-lg border-2 border-[#6b7280] rounded-full text-black bg-white" />
                        <button type="button" aria-label="Buscar" className="p-3 rounded-full text-white flex items-center justify-center">
                            <FiSearch className="w-6 h-6 lg:w-7 lg:h-7" />
                        </button>
                    </form>
                </div>

                {/* Menú */}
                <div className="flex justify-center lg:justify-end xl:justify-end">
                    <button 
                        type="button" 
                        aria-label="Abrir menú" 
                        onClick={() => setMenuOpen(true)} 
                        className="p-2 text-white rounded-full"
                    >
                        <FiMenu className="w-8 h-8" />
                    </button>
                </div>

            </div>
        </div> {/*fin del header */}


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
                            <p className="text-black text-center text-base sm:text-lg">
                                Aún no has publicado ningún Job 📝
                            </p>
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
                            <p className="text-black text-center text-base sm:text-lg">
                                Aún no has tomado ningún Job 💼
                            </p>
                        ) : (
                            jobsTomados.map((job) => (
                                <JobPostuladoCard
                                    key={job.id}
                                    job={job}
                                    onAbandoned={handleAbandonarJob}
                                />
                            ))
                        )}
                    </>
                )}

                </div>
            </div>

            <button className="w-full sm:w-[150px] lg:w-[175px] h-10 rounded-lg bg-[#4468cf] text-white font-medium transition hover:bg-[#3659b5]"
                type="button"
                onClick={() => navigate("/home")}
                >
                    Volver
            </button>
            
        </div> {/* Fin apartado de los Jobs */}
        
    <SidebarMenu 
        open={menuOpen} 
        closeMenu={() => setMenuOpen(false)}
        navigate={navigate}
    />
    
    </>
    )
    }

export default VerMisJobs
