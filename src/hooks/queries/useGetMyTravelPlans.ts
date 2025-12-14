import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

export const useGetMyTravelPlans = () => {
    return useQuery({
        queryKey: ["my-travel-plans"],
        queryFn: async () => {
            const response = await travelApi.getMyTravelPlans();
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
