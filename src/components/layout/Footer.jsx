import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#1e3a8a] text-white mt-20">
            {/* Separador blanco */}
            <div className="w-full h-[4px] bg-white" />
            
            {/* Contenido principal */}
            <div className="max-w-screen-2xl mx-auto px-0 py-14">


                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-12">

                    {/* Columna 1 - Marca */}
                    <div>
                        <div className="flex items-center gap-3">
                            <img 
                                src="/src/assets/Jobsi_home_logo.png" 
                                alt="Logo Jobsi Home" 
                                className="w-[200px] lg:w-[260px] object-contain" 
                            />
                        </div>

                        <p className="mt-6 text-m text-white/80 leading-relaxed max-w-md">
                            Conectamos estudiantes con oportunidades reales. Trabajos,
                            colaboraciones y apoyo académico en un solo lugar.
                            Simple, útil y creado por y para universitarios.
                        </p>
                    </div>

                    {/* Columna 2 - Enlaces */}
                    <div className="md:mx-auto">
                        <h3 className="text-m font-semibold uppercase tracking-wider text-white/70">
                            Enlaces
                        </h3>
                        <ul className="mt-4 space-y-3 text-m">
                            <li>
                                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                                    Vacantes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                                    Empresas
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white hover:text-gray-200 transition-colors">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3 - Contacto */}
                    <div className="md:text-right">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                            Contacto
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-white/80">
                            <li>jobsi_bsns@gmail.com</li>
                            <li>+57 3226893515</li>
                            <li>Universidad Politécnico Colombiano JIC</li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-white/10"></div>

            {/* Parte inferior */}
            <div className="max-w-screen-2xl mx-auto px-10 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-4">
                <p>© {new Date().getFullYear()} Jobsi. Todos los derechos reservados.</p>
                <p>Desarrollado por JEJ.dev</p>
            </div>
        </footer>
    );
};

export default Footer;