import { FiEye, FiEyeOff } from "react-icons/fi";

import Button from "../../../components/ui/Button.jsx";

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
    passwordError, errors,

    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword
}) => {

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-[#1c4363] text-base sm:text-lg lg:text-2xl font-bold mb-6">
                Registro de cuenta
            </h1>

            {/* Grid principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
    
                {/* Columna 1 */}
                <div className="space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Nombre</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.nombre ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>

                    {/* Primer apellido */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Primer apellido</label>
                        <input
                        type="text"
                        placeholder="Ingresa tu primer apellido"
                        value={primerApellido}
                        onChange={(e) => setPrimerApellido(e.target.value)}
                        className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.primerApellido ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>

                    {/* Segundo apellido */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Segundo apellido</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu segundo apellido"
                            value={segundoApellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.segundoApellido ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Correo institucional</label>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo universitario"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.email ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>
                </div>

                {/* Columna 2 */}
                <div className="space-y-4">
                    {/* Cédula */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Cédula</label>
                        <input
                        type="number"
                        placeholder="Ingresa tu cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.cedula ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>

                    {/* Celular */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Celular</label>
                        <input
                        type="number"
                        placeholder="Ingresa tu celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.celular ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>

                    {/* Sexo */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Sexo</label>
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
                        <label className="block text-sm sm:text-base font-bold text-black">Fecha de nacimiento</label>
                        <input
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        className={`w-full p-2 border-2 rounded-lg text-black 
                                ${ errors.fechaNacimiento ? "border-red-500" : "border-[#6b7280]"}`}
                        />
                    </div>
                </div>
            </div>

            {/* Passwords*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
                {/* Contraseña */}
                <div className="flex flex-col">
                    <label className="block text-sm sm:text-base font-bold text-black">Contraseña</label>

                    <div className={`flex items-center border-2 rounded-lg px-2 ${
                            errors.password ? "border-red-500" : "border-[#6b7280]"
                        }`}>
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
                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirmar contraseña */}
                <div className="flex flex-col">
                    <label className="block text-sm sm:text-base font-bold text-black">Confirmar contraseña</label>

                    <div className={`flex items-center border-2 rounded-lg px-2 ${
                            errors.confirmPassword ? "border-red-500" : "border-[#6b7280]"
                        }`}>
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
                        {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                    </div>

                    {passwordError && (
                        <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                    )}
                </div>
            </div>

            {/* Botón */}
            <div className="pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    >
                    Crear cuenta
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
