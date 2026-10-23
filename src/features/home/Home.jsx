//Imports de librerías y hooks
import { useAuth } from "/src/context/AuthContext.jsx";
import { useCreateJob } from "./hooks/useCreateJob";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";
import { FiBriefcase } from "react-icons/fi";

//Imports de componentes
import JobCard from "/src/features/home/JobCard.jsx";
import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobCardSkeleton from "../../components/loaders/JobCardSkeleton.jsx";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/header.jsx";
import Button from "../../components/ui/Button.jsx";
import ComingSoonModal from "../../components/ui/modals/ComingSoonModal.jsx";

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
                <div className="text-center lg:text-left">
                    <h1 className="font-extrabold tracking-tight text-white">
                        <span className="block text-[36px] leading-[1.05] text-[#ffb906] sm:text-[44px] lg:text-[56px]">
                            {genero === "Femenino" ? "Bienvenida" : "Bienvenido"}
                        </span>
                        <span className="block text-[32px] leading-[1.1] sm:text-[40px] lg:text-[52px]">
                            {nombre} a Jobsi
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/80 lg:mx-0 lg:text-base">
                        ¡Parchate y adéntrate en el lugar para generar ingresos en tus tiempos libres!
                    </p>

                    <div className="mt-7 flex justify-center lg:justify-start">
                        <Button
                            variant="warning"
                            size="xl"
                            onClick={() => navigate("/explorar-jobs")}
                            className="!rounded-xl font-bold"
                        >
                            ¡Explora los Jobs Ahora!
                        </Button>
                    </div>
                </div>

                {/* Panel de conversación */}
                <div className="rounded-[32px] bg-[#2c4a99] p-5 sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-3">

                        <div className="ml-auto max-w-[290px] rounded-[18px] bg-white px-5 py-3 text-sm font-semibold leading-snug text-gray-900 shadow-sm">
                            ¿Muy desparchado sin nada que hacer?
                        </div>

                        <div className="ml-auto max-w-[240px] rounded-[18px] bg-white px-5 py-3 text-sm font-semibold leading-snug text-gray-900 shadow-sm">
                            ¿Necesitas una mano?
                        </div>

                        <div className="mt-4 flex items-end gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                                <img
                                    src="/src/assets/jobsi-mascota-jobito_render.png"
                                    alt="Mascota Jobsi"
                                    className="h-8 w-8 object-contain"
                                />
                            </span>
                            <div className="max-w-[380px] rounded-[18px] bg-[#ffb906] px-5 py-3 text-sm font-semibold leading-snug text-gray-900 shadow-sm">
                                Relajado compa, ¡Nosotros te resolvemos! todo al alcance de un click
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </div>


        {/* Área de Jobs disponibles */}
        <main className="w-full flex-1 bg-white">
            <div className="mx-auto w-full max-w-[1500px] px-6 py-12 lg:px-10 lg:py-16">

                <h2 className="text-2xl font-bold text-[#1e3a8a] sm:text-3xl">
                    Jobs disponibles
                </h2>

                {/* Apartado de jobs/Layout principal */}
                <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Listado de Jobs */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {loadingJobs ? (
                            Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))) : jobs.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center shadow-sm lg:px-10 lg:py-12">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fde8d0] text-[#c2410c]">
                                    <FiBriefcase size={26} />
                                </div>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    Aún no hay jobs publicados
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Publica el primero y empieza a recibir postulaciones.
                                </p>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        variant="primary"
                                        size="md"
                                        onClick={() => openModal()}
                                        className="!rounded-lg !px-8 !py-3 sm:min-w-[170px]"
                                    >
                                        Publicar Job
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        size="md"
                                        onClick={() => navigate("/mis-jobs")}
                                        className="!rounded-lg !px-8 !py-3 sm:min-w-[170px]"
                                    >
                                        Ver mis Jobs
                                    </Button>
                                </div>
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
                    <aside className="relative overflow-hidden rounded-2xl bg-[#eef1fa] p-6 pb-36 lg:p-7 lg:pb-36">
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
                            src="/src/assets/jobsi-mascota-jobito_render.png"
                            alt="Mascota Jobsi"
                            className="pointer-events-none absolute -bottom-2 right-0 w-[150px] object-contain"
                        />
                    </aside>

                </div>
            </div>
        </main>

        <Footer className="mt-0" />

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
