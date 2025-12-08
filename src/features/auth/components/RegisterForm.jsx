import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterForm = ({
    handleSubmit,

    nombre, setNombre,
    primerApellido, setPrimerApellido,
    segundoApellido, setSegundoApellido,
    email, setEmail,
    cedula, setCedula,
    celular, setCelular,
    sexo, setSexo,
    fechaNacimiento, setFechaNacimiento,

    password, setPassword,
    confirmPassword, setConfirmPassword,
    passwordError,

    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword
}) => {

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-[#1c4363] text-2xl font-bold mb-6 mt-0">
                Registro de cuenta
            </h1>

            {/* Grid principal */}
            <div className="flex gap-8">
                
                {/* Columna izquierda */}
                <div className="w-1/2 space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-base font-bold text-black">Nombre</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Segundo apellido */}
                    <div>
                        <label className="block text-base font-bold text-black">Segundo apellido</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu segundo apellido"
                            value={segundoApellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-base font-bold text-black">Correo institucional</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo universitario"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col">
                        <label className="block text-base font-bold text-black">Contraseña</label>

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

                    {/* Confirmar contraseña */}
                    <div className="flex flex-col">
                        <label className="block text-base font-bold text-black">Confirmar contraseña</label>

                        <div
                            className={`flex items-center border-2 rounded-lg px-2 ${
                                passwordError ? "border-red-500" : "border-[#6b7280]"
                            }`}
                        >
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirma la contraseña"
                                className="w-full p-2 text-black outline-none"
                            />

                            <button
                                type="button"
                                className="p-2 btn-blanco text-black hover:text-gray-800"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
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

                    {/* Botón */}
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

                    {/* Primer apellido */}
                    <div>
                        <label className="block text-base font-bold text-black">Primer apellido</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu primer apellido"
                            value={primerApellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Cédula */}
                    <div>
                        <label className="block text-base font-bold text-black">Cédula</label>
                        <input
                            type="number"
                            placeholder="Ingresa tu cédula"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Celular */}
                    <div>
                        <label className="block text-base font-bold text-black">Celular</label>
                        <input
                            type="number"
                            placeholder="Ingresa tu celular"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                    {/* Sexo */}
                    <div>
                        <label className="block text-base font-bold text-black">Sexo</label>
                        <select
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Alien">Alien</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    {/* Fecha nacimiento */}
                    <div>
                        <label className="block text-base font-bold text-black">Fecha de nacimiento</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            className="w-full p-2 border-2 border-[#6b7280] rounded-lg text-black"
                        />
                    </div>

                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
