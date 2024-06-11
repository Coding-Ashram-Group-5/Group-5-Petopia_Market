import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./components/Auth/pages/Login";
import Register from "./components/Auth/pages/Register";
import Home from "./components/Ui/LandingPage/Pages/Home.tsx";
import NotFound from "./components/NotFound.tsx";
import Products from "@/components/Ui/LandingPage/Pages/ProductPage/ProductDetails.tsx";
import AddProduct from "@/components/Ui/LandingPage/Pages/ProductPage/AddProduct.tsx";
import Pets from "@/components/Ui/LandingPage/Pages/Pets/Pets.tsx";
import PetDetails from "@/components/Ui/LandingPage/Pages/Pets/PetDetails.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/Ui/LandingPage/Pages/ProductPage/ProductDetails.tsx";
import Blogs from "./components/Ui/LandingPage/Pages/Blogs/Blogs.tsx";
import Blog from "./components/Ui/LandingPage/Pages/Blogs/BlogDetails.tsx";
import NewBlog from "./components/Ui/LandingPage/Pages/Blogs/AddBlog.tsx";
import EditBlog from "./components/Ui/LandingPage/Pages/Blogs/EditBlog.tsx";

const queryClient = new QueryClient();

function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

function RegisterAndLogout() {
    deleteCookie('refreshToken');
    deleteCookie('authToken');
    return <Register />;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element with id 'root' not found.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/register"
                                element={<RegisterAndLogout />}
                            />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/products/add"
                                element={<AddProduct />}
                            />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/:id" element={<Blog />} />
                            <Route path="/blogs/add" element={<NewBlog />} />
                            <Route
                                path="/blogs/edit/:id"
                                element={<EditBlog />}
                            />
                            <Route path="/pets" element={<Pets />} />
                            <Route
                                path="/pets/getDetails/:id"
                                element={<PetDetails />}
                            />
                            <Route
                                path="/products/getDetails/:id"
                                element={<ProductDetails />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
