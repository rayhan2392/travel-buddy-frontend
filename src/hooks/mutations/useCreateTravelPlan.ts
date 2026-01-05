import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    message: string;
}

export function useCreateTravelPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => travelApi.createTravelPlan(data),
        onSuccess: () => {
            toast.success("Travel plan created successfully!");
            // Invalidate and refetch travel plans
            queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["my-travel-plans"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const message = error.response?.data?.message || "Failed to create travel plan. Please try again.";
            toast.error(message);
        },
    });
}
