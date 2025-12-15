import { FiEye, FiEyeOff } from "react-icons/fi"; // react-icons
import { useNavigate } from "react-router-dom";

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    onSubmit,
    }) => {

    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-black">
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
                <div className="relative">
                    <label className="block text-sm font-medium text-black">
                    Contraseña
                    </label>

                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 pr-12 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                    />

                    {/* Ícono del ojito */}
                    <button
                    type="button"
                    className="absolute right-1 btn-blanco top-5.5 text-black hover:text-gray-800"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                    ) : (
                        <FiEye className="w-4 h-4" />
                    )}
                    </button>
                </div>
                <h2 className="flex items-center justify-start text-black">
                    <input type="checkbox" className="mr-2" />
                    Recordar contraseña
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
        </div>
    )
    }

    export default LoginForm
    