import { useQuery } from "@tanstack/react-query";
import { joinRequestApi } from "@/lib/api/join-request.api";

export function useGetMyJoinRequests() {
    return useQuery({
        queryKey: ["my-join-requests"],
        queryFn: joinRequestApi.getMyJoinRequests,
    });
}
