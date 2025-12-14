import { useQuery } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";

export function useGetTravelPlans() {
    return useQuery({
        queryKey: ["travel-plans"],
        queryFn: () => travelApi.getTravelPlans(),
    });
}
