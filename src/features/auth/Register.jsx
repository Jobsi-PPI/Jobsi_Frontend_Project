import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { register } from "/src/services/authServices/";
import { FiEye, FiEyeOff } from "react-icons/fi"; // react-icons
import Swal from "sweetalert2";

function Register() {
const navigate = useNavigate();

const [nombre, setNombre] = useState("");
const [primerApellido, setPrimerApellido] = useState("");
const [segundoApellido, setSegundoApellido] = useState("");
const [email, setEmail] = useState("");
const [cedula, setCedula] = useState("");
const [celular, setCelular] = useState("");
const [sexo, setSexo] = useState("Masculino");
const [fechaNacimiento, setFechaNacimiento] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordError, setPasswordError] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (
    !nombre.trim() ||
    !primerApellido.trim() ||
    !email.trim() ||
    !cedula.trim() ||
    !celular.trim() ||
    !sexo.trim() ||
    !fechaNacimiento.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
    ) {
    Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del formulario.",
        confirmButtonColor: "#1e3a8a",
    });
    return;
    }

    // Validación contraseña
    if (password !== confirmPassword) {
    setPasswordError("Las contraseñas no coinciden.");
    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
        confirmButtonColor: "#1e3a8a",
    });
    return;
    }

    setPasswordError("");

    // Construcción del body del usuario
    const data = {
    documento: Number(cedula),
    nombre,
    primerApellido,
    segundoApellido,
    email,
    password,
    telefono: celular,
    fechaNacimiento,
    genero: sexo,
    rol: null,
    };

    try {
    await register(data);

    // Guardar primer nombre en localStorage
    const firstName = nombre.split(" ")[0];
    localStorage.setItem("username", firstName);

    // Swal de éxito
    await Swal.fire({
        icon: "success",
        title: "¡Cuenta creada!",
        text: "Tu cuenta ha sido registrada exitosamente 🎉",
        confirmButtonColor: "#1e3a8a",
    });

    navigate("/home");
    } catch (error) {
    console.error(error);

    Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Ocurrió un problema registrando tu cuenta. Revisa los datos.",
        confirmButtonColor: "#1e3a8a",
    });
    }
};

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
            <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-[#1c4363] text-2xl font-bold mb-6 mt-0">
                Registro de cuenta
            </h1>

            {/* Main grid de las columnas */}
            <div className="flex gap-8">
                {/* Columna izquierda */}
                <div className="w-1/2 space-y-4">
                <div>
                    <label className="block text-base font-bold text-black">
                    Nombre
                    </label>
                    <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Segundo apellido
                    </label>
                    <input
                    type="text"
                    placeholder="Ingresa tu segundo apellido"
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Correo institucional
                    </label>
                    <input
                    type="email"
                    placeholder="Ingresa tu correo universitario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="block text-base font-bold text-black">
                    Contraseña
                    </label>

                    <div className="flex items-center border-2 border-[#6b7280] rounded-lg px-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        className="w-full p-2 text-black outline-none"
                    />

                    <button
                        type="button"
                        className="p-2 btn-blanco text-black hover:text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                        ) : (
                        <FiEye className="w-4 h-4" />
                        )}
                    </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="block text-base font-bold text-black">
                    Confirmar contraseña
                    </label>

                    <div
                    className={`flex items-center border-2 rounded-lg px-2 ${
                        passwordError ? "border-red-500" : "border-[#6b7280]"
                    }`}
                    >
                    <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma la contraseña"
                        className="w-full p-2 text-black outline-none"
                    />

                    <button
                        type="button"
                        className="p-2 btn-blanco text-black hover:text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                        ) : (
                        <FiEye className="w-4 h-4" />
                        )}
                    </button>
                    </div>

                    {passwordError && (
                    <p className="text-red-600 text-sm mt-2">
                        {passwordError}
                    </p>
                    )}
                </div>

                {/* Botón permanecerá en la columna izquierda */}
                <div className="pt-2">
                    <button
                    type="submit"
                    className="btn-azul text-white py-2 px-6 rounded-lg transition"
                    >
                    Crear cuenta
                    </button>
                </div>
                </div>

                {/* Columna derecha */}
                <div className="w-1/2 space-y-4">
                <div>
                    <label className="block text-base font-bold text-black">
                    Primer apellido
                    </label>
                    <input
                    type="text"
                    placeholder="Ingresa tu primer apellido"
                    value={primerApellido}
                    onChange={(e) => setPrimerApellido(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Cédula
                    </label>
                    <input
                    type="number"
                    placeholder="Ingresa tu cédula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Celular
                    </label>
                    <input
                    type="number"
                    placeholder="Ingresa tu celular"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Sexo
                    </label>
                    <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                        >
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                        <option value="3">Alien</option>
                        <option value="4">Otro</option>
                    </select>
                </div>
                <div>
                    <label className="block text-base font-bold text-black">
                    Fecha de nacimiento
                    </label>
                    <input
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                </div>
            </div>
            </form>
        </div>

        {/* Línea inferior azul */}
        <div className="absolute bottom-6 left-0 w-1/2 h-[10px] bg-white z-40"></div>
        </div>
    </div>
    </>
);
}

export default Register;
