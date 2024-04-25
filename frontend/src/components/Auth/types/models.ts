export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  avatar?: string;
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
  refreshToken: string;
}
