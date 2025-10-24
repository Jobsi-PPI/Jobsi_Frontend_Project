import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
return (<>
<div className="flex min-h-screen w-full">
    {/* Div azul de la izquierda */}
    <div className="flex items-center justify-start min-h-screen w-1/2 bg-[#1e3a8a] relative">

    {/* Líneas superiores lado azul */}
    <div className="absolute top-6 left-0 space-y-4">
        <div className=" w-175 h-[10px] bg-white"></div>
        <div className=" w-75 h-[10px] bg-white"></div>
    </div>

    {/* Línea inferior blanca */}
    <div className="absolute bottom-6 right-0 w-1/2 h-[10px] bg-white z-40"></div>

        <div className="w-full max-w-3xl bg-[#fbfdff] py-20 px-45 rounded-[100px] shadow-md transform translate-x-[-15%] mt-16 z-0">
            <div className="relative flex justify-center">
                {/* Círculo amarillo */}
                <span className="absolute -top-40 w-35 h-35 bg-[#fbbf24] rounded-full left-1/15 flex items-center justify-center">
                    <img
                        src="/src/assets/jobsi_graduation_logo.png"
                        alt="Logo Jobsi"
                        className="w-30' h-20 object-cover"
                    />
                </span>
                <h1 className="text-2xl font-bold text-center text-black mb-6 mt-4">
                Inicio de Sesión
                </h1>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-black">
                        Correo institucional
                    </label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo universitario"
                        className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <h2 className="flex items-center justify-start text-black">
                    <input type="checkbox" className="mr-2" />Recordar contraseña
                </h2>

                <div className="flex justify-between gap-4">
                    <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-1/2 btn-azul text-white py-2 rounded-lg transition "
                    >
                    Crear cuenta
                    </button>

                    <button
                    type="submit"
                    className="w-1/2 btn-amarillo text-black py-2 rounded-lg transition"
                    >
                    Entrar
                    </button>
                </div>

            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
                <a href="/register" className="text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
                </a>
            </p>
        </div>
    </div>

    {/* Div blanco de la derecha */}
    <div className="flex items-center justify-center min-h-screen w-1/2 bg-white overflow-hidden relative"> 
    
        {/* Líneas superiores lado blanco */}
        <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
            <div className="w-175 h-[10px] bg-[#1e3a8a]"></div>
            <div className="w-75 h-[10px] bg-[#1e3a8a]"></div>
        </div>

        <div className="texto-side-white bottom-[25%] left-[5%] space-y-4 bg z-20">

            <div className="absolute left-[33%] bottom-[26%] -translate-x-1/2 z-10">
                <h2 className="relative z-30 text-4xl font-bold text-[#1e293b]">Hecho para universitarios</h2>
                <h3 className="relative z-30 font-light text-[22px] text-black">Jobsi te ayuda a resolver tus problemas y <br /> necesidades universitarias en cuestión de pocos clics</h3>
            </div>
            
            {/* imagen mascota (detrás, más grande) */}
            <img
                src="/src/assets/jobsi-mascota-jobito_render.png"
                alt="Logo Jobsi"
                className="absolute left-[17%] bottom-[8%] -translate-x-1/2 w-[220px] h-[190px] object-cover z-11"
            />

            {/* imagen de fondo grande (detrás del texto) */}
            <img
                src="/src/assets/students-poli.png"
                alt="Fondo estudiantes"
                className="absolute left-[17%] bottom-[25%] w-[600px] h-[600px] object-cover z-0 opacity-95"
            />
        </div>

        {/* Línea inferior azul */}
        <div className="absolute bottom-6 left-0 w-1/2 h-[10px] bg-[#1e3a8a] z-40"></div>

        
    </div>    
</div>

</>
);
};

export default Login;