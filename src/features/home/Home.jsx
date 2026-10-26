//Imports de librerías y hooks
import { useAuth } from "/src/context/AuthContext.jsx";
import { useCreateJob } from "./hooks/useCreateJob";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";
import { FiBriefcase } from "react-icons/fi";

//Imports de componentes
import JobCard from "/src/features/home/JobCard.jsx";
import ChatConversation from "./ChatConversation.jsx";
import HeroCarousel from "./HeroCarousel.jsx";
import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobCardSkeleton from "../../components/loaders/JobCardSkeleton.jsx";
import TabBarMobile from "../../components/layout/TabBarMobile.jsx";
import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/header.jsx";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";
import ComingSoonModal from "../../components/ui/modals/ComingSoonModal.jsx";
import mascotaJobsi from "../../assets/jobsi-mascota-jobito_render.png";

const Home = () => {

    const navigate = useNavigate();
    
    const { user } = useAuth();

    const { 
        isOpen: isOpenComingSoon, closing: closingComingSoon, 
        opening: openingComingSoon, openModal: openComingSoon, 
        closeModal: closeComingSoon 
    } = useModalState(); // → para ComingSoonModal

    const nombre = user?.nombre || "Usuario";
    const genero = user?.genero;

    //Se importa la lógica del hook useCreateJob
    const {
        titulo, descripcion, pago, ubicacion, categoria, tipoPago,
        errors, jobs, showModal, opening, closing, loadingJobs, 

        // setters
        setTitulo, setDescripcion, setPago, setUbicacion, setCategoria, setTipoPago, 
        handleCreateJob, handleTomarJob, closeModal, openModal
    } = useCreateJob(); // → para CreateJobModal

return (
    <>

    <div className="flex min-h-screen w-full flex-col bg-white">

        {/* Header + Hero */}
        <div className="w-full bg-[#1e3a8a]">
            <Header onPublicarJob={openModal} />

            <section className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-4 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-8">

                {/* Bienvenida usuario */}
                <div className="max-md:text-left max-md:max-w-[280px]">
                    <h1 className="font-bold tracking-tight text-white">
                        <span className="block text-[36px] leading-[1.05] text-[#ffb906] sm:text-[44px]">
                            {genero === "Femenino" ? "Bienvenida" : "Bienvenido"}
                        </span>
                        <span className="block text-[32px] leading-[1.1] sm:text-[40px] ">
                            {nombre} a Jobsi
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-md text-bold leading-relaxed text-white/80 lg:mx-0 lg:text-base">
                        ¡Parchate y adéntrate en el lugar para generar ingresos en tus tiempos libres!
                    </p>

                    <div className="max-md:mt-4 mt-7 flex justify-start lg:justify-start">
                        <Button
                            variant="warning"
                            size="xl"
                            onClick={() => navigate("/explorar-jobs")}
                            className="!rounded-xl !font-bold"
                        >
                            ¡Explora los Jobs Ahora!
                        </Button>
                    </div>
                </div>

                {/* Mensajes iniciales: carrusel en móvil, conversación animada en escritorio */}
                <HeroCarousel />
                <div className="max-md:hidden">
                    <ChatConversation />
                </div>

            </section>
        </div>


        {/* Área de Jobs disponibles */}
        <main className="w-full flex-1 bg-white">
            <div className="mx-auto w-full max-w-[1500px] px-6 py-12 lg:px-10 lg:py-16">

                <h2 className="text-3xl font-bold text-[#1e3a8a]">
                    Jobs disponibles
                </h2>

                {/* Apartado de jobs/Layout principal */}
                <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Listado de Jobs */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {loadingJobs ? (
                            Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))) : jobs.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    title="Aún no hay jobs publicados"
                                    description="Publica el primero y empieza a recibir postulaciones."
                                    iconClassName="h-14 w-14 bg-[#fde8d0] text-[#c2410c]"
                                    icon={<FiBriefcase size={26} />}
                                    primaryAction={{ label: "Publicar Job", onClick: () => openModal() }}
                                    secondaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs") }}
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
                    <aside className="relative overflow-hidden rounded-2xl bg-[#eef1fa] p-6 pb-8 ">
                        <h3 className="max-w-[210px] text-xl font-bold leading-tight text-[#1e3a8a]">
                            Si necesitas ayuda, sube un Job
                        </h3>

                        <Button
                            variant="warning"
                            size="md"
                            onClick={openModal}
                            className="mt-5 !rounded-lg !px-6"
                        >
                            Publícalo
                        </Button>

                        <img
                            src={mascotaJobsi}
                            alt="Mascota Jobsi"
                            className="pointer-events-none absolute bottom-2 right-0 w-[150px] object-contain md:w-[180px]"
                        />
                    </aside>

                </div>
            </div>
        </main>

        <Footer className="mt-0" />
        <TabBarMobile onPublicar={openModal} />

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
        show={showModal} // saber si se muestra
        closing={closing} // animación de cierre
        opening={opening} // animación de apertura
        closeModal={closeModal} // para el botón X interno
        handleCreateJob={handleCreateJob} //submit del form (publicar job)

        //Darle los atributos al Job
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
