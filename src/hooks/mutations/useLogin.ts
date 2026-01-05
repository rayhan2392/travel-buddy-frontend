import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { LoginInput } from "@/types/auth.types";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useLogin() {
    const router = useRouter();
    const { login } = useAuth();

    return useMutation({
        mutationFn: (data: LoginInput) => authApi.login(data),
        onSuccess: (response) => {
            // Cookie is set by backend, just update user state
            if (response.data?.user) {
                login(response.data.user);
                toast.success("Welcome back! Login successful.");

                // Redirect based on user role
                if (response.data.user.role === "admin") {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/dashboard");
                }
            }
        },
        onError: (error: AxiosError) => {
            const message = (error?.response?.data as { message?: string })?.message || "Login failed. Please try again.";
            toast.error(message);
        },
    });
}
