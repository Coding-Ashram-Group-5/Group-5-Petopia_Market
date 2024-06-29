import axios from "axios";
import { User, TokenResponse, Pet, Blog, PetForm, AdoptPetFormData } from "@/types/models"; // Import User and TokenResponse types

const baseURL = import.meta.env.VITE_API_BASE_URL; // Your backend API URL

export const authApi = axios.create({
    baseURL,
    withCredentials: true,
});

export const register = async (userData: User): Promise<TokenResponse> => {
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
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const relogin = async (): Promise<TokenResponse> => {
    const { data } = await authApi.get("/api/v1/users/refresh/token");

    return data;
};

export const profile = async (): Promise<TokenResponse> => {
    const { data } = await authApi.get("/api/v1/users/profile");
    return data;
};

export const deleteAccount = async (id: string): Promise<TokenResponse> => {
    const { data } = await authApi.delete(`/api/v1/users/delete/${id}`);
    return data;
};

export const getAllPets = async (): Promise<Pet> => {
    const { data } = await authApi.get<{ data: Pet }>(
        "api/v1/pets/getDetails/all",
    );
    return data.data;
};

export const getSinglePet = async (id: string | undefined): Promise<Pet> => {
    const { data } = await authApi.get(`api/v1/pets/getDetails/` + id);
    return data.data;
};

export const addPet = async (data: PetForm) => {
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

        const res = await authApi.post("/api/v1/pets/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res?.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const getAllBlogs = async (): Promise<Blog> => {
    const { data } = await authApi.get("api/v1/blogs/all");
    return data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const { data } = await authApi.get(`api/v1/blogs/${id}`);
    return data;
};

export const deleteBlogById = async (id: string): Promise<Blog> => {
    const { data } = await authApi.delete(`api/v1/blogs/${id}`);
    return data;
};

export const postBlog = async ({
    title,
    category,
    content,
    image,
}: {
    content: string;
    image: File;
    title: string;
    category: string;
}) => {
    const form = new FormData();
    form.append("content", content);
    form.append("coverImage", image);
    form.append("title", title);
    form.append("category", category);
    const { data } = await authApi.post(`api/v1/blogs/create`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const updateBlog = async (
    {
        content,
        image,
        title,
        category,
    }: {
        content: string;
        image: File;
        title: string;
        category: string;
    },
    blogId: string,
) => {
    const form = new FormData();
    form.append("content", content);
    form.append("coverImage", image);
    form.append("title", title);
    form.append("category", category);
    const { data } = await authApi.put(`api/v1/blogs/edit/${blogId}`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const postComment = async ({
    comment,
    blogId,
}: {
    comment: string;
    blogId: string;
}) => {
    const { data } = await authApi.post(`api/v1/blogs/comment/${blogId}`, {
        comment,
    });
    return data;
};

export const updateComment = async ({
    comment,
    commentId,
}: {
    comment: string;
    commentId: string;
}) => {
    const { data } = await authApi.patch(
        `api/v1/blogs/comment/edit/${commentId}`,
        {
            comment,
        },
    );

    return data;
};

export const deleteComment = async (id: string, commentId: string) => {
    const { data } = await authApi.delete(
        `api/v1/blogs/comment/delete/${id}/${commentId}`,
    );
    return data;
};
export const likeBlog = async (id: string) => {
    try {
        const { data } = await authApi.patch(`api/v1/blogs/likes/${id}`);

        return data;
    } catch (error: any) {
        return error?.data?.response;
    }
};

export const dislikeBlog = async (id: string) => {
    try {
        const { data } = await authApi.patch(`api/v1/blogs/dislike/${id}`);

        return data;
    } catch (error: any) {
        return error?.data?.response;
    }
};

export const updatePet = async (id: string, data: PetForm): Promise<Pet> => {
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

        const res = await authApi.put(`/api/v1/pets/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res?.data;
    } catch (error: any) {
        return error?.response?.data;
    }
};

export const deletePet = async (id: string): Promise<void> => {
    await authApi.delete(`/api/v1/pets/delete/${id}`);
}

export const adoptPet = async (data: AdoptPetFormData & { pet_id: string }): Promise<void> => {
    const response = await authApi.patch(`/api/v1/pets/adopt/${data.pet_id}`, data);
    return response.data;

}


export default authApi;
