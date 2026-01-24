import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
}

export function useJoinTravelPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => travelApi.joinTravelPlan(id),
        onSuccess: (_, id) => {
            toast.success("Successfully joined the travel plan!");
            // Invalidate and refetch the travel plan
            queryClient.invalidateQueries({ queryKey: ["travel-plan", id] });
            queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["joined-travel-plans"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const message = error.response?.data?.message || "Failed to join travel plan. Please try again.";
            toast.error(message);
        },
    });
}
