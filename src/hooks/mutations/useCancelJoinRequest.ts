import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRequestApi } from "@/lib/api/join-request.api";
import { toast } from "sonner";

export function useCancelJoinRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: joinRequestApi.cancelJoinRequest,
        onSuccess: () => {
            toast.success("Join request cancelled successfully");
            queryClient.invalidateQueries({ queryKey: ["my-join-requests"] });
        },
        onError: () => {
            toast.error("Failed to cancel join request");
        },
    });
}
