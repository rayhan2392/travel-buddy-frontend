import { BadgeCheck, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
    className?: string;
    showTooltip?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "premium" | "glow";
}

export function VerifiedBadge({
    className,
    showTooltip = true,
    size = "md",
    variant = "default"
}: VerifiedBadgeProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const containerSizeClasses = {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
    };

    // Default variant - simple blue badge
    if (variant === "default") {
        const badge = (
            <div className={cn("relative inline-flex items-center justify-center", className)}>
                <BadgeCheck
                    className={cn(
                        "text-blue-500 fill-blue-100 dark:fill-blue-950",
                        sizeClasses[size]
                    )}
                />
            </div>
        );

        if (!showTooltip) return badge;

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {badge}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-medium">Verified Member</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Premium variant - gradient with animation
    if (variant === "premium") {
        const badge = (
            <div className={cn(
                "relative inline-flex items-center justify-center rounded-full",
                "bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500",
                "shadow-lg shadow-violet-500/50",
                "animate-pulse",
                containerSizeClasses[size],
                className
            )}>
                <BadgeCheck
                    className={cn(
                        "text-white",
                        sizeClasses[size]
                    )}
                />
                {/* Sparkle effect */}
                <Sparkles className={cn(
                    "absolute -top-1 -right-1 text-yellow-400 animate-bounce",
                    size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
                )} />
            </div>
        );

        if (!showTooltip) return badge;

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {badge}
                    </TooltipTrigger>
                    <TooltipContent className="bg-gradient-to-r from-blue-600 to-violet-600 border-violet-400">
                        <p className="font-bold text-white">✨ Verified Member</p>
                        <p className="text-xs text-blue-100">Trusted by the community</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Glow variant - animated glow effect
    const badge = (
        <div className={cn(
            "relative inline-flex items-center justify-center group",
            className
        )}>
            {/* Animated glow ring */}
            <div className={cn(
                "absolute inset-0 rounded-full",
                "bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500",
                "blur-sm opacity-75 group-hover:opacity-100",
                "animate-spin-slow",
                containerSizeClasses[size]
            )} />

            {/* Badge container */}
            <div className={cn(
                "relative rounded-full bg-white shadow-lg",
                "flex items-center justify-center",
                containerSizeClasses[size]
            )}>
                <BadgeCheck
                    className={cn(
                        "text-transparent bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 bg-clip-text",
                        "fill-current",
                        sizeClasses[size]
                    )}
                />
            </div>

            {/* Animated sparkle */}
            <Sparkles className={cn(
                "absolute -top-0.5 -right-0.5 text-yellow-400",
                "animate-pulse",
                size === "sm" ? "w-2 h-2" : size === "md" ? "w-2.5 h-2.5" : "w-3 h-3"
            )} />
        </div>
    );

    if (!showTooltip) return badge;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {badge}
                </TooltipTrigger>
                <TooltipContent className="bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 border-violet-400 shadow-xl">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <div>
                            <p className="font-bold text-white">Verified Traveler</p>
                            <p className="text-xs text-violet-100">Identity confirmed</p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
