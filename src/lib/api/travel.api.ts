import { axiosInstance } from "@/lib/axios";
import { TravelPlansResponse, SingleTravelPlanResponse } from "@/types/travel.types";

interface ReviewsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
    data: Review[];
}

interface Review {
    _id: string;
    reviewer: {
        _id: string;
        fullName: string;
        profileImage?: string;
    };
    travelPlan: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export const travelApi = {
    // Get all travel plans
    getTravelPlans: async (): Promise<TravelPlansResponse> => {
        const response = await axiosInstance.get("/travel-plans");
        return response.data;
    },

    // Get my travel plans
    getMyTravelPlans: async (): Promise<TravelPlansResponse> => {
        const response = await axiosInstance.get("/travel-plans/my");
        return response.data;
    },

    // Get joined travel plans
    getJoinedTravelPlans: async (): Promise<TravelPlansResponse> => {
        const response = await axiosInstance.get("/travel-plans/joined");
        return response.data;
    },

    // Get past joined travel plans
    getPastJoinedTravelPlans: async (): Promise<TravelPlansResponse> => {
        const response = await axiosInstance.get("/travel-plans/past-joined");
        return response.data;
    },

    // Get single travel plan
    getTravelPlanById: async (id: string): Promise<SingleTravelPlanResponse> => {
        const response = await axiosInstance.get(`/travel-plans/${id}`);
        return response.data;
    },

    // Join travel plan
    joinTravelPlan: async (id: string) => {
        const response = await axiosInstance.post(`/travel-plans/${id}/join`);
        return response.data;
    },

    // Leave travel plan
    leaveTravelPlan: async (id: string) => {
        const response = await axiosInstance.post(`/travel-plans/${id}/leave`);
        return response.data;
    },

    // Create travel plan
    createTravelPlan: async (data: Record<string, unknown>) => {
        const response = await axiosInstance.post("/travel-plans", data);
        return response.data;
    },

    // Match travel plans with filters
    matchTravelPlans: async (params: {
        q?: string;
        startDate?: string;
        endDate?: string;
        interest?: string;
    }): Promise<TravelPlansResponse> => {
        const response = await axiosInstance.get("/travel-plans/match", { params });
        return response.data;
    },

    // Get reviews for a user
    getUserReviews: async (userId: string): Promise<ReviewsResponse> => {
        const response = await axiosInstance.get(`/reviews/plan/${userId}`);
        return response.data;
    },

    // Submit a review for a travel plan
    submitReview: async (planId: string, data: { rating: number; comment: string }) => {
        const response = await axiosInstance.post(`/reviews/plan/${planId}`, data);
        return response.data;
    },

    // Delete a travel plan (admin only)
    deleteTravelPlan: async (planId: string) => {
        const response = await axiosInstance.delete(`/travel-plans/${planId}`);
        return response.data;
    },
};
