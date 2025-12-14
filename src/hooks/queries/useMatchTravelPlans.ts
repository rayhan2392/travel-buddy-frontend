import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

interface MatchParams {
    q?: string;
    startDate?: string;
    endDate?: string;
    interest?: string;
}

export const useMatchTravelPlans = (params: MatchParams) => {
    return useQuery({
        queryKey: ["match-travel-plans", params],
        queryFn: async () => {
            const response = await travelApi.matchTravelPlans(params);
            return response.data;
        },
        enabled: !!(params.q || params.startDate || params.endDate || params.interest), // Only fetch if at least one param is provided
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
