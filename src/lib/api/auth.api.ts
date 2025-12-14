import { axiosInstance } from "@/lib/axios";
import { RegisterResponse, AuthResponse, RegisterInput, LoginInput } from "@/types/auth.types";
import { User } from "@/types/auth.types";

interface UsersResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: User[];
}

export const authApi = {
    // Register new user
    register: async (data: RegisterInput): Promise<RegisterResponse> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...registerData } = data;
        const response = await axiosInstance.post("/user/register", registerData);
        return response.data;
    },

    // Login user
    login: async (data: LoginInput): Promise<AuthResponse> => {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    },

    // Get current user profile
    getMe: async () => {
        const response = await axiosInstance.get("/user/me");
        return response.data;
    },

    // Update user profile
    updateProfile: async (data: FormData) => {
        console.log("API: Sending PATCH request to /user/me");
        const response = await axiosInstance.patch("/user/me", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("API: Response received:", response.data);
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await axiosInstance.post("/auth/logout");
        return response.data;
    },

    // Get all users
    getAllUsers: async (): Promise<UsersResponse> => {
        const response = await axiosInstance.get("/user");
        return response.data;
    },

    // Get user by ID
    getUserById: async (id: string) => {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data;
    },
};
