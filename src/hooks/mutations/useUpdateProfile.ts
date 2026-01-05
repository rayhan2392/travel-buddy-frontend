import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { updateUser } = useAuth();

    return useMutation({
        mutationFn: (data: FormData) => {
            return authApi.updateProfile(data);
        },
        onSuccess: (response) => {
            toast.success("Profile updated successfully!");
            // Update user in context
            if (response.data) {
                updateUser(response.data);
            }
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const message = error.response?.data?.message || "Failed to update profile. Please try again.";
            toast.error(message);
        },
    });
}
