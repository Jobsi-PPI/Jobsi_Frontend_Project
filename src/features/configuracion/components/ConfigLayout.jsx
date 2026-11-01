import { FiChevronLeft } from "react-icons/fi";

import { useCreateJob } from "/src/features/home/hooks/useCreateJob.js";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";

/* Componentes*/
import Header from "../../../components/layout/Header.jsx";
import Footer from "../../../components/layout/Footer.jsx";
import TabBarMobile from "../../../components/layout/TabBarMobile.jsx";

// Con onVolver es una subpantalla: muestra la flecha de volver junto al título
const ConfigLayout = ({ titulo, subtitulo, onVolver, children }) => {
    const { openModal, modalProps: createJobModalProps } = useCreateJob();

    return (
        <>
            {/* Header */}
            <div>
                <Header onPublicarJob={openModal} />
            </div>

            {/* Título */}
            <div className="w-full bg-[#1e3a8a]">
                <div className="max-w-2xl flex flex-col items-start py-5 px-4 md:py-8 px-9 gap-2">
                    <div className="flex items-center gap-3">
                        {onVolver && (
                            <button type="button" aria-label="Volver" onClick={onVolver}
                                className="-ml-2 flex items-center justify-center !rounded-full !border-0 !bg-transparent !p-1 !text-white transition hover:!bg-white/10">
                                <FiChevronLeft className="h-7 w-7" />
                            </button>
                        )}

                        <h2 className="text-3xl font-bold lg:text-5xl">
                            <span className="text-yellow-400">{titulo}</span>
                        </h2>
                    </div>

                    {subtitulo && (
                        <h3 className="text-base sm:text-lg lg:text-xl font-light text-white max-w-3xl">
                            {subtitulo}
                        </h3>
                    )}
                </div>
            </div>

            {/* Contenido */}
            <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">
                <section className="mt-4 w-full rounded-t-[40px] bg-[#eef0f5] px-4 pb-10 pt-6 sm:px-3 lg:px-10">
                    {children}
                </section>

                <Footer className="mt-0" />
                <TabBarMobile onPublicar={openModal} />

                <CreateJobModal {...createJobModalProps} />
            </div>
        </>
    );
};

export default ConfigLayout;
