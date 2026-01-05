import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin.api";

export function useGetAdminStats() {
    return useQuery({
        queryKey: ["admin-stats"],
        queryFn: adminApi.getStats,
    });
}
