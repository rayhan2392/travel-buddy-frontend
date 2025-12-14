import { FeatureCard } from "@/components/ui/feature-card";
import { Shield, Globe, Star, MapPin, LucideIcon } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Shield,
        title: "Verified Travelers",
        description: "All users are verified with reviews and ratings for your safety"
    },
    {
        icon: Globe,
        title: "Global Community",
        description: "Connect with travelers from around the world heading anywhere"
    },
    {
        icon: Star,
        title: "Smart Matching",
        description: "Advanced algorithm finds compatible travel companions for you"
    },
    {
        icon: MapPin,
        title: "Any Destination",
        description: "Find buddies for any destination, from cities to remote adventures"
    }
];

export function WhyChooseUsSection() {
    return (
        <section className="section-padding bg-muted/30">
            <div className="container-wide px-4">
                <div className="text-center mb-16">
                    <h2 className="text-h2 mb-4">Why Choose Travel Buddy</h2>
                    <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                        The most trusted platform for finding travel companions worldwide
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            variant="default"
                            className="text-center [&_h3]:text-center [&_p]:text-center"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
