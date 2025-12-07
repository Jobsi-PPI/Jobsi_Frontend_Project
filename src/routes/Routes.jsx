import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import VerMisJobs from "../features/jobs/VerMisJobs";

const AppRoutes = () => {
return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-jobs" element={<VerMisJobs />} />

    </Routes>
</BrowserRouter>
);
};

export default AppRoutes;
