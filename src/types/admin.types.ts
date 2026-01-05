export interface AdminStats {
    verifiedTravelers: number;
    totalTravelPlans: number;
    totalReviews: number;
}

export interface AdminStatsResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: AdminStats;
}
