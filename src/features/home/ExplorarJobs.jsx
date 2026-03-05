//Imports de librerías y hooks
import { useNavigate } from "react-router-dom"
import { useModalState } from "../../components/ui/modals/hooks/useModalState.js";
import { useCreateJob } from "./hooks/useCreateJob";
import { IoExtensionPuzzleSharp } from "react-icons/io5";


//Imports de componentes
import JobCard from "/src/features/home/JobCard.jsx";
import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";
import JobCardSkeleton from "../../components/loaders/JobCardSkeleton.jsx";

//Imports de componentes UI y layout
import Header from "../../components/layout/header.jsx"; //Ya el header importa sidebarMenu
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";

const ExplorarJobs = () => {

    const navigate = useNavigate(); //es necesario para el botón "Volver"

    const {
        categoriaSeleccionada, setCategoriaSeleccionada,
        jobsRecientes,
        jobsMejorPagados,
        jobsPorCategoria,
    } = useCreateJob();


    // Opciones de categorías para el filtro
    const CATEGORIAS = ["TODAS", "ASESORIAS", "TAREAS", "MATERIALES", "ENTRENAMIENTOS", "OTRO"];


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
            {/* Header */}
            <div>
                <Header 
                    onCategoriaChange={setCategoriaSeleccionada}
                    categoriaSeleccionada={categoriaSeleccionada} 
                />
            </div>

            {/* Mensaje de bienvenida */}
            <div className="w-full bg-white">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-6 py-12 sm:py-16 gap-5">

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                        <span className="text-[#e6c300]"> Jobs Disponibles</span>
                    </h1>

                    <h3 className="max-w-2xl text-base sm:text-lg lg:text-xl font-light text-black">
                        ¡Encuentra el Job que mas se adapte a ti y a tus conocimientos!                   
                    </h3>
                </div>
            </div>

            {/* Separador amarillo */}
            <div className="w-full h-[10px] bg-[#e6c300]" />

            {/* Jobs recientes */}
            <div className="w-full bg-white">
                <div className="w-full px-6 sm:px-10 py-12 sm:py-16">

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-10 text-center">
                        Recientes
                    </h1>

                    {/* Listado de Jobs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {loadingJobs ? (
                            Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))
                        ) : jobs.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    title="Aún no hay jobs publicados"
                                    description="Publica el primero y empieza a recibir postulaciones."
                                    icon={<IoExtensionPuzzleSharp size={40} className="text-yellow-400" />}
                                    primaryAction={{ label: "Publicar Job", onClick: () => openModal() }}
                                    secondaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs"), variant: "secondary" }}
                                />
                            </div>
                        ) : (
                            jobsRecientes.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onTomar={handleTomarJob}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Jobs Mejores Pagados */}
            <div className="w-full bg-white">
                <div className="w-full px-6 sm:px-10 py-12 sm:py-16">

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-10 text-center">
                        Mejores pagados
                    </h1>

                    {/* Listado de Jobs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {loadingJobs ? (
                            Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))
                        ) : jobs.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    title="Aún no hay jobs publicados"
                                    description="Publica el primero y empieza a recibir postulaciones."
                                    icon={<IoExtensionPuzzleSharp size={40} className="text-yellow-400" />}
                                    primaryAction={{ label: "Publicar Job", onClick: () => openModal() }}
                                    secondaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs"), variant: "secondary" }}
                                />
                            </div>
                        ) : (
                            jobsMejorPagados.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onTomar={handleTomarJob}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Jobs Por Categoría */}
            <div className="w-full bg-white">
                <div className="w-full px-6 sm:px-10 py-12 sm:py-16">

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-10 text-center">
                        Por categoría
                    </h1>

                    {/* Listado de Jobs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {loadingJobs ? (
                            Array.from({ length: 6 }).map((_, i) => (<JobCardSkeleton key={i} />))
                        ) : jobs.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    title="Aún no hay jobs publicados"
                                    description="Publica el primero y empieza a recibir postulaciones."
                                    icon={<IoExtensionPuzzleSharp size={40} className="text-yellow-400" />}
                                    primaryAction={{ label: "Publicar Job", onClick: () => openModal() }}
                                    secondaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs"), variant: "secondary" }}
                                />
                            </div>
                        ) : (
                            jobsPorCategoria.map((job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    onTomar={handleTomarJob}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 pb-10">
                <Button variant="primary" size="sm" className=" lg:-ml-90" onClick={() => navigate("/home")}>
                    Volver
                </Button>
                </div>
            
            </div>

            

            {/*Footer (cuando se implemente)*/}      
            {/* <div>
                <Footer />
            </div> */}

        </>
    )
}

export default ExplorarJobs
