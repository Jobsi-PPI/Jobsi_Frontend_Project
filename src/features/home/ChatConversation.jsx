import { useEffect, useState } from "react";

const bubbleBase =
    "rounded-[18px] px-5 py-3 text-sm font-semibold leading-snug text-gray-900 shadow-sm transition-all duration-500 ease-out";

const shown = "translate-y-0 scale-100 opacity-100";
const hidden = "translate-y-2 scale-[0.97] opacity-0";

const ChatConversation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 300),
            setTimeout(() => setStep(2), 900),
            setTimeout(() => setStep(3), 1500),
            setTimeout(() => setStep(4), 2800),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="rounded-[32px] bg-[#2c4a99] p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3">

                <div className={`ml-auto max-w-[290px] bg-white ${bubbleBase} ${step >= 1 ? shown : hidden}`}>
                    ¿Muy desparchado sin nada que hacer?
                </div>

                <div className={`ml-auto max-w-[240px] bg-white ${bubbleBase} ${step >= 2 ? shown : hidden}`}>
                    ¿Necesitas una mano?
                </div>

                <div className="mt-4 flex items-end gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm transition-all duration-500 ease-out
                        ${step >= 3 ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
                        <img
                            src="/src/assets/jobsi-mascota-jobito_render.png"
                            alt="Mascota Jobsi"
                            className="h-8 w-8 object-contain"
                        />
                    </span>

                    <div className="relative max-w-[380px]">
                        {/* Indicador escribiendo */}
                        <div
                            aria-hidden={step !== 3}
                            className={`absolute bottom-0 left-0 transition-all duration-300 ease-out
                                ${step === 3 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                        >
                            <div className="flex items-center gap-1.5 rounded-[18px] bg-[#ffb906] px-5 py-4 shadow-sm">
                                {[0, 150, 300].map((delay) => (
                                    <span
                                        key={delay}
                                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-900/60"
                                        style={{ animationDelay: `${delay}ms`, animationDuration: "1.2s" }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Respuesta */}
                        <div className={`bg-[#ffb906] ${bubbleBase} ${step >= 4 ? shown : hidden}`}>
                            Relajado compa, ¡Nosotros te resolvemos! todo al alcance de un click
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatConversation;
