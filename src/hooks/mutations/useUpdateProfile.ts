import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { updateUser } = useAuth();

    return useMutation({
        mutationFn: (data: FormData) => {
            console.log("Mutation: Calling authApi.updateProfile");
            return authApi.updateProfile(data);
        },
        onSuccess: (response) => {
            console.log("Mutation: Success callback", response);
            // Update user in context
            if (response.data) {
                updateUser(response.data);
            }
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error("Mutation: Error callback", error);
            console.error("Update profile error:", error.response?.data?.message);
        },
    });
}
