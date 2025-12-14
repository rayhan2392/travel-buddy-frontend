"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                            <AlertCircle className="w-10 h-10 text-destructive" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Something went wrong!</CardTitle>
                    <CardDescription>
                        We encountered an unexpected error. Please try again.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error.message && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                            <p className="font-medium mb-1">Error Details:</p>
                            <p className="text-xs">{error.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={reset}
                            className="flex-1"
                            variant="default"
                        >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                        <Button
                            onClick={() => window.location.href = "/"}
                            className="flex-1"
                            variant="outline"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
