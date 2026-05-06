import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { MdOutlineWorkHistory } from "react-icons/md";

import { usePostulacionesRecibidas } from "./hooks/usePostulacionesRecibidas.js";

import PostulacionCard from "./PostulacionCard.jsx";
import PostulacionSkeleton from "../../components/loaders/PostulacionSkeleton.jsx";
import Header from "../../components/layout/header.jsx";
import Footer from "../../components/layout/footer.jsx";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/states/EmptyState.jsx";

const PostulacionesRecibidas = () => {
    const navigate = useNavigate();
    const { loading, postulacionesPorJob, handleElegirCandidato } = usePostulacionesRecibidas();

    return (
        <>
            <Header />

            {/* Título */}
            <div className="w-full bg-white">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-10 sm:py-14 lg:py-18 gap-4 sm:gap-5">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                        <span className="text-yellow-400">Postulaciones</span>{" "}
                        <span className="text-[#1e3a8a]">Recibidas</span>
                    </h1>
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-black max-w-3xl">
                        Aquí verás todos los estudiantes que se han postulado a tus Jobs. Elige al candidato ideal.
                    </h3>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">
                <div className="w-full flex justify-center mt-6 pb-20 px-4">
                    <div className="w-full max-w-4xl bg-[#eef0f5] p-4 sm:p-6 lg:p-8 rounded-3xl flex flex-col gap-8">

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
                </div>

                <div className="max-w-4xl mx-auto px-4 pb-10">
                    <Button variant="secondary" size="sm" onClick={() => navigate("/home")}>
                        Volver
                    </Button>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default PostulacionesRecibidas;
