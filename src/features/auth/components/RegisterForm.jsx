import { FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button.jsx";
import FormField from "./FormField.jsx";
import PasswordField from "./PasswordField.jsx";
import RegisterStepHeader from "./RegisterStepHeader.jsx";

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
    showConfirmPassword, setShowConfirmPassword,

    step, totalSteps, nextStep, prevStep
}) => {
    const navigate = useNavigate();
    const soloEnPaso = (...pasos) => (pasos.includes(step) ? "" : "max-md:hidden");

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-4 mb-6 max-md:hidden">
                <h2 className="text-black sm:text-lg lg:text-3xl font-bold">
                    Registro de cuenta
                </h2>

                <Button
                    variant="secondary"
                    size="sm"
                    className="gap-2 shrink-0"
                    onClick={() => navigate("/login")}
                >
                    <FiArrowLeft />
                    Volver
                </Button>
            </div>

            <RegisterStepHeader
                step={step}
                totalSteps={totalSteps}
                onBack={() => (step > 1 ? prevStep() : navigate("/login"))}
            />

            <Button
                className={`relative !bg-white !text-black !border !border-gray-500 hover:!bg-gray-100 ${soloEnPaso(1)}`}
                fullWidth
                /* onClick={() => navigate("/register-google")} */
            >
                <FcGoogle className="pr-2 w-8 h-5 md:w-10 md:h-6" />
                Registrarse con Google
            </Button>

            <div className={`flex items-center gap-3 text-gray-600 ${soloEnPaso(1)}`}>
                <span className="flex-1 h-px bg-gray-300"></span>
                o completa tus datos
                <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">

                {/* Columna 1 */}
                <div className={`flex flex-col gap-4 ${soloEnPaso(1, 3)}`}>
                    <FormField
                        className={soloEnPaso(1)}
                        label="Nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={setNombre}
                        error={errors.nombre}
                    />

                    <FormField
                        className={soloEnPaso(1)}
                        label="Primer apellido"
                        type="text"
                        placeholder="Primer apellido"
                        value={primerApellido}
                        onChange={setPrimerApellido}
                        error={errors.primerApellido}
                    />

                    <FormField
                        className={soloEnPaso(1)}
                        label="Segundo apellido"
                        type="text"
                        placeholder="Segundo apellido"
                        value={segundoApellido}
                        onChange={setSegundoApellido}
                        error={errors.segundoApellido}
                    />

                    <FormField
                        className={soloEnPaso(3)}
                        label="Correo institucional"
                        type="email"
                        placeholder="nombre@elpoli.edu.co"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                    />
                </div>

                {/* Columna 2 */}
                <div className={`space-y-4 ${soloEnPaso(2)}`}>
                    <FormField
                        label="Cédula"
                        type="number"
                        placeholder="Número de cédula"
                        value={cedula}
                        onChange={setCedula}
                        error={errors.cedula}
                    />

                    <FormField
                        label="Celular"
                        type="number"
                        placeholder="300 000 0000"
                        value={celular}
                        onChange={setCelular}
                        error={errors.celular}
                    />

                    {/* Sexo */}
                    <div>
                        <label className="block text-sm sm:text-base font-bold text-black">Sexo <span className="text-red-500">*</span></label>
                        <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className="w-full p-2 border-1 border-[#6b7280] rounded-lg text-black"
                        >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Alien">Alien</option>
                        <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <FormField
                        label="Fecha de nacimiento"
                        type="date"
                        value={fechaNacimiento ?? ""}
                        onChange={setFechaNacimiento}
                        max={format(new Date(), "yyyy-MM-dd")}
                        error={errors.fechaNacimiento}
                    />
                </div>
            </div>

            {/* Passwords*/}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 ${soloEnPaso(3)}`}>
                <PasswordField
                    label="Contraseña"
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                />

                <PasswordField
                    label="Confirmar contraseña"
                    placeholder="Repite la contraseña"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={errors.confirmPassword}
                    show={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    message={passwordError}
                />
            </div>

            {/* Botón */}
            <div className="pt-2">
                <Button
                    type="submit"
                    fullWidth
                    variant="primary"
                    className={`h-12 ${step < totalSteps ? "max-md:hidden" : ""}`}
                    >
                    Crear cuenta
                </Button>

                {step < totalSteps && (
                    <Button
                        type="button"
                        fullWidth
                        variant="primary"
                        className="h-12 md:hidden"
                        onClick={nextStep}
                    >
                        Continuar
                    </Button>
                )}
            </div>
        </form>
    );
};

export default RegisterForm;
