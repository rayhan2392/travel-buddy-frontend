import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    iconColor?: string;
    action?: ReactNode;
    className?: string;
    variant?: "default" | "elevated" | "bordered";
}

export function FeatureCard({
    title,
    description,
    icon: Icon,
    iconColor = "text-primary",
    action,
    className,
    variant = "default",
}: FeatureCardProps) {
    const variantClasses = {
        default: "hover:elevation-md transition-shadow",
        elevated: "elevation-md hover:elevation-lg transition-shadow",
        bordered: "border-2 hover:border-primary/50 transition-colors",
    };

    return (
        <Card className={cn(variantClasses[variant], className)}>
            <CardHeader>
                {Icon && (
                    <div className={cn("w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4", iconColor)}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-base mt-2">{description}</CardDescription>
            </CardHeader>
            {action && (
                <CardContent className="pt-0">
                    {action}
                </CardContent>
            )}
        </Card>
    );
}
