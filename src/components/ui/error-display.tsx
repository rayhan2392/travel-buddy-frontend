"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorDisplayProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    fullScreen?: boolean;
}

export function ErrorDisplay({
    title = "Something went wrong",
    message = "An unexpected error occurred. Please try again.",
    onRetry,
    fullScreen = false,
}: ErrorDisplayProps) {
    const content = (
        <Card className={fullScreen ? "w-full max-w-md" : ""}>
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                    </div>
                </div>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription>{message}</CardDescription>
            </CardHeader>
            {onRetry && (
                <CardContent>
                    <Button
                        onClick={onRetry}
                        className="w-full"
                        variant="default"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                </CardContent>
            )}
        </Card>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-background p-4">
                {content}
            </div>
        );
    }

    return <div className="flex items-center justify-center p-8">{content}</div>;
}
