import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import Swal from "sweetalert2";
import "./Login.css";

import LoginForm from "/src/features/auth/components/LoginForm.jsx";
import Footer from "../../components/layout/Footer.jsx";
import logoJobsi from "../../assets/Jobsi_home_logo.png";
import mascotaJobsi from "../../assets/jobsi-mascota-jobito_render.png";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext

    // Estados de los inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = true;
    if (!password.trim()) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor completa todos los campos en rojo del formulario.",
            confirmButtonColor: "#1e3a8a",
        });
        return;
    }
    setErrors({}); // limpia si todo ok

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

        } catch {
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

        <div className="flex flex-col min-h-screen bg-white lg:bg-gradient-to-r lg:from-[#1e3a8a] lg:from-50% lg:to-white lg:to-50%">
            
            <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

                {/* PANEL IZQUIERDO (AZUL) */}
                <section className="relative overflow-hidden bg-[#1e3a8a] px-4 sm:px-6 py-10 flex flex-col space-y-10">

                    <div className="flex flex-col items-start p-8 md:gap-10">
                        
                        {/* Líneas decorativas */}
                        <div className="absolute top-6 left-0 space-y-4 flex flex-col items-start">
                            <div className="w-32 sm:w-64 md:w-70 h-[10px] bg-[#ffb906]"></div>
                            <div className="w-20 sm:w-40 md:hidden"></div>
                        </div>

                        {/* imagen logo jobsi*/}
                            <img
                            src={logoJobsi}
                            alt="Home Logo Jobsi"
                            className="w-40 md:w-50 h-auto object-contain"
                        />

                        <div className="z-10">
                            <h2 className="z-30 text-4xl font-bold text-white md:text-5xl">
                                Hecho para <br /> universitarios
                            </h2>

                            <h3 className="hidden md:block relative z-30 font-light text-[18px] text-white mt-5">
                                Jobsi te ayuda a resolver tus problemas y <br /> necesidades
                                universitarias en cuestión de pocos clicks
                            </h3>

                             {/* Descripción SOLO móvil */}
                            <p className="text-xl font-light text-white py-4 md:hidden ">
                                Resuelve tus necesidades universitarias en pocos clicks.
                            </p>
                        </div>

                        {/* imagen mascota Jobsi*/}
                        <img
                        src={mascotaJobsi}
                        alt="Logo Jobsi"
                        className="hidden md:block w-60 self-center"
                        />
                    </div>

                </section>

                {/* PANEL DERECHO (BLANCO) */}
                <section className="flex relative z-10 -mt-8 lg:mt-0 rounded-t-[40px] lg:rounded-none bg-white overflow-hidden px-4 sm:px-6 lg:px-10">

                    {/* Card del form */}
                    <div className="w-full mx-auto lg:mx-0 px-2 py-8 sm:px-10 max-w-[350px] md:max-w-[500px] lg:max-w-[700px] rounded-3xl lg:rounded-[80px] md:px-20 md:py-14">

                        {/* Título inicia sesión */}
                        <div className="flex flex-col mb-6 md:mb-10">

                            <h2 className="text-3xl md:text-4xl font-bold text-left text-black mt-2 mb-2">
                                Inicia sesión
                            </h2>

                            <p className="md:text-lg text-left text-gray-600">
                                Con tu correo institucional del Politécnico.
                            </p>
                        </div>

                        <div className="md:flex flex-col gap-4 md:gap-6">
                            <LoginForm
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                onSubmit={handleSubmit}
                                errors={errors}
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer pegado al fondo */}
            <Footer/>

        </div>
        
        </>
    );
};

export default Login;
