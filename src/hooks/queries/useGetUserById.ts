import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export const useGetUserById = (id: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const response = await authApi.getUserById(id);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
