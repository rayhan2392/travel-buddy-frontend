import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

export const useGetJoinedTravelPlans = () => {
    return useQuery({
        queryKey: ["joined-travel-plans"],
        queryFn: async () => {
            const response = await travelApi.getJoinedTravelPlans();
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
