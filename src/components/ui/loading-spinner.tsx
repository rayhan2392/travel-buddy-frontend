"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

export function LoadingSpinner({ message = "Loading...", fullScreen = false }: LoadingSpinnerProps) {
    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-background p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        </div>
                        <CardDescription className="text-lg">
                            {message}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-pulse rounded-full w-3/4"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                {message && (
                    <p className="text-sm text-muted-foreground">{message}</p>
                )}
            </div>
        </div>
    );
}
