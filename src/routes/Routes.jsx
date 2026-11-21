import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import RecuperarContrasena from "../features/auth/RecuperarContrasena";
import VerMisJobs from "../features/jobs/VerMisJobs";
import ExplorarJobs from "../features/home/ExplorarJobs";
import PostulacionesRecibidas from "../features/postulaciones/PostulacionesRecibidas";
import Configuracion from "../features/configuracion/Configuracion";
import Perfil from "../features/configuracion/perfil/Perfil";
import Seguridad from "../features/configuracion/seguridad/Seguridad";
import Privacidad from "../features/configuracion/privacidad/Privacidad";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
return (
    <BrowserRouter>
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />

            {/* Privadas */}
            <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/mis-jobs" element={<VerMisJobs />} />
            <Route path="/explorar-jobs" element={<ExplorarJobs />} />
            <Route path="/mis-postulaciones" element={<PostulacionesRecibidas />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/configuracion/perfil" element={<Perfil />} />
            <Route path="/configuracion/seguridad" element={<Seguridad />} />
            <Route path="/configuracion/privacidad" element={<Privacidad />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
    );
};

export default AppRoutes;