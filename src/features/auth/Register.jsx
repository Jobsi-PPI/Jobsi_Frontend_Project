import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'

function Register() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

return (<> 
    <div className="flex min-h-screen w-full">
        {/* Div blanco de la izquierda */}
        <div className="flex items-center justify-start min-h-screen w-1/2 bg-white relative">

            {/* Líneas superiores lado azul */}
            <div className="absolute top-6 left-0 space-y-4">
                <div className=" w-175 h-[10px] bg-[#1e3a8a]"></div>
                <div className=" w-75 h-[10px] bg-[#1e3a8a]"></div>
            </div>

            {/* Botón fijo abajo-izquierda */}
            <button
                type="button"
                onClick={() => navigate("/login")}
                className="fixed bottom-10 left-6 z-50 btn-azul text-white py-2 px-6 rounded-lg transition"
            >
                Volver
            </button>

            <img
                    src="/src/assets/jobsi-mascota-jobito_render.png"
                    alt="Logo Jobsi"
                    className="absolute left-[50%] top-[10%] z-50 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[120px] object-cover"
            />

            <img
                    src="/src/assets/Poli_jic_graduacion.png"
                    alt="Logo Jobsi"
                    className="absolute left-[50%] top-[43%] -translate-x-1/2 -translate-y-1/2 w-[540px] h-[480px] object-cover"
            />
            <h2 className="absolute left-[50%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#1e293b] whitespace-nowrap">Tranqui, nosotros te resolvemos!</h2>
            <h3 className="absolute left-[50%] bottom-[9%] -translate-x-1/2 -translate-y-1/2 font-light text-[24px] text-center text-black whitespace-nowrap">Con Jobsi tendrás cientas de oportunidades para 
                <br /> solucionar tus problemas en cuestión de  solo <br />minutos, echemonos una mano en conjunto.  </h3>


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
                
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (password !== confirmPassword) {
                            setPasswordError('Las contraseñas no coinciden.');
                            return;
                        }
                        setPasswordError('');
                        // continuar con submit / API
                    }}
                >
                    <h1 className='text-[#1c4363] text-2xl font-bold mb-6 mt-0'>Registro de cuenta</h1>

                    {/* Main grid de las columnas */}
                    <div className="flex gap-8">
                        {/* Columna izquierda */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="block text-base font-bold text-black">Nombre</label>
                                <input type="text" placeholder="Ingresa tu nombre" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Apellidos</label>
                                <input type="text" placeholder="Ingresa tus apellidos" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Correo institucional</label>
                                <input type="email" placeholder="Ingresa tu correo universitario" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Contraseña</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (passwordError) setPasswordError('');
                                    }}
                                    placeholder="Ingresa tu contraseña"
                                    className={`w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black border-2 ${passwordError ? 'border-red-500' : 'border-[#6b7280]'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        if (passwordError) setPasswordError('');
                                    }}
                                    placeholder="Confirma la contraseña"
                                    className={`w-full p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black border-2 ${passwordError ? 'border-red-500' : 'border-[#6b7280]'}`}
                                />

                                {/* Mensaje de error limpio y accesible */}
                                <p
                                    className={`mt-2 text-sm ${passwordError ? 'text-red-600' : 'text-transparent'}`}
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {passwordError || ' '}
                                </p>
                            </div>

                            {/* Botón permanecerá en la columna izquierda */}
                            <div className="pt-2">
                                <button type="submit" className="btn-azul text-white py-2 px-6 rounded-lg transition">Crear cuenta</button>
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <label className="block text-base font-bold text-black">Segundon nombre</label>
                                <input type="text" placeholder="Digita tu segundo nombre (opcional)" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Cédula</label>
                                <input type="number" placeholder="Ingresa tu cédula" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
                            </div>
                            <div>
                                <label className="block text-base font-bold text-black">Celular</label>
                                <input type="number" placeholder="Digita tu celular" className="w-full p-2 border-2 border-[#6b7280] rounded-lg focus:ring-2 focus:ring-blue-500 text-black" />
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
