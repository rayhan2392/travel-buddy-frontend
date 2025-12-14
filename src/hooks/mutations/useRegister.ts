import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { RegisterInput } from "@/types/auth.types";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export function useRegister() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterInput) => authApi.register(data),
        onSuccess: () => {
            // Backend doesn't return token on registration, redirect to login
            router.push("/login");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            // Error handling is done in the component
            console.error("Registration error:", error.response?.data?.message);
        },
    });
}
