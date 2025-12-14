import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: "default" | "success" | "warning" | "info";
    className?: string;
}

const variantStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

export function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    variant = "default",
    className,
}: StatCardProps) {
    return (
        <Card className={cn("elevation-sm hover:elevation-md transition-shadow", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    {Icon && (
                        <div className={cn("p-2 rounded-lg", variantStyles[variant])}>
                            <Icon className="w-5 h-5" />
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                    {trend && (
                        <div className="flex items-center gap-1 text-sm">
                            <span
                                className={cn(
                                    "font-medium",
                                    trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                                )}
                            >
                                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                            </span>
                            <span className="text-muted-foreground">from last month</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
