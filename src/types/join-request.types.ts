export type JoinRequestStatus = "pending" | "approved" | "rejected";

export interface JoinRequest {
    _id: string;
    user: string | {
        _id: string;
        fullName: string;
        email: string;
        profileImage?: string;
    };
    travelPlan: string | {
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
        };
        startDate: string;
        endDate: string;
        travelType: string;
        description: string;
        participants: string[];
        createdAt: string;
        updatedAt: string;
    };
    status: JoinRequestStatus;
    createdAt: string;
    updatedAt: string;
}

export interface JoinRequestResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: JoinRequest;
}

export interface JoinRequestsListResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: JoinRequest[];
}
