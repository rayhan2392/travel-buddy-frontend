import { Users, Globe, Heart, Star, LucideIcon } from "lucide-react";

interface Stat {
    number: string;
    label: string;
    icon: LucideIcon;
    gradient: string;
}

const stats: Stat[] = [
    { number: "10,000+", label: "Active Travelers", icon: Users, gradient: "from-blue-500 to-blue-600" },
    { number: "85+", label: "Countries Covered", icon: Globe, gradient: "from-green-500 to-green-600" },
    { number: "5,000+", label: "Successful Matches", icon: Heart, gradient: "from-pink-500 to-pink-600" },
    { number: "4.8/5", label: "Average Rating", icon: Star, gradient: "from-yellow-500 to-yellow-600" }
];

export function StatsSection() {
    return (
        <section className="section-padding-sm bg-gradient-to-br from-violet-100 via-white to-blue-100 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container-wide px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-violet-300"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                        <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Number */}
                                <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>

                                {/* Label */}
                                <div className="text-base font-semibold text-gray-700">
                                    {stat.label}
                                </div>

                                {/* Bottom indicator */}
                                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.gradient} group-hover:w-3/4 transition-all duration-300 rounded-t-full`} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
