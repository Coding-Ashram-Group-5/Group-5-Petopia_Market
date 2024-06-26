export interface User {
    _id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    refreshToken?: string;
    avatar?: { publicId: string; url: string };
    created_at?: string;
    updated_at?: string;
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
}

export interface RegisterData extends User {
    confirmPassword: string;
}

export interface TokenResponse {
    accessToken: string;
    data: User;
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
    userData: User;
    created_at: string;
    updated_at: string;
    __v: number;
}

interface PetImage {
    publicId: string;
    url: string;
    _id: string;
}

export interface Product {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    discount: number;
    creator: string;
    productImages: ProductImage[];
    quantity: number;
    category: string;
    ratings: Rating[];
    averageRating: number;
    data?: any;
}

interface ProductImage {
    publicId: string;
    url: string;
    _id: string;
}
export interface ProductForm {
    productName: string;
    productDescription: string;
    productPrice: number;
    discount: number;
    category: string;
    quantity: number;
    images: FileList;
    [key: string]: any;
}
interface Rating {
    userId: string;
    rating: number;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    category: string[];
    comments: Comment[];
    coverImage: { publicId: string; url: string };
    likes: string[];
    userData: BlogUser;
    data?: any;
}

interface Comment {
    _id: string;
    comment: string;
    owner: string;
    blogId: string;
    created_at: string;
    updated_at: string;
    ownerFirstName: string;
    ownerLastName: string;
}

interface BlogUser {
    _id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    refreshToken?: string;
    avatar?: { publicId: string; url: string };
    created_at: string;
    updated_at?: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
    purchasedPrice: number;
    user?: {
        name: string;
    };
    isPurchased?: boolean;
}
