import { useState } from "react";
import { register } from "/src/services/authServices/";
import { useAuth } from "/src/context/AuthContext.jsx";


import Swal from "sweetalert2";

export const useRegister = (navigate) => {

const { login } = useAuth();

const [errors, setErrors] = useState({})

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

    // En la validación:
    const newErrors = {};
        if (!nombre.trim()) newErrors.nombre = true;
        if (!primerApellido.trim()) newErrors.primerApellido = true;
        if (!segundoApellido.trim()) newErrors.segundoApellido = true;
        if (!email.trim()) newErrors.email = true;
        if (!cedula.trim()) newErrors.cedula = true;
        if (!celular.trim()) newErrors.celular = true;
        if (!fechaNacimiento.trim()) newErrors.fechaNacimiento = true;
        if (!password.trim()) newErrors.password = true;
        if (!confirmPassword.trim()) newErrors.confirmPassword = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor completa todos los campos del formulario.",
                confirmButtonColor: "#1e3a8a",
            });
            return;
        }

setErrors({}); // limpia si todo ok

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

    //catch se encarga de atrapar el error en caso de fallar lo esperado
    } catch (error) {
    console.error(error); // se almacena el error de consola en la variable error
    
    //se genera alerta de error detallada de creación
    Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: error.message, //Mostrar mensaje exacto del backend
        confirmButtonColor: "#1e3a8a",
    });
     // 💎 BONUS: marcar campo específico en rojo
    if (error.message.includes("documento")) {
        setErrors(prev => ({ ...prev, cedula: true }));
    }

    if (error.message.includes("correo")) {
        setErrors(prev => ({ ...prev, email: true }));
    }

    if (error.message.includes("teléfono")) {
        setErrors(prev => ({ ...prev, celular: true }));
    }
};
};
    return {
        // Estados
        nombre, primerApellido, segundoApellido, email, cedula, celular,
        sexo, fechaNacimiento, password, confirmPassword,
        showPassword, showConfirmPassword, passwordError, errors,

        // Setters
        setNombre, setPrimerApellido, setSegundoApellido, setEmail, setCedula,
        setCelular, setSexo, setFechaNacimiento, setPassword, setConfirmPassword,
        setShowPassword, setShowConfirmPassword,

        // Funciones
        handleSubmit,
    };
};
