import { FeatureCard } from "@/components/ui/feature-card";
import { Users, Calendar, Heart, LucideIcon } from "lucide-react";

interface Step {
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

const steps: Step[] = [
    {
        step: "01",
        title: "Create Your Profile",
        description: "Sign up and tell us about your travel interests, preferences, and dream destinations.",
        icon: Users
    },
    {
        step: "02",
        title: "Create Travel Plan",
        description: "Share your upcoming trip details including destination, dates, budget, and travel style.",
        icon: Calendar
    },
    {
        step: "03",
        title: "Find & Connect",
        description: "Match with compatible travelers and start planning your adventure together.",
        icon: Heart
    }
];

export function HowItWorksSection() {
    return (
        <section className="section-padding bg-background">
            <div className="container-wide px-4">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">How It Works</h2>
                    <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                        Start your journey in three simple steps
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((item) => (
                        <div key={item.step} className="group">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-xl shadow-lg">
                                    {item.step}
                                </span>
                            </div>
                            <FeatureCard
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                variant="elevated"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
