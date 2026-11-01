import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

import { usePerfil } from "./hooks/usePerfil";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";

import ConfigLayout from "../components/ConfigLayout.jsx";
import PerfilSkeleton from "../../../components/loaders/PerfilSkeleton.jsx";
import EstrellasCalificacion from "../../../components/ui/EstrellasCalificacion";
import ComingSoonModal from "../../../components/ui/modals/ComingSoonModal.jsx";

const Dato = ({ label, children }) => (
    <div className="border-b border-gray-100 py-3 last:border-b-0">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <div className="mt-1 text-base font-medium text-gray-900">{children}</div>
    </div>
);

const Perfil = () => {
    const navigate = useNavigate();
    const { loading, datos } = usePerfil();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    return (
        <>
            <ConfigLayout titulo="Perfil" onVolver={() => navigate("/configuracion")}>
                {loading ? (
                    <PerfilSkeleton />
                ) : (
                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4">

                        <div className="flex items-center gap-5 rounded-3xl bg-white p-5">
                            <div className="relative shrink-0">
                                <div className="flex h-20 w-20 select-none items-center justify-center rounded-full bg-[#ffb906] text-3xl font-bold text-[#1e3a8a]">
                                    {datos.nombre.charAt(0).toUpperCase()}
                                </div>

                                {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades */}
                                <button type="button" aria-label="Cambiar foto" onClick={openModal}
                                    className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center !rounded-full !border-2 !border-white !bg-[#1e3a8a] !p-0 !text-white">
                                    <FiEdit2 className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            <div className="min-w-0">
                                <p className="break-words text-2xl font-bold text-gray-900">{datos.nombreCompleto}</p>
                                <p className="break-words text-sm text-gray-500">{datos.correo}</p>
                                <EstrellasCalificacion calificacion={datos.calificacion} />
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white p-5">
                            <div className="flex h-10 items-center justify-between gap-3">
                                <h3 className="text-lg font-bold text-gray-900">Información personal</h3>

                                <button type="button" onClick={openModal}
                                    className="h-10 !rounded-xl !border !border-gray-200 !bg-white !px-5 text-sm font-semibold !text-[#1e3a8a] transition hover:!bg-gray-50">
                                    Editar
                                </button>
                            </div>

                            <div className="mt-4 border-t border-gray-100 md:grid md:grid-cols-2 md:gap-x-10">
                                <Dato label="Nombre">{datos.nombre}</Dato>
                                <Dato label="Apellidos">{datos.apellidos}</Dato>
                                <Dato label="Correo institucional">
                                    {datos.correo}
                                    <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                                        No editable
                                    </span>
                                </Dato>
                                <Dato label="Celular">{datos.celular}</Dato>
                                <Dato label="Género">{datos.genero}</Dato>
                            </div>
                        </div>
                    </div>
                )}
            </ConfigLayout>

            <ComingSoonModal
                isOpen={isOpen}
                onClose={closeModal}
                closing={closing}
                opening={opening}
                primaryAction={{ label: "Entendido", onClick: closeModal }}
            />
        </>
    );
};

export default Perfil;
