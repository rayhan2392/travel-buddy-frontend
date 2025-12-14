import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const response = await authApi.getAllUsers();
            // Filter to only return users with role="user"
            return response.data.filter((user) => user.role === "user");
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
