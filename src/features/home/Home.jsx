import { useNavigate } from "react-router-dom";

const Home = () => {
const navigate = useNavigate();
    return (
    <>
        <div className="flex items-center justify-center min-h-screen w-full bg-green-100">
            <h1 className="text-3xl font-bold text-green-700">Bienvenido a Jobsi 🚀</h1>
            <button
                onClick={() => navigate("/login")}
                className="ml-6 btn-azul text-white py-2 px-6 rounded-lg transition"
            >
                Ir a login
            </button>
        </div>
    </>
    );
};

export default Home;

