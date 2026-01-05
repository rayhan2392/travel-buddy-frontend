
import { UserPlus, MapPin, Users, LucideIcon, Sparkles } from "lucide-react";

interface Step {
    step: string;
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
}

const steps: Step[] = [
    {
        step: "01",
        title: "Create Your Profile",
        description: "Sign up and tell us about your travel interests, preferences, and dream destinations.",
        icon: UserPlus,
        gradient: "from-blue-500 to-blue-600"
    },
    {
        step: "02",
        title: "Create Travel Plan",
        description: "Share your upcoming trip details including destination, dates, budget, and travel style.",
        icon: MapPin,
        gradient: "from-purple-500 to-purple-600"
    },
    {
        step: "03",
        title: "Find & Connect",
        description: "Match with compatible travelers and start planning your adventure together.",
        icon: Users,
        gradient: "from-violet-500 to-violet-600"
    }
];

export function HowItWorksSection() {
    return (
        <section className="section-padding bg-gradient-to-br from-white via-purple-50/30 to-blue-50/50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-12 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-12 w-72 h-72 bg-violet-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container-wide px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-violet-200 shadow-md">
                        <Sparkles className="w-4 h-4 text-violet-600" />
                        <span className="text-sm font-semibold text-violet-700">Simple Process</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        How It <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Works</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        Start your journey in three simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((item, index) => (
                        <div key={item.step} className="group relative">
                            {/* Connecting line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-violet-300 to-transparent z-0" />
                            )}

                            <div className="relative z-10">
                                <div className="mb-6 flex items-center justify-center">
                                    <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                        <span className="text-white font-bold text-2xl">{item.step}</span>
                                        <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-all duration-300" />
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-violet-300 group-hover:-translate-y-2">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
