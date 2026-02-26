import { FiEye, FiEyeOff } from "react-icons/fi"; // react-icons
import { useNavigate } from "react-router-dom";

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
                <div>
                    <label className="block text-sm font-medium text-black md:text-xl">
                    Correo institucional
                    </label>
                    <input
                    type="email"
                    placeholder="Ingresa tu correo universitario"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 border-2 rounded-lg text-black ${
                        errors.email ? "border-red-500" : "border-gray-500"
                    }`}
                    />
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium text-black md:text-xl">
                    Contraseña
                    </label>

                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.password ? "border-red-500" : "border-[#6b7280]"}`}
                    />

                    {/* Ícono del ojito */}
                    <button
                    type="button"
                    className="absolute right-1 btn-blanco top-5.5 md:top-8 text-black hover:text-gray-800 md:text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                    ) : (
                        <FiEye className="w-4 h-4" />
                    )}
                    </button>
                </div>
                <h2 className="flex items-center justify-start text-black md:text-xl">
                    <input type="checkbox" className="mr-2" />
                    Recordar contraseña
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => navigate("/register")}
                    >
                        Crear cuenta
                    </Button>

                    <Button
                        variant="warning"
                        fullWidth
                        type="submit"
                    >
                        Entrar
                    </Button>
                </div>

            </form>
        </div>
    )
    }

    export default LoginForm
    