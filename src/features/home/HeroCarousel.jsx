import { useCallback, useEffect, useRef, useState } from "react";

import graduationLogo from "../../assets/jobsi_graduation_logo.png";

const INTERVALO_MS = 4000;
const PAUSA_TRAS_TOCAR_MS = 6000;

const tarjetaBase = "flex min-h-[170px] w-[85%] shrink-0 snap-start items-center rounded-[28px] bg-white p-7 shadow-sm";
const textoGrande = "text-[26px] font-bold leading-tight text-gray-900";

const TARJETAS = [
    <p className={textoGrande}>
        ¿Muy desparchado sin nada que hacer?
    </p>,

    <p className={textoGrande}>
        ¿Necesitas una mano?
    </p>,

    <div className="flex w-full items-center justify-between gap-3">
        <p className="text-base font-bold leading-snug text-gray-900">
            Relajado compa,{" "}
            <span className="text-[#1e3a8a]">¡Nosotros te resolvemos!</span>{" "}
            todo al alcance de un{" "}
            <span className="rounded-lg bg-[#ffb906] px-2 py-0.5">click</span>
        </p>
        <img src={graduationLogo} alt="" className="h-20 w-20 shrink-0 object-contain" />
    </div>,
];

const HeroCarousel = () => {

    const contenedorRef = useRef(null);
    const tarjetasRef = useRef([]);
    const activoRef = useRef(0);
    const pausadoRef = useRef(false);
    const reanudarRef = useRef(null);
    const [activo, setActivo] = useState(0);

    const irA = useCallback((indice) => {
        const tarjetas = tarjetasRef.current;
        if (!contenedorRef.current || !tarjetas[indice]) return;

        contenedorRef.current.scrollTo({
            left: tarjetas[indice].offsetLeft - tarjetas[0].offsetLeft,
            behavior: "smooth",
        });
    }, []);

    const actualizarActivo = () => {
        const tarjetas = tarjetasRef.current;
        const paso = tarjetas[1].offsetLeft - tarjetas[0].offsetLeft;
        const indice = Math.min(
            Math.round(contenedorRef.current.scrollLeft / paso),
            TARJETAS.length - 1
        );

        activoRef.current = indice;
        setActivo(indice);
    };

    const pausar = () => {
        pausadoRef.current = true;
        clearTimeout(reanudarRef.current);
    };

    const reanudarLuego = () => {
        reanudarRef.current = setTimeout(() => {
            pausadoRef.current = false;
        }, PAUSA_TRAS_TOCAR_MS);
    };

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const intervalo = setInterval(() => {
            if (pausadoRef.current) return;
            irA((activoRef.current + 1) % TARJETAS.length);
        }, INTERVALO_MS);

        return () => {
            clearInterval(intervalo);
            clearTimeout(reanudarRef.current);
        };
    }, [irA]);

    return (
        <section aria-roledescription="carousel" aria-label="Mensajes de Jobsi" className="md:hidden">

            <div
                ref={contenedorRef}
                onScroll={actualizarActivo}
                onTouchStart={pausar}
                onTouchEnd={reanudarLuego}
                className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {TARJETAS.map((contenido, i) => (
                    <div
                        key={i}
                        ref={(el) => (tarjetasRef.current[i] = el)}
                        className={tarjetaBase}
                    >
                        {contenido}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                {TARJETAS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Ir a la tarjeta ${i + 1}`}
                        aria-current={i === activo}
                        onClick={() => irA(i)}
                        className={`h-2 !rounded-full !border-0 !p-0 transition-all duration-300
                            ${i === activo ? "w-7 !bg-[#ffb906]" : "w-2 !bg-white/40"}`}
                    />
                ))}
            </div>

        </section>
    );
};

export default HeroCarousel;
