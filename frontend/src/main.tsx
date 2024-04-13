import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    Navigate,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import SecuredRoute from "./components/pages/securepage/SecuredRoute";

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}
const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            // <SecuredRoute>
            <App />
            // </SecuredRoute>
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <RegisterAndLogout /> },
            { path: "/logout", element: <Logout /> },
            { path: "/*", element: <NotFound /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={routes} />
        </ThemeProvider>
    </React.StrictMode>,
);
