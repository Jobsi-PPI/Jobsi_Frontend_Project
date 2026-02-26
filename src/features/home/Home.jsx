import { useAuth } from "/src/context/AuthContext.jsx";
import { useCreateJob } from "./hooks/useCreateJob";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";
import { IoExtensionPuzzleSharp } from "react-icons/io5";

import JobCard from "/src/features/home/JobCard.jsx";
import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobCardSkeleton from "../../components/loaders/JobCardSkeleton.jsx";

import Header from "../../components/layout/header.jsx";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";
import ComingSoonModal from "../../components/ui/modals/ComingSoonModal.jsx";

const Home = () => {

    const navigate = useNavigate();
    
    const { user, token } = useAuth();

    const { 
        isOpen: isOpenComingSoon, closing: closingComingSoon, 
        opening: openingComingSoon, openModal: openComingSoon, 
        closeModal: closeComingSoon 
    } = useModalState(); // → para ComingSoonModal

    const nombre = user?.nombre || "Usuario";
    const genero = user?.genero;

    //Se importa la lógica del hook
    const {
        titulo, descripcion, pago, ubicacion, categoria, tipoPago,
        errors, jobs, showModal, isOpen, opening, closing, loadingJobs, 

        // setters
        setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago, 
        handleCreateJob, handleTomarJob, closeModal, openModal
    } = useCreateJob(); // → para CreateJobModal
    
return (
    <>

    {/* Header */}
    <div>
        <Header />
    </div>


    {/* Bienvenida usuario */}
    <div className="w-full bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-6 py-12 sm:py-16 gap-5">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-yellow-400">{genero === "Femenino" ? "Bienvenida" : "Bienvenido"} </span>
                <span className="text-[#1e3a8a]">{nombre}</span>
                <span className="text-[#1e3a8a]"> a Jobsi</span>
            </h1>

            <h3 className="max-w-2xl text-base sm:text-lg lg:text-xl font-light text-black">
                ¡Parchate y adéntrate en el lugar para generar ingresos en tus tiempos libres!
            </h3>

            <Button
                variant="warning"
                size="xl"
                onClick={openComingSoon}
                >
                ¡Explora los Jobs Ahora!
            </Button>

        </div>
    </div>


    {/* Jobsi Info */}
    <div className="w-full bg-[#1e3a8a] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 relative">

            {/* Grid base */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

                {/* Caja izquierda */}
                <div className="bg-[#fbfdff] rounded-[60px] shadow-md px-8 py-8 text-center lg:text-right">
                    <h2 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">
                        ¿Muy desparchado <br className="hidden lg:block" /> sin nada que hacer?
                    </h2>
                </div>

                {/* Caja centro */}
                <div className="bg-[#fbfdff] rounded-[60px] shadow-md px-6 py-8 text-center">
                    <h2 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">
                        ¿Necesitas una mano?
                    </h2>
                </div>

                {/* Caja derecha (hero) */}
                <div className="bg-[#fbfdff] rounded-[60px] shadow-md px-8 py-12 text-center relative overflow-hidden lg:px-12 lg:py-14 lg:w-[500px] xl:max-w-[620px]">

                    <h2 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl leading-tight relative z-10 xl:text-left ">
                        Relajado compa,
                        <br />
                        <span className="text-[#1e3a8a]">¡Nosotros te resolvemos!</span>
                        <br />
                        todo al alcance de un <span className="text-yellow-400">click</span>
                    </h2>

                    {/* Mascota */}
                    <img
                        src="/src/assets/jobsi-mascota-jobito_render.png"
                        alt="Mascota Jobsi"
                        className="hidden lg:block absolute bottom-30 right-1 w-[140px] h-[110px] object-contain"
                    />
                </div>

            </div>
        </div>
    </div>



    {/* Área de Jobs disponibles */}
    <div className="w-full bg-white relative overflow-x-hidden">
        <div className="w-full px-10 py-20">

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-10 text-center lg:text-left lg:pl-30 xl:pl-70">
                    Jobs disponibles
            </h1>

            {/* Apartado de jobs/Laayout principal */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-120">
                

                {/* Listado de Jobs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-30 xl:grid-cols-3 gap-8">
                    {loadingJobs ? (
                        Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))) : jobs.length === 0 ? (
                        <div className="col-span-full">
                            <EmptyState
                                title="Aún no hay jobs publicados"
                                description="Publica el primero y empieza a recibir postulaciones."
                                icon = {<IoExtensionPuzzleSharp  size={40} className="text-yellow-400" />}
                                primaryAction={{ label: "Publicar Job", onClick: () => openModal() }}
                                secondaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs"), variant: "secondary" }}
                            />
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                onTomar={handleTomarJob} 
                            />
                        ))
                    )}
                </div>

        
                {/* CTA publicar Job */}
                <div className=" mt-[-250px] flex justify-center lg:absolute lg:top-32 lg:right-20 lg:mt-0 lg:flex-col lg:items-center">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-[#1e3a8a]">
                            Si necesitas ayuda,
                            <br className="hidden lg:block" />
                            sube un Job
                        </h1>

                        <Button
                            variant="warning"
                            size="xl"
                            onClick={openModal}
                            >
                            Publícalo
                        </Button>
                    </div>
                </div> {/*Fin de CTA publicar Job */}

            </div>
        </div>
    </div>

    <ComingSoonModal
        isOpen={isOpenComingSoon}
        onClose={closeComingSoon}
        closing={closingComingSoon}
        opening={openingComingSoon}
        primaryAction={{
            label: "Entendido",
            onClick: closeComingSoon
        }}
    />

    <CreateJobModal
        show={showModal}
        closing={closing}
        closeModal={closeModal}
        handleCreateJob={handleCreateJob}

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
);
};



export default Home;