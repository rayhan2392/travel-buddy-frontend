import { useMutation, useQueryClient } from "@tanstack/react-query";
import { travelApi } from "@/lib/api/travel.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useSubmitReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ planId, rating, comment }: { planId: string; rating: number; comment: string }) =>
            travelApi.submitReview(planId, { rating, comment }),
        onSuccess: () => {
            toast.success("Review submitted successfully!");
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ["past-joined-travel-plans"] });
        },
        onError: (error: AxiosError) => {
            const message = (error?.response?.data as { message?: string })?.message || "Failed to submit review";
            toast.error(message);
        },
    });
};
