import { useQuery } from "@tanstack/react-query";
import { joinRequestApi } from "@/lib/api/join-request.api";

export function useGetTravelPlanRequests(travelPlanId: string, status?: string) {
    return useQuery({
        queryKey: ["travel-plan-requests", travelPlanId, status],
        queryFn: () => joinRequestApi.getTravelPlanRequests(travelPlanId, status),
        enabled: !!travelPlanId,
    });
}
