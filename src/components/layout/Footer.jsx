import React from "react";

import logoJobsi from "../../assets/Jobsi_home_logo.png";

const ENLACES = [
    { label: "Inicio", href: "#" },
    { label: "Vacantes", href: "#" },
    { label: "Empresas", href: "#" },
    { label: "Contacto", href: "#" },
];

const Footer = ({ className = "mt-20" }) => {
    return (
        <footer className={`bg-[#1e3a8a] text-white ${className}`}>
            {/* Contenido principal */}
            <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12">

                    {/* Columna 1 - Marca */}
                    <div>
                        <img
                            src={logoJobsi}
                            alt="Logo Jobsi Home"
                            className="h-16 w-auto object-contain"
                        />

                        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                            Conectamos estudiantes con oportunidades reales. Trabajos,
                            colaboraciones y apoyo académico en un solo lugar.
                            Simple, útil y creado por y para universitarios.
                        </p>
                    </div>

                    {/* Columna 2 - Enlaces */}
                    <div className="md:justify-self-center">
                        <h3 className="hidden md:block text-xs font-semibold uppercase tracking-wider text-white/70">
                            Enlaces
                        </h3>
                        <ul className="flex flex-row gap-4 md:mt-4 text-sm">
                            {ENLACES.map((enlace) => (
                                <li key={enlace.label}>
                                    <a
                                        href={enlace.href}
                                        className="!text-white transition-colors hover:!text-[#ffb906]"
                                    >
                                        {enlace.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3 - Contacto */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
                            Contacto
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-white/80">
                            <li>jobsi_bsns@gmail.com</li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Parte inferior */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1500px] items-center px-6 py-6 text-sm text-white/60 md:px-10">
                    <p>© {new Date().getFullYear()} Jobsi. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
