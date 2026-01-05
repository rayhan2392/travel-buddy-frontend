import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { joinRequestApi } from "@/lib/api/join-request.api";
import { toast } from "sonner";

export function useCreateJoinRequest() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (travelPlanId: string) => joinRequestApi.createJoinRequest(travelPlanId),
        onSuccess: () => {
            toast.success("Join request sent successfully!");
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["travel-plan"] });
            queryClient.invalidateQueries({ queryKey: ["my-join-requests"] });
            // Redirect to my requests page
            router.push("/my-requests");
        },
        onError: (error: unknown) => {
            const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to send join request. Please try again.";
            toast.error(message);
        },
    });
}
