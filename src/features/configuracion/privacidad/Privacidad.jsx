import { useNavigate } from "react-router-dom";

import { usePrivacidad } from "./hooks/usePrivacidad";
import { useModalState } from "../../../components/ui/modals/hooks/useModalState.js";

import ConfigLayout from "../components/ConfigLayout.jsx";
import FilaPreferencia from "./components/FilaPreferencia.jsx";
import EliminarCuentaModal from "./components/EliminarCuentaModal.jsx";

const VISIBILIDAD = [
    { id: "mostrarCelular", titulo: "Mostrar mi celular", descripcion: "Solo lo verá la persona que te elija para un Job o a quien elijas tú." },
    { id: "mostrarCalificacion", titulo: "Mostrar mi calificación", descripcion: "Aparece en tus postulaciones para que te elijan con más confianza." },
    { id: "mostrarCorreo", titulo: "Mostrar mi correo institucional", descripcion: "Visible en tus Jobs publicados." },
];

const NOTIFICACIONES = [
    { id: "notificarPostulaciones", titulo: "Nuevas postulaciones", descripcion: "Te avisamos cuando alguien se postule a uno de tus Jobs." },
    { id: "correosJobsi", titulo: "Correos de Jobsi", descripcion: "Novedades y recordatorios en tu correo institucional." },
];

const Privacidad = () => {
    const navigate = useNavigate();
    const { preferencias, alternar } = usePrivacidad();
    const { isOpen, closing, opening, openModal, closeModal } = useModalState();

    const renderGrupo = (titulo, filas) => (
        <section className="rounded-3xl bg-white p-5 md:p-6">
            <h3 className="mb-4 border-b border-gray-100 pb-4 text-lg font-bold text-gray-900">{titulo}</h3>
            {filas.map(({ id, titulo: t, descripcion }) => (
                <FilaPreferencia key={id} titulo={t} descripcion={descripcion}
                    activo={preferencias[id]} onChange={() => alternar(id)} />
            ))}
        </section>
    );

    return (
        <>
            <ConfigLayout titulo="Privacidad" onVolver={() => navigate("/configuracion")}>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4">
                    {renderGrupo("Visibilidad del perfil", VISIBILIDAD)}
                    {renderGrupo("Notificaciones", NOTIFICACIONES)}

                    <section className="rounded-3xl border border-red-200 bg-white p-5 md:p-6">
                        <h3 className="text-lg font-bold text-red-600">Eliminar cuenta</h3>
                        <p className="mt-1 text-gray-500">
                            Se borrarán tus Jobs, postulaciones y calificaciones. Esta acción no se puede deshacer.
                        </p>

                        {/* Los "!" son necesarios: index.css define estilos globales para <button> fuera de @layer y ganan sobre las utilidades */}
                        <button type="button" onClick={openModal}
                            className="mt-4 h-11 !rounded-xl !border !border-red-100 !bg-red-50 !px-5 text-sm font-semibold !text-red-600 transition hover:!bg-red-100">
                            Eliminar mi cuenta
                        </button>
                    </section>
                </div>
            </ConfigLayout>

            <EliminarCuentaModal isOpen={isOpen} onClose={closeModal} closing={closing} opening={opening} />
        </>
    );
};

export default Privacidad;
