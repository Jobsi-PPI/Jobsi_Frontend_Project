import { FiArrowLeft } from "react-icons/fi";

const SUBTITULOS = [
    "Cuéntanos quién eres.",
    "Datos de contacto y perfil.",
    "Usa tu correo institucional.",
];

const RegisterStepHeader = ({ step, totalSteps, onBack }) => (
    <div className="md:hidden flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label="Volver"
                    className="!bg-white !border-0 !p-1 text-2xl text-black"
                    onClick={onBack}
                >
                    <FiArrowLeft />
                </button>

                <h2 className="text-black text-2xl font-bold">
                    Crea tu cuenta
                </h2>
            </div>

            <span className="text-sm font-medium text-gray-500 shrink-0">
                Paso {step} de {totalSteps}
            </span>
        </div>

        <div className="flex gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
                <span
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${i < step ? "bg-[#1e3a8a]" : "bg-gray-200"}`}
                ></span>
            ))}
        </div>

        <p className="text-gray-600">{SUBTITULOS[step - 1]}</p>
    </div>
);

export default RegisterStepHeader;
