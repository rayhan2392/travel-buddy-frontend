import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

export function useJoinTravelPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => travelApi.joinTravelPlan(id),
        onSuccess: (_, id) => {
            // Invalidate and refetch the travel plan
            queryClient.invalidateQueries({ queryKey: ["travel-plan", id] });
            queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["joined-travel-plans"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error("Join travel plan error:", error.response?.data?.message);
        },
    });
}
