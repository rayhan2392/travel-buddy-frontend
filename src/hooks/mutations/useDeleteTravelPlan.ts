import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteTravelPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: string) => travelApi.deleteTravelPlan(planId),
        onSuccess: () => {
            toast.success("Travel plan deleted successfully!");
            // Invalidate travel plans queries
            queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["my-travel-plans"] });
        },
        onError: (error: AxiosError) => {
            const message = (error?.response?.data as { message?: string })?.message || "Failed to delete travel plan";
            toast.error(message);
        },
    });
};
