import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

export const useGetUserReviews = (userId: string) => {
    return useQuery({
        queryKey: ["user-reviews", userId],
        queryFn: async () => {
            const response = await travelApi.getUserReviews(userId);
            return response.data;
        },
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
