import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";

import SidebarMenu from "../home/layouts/SidebarMenu";
import JobPublicadoCard from "./misJobs/JobPublicadoCard";
import JobPostuladoCard from "./misJobs/JobPostuladoCard";
import { useVerMisJobs } from "./hooks/useVerMisJobs";

const VerMisJobs = () => {
    
    const navigate = useNavigate(); 
    
    const {
        menuOpen,
        setMenuOpen,
        misJobs,
        jobsTomados,
        activeTab,
        setActiveTab,
        handleDeleteJob,
        handleAbandonarJob,
    } = useVerMisJobs();

return (
    <>
    {/* Header */}
        <div className="w-full py-13 shadow-md bg-[#1e3a8a] relative">
            {/* Left: logo */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <img
                src="/src/assets/Jobsi_home_logo.png"
                alt="Logo Jobsi Home"
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
                        className="p-3 rounded-full text-white flex items-center justify-center shadow-sm"
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
                    onClick={() => setMenuOpen(true)}
                    className="p-2 text-white rounded-full bg-transparent focus:outline-none"
                >
                    <FiMenu className="w-9 h-9" />
                </button>
            </div>
        </div> {/*fin del header */}

        {/* Área de Jobs */}
        <div className="w-full bg-white">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-16 gap-6">
                <h1 className="text-3xl font-bold">
                    <span className="text-yellow-400">Área de Jobs </span>
                </h1>

                <h3 className="font-light text-[24px] text-black">
                    ¡Aquí encontraras los jobs que has publicado y también a los que te postulaste!
                </h3>
            </div>
        </div> {/*fin del área de Jobs */}

        
        {/* Apartado de los Jobs*/}
        <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">

            {/* Botones de publicados y postulados */}
            <div className="max-w-[900px] mx-auto py-10 flex flex-row justify-center gap-40">
                
                <button className={`w-full sm:w-auto max-w-[480px] h-14 flex items-center justify-center
                    text-white transition !text-[30px] px-6 overflow-hidden
                    ${activeTab === "publicados" ? "!bg-[#4468cf]" : "!bg-blue-900"}`}
                    type="button"
                    onClick={() => setActiveTab("publicados")}
                >
                    Publicados
                </button>

                <button className={`w-full sm:w-auto max-w-[480px] h-14 flex items-center justify-center
                    text-white transition !text-[30px] px-6 overflow-hidden
                    ${activeTab === "postulados" ? "!bg-[#4468cf]" : "!bg-blue-900"}`}
                    type="button"
                    onClick={() => setActiveTab("postulados")}
                >
                    Postulados
                </button>
            </div>

            
            <div className="w-full flex justify-center mt-10 pb-20">
                <div className="w-[95%] max-w-[95%] bg-[#eef0f5] p-6 rounded-3xl flex flex-col gap-10">

                {/* Aquí se muestran los jobs publicados */}
                {activeTab === "publicados" && (
                    <>
                    {misJobs.length === 0 ? (
                        <p className="text-black text-center text-xl">
                            Aún no has publicado ningún Job 📝
                        </p>
                    ) : (
                        misJobs.map((job) => (
                            <JobPublicadoCard key={job.id} job={job} onDelete={handleDeleteJob}
                            />
                            ))
                        )}
                    </>
                )}

                {/* Aquí se muestran los jobs TOMADOS */}
                {activeTab === "postulados" && (
                    <>
                        {jobsTomados.length === 0 ? (
                            <p className="text-black text-center text-xl">
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

            <button className="w-full sm:w-auto max-w-[480px] h-10 flex items-center justify-center  
                !bg-[#4468cf] text-white transition !text-[20px] px-6 overflow-hidden"
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
