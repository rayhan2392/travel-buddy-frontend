import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export function useGetMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: authApi.getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });
}
