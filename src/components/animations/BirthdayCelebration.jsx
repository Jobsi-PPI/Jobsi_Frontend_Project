import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

/**
 * Componente que renderiza una celebración animada de confeti con un modal 
 * en caso de que la fecha actual coincida con la fecha de nacimiento del usuario.
 * Utiliza LocalStorage para asegurarse de que solo se muestre una vez por año por usuario.
 * 
 * @param {Object} props
 * @param {string} props.userBirthDate - Fecha extraída del JWT (Formato esperado: "YYYY-MM-DD" o "YYYY-MM-DD HH:MM:SS")
 * @param {string} props.userIdentifier - Identificador único del usuario (usualmente correo) para apartar el guardado en localStorage
 */
const BirthdayCelebration = ({ userBirthDate, userIdentifier = 'guest' }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Stop if userBirthDate is not loaded
        if (!userBirthDate) return;

        // Set dimensions for the confetti canvas
        setWindowDimension({ width: window.innerWidth, height: window.innerHeight });


        const today = new Date();
        const currentYear = today.getFullYear();

        // Check if today is the birthday (matching month and day)
        // Clean the incoming birthdate format from DB "2026-03-04 19:00:00.0" 
        // extracting just the YYYY, MM, DD
        let birthMonth = -1;
        let birthDay = -1;
        
        try {
            // El backend devuelve "2026-03-05 19:00:00.0" por culpa del toString() de Java.
            // Para no depender de cómo Chrome interpreta la zona horaria,
            // extraemos los números manualmente y compensamos el día matemáticamente.
            const parts = userBirthDate.split(/[' T:-]/);
            
            if (parts.length >= 3) {
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // 0-indexed
                const day = parseInt(parts[2], 10);
                
                let hour = 0;
                if (parts.length >= 4 && parts[3]) {
                    hour = parseInt(parts[3], 10);
                }
                
                // Si la hora es tardía (ej: 19:00), significa que era la medianoche del DÍA SIGUIENTE en UTC 
                // pero se restaron 5h por la zona horaria.
                if (hour >= 12) {
                    const correctedDate = new Date(year, month, day + 1);
                    birthMonth = correctedDate.getMonth();
                    birthDay = correctedDate.getDate();
                } else {
                    birthMonth = month;
                    birthDay = day;
                }
            }
        } catch (e) {
            console.error("Error parsing birth date", e);
        }

        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        const isBirthday = 
            currentMonth === birthMonth && 
            currentDay === birthDay;

        // Check localStorage to avoid spamming the user when they reload
        // We include the userIdentifier so testing multiple accounts on the same machine works
        const storageKey = `birthday_celebrated_${userIdentifier}_${currentYear}`;
        const hasCelebratedThisYear = localStorage.getItem(storageKey);

        if (isBirthday && !hasCelebratedThisYear) {
            // Delay the animation for 5 seconds to let the Login SweetAlert close first
            const initialDelayTimer = setTimeout(() => {
                setShowAnimation(true);
                
                // Mark as celebrated for this year
                localStorage.setItem(storageKey, 'true');

                // Hide the confetti and banner after 10 seconds of showing it
                const hideTimer = setTimeout(() => {
                    setShowAnimation(false);
                }, 10000);

                // Add hideTimer to the cleanup process internally if needed,
                // but for simplicity we rely on the parent unmount if the user navigates away.
            }, 5000);

            // Cleanup the delay timer if the component unmounts before 5 seconds
            return () => clearTimeout(initialDelayTimer);
        }
    }, [userBirthDate]);

    // Handle window resize dynamically for confetti
    useEffect(() => {
        if (!showAnimation) return;
        
        const handleResize = () => {
             setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showAnimation]);

    if (!showAnimation) return null;

    return (
        <>
            {/* Capa aislada para el fondo borroso (Mejora el rendimiento) */}
            <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-500 pointer-events-auto"></div>

            {/* Capa de Animación y Modal separada */}
            <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
                
                <Confetti
                    width={windowDimension.width}
                    height={windowDimension.height}
                    recycle={false} 
                    numberOfPieces={400} 
                    gravity={0.15}
                />
                
                {/* Modal Card */}
                <div className="pointer-events-auto bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all animate-bounce max-w-sm mx-4">
                    <h2 className="text-4xl font-bold text-[#1c4363] mb-4">¡Feliz Cumpleaños! 🎉</h2>
                    <p className="text-lg text-gray-700 font-medium whitespace-pre-line">
                        De parte de todo el equipo de Jobsi,{'\n'}¡te deseamos un excelente día!
                    </p>
                    <button 
                        onClick={() => setShowAnimation(false)}
                        className="mt-6 px-6 py-2 bg-[#1c4363] hover:bg-[#15344d] text-white rounded-lg font-semibold transition-colors"
                    >
                        ¡Gracias!
                    </button>
                </div>
                
            </div>
        </>
    );
};

export default BirthdayCelebration;
