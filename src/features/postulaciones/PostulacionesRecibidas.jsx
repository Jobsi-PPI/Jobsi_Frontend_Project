import { useNavigate } from "react-router-dom";
import { FiBell, FiMapPin, FiCreditCard } from "react-icons/fi";

import { usePostulacionesRecibidas } from "./hooks/usePostulacionesRecibidas.js";
import { useCreateJob} from "/src/features/home/hooks/useCreateJob.js";
import { ORDENES } from "../../utils/ordenPostulaciones.js";
import { capitalizar, formatearPesos } from "../../utils/formatUtils.js";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";

import PostulacionCard from "./PostulacionCard.jsx";
import PostulacionSkeleton from "../../components/loaders/PostulacionSkeleton.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import TabBarMobile from "../../components/layout/TabBarMobile.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";
import InfoChip from "../../components/ui/InfoChip.jsx";

const PostulacionesRecibidas = () => {
    const navigate = useNavigate();
    const { loading, postulacionesPorJob, handleElegirCandidato, orden, setOrden } = usePostulacionesRecibidas();
    const { openModal, modalProps: createJobModalProps } = useCreateJob();

    return (
        <>
            {/* Header */}
            <div>
                <Header onPublicarJob={openModal} />
            </div> 

            {/* Título */}
            <div className="w-full bg-[#1e3a8a]">
                <div className="max-w-4xl mx-auto flex flex-col items-start py-4 px-4 sm:py-14 lg:py-18 gap-4 sm:gap-5">
                    <h2 className="text-4xl font-bold lg:text-5xl">
                        <span className="text-yellow-400">Postulaciones</span>{" "}
                        <span className="text-white">Recibidas</span>
                    </h2>
                    <h3 className="text-base font-semibold sm:text-lg lg:text-xl font-light text-white max-w-3xl">
                        Aquí verás todos los estudiantes que se han postulado a tus Jobs. Elige al candidato ideal.
                    </h3>
                </div>
            </div>

            {/* Apartado de los Jobs*/}
            <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">
                <section className="mt-4 rounded-t-[40px] bg-white px-4 pb-10 pt-6 sm:px-3 lg:px-10">
                    {!loading && postulacionesPorJob.length > 0 && (
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <p className="text-xl font-semibold text-gray-600">Ordenar por</p>

                            <div role="tablist" aria-label="Ordenar postulaciones" className="flex w-fit gap-1 rounded-2xl bg-[#f1f4f9] p-1">
                                {ORDENES.map(({ id, label }) => {
                                    const activo = orden === id;

                                    return (
                                        <button key={id}
                                            role="tab"
                                            aria-selected={activo}
                                            type="button"
                                            onClick={() => setOrden(id)}
                                            className={`h-10 !rounded-xl !border-0 !px-5 !font-semibold transition
                                                ${activo ? "!bg-white !text-[#1e3a8a] shadow-sm" : "!bg-transparent !text-gray-500"}`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex w-full flex-col gap-8 pb-20">
                            {loading ? (
                                /* Skeletons de carga */
                                <>
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <PostulacionSkeleton key={i} />
                                    ))}
                                </>
                            ) : postulacionesPorJob.length === 0 ? (
                                <EmptyState
                                    title="Aún no tienes postulaciones"
                                    description="Cuando alguien se postule a uno de tus Jobs, aparecerá aquí."
                                    icon={<FiBell size={40} className="text-yellow-400" />}
                                    primaryAction={{ label: "Ver mis Jobs", onClick: () => navigate("/mis-jobs") }}
                                    secondaryAction={{ label: "Ir al inicio", onClick: () => navigate("/home"), variant: "secondary" }}
                                />
                            ) : (
                                /* Un bloque por cada Job con postulaciones */
                                postulacionesPorJob.map((grupo) => (
                                    <section key={grupo.jobId} className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-xl font-bold text-[#1e3a8a]">{grupo.jobTitulo}</h3>

                                            <div className="flex flex-wrap gap-2">
                                                {grupo.jobUbicacion && <InfoChip icon={FiMapPin}>{grupo.jobUbicacion}</InfoChip>}
                                                {grupo.jobPago > 0 && (
                                                    <InfoChip icon={FiCreditCard}>
                                                        {formatearPesos(grupo.jobPago)}
                                                        {grupo.jobTipoPago && ` · ${capitalizar(grupo.jobTipoPago)}`}
                                                    </InfoChip>
                                                )}
                                            </div>
                                        </div>

                                        <div key={orden} className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
                                            {grupo.candidatos.map((postulacion) => (
                                                <PostulacionCard
                                                    key={postulacion.solicitudId}
                                                    postulacion={postulacion}
                                                    esMejor={postulacion.solicitudId === grupo.mejorSolicitudId}
                                                    onElegir={handleElegirCandidato}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                ))
                            )}
                    </div>
                </section>
                    <Footer className="mt-0" />
                    <TabBarMobile  onPublicar={openModal} />

                    <CreateJobModal {...createJobModalProps} />
            </div>

            
        </>
    );
};

export default PostulacionesRecibidas;
