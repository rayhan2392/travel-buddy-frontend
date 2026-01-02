"use client";

import { useState } from "react";
import { H1, BodyLarge } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useInitiatePayment } from "@/hooks/mutations/useInitiatePayment";
import { SubscriptionPlan } from "@/types/subscription.types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Crown, Sparkles, Zap, Shield, TrendingUp, Users, BadgeCheck } from "lucide-react";

export default function PricingPage() {
    const { mutate: initiatePayment, isPending } = useInitiatePayment();
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const monthlyPrice = 499;
    const yearlyPrice = 5389;
    const yearlySavings = 599;

    const handleSubscribe = (plan: SubscriptionPlan, amount: number) => {
        if (!isAuthenticated) {
            toast.error("Please login to subscribe");
            router.push("/login");
            return;
        }

        if (user?.isVerified) {
            toast.info("You are already a verified member!");
            return;
        }

        setSelectedPlan(plan);
        initiatePayment({
            amount,
            subscriptionPlan: plan,
        });
    };

    const features = [
        { icon: BadgeCheck, text: "Verified badge on your profile", highlight: true },
        { icon: TrendingUp, text: "Increased profile visibility", highlight: true },
        { icon: Users, text: "Stand out to other travelers", highlight: false },
        { icon: Shield, text: "Build trust and credibility", highlight: false },
        { icon: Zap, text: "Priority customer support", highlight: false },
        { icon: Sparkles, text: "Access to exclusive features", highlight: false },
    ];

    const plans = [
        {
            id: "MONTHLY" as SubscriptionPlan,
            name: "Monthly Plan",
            price: monthlyPrice,
            duration: "month",
            popular: false,
        },
        {
            id: "YEARLY" as SubscriptionPlan,
            name: "Yearly Plan",
            price: yearlyPrice,
            duration: "year",
            savings: yearlySavings,
            popular: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50/50 via-white to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Header Section */}
                <div className="text-center mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
                        <Crown className="w-4 h-4" />
                        <span>Unlock Premium Features</span>
                    </div>
                    <H1 className="mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Get Verified Today
                    </H1>
                    <BodyLarge className="text-muted-foreground leading-relaxed">
                        Join thousands of verified travelers. Build trust, increase visibility,
                        and unlock exclusive features that help you connect with the perfect travel companions.
                    </BodyLarge>
                </div>

                {/* Pricing Cards - Side by Side */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {plans.map((plan) => {
                        const isLoading = isPending && selectedPlan === plan.id;
                        const isPopular = plan.popular;

                        return (
                            <Card
                                key={plan.id}
                                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl group ${isPopular
                                    ? 'border-violet-500 shadow-lg shadow-violet-500/20 scale-105 hover:scale-[1.07]'
                                    : 'hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-violet-500/10 hover:scale-105'
                                    }`}
                            >
                                {/* Gradient Background Accent */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Popular Badge */}
                                {isPopular && (
                                    <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold py-1 px-12 shadow-lg">
                                        POPULAR
                                    </div>
                                )}

                                <CardHeader className="text-center pb-6 pt-8 relative">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${isPopular
                                        ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                                        : 'bg-violet-100 dark:bg-violet-950/50'
                                        } text-white mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Crown className={`w-7 h-7 ${isPopular ? 'text-white' : 'text-violet-600 dark:text-violet-400'}`} />
                                    </div>
                                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                                    <CardDescription className="text-sm">
                                        {isPopular ? 'Best value for serious travelers' : 'Perfect for trying it out'}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="px-6 pb-6 relative">
                                    {/* Pricing */}
                                    <div className="text-center mb-6">
                                        <div className="flex items-baseline justify-center gap-2 mb-2">
                                            <span className={`text-4xl font-bold ${isPopular
                                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
                                                : 'text-foreground'
                                                }`}>
                                                ৳{plan.price}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{plan.duration}
                                            </span>
                                        </div>
                                        {plan.savings && (
                                            <div className="inline-flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-950/30 px-3 py-1 rounded-full">
                                                <Sparkles className="w-4 h-4" />
                                                Save ৳{plan.savings} per year
                                            </div>
                                        )}
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-6">
                                        {features.map((feature, idx) => {
                                            const Icon = feature.icon;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200"
                                                >
                                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.highlight
                                                        ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                                                        : 'bg-violet-100 dark:bg-violet-950/50'
                                                        }`}>
                                                        <Icon className={`w-3 h-3 ${feature.highlight
                                                            ? 'text-white'
                                                            : 'text-violet-600 dark:text-violet-400'
                                                            }`} />
                                                    </div>
                                                    <span className={`text-sm leading-relaxed ${feature.highlight
                                                        ? 'font-medium text-foreground'
                                                        : 'text-muted-foreground'
                                                        }`}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>

                                <CardFooter className="px-6 pb-6 relative">
                                    <Button
                                        size="lg"
                                        onClick={() => handleSubscribe(plan.id, plan.price)}
                                        disabled={isLoading || user?.isVerified}
                                        className={`w-full h-12 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${isPopular
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
                                            : 'bg-violet-500 hover:bg-violet-600'
                                            }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Processing...
                                            </>
                                        ) : user?.isVerified ? (
                                            <>
                                                <BadgeCheck className="w-5 h-5 mr-2" />
                                                Already Verified
                                            </>
                                        ) : (
                                            <>
                                                <Crown className="w-5 h-5 mr-2" />
                                                Get Verified Now
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Trust Badge */}
                <div className="text-center mb-12 text-sm text-muted-foreground animate-in fade-in duration-700 delay-200">
                    <div className="flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>Secure payment powered by SSLCommerz</span>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <h2 className="text-3xl font-bold text-center mb-10">Why Travelers Choose Verified</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "✓",
                                title: "Build Trust",
                                description: "Show other travelers you're a verified, trustworthy member of the community",
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                icon: "⭐",
                                title: "Stand Out",
                                description: "Get a verified badge that makes your profile stand out in searches and listings",
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                icon: "🚀",
                                title: "Priority Access",
                                description: "Get priority support and early access to new features as they launch",
                                color: "from-green-500 to-emerald-500"
                            }
                        ].map((benefit, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-violet-200 dark:hover:border-violet-800 group"
                            >
                                <CardContent className="pt-8 pb-6">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-3xl">{benefit.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

