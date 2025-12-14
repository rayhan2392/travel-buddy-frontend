export interface User {
    _id: string;
    fullName: string;
    email: string;
    role: "user" | "admin";
    profileImage?: string;
    photo_name?: string;
    bio?: string;
    interests?: string[];
    visitedCountries?: string[];
    currentLocation?: string;
    averageRating?: number;
    ratingCount?: number;
    isVerified?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: User & { token?: string };
}

export interface AuthResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface RegisterInput {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}
