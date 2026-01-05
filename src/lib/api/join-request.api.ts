import { axiosInstance } from "@/lib/axios";
import { JoinRequestResponse, JoinRequestsListResponse } from "@/types/join-request.types";

export const joinRequestApi = {
    // Create a join request for a travel plan
    createJoinRequest: async (travelPlanId: string): Promise<JoinRequestResponse> => {
        const response = await axiosInstance.post(`/join-requests/travel-plan/${travelPlanId}`);
        return response.data;
    },

    // Get all join requests for the current user
    getMyJoinRequests: async (): Promise<JoinRequestsListResponse> => {
        const response = await axiosInstance.get("/join-requests/my-requests");
        return response.data;
    },

    // Cancel a join request
    cancelJoinRequest: async (requestId: string): Promise<JoinRequestResponse> => {
        const response = await axiosInstance.delete(`/join-requests/${requestId}`);
        return response.data;
    },

    // Check if user has a join request for a specific travel plan
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkJoinRequestStatus: async (_travelPlanId: string): Promise<JoinRequestsListResponse> => {
        const response = await axiosInstance.get("/join-requests/my-requests");
        return response.data;
    },

    // Get all join requests for a specific travel plan (host view)
    getTravelPlanRequests: async (travelPlanId: string, status?: string): Promise<JoinRequestsListResponse> => {
        const params = status ? { status } : {};
        const response = await axiosInstance.get(`/join-requests/travel-plan/${travelPlanId}`, { params });
        return response.data;
    },

    // Accept a join request
    acceptJoinRequest: async (requestId: string): Promise<JoinRequestResponse> => {
        const response = await axiosInstance.patch(`/join-requests/${requestId}/accept`);
        return response.data;
    },

    // Reject a join request
    rejectJoinRequest: async (requestId: string): Promise<JoinRequestResponse> => {
        const response = await axiosInstance.patch(`/join-requests/${requestId}/reject`);
        return response.data;
    },
};
