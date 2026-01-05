import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRequestApi } from "@/lib/api/join-request.api";
import { toast } from "sonner";

export function useRejectJoinRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: joinRequestApi.rejectJoinRequest,
        onSuccess: () => {
            toast.success("Join request rejected");
            queryClient.invalidateQueries({ queryKey: ["my-travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["travel-plan-requests"] });
        },
        onError: () => {
            toast.error("Failed to reject join request");
        },
    });
}
