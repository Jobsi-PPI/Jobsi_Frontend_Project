import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../auth/hooks/useRegister.js";

import RegisterForm from "../auth/components/RegisterForm.jsx";
import Button from "../../components/ui/Button.jsx";
import Footer from "../../components/layout/Footer.jsx";
import logoJobsi from "../../assets/Jobsi_home_logo.png";
import fotoGraduacion from "../../assets/Poli_jic_graduacion.png";


function Register() {
const navigate = useNavigate();
const registerHook = useRegister(navigate);

useEffect(() => {
    window.scrollTo(0, 0);
}, []);

return (
    <>
    <div className="flex flex-col min-h-screen bg-white lg:bg-gradient-to-r lg:from-white lg:from-50% lg:to-[#1e3a8a] lg:to-50%">
            
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

            {/*  Panel izquierdo (azul) */}
            <section className="relative overflow-hidden bg-[#1e3a8a] px-4 sm:px-6 py-10 flex flex-col">

                {/* Líneas decorativas */}
                <div className="absolute top-6 left-0 space-y-4 flex flex-col items-start">
                    <div className="w-32 sm:w-64 md:w-70 h-[10px] bg-[#ffb906]"></div>
                    <div className="w-20 sm:w-40 md:hidden"></div>
                </div>
                        
                {/* Contenido centrado */}
                <div className="flex flex-col items-start p-8 md:gap-10">
            
                    {/* imagen logo jobsi*/}
                            <img
                            src={logoJobsi}
                            alt="Home Logo Jobsi"
                            className="w-40 md:w-50 h-auto object-contain"
                    />

                    <div className="max-w-xl">
                        <h2 className="hidden md:block text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            Tranqui, ¡nosotros te resolvemos!
                        </h2>
                        
                        <p className="hidden md:block mt-4 text-white">
                            Con Jobsi tendrás cientos de oportunidades
                            <br className="hidden lg:block" />
                            para solucionar tus problemas en minutos.
                        </p>

                        <img
                        src={fotoGraduacion}
                        alt="Graduación"
                        className="hidden md:block w-100 h-auto mt-2 object-contain"
                        />
                    </div>

                    {/* Vista solo en mobile */}
                    <div className="z-10 md:hidden">
                            <h2 className="z-30 text-4xl font-bold text-white">
                                Hecho para <br /> universitarios
                            </h2>

                            <p className="text-xl font-light text-white py-4">
                                Resuelve tus necesidades universitarias en pocos clicks.
                            </p>
                    </div>
                </div>
            </section >

            {/* Panel derecho (blanco) */}
            <section className="relative z-10 -mt-8 lg:mt-0 rounded-t-[40px] lg:rounded-none bg-[#fbfdff] px-4 sm:px-6 py-10 flex items-start overflow-hidden">

                <div className="w-full mx-auto lg:mx-0 max-w-xl px-2 py-4 sm:p-7 md:max-w-2xl lg:max-w-3xl lg:shadow-md">
                        <RegisterForm {...registerHook} />
                </div>

            </section>
        </div>

        {/* Footer pegado al fondo */}
        <Footer className="mt-0" />

    </div>
    </>
);
}

export default Register;
