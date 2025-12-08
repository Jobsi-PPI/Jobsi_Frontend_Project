import { useNavigate } from "react-router-dom";
import { useRegister } from "../auth/hooks/useRegister.js";
import RegisterForm from "../auth/components/RegisterForm.jsx";


function Register() {
const navigate = useNavigate();
const registerHook = useRegister(navigate);

return (
    <>
    <div className="flex min-h-screen w-full">
        {/* Div blanco de la izquierda */}
        <div className="flex items-center justify-start min-h-screen w-1/2 bg-white relative">
        {/* Líneas superiores lado azul */}
        <div className="absolute top-6 left-0 space-y-4">
            <div className=" w-175 h-[10px] bg-[#1e3a8a]"></div>
            <div className=" w-75 h-[10px] bg-[#1e3a8a]"></div>
        </div>

        {/* Botón fijo abajo-izquierda */}
        <button
            type="button"
            onClick={() => navigate("/login")}
            className="fixed bottom-10 left-6 z-50 btn-azul text-white py-2 px-6 rounded-lg transition"
        >
            Volver
        </button>

        <img
            src="/src/assets/jobsi-mascota-jobito_render.png"
            alt="Logo Jobsi"
            className="absolute left-[50%] top-[10%] z-50 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[120px] object-cover"
        />

        <img
            src="/src/assets/Poli_jic_graduacion.png"
            alt="Logo Jobsi"
            className="absolute left-[50%] top-[43%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[480px] object-cover"
        />
        <h2 className="absolute left-[50%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#1e293b] whitespace-nowrap">
            Tranqui, ¡nosotros te resolvemos!
        </h2>
        <h3 className="absolute left-[50%] bottom-[9%] -translate-x-1/2 -translate-y-1/2 font-light text-[24px] text-center text-black whitespace-nowrap">
            Con Jobsi tendrás cientas de oportunidades para
            <br /> solucionar tus problemas en cuestión de solo <br />
            minutos, echemonos una mano en conjunto.{" "}
        </h3>

        {/* Línea inferior azul */}
        <div className="absolute bottom-6 right-0 w-1/2 h-[10px] bg-[#1e3a8a] z-40"></div>
        </div>

        {/* Div azul de la derecha */}
        <div className="flex items-center justify-center min-h-screen w-1/2 bg-[#1e3a8a] overflow-hidden relative">
        {/* Líneas superiores lado azul */}
        <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
            <div className="w-175 h-[10px] bg-white"></div>
            <div className="w-75 h-[10px] bg-white"></div>
        </div>

        <div className="w-full max-w-3xl bg-[#fbfdff] py-15 pl-10 pr-60 rounded-[100px] shadow-md transform translate-x-[15%] mt-16 z-0">

                <RegisterForm {...registerHook} />

        </div>

        {/* Línea inferior azul */}
        <div className="absolute bottom-6 left-0 w-1/2 h-[10px] bg-white z-40"></div>
        </div>
    </div>
    </>
);
}

export default Register;
