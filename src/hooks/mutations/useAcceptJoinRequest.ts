import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRequestApi } from "@/lib/api/join-request.api";
import { toast } from "sonner";

export function useAcceptJoinRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: joinRequestApi.acceptJoinRequest,
        onSuccess: () => {
            toast.success("Join request accepted successfully");
            queryClient.invalidateQueries({ queryKey: ["my-travel-plans"] });
            queryClient.invalidateQueries({ queryKey: ["travel-plan-requests"] });
        },
        onError: () => {
            toast.error("Failed to accept join request");
        },
    });
}
