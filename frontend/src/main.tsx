import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
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
import Products from "./components/pages/ProductPage/Products.tsx";

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
=======
import { BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./components/Auth/pages/Login";
import Logout from "./components/Auth/pages/Logout";
import Register from "./components/Auth/pages/Register";
import Home from "./components/Ui/Home.tsx";
import NotFound from "./components/NotFound.tsx";
import Products from "./components/Ui/LandingPage/Products/Products.tsx";


function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
>>>>>>> origin/main
);
