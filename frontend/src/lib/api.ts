import axios from "axios";
import { User, TokenResponse, Pet, Product } from "../types/models"; // Import User and TokenResponse types

const baseURL = import.meta.env.VITE_API_BASE_URL; // Your backend API URL

const authApi = axios.create({
    baseURL,
    withCredentials: true,
});

export const register = async (userData: User): Promise<User> => {
    const { data } = await authApi.post("/api/v1/users/signup", userData);
    return data;
};

export const login = async (
    email: string,
    password: string,
): Promise<TokenResponse> => {
    const { data } = await authApi.post("/api/v1/users/signin", {
        email,
        password,
    });
    return data;
};

export const logout = async (): Promise<void> => {
    try {
        await authApi.get("/api/v1/users/logout");
        clearLocalStorage(); // Clear local storage after logout
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const relogin = async (): Promise<TokenResponse> => {
    const { data } = await authApi.get("/api/v1/users/refresh/token");
    return data;
};

export const getAllPets = async (): Promise<Pet> => {
    const { data } = await authApi.get<{data:Pet;}>("api/v1/pets/getDetails/all");
    return data.data;
};

export const getSinglePet = async (id: string | undefined): Promise<Pet> => {
    const { data } = await authApi.get(`api/v1/pets/getDetails/` + id);
    return data.data[0];
   
};

export const addPet = async (petData: Pet): Promise<Pet> => {
    const { data } = await authApi.post("/api/v1/pets/add", petData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const updatePet = async (id: string, petData: Pet): Promise<Pet> => {
    const { data } = await authApi.put(`/api/v1/pets/update/${id}`, petData);
    return data;
};

export const deletePet = async (id: string): Promise<void> => {
    await authApi.delete(`/api/v1/pets/delete/${id}`);
}

export const getAllProducts = async (): Promise<Product> => {
    const { data } = await authApi.get<{data:Product;}>("api/v1/product/getDetails/all/10");
    return data.data;
}

export const getSingleProduct = async (id:string): Promise<Product> => {
    const { data } = await authApi.get(`api/v1/product/getDetails/${id}`)
    return data;
}

// Helper function to clear local storage
const clearLocalStorage = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
};

export default authApi;
