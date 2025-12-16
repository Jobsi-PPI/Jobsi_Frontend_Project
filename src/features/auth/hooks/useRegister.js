import { useState } from "react";
import { register } from "/src/services/authServices/";
import { useAuth } from "/src/context/AuthContext.jsx";


import Swal from "sweetalert2";

export const useRegister = (navigate) => {

const { login } = useAuth();

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

    // Validación básica
    if (
    !nombre.trim() || !primerApellido.trim() || !email.trim() ||
    !cedula.trim() || !celular.trim() || !sexo.trim() ||
    !fechaNacimiento.trim() || !password.trim() || !confirmPassword.trim()
    ) {
    Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del formulario.",
        confirmButtonColor: "#1e3a8a",
    });
    return;
    }

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

    // Cuerpo del usuario
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

        // Login automático después de registrar
        await login(email, password);

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

    return {
        // Estados
        nombre, primerApellido, segundoApellido, email, cedula, celular,
        sexo, fechaNacimiento, password, confirmPassword,
        showPassword, showConfirmPassword, passwordError,

        // Setters
        setNombre, setPrimerApellido, setSegundoApellido, setEmail, setCedula,
        setCelular, setSexo, setFechaNacimiento, setPassword, setConfirmPassword,
        setShowPassword, setShowConfirmPassword,

        // Funciones
        handleSubmit,
    };
};
