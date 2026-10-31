import { useCreateJob } from "/src/features/home/hooks/useCreateJob.js";

import CreateJobModal from "/src/features/home/layouts/CreateJobModal.jsx";

/* Componentes*/
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import TabBarMobile from "../../components/layout/TabBarMobile.jsx";
import ConfigContent from "./components/ConfigContent.jsx";

const Configuracion = () => {
    const { openModal, modalProps: createJobModalProps } = useCreateJob();


    return (
        <>
            {/* Header */}
            <div>
                <Header onPublicarJob={openModal} />
            </div>

            {/* Título Configuración */}
            <div className="w-full bg-[#1e3a8a]">
                <div className="max-w-2xl flex flex-col items-start py-5 px-4 md:py-8 px-9 gap-2">
                    <h2 className="text-3xl font-bold lg:text-5xl">
                        <span className="text-yellow-400">Configuración</span>
                    </h2>
                    <h3 className="text-base sm:text-lg lg:text-xl font-light text-white max-w-3xl">
                        Administra tu información personal y preferencias de cuenta.
                    </h3>
                </div>
            </div>

            {/* Contenido */}
            <div className="w-full bg-[#1e3a8a] relative overflow-x-hidden">
                <section className="mt-4 w-full rounded-t-[40px] bg-[#eef0f5] px-4 pb-10 pt-6 sm:px-3 lg:px-10">
                    <ConfigContent />

                </section>

                <Footer className="mt-0" />
                <TabBarMobile onPublicar={openModal} />

                <CreateJobModal {...createJobModalProps} />

            </div>
        </>
    );
};

export default Configuracion;
