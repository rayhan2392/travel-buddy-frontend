import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PricingPlan } from "@/types/subscription.types";
import { cn } from "@/lib/utils";

interface PricingCardProps {
    plan: PricingPlan;
    onSubscribe: () => void;
    isLoading?: boolean;
}

export function PricingCard({ plan, onSubscribe, isLoading }: PricingCardProps) {
    return (
        <Card
            className={cn(
                "relative p-8 flex flex-col",
                plan.popular && "border-primary shadow-lg scale-105"
            )}
        >
            {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Most Popular
                </Badge>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">৳{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                </div>
                {plan.discount && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                        Save {plan.discount}% with yearly plan
                    </p>
                )}
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <Button
                onClick={onSubscribe}
                disabled={isLoading}
                className="w-full"
                size="lg"
                variant={plan.popular ? "default" : "outline"}
            >
                {isLoading ? "Processing..." : "Subscribe Now"}
            </Button>
        </Card>
    );
}
