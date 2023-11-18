import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../Pages/Login/login";
import DashboardPage from "../Pages/Dashboard/dashboard";
import { getLocalStorage } from "../utils/localStorage";

const PrivateRoute = ({ children }) => {
    const token = getLocalStorage("token");

    if (!!token) {
        return children
    }

    return <Navigate to="/" />
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardPage /></PrivateRoute>
    }
]);