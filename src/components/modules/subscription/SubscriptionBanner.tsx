"use client";

import { Button } from "@/components/ui/button";
import { X, Crown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SubscriptionBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-3 gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <Crown className="w-5 h-5 shrink-0" />
                        <p className="text-sm md:text-base">
                            <strong>Get Verified!</strong> Unlock premium features and stand out to other travelers.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/pricing">
                            <Button size="sm" variant="secondary" className="shrink-0">
                                View Plans
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="shrink-0 hover:bg-white/20"
                            onClick={() => setIsVisible(false)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
