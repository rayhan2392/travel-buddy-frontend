"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1, BodyLarge } from "@/components/ui/typography";
import { CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        // Refetch user data to get updated isVerified status
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success("Payment successful! You are now a verified member.");
    }, [queryClient]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <H1 className="mb-4 text-green-600 dark:text-green-400">Payment Successful!</H1>

                    <BodyLarge className="text-muted-foreground mb-8">
                        Congratulations! Your payment has been processed successfully.
                        You are now a verified member of Travel Buddy. Your verified badge
                        will appear on your profile and across the platform.
                    </BodyLarge>

                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
                        <ul className="text-sm text-left space-y-2 max-w-md mx-auto">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>Your profile now shows the verified badge</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>Increased visibility in searches and listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>Priority support and exclusive features</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => router.push("/dashboard")}>
                            Go to Dashboard
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => router.push("/profile")}>
                            View My Profile
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
