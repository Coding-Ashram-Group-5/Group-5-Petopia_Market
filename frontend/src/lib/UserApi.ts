import { authApi } from "./api";
import { User, IAdminPanelDetailsResponse } from "@/types/models";


export const getAllUsers= async (): Promise<User> => {
    const { data } = await authApi.get<{data:User;}>("api/v1/admin/all/users");
    return data.data;
}

export const deleteUserById = async (id:string):Promise<User> => {
    const { data } = await authApi.delete<{data:User}>(`api/v1/users/delete/${id}`)
    return data.data;
}

export const dashboardDetails = async (): Promise<IAdminPanelDetailsResponse> => {
    try {
      const { data } = await authApi.post("/api/v1/admin/details", {
        year: 2024
      });
      return data;
    } catch (error) {
      console.error('Error fetching dashboard details:', error);
      throw error;
    }
  };