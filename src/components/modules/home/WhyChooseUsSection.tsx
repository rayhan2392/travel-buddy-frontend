import { Shield, Globe, Users, MapPin, LucideIcon, Award } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    bgColor: string;
}

const features: Feature[] = [
    {
        icon: Shield,
        title: "Verified Travelers",
        description: "All users are verified with reviews and ratings for your safety",
        gradient: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        icon: Globe,
        title: "Global Community",
        description: "Connect with travelers from around the world heading anywhere",
        gradient: "from-green-500 to-green-600",
        bgColor: "bg-green-50"
    },
    {
        icon: Users,
        title: "Smart Matching",
        description: "Advanced algorithm finds compatible travel companions for you",
        gradient: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50"
    },
    {
        icon: MapPin,
        title: "Any Destination",
        description: "Find buddies for any destination, from cities to remote adventures",
        gradient: "from-violet-500 to-violet-600",
        bgColor: "bg-violet-50"
    }
];

export function WhyChooseUsSection() {
    return (
        <section className="section-padding bg-gradient-to-br from-violet-50 via-white to-blue-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container-wide px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-blue-200 shadow-md">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Why Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Why Choose <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Travel Buddy</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        The most trusted platform for finding travel companions worldwide
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 hover:-translate-y-2"
                        >
                            {/* Icon container */}
                            <div className="flex justify-center mb-6">
                                <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    <feature.icon className="w-10 h-10 text-white" />
                                    <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-all duration-300" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover indicator */}
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${feature.gradient} group-hover:w-3/4 transition-all duration-300 rounded-t-full`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
