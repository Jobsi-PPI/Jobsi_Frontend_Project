import { useRecuperarContrasena } from "./hooks/useRecuperarContrasena";

import RecuperarLayout from "./components/recuperar/RecuperarLayout.jsx";
import PasoCorreo from "./components/recuperar/PasoCorreo.jsx";
import PasoCodigo from "./components/recuperar/PasoCodigo.jsx";
import PasoNuevaContrasena from "./components/recuperar/PasoNuevaContrasena.jsx";

const RecuperarContrasena = () => {
    const r = useRecuperarContrasena();

    return (
        <RecuperarLayout paso={r.paso} onVolver={r.volver}>
            {r.paso === 1 && (
                <PasoCorreo
                    correo={r.correo}
                    onChange={r.cambiarCorreo}
                    error={r.errores.correo}
                    enviando={r.enviando}
                    onSubmit={r.enviarCorreo}
                />
            )}

            {r.paso === 2 && (
                <PasoCodigo
                    correo={r.correo}
                    codigo={r.codigo}
                    onChange={r.cambiarCodigo}
                    error={r.errores.codigo}
                    enviando={r.enviando}
                    segundosVigencia={r.segundosVigencia}
                    segundosEspera={r.segundosEspera}
                    onSubmit={r.verificar}
                    onReenviar={r.reenviar}
                />
            )}

            {r.paso === 3 && (
                <PasoNuevaContrasena
                    nueva={r.nueva}
                    confirmar={r.confirmar}
                    onChangeNueva={r.cambiarNueva}
                    onChangeConfirmar={r.cambiarConfirmar}
                    errores={r.errores}
                    enviando={r.enviando}
                    onSubmit={r.restablecer}
                />
            )}
        </RecuperarLayout>
    );
};

export default RecuperarContrasena;
