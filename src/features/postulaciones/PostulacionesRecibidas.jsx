import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { MdOutlineWorkHistory } from "react-icons/md";

import { usePostulacionesRecibidas } from "./hooks/usePostulacionesRecibidas.js";
import { useCreateJob} from "/src/features/home/hooks/useCreateJob.js";
import { ORDENES } from "../../utils/ordenPostulaciones.js";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";

import PostulacionCard from "./PostulacionCard.jsx";
import PostulacionSkeleton from "../../components/loaders/PostulacionSkeleton.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import TabBarMobile from "../../components/layout/TabBarMobile.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";

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
                    <h2 className="text-4xl font-bold lg:text-7xl">
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
                        <div className="flex flex-col gap-2">
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

                    <div className="w-full flex justify-center mt-6 pb-20 px-4">
                            {loading ? (
                                /* Skeletons de carga */
                                <div className="flex flex-col gap-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <PostulacionSkeleton key={i} />
                                    ))}
                                </div>
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
                                    <div key={grupo.jobId} className="bg-white rounded-2xl border-2 border-black overflow-hidden">

                                        {/* Cabecera del Job */}
                                        <div className="bg-[#1e3a8a] px-5 py-4 flex items-center gap-3">
                                            <MdOutlineWorkHistory size={22} className="text-yellow-400 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-white font-bold text-lg leading-tight">
                                                    {grupo.jobTitulo}
                                                </h3>
                                                <p className="text-blue-200 text-sm">
                                                    {grupo.candidatos.length} postulante{grupo.candidatos.length !== 1 ? "s" : ""}
                                                    {grupo.jobPago ? ` · $${grupo.jobPago.toLocaleString()} ${grupo.jobTipoPago ?? ""}` : ""}
                                                    {grupo.jobUbicacion ? ` · ${grupo.jobUbicacion}` : ""}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Lista de candidatos */}
                                        <div className="p-4 flex flex-col gap-3">
                                            {grupo.candidatos.map((postulacion) => (
                                                <PostulacionCard
                                                    key={postulacion.id}
                                                    postulacion={postulacion}
                                                    onElegir={handleElegirCandidato}
                                                />
                                            ))}
                                        </div>
                                    </div>
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
