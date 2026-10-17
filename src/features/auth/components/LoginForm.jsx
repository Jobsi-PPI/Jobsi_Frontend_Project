import { FiEye, FiEyeOff } from "react-icons/fi"; // react-icons
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button.jsx";

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    onSubmit,
    errors = {}
    }) => {

    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-black md:text-xl">
                    Correo institucional <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="email"
                    placeholder="nombre@elpoli.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border-1 rounded-lg text-black ${
                        errors.email ? "border-red-500" : "border-gray-500"
                    }`}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-black md:text-xl">
                    Contraseña <span className="text-red-500">*</span>
                    </label>

                    <div
                    className={`flex items-center w-full border-1 rounded-lg overflow-hidden
                                ${ errors.password ? "border-red-500" : "border-[#6b7280]"}`}
                    >
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 min-w-0 p-3 text-black bg-transparent outline-none"
                        />

                        <button
                        type="button"
                        className="px-3 self-stretch flex items-center !bg-white justify-center border-[#6b7280] text-black cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? (
                            <FiEyeOff className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                            <FiEye className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                        </button>
                    </div>
                </div>

                {/* Recordarme y olvidaste tu contraseña */}
                <div className="flex flex-row justify-between gap-2">
                    <h2 className="flex items-center justify-start text-black">
                        <input type="checkbox" className="mr-2" />
                        Recordarme
                    </h2>

                    <p className="text-sm text-center text-gray-600">
                        <Link
                        to="/forgot-password"
                        className="!text-[#1e3a8a] hover:underline"
                        >
                        ¿Olvidaste tu contraseña?
                        </Link>
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <Button
                        variant="warning"
                        fullWidth
                        type="submit"
                    >
                        Entrar
                    </Button>

                    <div className="flex items-center gap-3 text-gray-600">
                        <span className="flex-1 h-px bg-gray-300"></span>
                        o
                        <span className="flex-1 h-px bg-gray-300"></span>
                    </div>

                    <Button
                        className="relative !bg-white !text-black !border !border-gray-500 hover:!bg-gray-100"
                        fullWidth
                        /* onClick={() => navigate("/register-google")} */
                    >
                        <FcGoogle className="absolute left-4 w-5 h-5 md:w-6 md:h-6" />
                        Continuar con Google
                    </Button>

                    <span className="hidden md:block text-sm text-center text-gray-600">
                        ¿No tienes cuenta?{" "}
                        <Link
                        to="/register"
                        className="!text-[#1e3a8a] hover:underline"
                        >
                        Regístrate
                        </Link>
                    </span>

                    <p className="flex flex-col mt-3 mb-3 text-center text-gray-600 md:hidden">
                        ¿Primera vez?
                    </p>

                    <Button
                        className="md:hidden"
                        variant="primary"
                        fullWidth
                        onClick={() => navigate("/register")}
                    >
                        Crear cuenta
                    </Button>

                </div>

            </form>
        </div>
    )
    }

    export default LoginForm
    