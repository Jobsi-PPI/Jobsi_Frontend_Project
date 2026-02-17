import { useNavigate } from "react-router-dom";
import { useRegister } from "../auth/hooks/useRegister.js";
import RegisterForm from "../auth/components/RegisterForm.jsx";


function Register() {
const navigate = useNavigate();
const registerHook = useRegister(navigate);

return (
    <>
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

        {/*  Panel izquierdo (blanco) */}
        <section className="relative bg-white px-6 py-10 flex flex-col">
        
            {/* Líneas superiores lado azul (decoración)*/}
            <div className="absolute top-6 left-0 space-y-4">
                <div className="hidden lg:block w-175 h-[10px] bg-[#1e3a8a]"></div>
                <div className="hidden lg:block w-75 h-[10px] bg-[#1e3a8a]"></div>
            </div>

            {/* Contenido centrado */}
            <div className="flex-1 flex flex-col items-center justify-center gap-0 text-center">
                <img
                    src="/src/assets/jobsi-mascota-jobito_render.png"
                    alt="Mascota Jobsi"
                    className="w-24 h-24 md:w-32 h-32 lg:w-42 h-auto object-contain"
                />
                
                <img
                    src="/src/assets/Poli_jic_graduacion.png"
                    alt="Graduación"
                    className="w-[280px] md:w-[420px] lg:w-[550px] h-auto object-contain"
                />

                <div className="max-w-xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e293b]">
                        Tranqui, ¡nosotros te resolvemos!
                    </h2>
                    
                    <p className="mt-4 font-light text-base md:text-lg lg:text-xl text-black">
                        Con Jobsi tendrás cientos de oportunidades para
                        <br className="hidden lg:block" />
                        solucionar tus problemas en cuestión de solo
                        <br className="hidden lg:block" />
                        minutos, echemonos una mano en conjunto.
                    </p>
                </div>
            </div>

            {/* Footer del panel (botón) */}
            <div className="mt-auto flex items-center justify-between pt-6">
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="btn-azul text-white py-2 px-6 rounded-lg transition"
                >
                    Volver
                </button>
            </div>
            
            {/* Línea inferior azul */}
            <div className="hidden lg:block absolute bottom-6 right-0 w-1/2 h-[10px] bg-[#1e3a8a] z-40" />
        </section >

        {/* Panel derecho (azul) */}
        <section className="relative bg-[#1e3a8a] px-6 py-10 flex items-center justify-center overflow-hidden">
            {/* Líneas superiores (decoración) */}
            <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
                <div className="hidden lg:block w-175 h-[10px] bg-white"></div>
                <div className="hidden lg:block w-75 h-[10px] bg-white"></div>
            </div>

            <div className="w-full max-w-xl p-8 rounded-[40px] md:max-w-2xl lg:max-w-3xl bg-[#fbfdff] py-10 pr-22 rounded-[70px] shadow-md">
                    <RegisterForm {...registerHook} />
            </div>

            {/* Línea inferior (decoración) */}
            <div className="hidden lg:block absolute bottom-6 left-0 w-1/2 h-[10px] bg-white z-40" />
        </section>
    </div>
    </>
);
}

export default Register;
