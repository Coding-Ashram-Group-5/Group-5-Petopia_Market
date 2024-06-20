import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Login from "./components/Auth/pages/Login";
import Register from "./components/Auth/pages/Register";
import Home from "./Pages/Home.tsx";
import NotFound from "./components/NotFound.tsx";
import Products from "@/Pages/ProductPage/Products.tsx";
import AddProduct from "@/Pages/ProductPage/AddProduct.tsx";
import Pets from "@/Pages/Pets/Pets.tsx";
import PetDetails from "@/Pages/Pets/PetDetails.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Pages/ProductPage/ProductDetails.tsx";
import Blogs from "./Pages/Blogs/Blogs.tsx";
import Blog from "./Pages/Blogs/BlogDetails.tsx";
import NewBlog from "./Pages/Blogs/AddBlog.tsx";
import EditBlog from "./Pages/Blogs/EditBlog.tsx";
import Admin from "./Pages/Admin/Admin.tsx";
import Dashboard from "./Pages/Admin/AdminPages/Dashboard.tsx";
import ProductManagement from "./Pages/Admin/AdminPages/ProductManagement.tsx";
import PetManagement from "./Pages/Admin/AdminPages/PetManagement.tsx";
import BlogsManagement from "./Pages/Admin/AdminPages/BlogsManagement.tsx";
import UserManagement from "./Pages/Admin/AdminPages/UserManagement.tsx";

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
                            <Route 
                               path="/admin"
                               element={<Admin />}
                               >
                                <Route 
                                      path="/admin"
                                      element={<Dashboard />}
                                />
                                <Route path="products" element={<ProductManagement />} />
                                <Route path="pets" element={<PetManagement />} />
                                <Route path="blogs" element={<BlogsManagement />} />
                                <Route path="users" element={<UserManagement />} />
                               </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
