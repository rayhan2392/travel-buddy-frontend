import { useMutation } from "@tanstack/react-query";
import { subscriptionApi } from "@/lib/api/subscription.api";
import { InitiatePaymentRequest } from "@/types/subscription.types";
import { toast } from "sonner";

export function useInitiatePayment() {
    return useMutation({
        mutationFn: (data: InitiatePaymentRequest) => subscriptionApi.initiatePayment(data),
        onSuccess: (response) => {
            if (response.success && response.data.paymentUrl) {
                // Redirect to SSLCommerz payment page
                window.location.href = response.data.paymentUrl;
            } else {
                toast.error("Failed to initiate payment. Please try again.");
            }
        },
        onError: (error) => {
            console.error("Payment initiation error:", error);
            toast.error("Failed to initiate payment. Please try again.");
        },
    });
}
