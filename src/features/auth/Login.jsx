import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import Swal from "sweetalert2";
import "./Login.css";

import LoginForm from "/src/features/auth/components/LoginForm.jsx";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext

    // Estados de los inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);

            // Mostrar SweetAlert de éxito
            await Swal.fire({
                title: "¡Bienvenido!",
                text: "Inicio de sesión exitoso 🎉",
                icon: "success",
                confirmButtonColor: "#1e3a8a",
                confirmButtonText: "Entrar"
            });
            navigate("/home");

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al iniciar sesión. Verifica tus datos.",
                icon: "error",
                confirmButtonColor: "#1e3a8a"
            });
        }
    };

    return (
        <>
        <div className="flex min-h-screen w-full">

            {/* Div azul de la izquierda */}
            <div className="md:flex flex-col items-center justify-center lg:flex items-center justify-center min-h-screen w-full lg:w-1/2 bg-[#1e3a8a] relative px-4">

                {/* Líneas superiores lado azul */}
                <div className="hidden lg:block absolute top-6 left-0 space-y-4">
                    <div className=" w-175 h-[10px] bg-white"></div>
                    <div className=" w-75 h-[10px] bg-white"></div>
                </div>

                {/* Texto y logo SOLO móvil/tablet */}
                <div className="flex flex-col items-center text-center gap-4 pt-10 px-6 mb-28 lg:hidden">
                    
                    <h2 className="text-2xl font-bold text-[#1e293b] md:text-5xl">
                        Hecho para universitarios
                    </h2>

                    <h3 className="text-base font-light text-black md:text-2xl">
                        Jobsi te ayuda a resolver tus problemas y necesidades universitarias en cuestión de pocos clics
                    </h3>

                    <img
                        src="/src/assets/jobsi-mascota-jobito_render.png"
                        alt="Mascota Jobsi"
                        className="w-[200px] h-auto object-contain md:w-[270px]"
                    />
                    
                </div>


                {/* Línea inferior blanca */}
                <div className="hidden lg:block absolute bottom-6 right-0 w-1/2 h-[10px] bg-white z-40"></div>


                {/* Card del form */}
                <div className="w-full max-w-[520px] md:max-w-[700px] lg:max-w-3xl bg-[#fbfdff] shadow-md z-0 mt-8 md:mt-16 px-6 py-10 md:px-14 md:py-18 lg:px-45 lg:py-20 rounded-3xl lg:rounded-[100px] lg:transform lg:translate-x-[-20%]">
                    
                    {/* título */}
                    <div className="relative flex justify-center mb-6 md:mb-0">

                        {/* Círculo amarillo */}
                        <span className="hidden md:flex absolute -top-35 w-35 h-35 bg-[#fbbf24] rounded-full  items-center justify-center lg:md:flex absolute -top-40 w-35 h-35 ">
                            <img
                            src="/src/assets/jobsi_graduation_logo.png"
                            alt="Logo Jobsi"
                            className="w-30' h-20 object-cover"
                            />
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold text-center text-black mt-2 md:mb-5">
                            Inicio de Sesión
                        </h1>
                    </div>

                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        onSubmit={handleSubmit}
                    />

                    <p className="mt-4 text-sm text-center text-gray-600">
                    <a href="/register" className="text-blue-600 hover:underline md:text-xl">
                        ¿Olvidaste tu contraseña?
                    </a>
                    </p>
                </div>
            </div>

            {/* Div blanco de la derecha */}
            <div className="hidden lg:flex items-center justify-center min-h-screen w-1/2 bg-white overflow-hidden relative">

            {/* Líneas superiores lado blanco */}
            <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
                <div className="w-175 h-[10px] bg-[#1e3a8a]"></div>
                <div className="w-75 h-[10px] bg-[#1e3a8a]"></div>
            </div>

            <div className="texto-side-white bottom-[25%] left-[5%] space-y-4 bg z-20">
                <div className="absolute left-[33%] bottom-[26%] -translate-x-1/2 z-10">
                    <h2 className="relative z-30 text-4xl font-bold text-[#1e293b]">
                        Hecho para universitarios
                    </h2>
                    <h3 className="relative z-30 font-light text-[22px] text-black">
                        Jobsi te ayuda a resolver tus problemas y <br /> necesidades
                        universitarias en cuestión de pocos clics
                    </h3>
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
                className="hidden lg:block absolute left-[17%] bottom-[25%] w-[600px] h-[600px] object-cover z-0 opacity-95"
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
