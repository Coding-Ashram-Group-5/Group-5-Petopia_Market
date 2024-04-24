import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./components/Auth/pages/Login.tsx";
import Register from "./components/Auth/pages/Register.tsx";
import Home from "./components/Ui/Home.tsx";
import NotFound from "./components/NotFound.tsx";
import Logout from "./components/Auth/pages/Logout.tsx";
import Products from "./components/Ui/LandingPage/Products/Products.tsx";


function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}
const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <RegisterAndLogout /> },
            { path: "/logout", element: <Logout /> },
            { path: "/products", element: <Products /> },
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