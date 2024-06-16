import { authApi } from "./api";
import { Product } from "@/types/models";

export const getCart = async (): Promise<Product[]> => {
    const { data } = await authApi.get<{data:Product[]}>("api/v1/cart");
    return data.data;
}

