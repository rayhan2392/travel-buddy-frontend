"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1, BodyLarge } from "@/components/ui/typography";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentFailPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50/50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <H1 className="mb-4 text-red-600 dark:text-red-400">Payment Failed</H1>

                    <BodyLarge className="text-muted-foreground mb-8">
                        We&apos;re sorry, but your payment could not be processed.
                        This might be due to insufficient funds, incorrect card details,
                        or a temporary issue with the payment gateway.
                    </BodyLarge>

                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            What to do next?
                        </h3>
                        <ul className="text-sm text-left space-y-2 max-w-md mx-auto">
                            <li>• Check your card details and try again</li>
                            <li>• Ensure you have sufficient balance</li>
                            <li>• Try a different payment method</li>
                            <li>• Contact your bank if the issue persists</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/pricing">
                            <Button size="lg">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" onClick={() => router.push("/dashboard")}>
                            Go to Dashboard
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
