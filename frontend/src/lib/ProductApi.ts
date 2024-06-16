import { authApi } from "./api";
import { Product, ProductForm } from "@/types/models";

export const getAllProducts = async (): Promise<Product> => {
    const { data } = await authApi.get<{data:Product;}>("api/v1/product/getDetails/all/10");
    return data.data;
}

export const getSingleProduct = async (id:string): Promise<Product> => {
    const { data } = await authApi.get(`api/v1/product/getDetails/${id}`)
    return data;
}
export const addProduct = async (data:ProductForm): Promise<Product> => {
    try {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "images") {
                const files = data[key];
                for (let i = 0; i < files.length; i++) {
                    formData.append(key, files[i]);
                }
            } else formData.append(key, data[key]);
        });

        const res = await authApi.post("/api/v1/product/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res?.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};