import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "/src/context/AuthContext.jsx";
import Swal from "sweetalert2";
import "./Login.css";


import LoginForm from "/src/features/auth/components/LoginForm.jsx";
import Footer from "../../components/layout/footer.jsx";


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

        <div className="flex flex-col min-h-screen bg-white lg:bg-gradient-to-r lg:from-[#1e3a8a] lg:from-50% lg:to-white lg:to-50%">
            
            <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

                {/* PANEL IZQUIERDO (AZUL) */}
                <section className="relative bg-[#1e3a8a] px-4 sm:px-6 py-10 flex flex-col items-center justify-center">

                    {/* Líneas decorativas (solo desktop) */}
                    <div className="hidden lg:block absolute top-6 left-0 space-y-4">
                        <div className=" w-175 h-[10px] bg-white"></div>
                        <div className=" w-75 h-[10px] bg-white"></div>
                    </div>

                    {/* Línea inferior */}
                    <div className="hidden lg:block absolute bottom-6 right-0 w-1/2 h-[10px] bg-white" />

                    {/* Texto + mascota SOLO móvil/tablet */}
                    <div className="lg:hidden w-full max-w-xl text-center flex flex-col items-center gap-4 pt-6 pb-10">
                        <h2 className="text-2xl md:text-5xl font-bold text-white">
                            Hecho para universitarios
                        </h2>
                    </div>

                    {/* Card del form */}
                    <div className="w-full px-10 py-10  max-w-[350px] md:max-w-[500px] lg:max-w-[700px] bg-[#fbfdff] shadow-md rounded-3xl lg:rounded-[80px] md:px-20 md:py-14 lg:px-30 lg:py-16">
                        
                        {/* Texto + mascota SOLO móvil/tablet */}
                        <div className="lg:hidden w-full max-w-xl text-center flex flex-col items-center gap-4 pt-6 pb-10">
                            <img
                                src="/src/assets/jobsi-mascota-jobito_render.png"
                                alt="Mascota Jobsi"
                                className="w-[150px] md:w-[270px] h-auto object-contain"
                            />
                        </div>

                        {/* Título */}
                        <div className="relative flex justify-center mb-6 md:mb-0">



                            {/* Círculo amarillo */}
                            <span className="hidden lg:flex absolute -top-35 w-35 h-35 bg-[#fbbf24] rounded-full  items-center justify-center lg:md:flex absolute -top-40 w-35 h-35 ">
                                <img
                                src="/src/assets/jobsi_graduation_logo.png"
                                alt="Logo Jobsi"
                                className="w-30' h-20 object-cover"
                                />
                            </span>
                            
                            <h1 className="text-base md:text-2xl font-bold text-center text-black mt-2 mb-5">
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
                            errors={errors}
                        />

                        <p className="mt-4 text-sm md:text-base text-center text-gray-600">
                            <Link
                            to="/forgot-password"
                            className="text-blue-600 hover:underline md:text-xl"
                            >
                            ¿Olvidaste tu contraseña?
                            </Link>
                        </p>
                    </div>

                    {/* Descripción SOLO móvil/tablet */}
                    <div className="lg:hidden w-full max-w-xl text-center flex flex-col items-center gap-4 pt-6 pb-10">
                        <p className="text-xl md:text-2xl font-light text-white">
                            Jobsi te ayuda a resolver tus problemas y necesidades universitarias
                            en cuestión de pocos clics
                        </p>

                        <p className="text-base md:text-2xl font-light text-white mt-10">
                            Todos los derechos de © copyright reservados
                        </p>
                    </div>

                </section>

                {/* PANEL DERECHO (BLANCO) */}
                <section className="hidden lg:flex relative bg-white overflow-hidden px-10">

                    {/* Líneas decorativas */}
                    <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
                        <div className="w-175 h-[10px] bg-[#1e3a8a]"></div>
                        <div className="w-75 h-[10px] bg-[#1e3a8a]"></div>
                    </div>

                    {/* Línea inferior */}
                    <div className="absolute bottom-6 left-0 w-1/2 h-[10px] bg-[#1e3a8a]" />

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
                        className="hidden  md:block absolute left-[17%] bottom-[25%] w-[420px] lg:w-[600px] h-auto object-cover z-0 opacity-95"
                        /* w-[280px] md:w-[420px] lg:w-[550px] h-auto object-contain */
                        />
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
