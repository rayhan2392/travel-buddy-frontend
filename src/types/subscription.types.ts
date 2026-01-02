export type SubscriptionPlan = "MONTHLY" | "YEARLY";

export interface InitiatePaymentRequest {
    amount: number;
    subscriptionPlan: SubscriptionPlan;
}

export interface PaymentResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        paymentUrl: string;
        transactionId: string;
    };
}

export interface PricingPlan {
    id: SubscriptionPlan;
    name: string;
    price: number;
    duration: string;
    discount?: number;
    features: string[];
    popular?: boolean;
}
