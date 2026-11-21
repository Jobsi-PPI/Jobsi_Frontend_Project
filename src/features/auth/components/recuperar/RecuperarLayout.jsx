import { FiArrowLeft, FiChevronLeft } from "react-icons/fi";

import Footer from "../../../../components/layout/Footer.jsx";
import logoJobsi from "../../../../assets/Jobsi_home_logo.png";
import mascotaJobsi from "../../../../assets/jobsi-mascota-jobito_render.png";

const TOTAL_PASOS = 3;

const RecuperarLayout = ({ paso, onVolver, children }) => (
    <div className="flex min-h-screen flex-col bg-white lg:bg-gradient-to-r lg:from-[#1e3a8a] lg:from-50% lg:to-white lg:to-50%">
        <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-2">

            <section className="relative overflow-hidden bg-[#1e3a8a] px-4 py-10 sm:px-6">
                <div className="absolute left-0 top-6 flex flex-col items-start">
                    <div className="h-[10px] w-32 bg-[#ffb906] sm:w-64 md:w-70"></div>
                </div>

                <div className="flex flex-col items-start gap-4 p-4 pt-8 md:gap-10 md:p-8">
                    {/* Móvil: flecha de volver junto al logo y el número de paso */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button type="button" aria-label="Volver" onClick={onVolver}
                            className="!border-0 !bg-transparent !p-1 text-2xl !text-white">
                            <FiArrowLeft />
                        </button>
                        <img src={logoJobsi} alt="Jobsi" className="h-auto w-32 object-contain" />
                    </div>
                    <p className="-mt-2 text-sm font-bold text-blue-200 md:hidden">
                        Paso {paso} de {TOTAL_PASOS}
                    </p>

                    <img src={logoJobsi} alt="Jobsi" className="hidden h-auto w-50 object-contain md:block" />

                    <div className="z-10 hidden md:block">
                        <h2 className="text-5xl font-bold text-white">Recupera tu cuenta</h2>
                        <h3 className="mt-5 text-[18px] font-light text-white">
                            Te enviamos un código a tu correo <br /> institucional para que vuelvas a entrar a Jobsi.
                        </h3>
                    </div>

                    <img src={mascotaJobsi} alt="" aria-hidden="true" className="hidden w-60 self-center md:block" />
                </div>
            </section>

            <section className="relative z-10 -mt-8 flex rounded-t-[40px] bg-white px-4 sm:px-6 lg:mt-0 lg:rounded-none lg:px-10">
                <div className="mx-auto w-full max-w-[500px] px-2 py-8 sm:px-10 md:px-20 md:py-14 lg:mx-0 lg:max-w-[700px]">

                    <button type="button" onClick={onVolver}
                        className="mb-6 flex items-center gap-1 !border-0 !bg-transparent !p-0 text-sm font-semibold !text-[#1e3a8a] max-md:hidden">
                        <FiChevronLeft className="h-5 w-5" />
                        {paso === 1 ? "Volver a iniciar sesión" : "Atrás"}
                    </button>

                    <div className="mb-6 flex gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL_PASOS} aria-valuenow={paso}>
                        {Array.from({ length: TOTAL_PASOS }, (_, i) => (
                            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < paso ? "bg-[#1e3a8a]" : "bg-slate-200"}`}></span>
                        ))}
                    </div>

                    {children}
                </div>
            </section>
        </div>

        <Footer />
    </div>
);

export default RecuperarLayout;
