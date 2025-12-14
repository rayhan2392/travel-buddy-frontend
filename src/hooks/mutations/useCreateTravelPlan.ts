import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

export function useCreateTravelPlan() {
    const queryClient = useQueryClient();

    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: (data: any) => travelApi.createTravelPlan(data),
        onSuccess: () => {
            // Invalidate and refetch travel plans
            queryClient.invalidateQueries({ queryKey: ["travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["my-travel-plans"] });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            console.error("Create travel plan error:", error.response?.data?.message);
        },
    });
}
