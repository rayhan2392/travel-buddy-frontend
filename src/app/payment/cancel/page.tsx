"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H1, BodyLarge } from "@/components/ui/typography";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-950 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>

                    <H1 className="mb-4 text-yellow-600 dark:text-yellow-400">Payment Cancelled</H1>

                    <BodyLarge className="text-muted-foreground mb-8">
                        You have cancelled the payment process. No charges were made to your account.
                        If you&apos;d like to become a verified member, you can try again anytime.
                    </BodyLarge>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold mb-2">Why become verified?</h3>
                        <ul className="text-sm text-left space-y-2 max-w-md mx-auto">
                            <li>• Build trust with other travelers</li>
                            <li>• Stand out with a verified badge</li>
                            <li>• Get priority support</li>
                            <li>• Access exclusive features</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/pricing">
                            <Button size="lg">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                View Plans
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
