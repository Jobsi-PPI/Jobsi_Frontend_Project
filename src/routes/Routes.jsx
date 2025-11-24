import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const AppRoutes = () => {
return (
<BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

    </Routes>
</BrowserRouter>
);
};

export default AppRoutes;
