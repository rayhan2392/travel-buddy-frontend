import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { RegisterInput } from "@/types/auth.types";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export function useRegister() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterInput) => authApi.register(data),
        onSuccess: () => {
            toast.success("Registration successful! Please login to continue.");
            // Backend doesn't return token on registration, redirect to login
            router.push("/login");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const message = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(message);
        },
    });
}
