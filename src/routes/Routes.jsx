import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import VerMisJobs from "../features/jobs/VerMisJobs";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
return (
    <BrowserRouter>
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Privadas */}
            <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/mis-jobs" element={<VerMisJobs />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
    );
};

export default AppRoutes;