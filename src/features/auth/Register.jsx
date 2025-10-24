import React from 'react'

function Register() {
return (<> 
    <div className="flex min-h-screen w-full">
        {/* Div blanco de la izquierda */}
        <div className="flex items-center justify-start min-h-screen w-1/2 bg-white relative">

        {/* Líneas superiores lado azul */}
        <div className="absolute top-6 left-0 space-y-4">
            <div className=" w-175 h-[10px] bg-[#1e3a8a]"></div>
            <div className=" w-75 h-[10px] bg-[#1e3a8a]"></div>
        </div>

        {/* Línea inferior azul */}
        <div className="absolute bottom-6 right-0 w-1/2 h-[10px] bg-[#1e3a8a] z-40"></div>

            
        </div>

        {/* Div azul de la derecha */}
        <div className="flex items-center justify-center min-h-screen w-1/2 bg-[#1e3a8a] overflow-hidden relative"> 
        
            {/* Líneas superiores lado azul */}
            <div className="absolute top-6 right-0 space-y-4 flex flex-col items-end">
                <div className="w-175 h-[10px] bg-white"></div>
                <div className="w-75 h-[10px] bg-white"></div>
            </div>

                
            <div className="w-full max-w-3xl bg-[#fbfdff] py-15 pl-10 pr-60 rounded-[100px] shadow-md transform translate-x-[15%] mt-16 z-0">
                
                <form className="space-y-4">
                    <h1 className='text-[#1c4363] text-2xl font-bold mb-6 mt-0'>Registro de cuenta</h1>

                    {/* Main grid de las columnas */}
                    <div className="flex gap-8">
                        {/* Columna izquierda */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="block text-base font-bold text-black">Correo institucional</label>
                                <input type="email" placeholder="Ingresa tu correo universitario" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Institución</label>
                                <input type="text" placeholder="Digita el nombre de tu institución" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Departamento</label>
                                <select className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                                    <option value="municipio1">Municipio 1</option>
                                    <option value="municipio2">Municipio 2</option>
                                    <option value="municipio3">Municipio 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Contraseña</label>
                                <input type="password" placeholder="Ingresa tu contraseña" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Confirmar contraseña</label>
                                <input type="password" placeholder="Confirma la contraseña" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>

                            {/* Botón permanecerá en la columna izquierda */}
                            <div className="pt-2">
                                <button type="submit" className="btn-azul text-white py-2 px-6 rounded-lg transition">Crear cuenta</button>
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="block text-base font-bold text-black">Cédula</label>
                                <input type="number" placeholder="Ingresa tu cédula" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Celular</label>
                                <input type="number" placeholder="Digita tu celular" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Ciudad</label>
                                <select className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                                    <option value="ciudad1">Ciudad 1</option>
                                    <option value="ciudad2">Ciudad 2</option>
                                    <option value="ciudad3">Ciudad 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Sexo</label>
                                <select className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Fecha de nacimiento</label>
                                <input type="date" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Línea inferior azul */}
            <div className="absolute bottom-6 left-0 w-1/2 h-[10px] bg-white z-40"></div>

            
        </div>    
    </div>
</>
    )
}

export default Register;
