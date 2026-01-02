export interface TravelPlan {
    _id: string;
    destination: {
        country: string;
        city: string;
    };
    budgetRange: {
        min: number;
        max: number;
    };
    categories: string[];
    host: {
        _id: string;
        fullName: string;
        email: string;
        profileImage?: string;
        isVerified?: boolean;
    };
    startDate: string;
    endDate: string;
    travelType: "Solo" | "Friends" | "Family" | "Couple";
    description: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
}

export interface TravelPlansResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: TravelPlan[];
}

export interface SingleTravelPlanResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: TravelPlan;
}
