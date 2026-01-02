import { axiosInstance } from "@/lib/axios";
import { InitiatePaymentRequest, PaymentResponse } from "@/types/subscription.types";

export const subscriptionApi = {
    // Initiate payment for subscription
    initiatePayment: async (data: InitiatePaymentRequest): Promise<PaymentResponse> => {
        const response = await axiosInstance.post("/payment/init-payment", data);
        return response.data;
    },
};
