import { authApi } from "./api";
import { User } from "@/types/models";


export const getAllUsers= async (): Promise<User> => {
    const { data } = await authApi.get<{data:User;}>("api/v1/users/all");
    return data.data;
}

export const deleteUserById = async (id:string):Promise<User> => {
    const { data } = await authApi.delete<{data:User}>(`api/v1/users/delete/${id}`)
    return data.data;
}