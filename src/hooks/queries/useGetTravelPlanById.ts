import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

export function useGetTravelPlanById(id: string) {
    return useQuery({
        queryKey: ["travel-plan", id],
        queryFn: () => travelApi.getTravelPlanById(id),
        enabled: !!id,
    });
}
