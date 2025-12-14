"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                            <MapPin className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">404 - Page Not Found</CardTitle>
                    <CardDescription className="text-base">
                        Oops! Looks like this destination doesn&apos;t exist.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground">
                        The page you&apos;re looking for might have been moved or doesn&apos;t exist.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/" className="flex-1">
                            <Button className="w-full" variant="default">
                                <Home className="w-4 h-4 mr-2" />
                                Go Home
                            </Button>
                        </Link>
                        <Button
                            onClick={() => window.history.back()}
                            className="flex-1"
                            variant="outline"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
