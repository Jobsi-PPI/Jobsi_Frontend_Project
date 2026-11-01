import ConfigLayout from "./components/ConfigLayout.jsx";
import ConfigContent from "./components/ConfigContent.jsx";

const Configuracion = () => (
    <ConfigLayout
        titulo="Configuración"
        subtitulo="Administra tu información personal y preferencias de cuenta."
    >
        <ConfigContent />
    </ConfigLayout>
);

export default Configuracion;
