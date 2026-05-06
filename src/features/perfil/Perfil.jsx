import { FiUser, FiMail, FiUsers, FiStar } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { usePerfil } from "./hooks/usePerfil";
import EstrellasCalificacion from "../../components/ui/EstrellasCalificacion";

const PerfilSkeleton = () => (
    <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full" />
            <div className="space-y-2">
                <div className="h-5 bg-gray-300 rounded w-40" />
                <div className="h-4 bg-gray-300 rounded w-56" />
            </div>
        </div>
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 bg-gray-200 rounded-xl" />
        ))}
    </div>
);

const InfoField = ({ icon, label, value }) => (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
        <span className="text-[#1e3a8a] flex-shrink-0">{icon}</span>
        <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-gray-800 font-medium">{value}</p>
        </div>
    </div>
);

const Perfil = () => {
    const { user } = useAuth();
    const { perfil, loading } = usePerfil();

    if (loading) return <PerfilSkeleton />;

    const nombre = perfil?.nombre ?? user?.nombre ?? "—";
    const correo = perfil?.correo ?? user?.email ?? "—";
    const genero = perfil?.genero ?? user?.genero ?? "—";
    const calificacion = perfil?.calificacionPromedio ?? null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-2xl font-bold select-none flex-shrink-0">
                    {nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-xl font-bold text-[#1e3a8a]">{nombre}</p>
                    <p className="text-sm text-gray-500">{correo}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <InfoField icon={<FiUser />} label="Nombre" value={nombre} />
                <InfoField icon={<FiMail />} label="Correo" value={correo} />
                <InfoField icon={<FiUsers />} label="Género" value={genero} />

                <div className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
                    <span className="text-[#1e3a8a] flex-shrink-0"><FiStar /></span>
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            Calificación promedio
                        </p>
                        <EstrellasCalificacion calificacion={calificacion} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
