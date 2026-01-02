import { BadgeCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
    className?: string;
    showTooltip?: boolean;
    size?: "sm" | "md" | "lg";
}

export function VerifiedBadge({ className, showTooltip = true, size = "md" }: VerifiedBadgeProps) {
    const sizeClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    const badge = (
        <BadgeCheck
            className={cn(
                "text-blue-500 fill-blue-100 dark:fill-blue-950",
                sizeClasses[size],
                className
            )}
        />
    );

    if (!showTooltip) {
        return badge;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {badge}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Verified Member</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
