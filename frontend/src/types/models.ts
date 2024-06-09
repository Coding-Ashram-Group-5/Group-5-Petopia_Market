import { create } from "zustand";

type State = {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    avatar?: {
        publicId: string;
        url: string;
    };
};

type Action = {
    updatePerson: (
        _id: State["_id"],
        firstName: State["firstName"],
        lastName: State["lastName"],
        email: State["email"],
        avatar?: State["avatar"],
    ) => void;
};

export const usePersonStore = create<State & Action>((set) => ({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: { publicId: "", url: "" },
    updatePerson: (_id, firstName, lastName, email, avatar) =>
        set(() => ({ _id, firstName, lastName, email, avatar })),
}));

export interface User extends LoginData {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    refreshToken?: string;
    avatar?: {
        publicId: string;
        url: string;
    };
    Delete: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

export interface LoginData {
    email: string;
    password: string;
    success: boolean;
    data: User;
}

export interface RegisterData extends User {
    confirmPassword: string;
}

export interface TokenResponse extends LoginData {
    accessToken: string;
    refreshToken: string;
}

export interface Pet {
    _id: string;
    petName: string;
    petType: string;
    petBread: string;
    petDescription: string;
    price: number;
    isFree: boolean;
    isAdopted: boolean;
    diseases: string;
    petImages: PetImage[];
    owner: string;
    created_at: string;
    updated_at: string;
    __v: number;
    data: any;
}

export interface PetImage {
    publicId: string;
    url: string;
    _id: string;
}

export interface Blog extends LoginData {
    _id: string;
    title: string;
    content: string;
    category: string[];
    likes: string[];
    coverImage: { publicId: string; url: string };
    userDetails: User;
    data: any;
}
