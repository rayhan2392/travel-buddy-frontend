import { axiosInstance } from "@/lib/axios";
import { AdminStatsResponse } from "@/types/admin.types";

export const adminApi = {
    // Get admin statistics
    getStats: async (): Promise<AdminStatsResponse> => {
        const response = await axiosInstance.get("/stat");
        return response.data;
    },
};
