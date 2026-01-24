import { Metadata } from "next";
import { Users, Globe, Heart, Target, Award, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Travel Buddy",
    description: "Learn about Travel Buddy's mission to connect travelers worldwide and create unforgettable adventures together.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="section-padding-sm bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                </div>

                <div className="container-wide px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        About Travel Buddy
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto leading-relaxed">
                        Connecting travelers worldwide to create unforgettable adventures together
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section-padding-sm">
                <div className="container-wide px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-violet-100 dark:bg-violet-950/50 rounded-full">
                                <Target className="w-5 h-5 text-violet-600" />
                                <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Our Mission</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                Making Travel More Accessible & Social
                            </h2>
                        </div>

                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                                Travel Buddy was born from a simple idea: traveling is better when shared. Whether you&apos;re a solo adventurer
                                looking for companions, someone who wants to split costs, or simply seeking like-minded travelers to explore with,
                                we&apos;re here to connect you.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                We believe that the best travel experiences come from meaningful connections. Our platform is designed to help you
                                find compatible travel partners, share incredible experiences, and create memories that last a lifetime—all while
                                making travel more affordable and accessible for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding-sm bg-gradient-to-br from-violet-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container-wide px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border-2 border-violet-200 dark:border-violet-800">
                            <Heart className="w-5 h-5 text-violet-600" />
                            <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Our Values</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold">
                            What We <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Stand For</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Users,
                                title: "Community First",
                                description: "We foster a welcoming community where travelers support and inspire each other.",
                                gradient: "from-blue-500 to-blue-600"
                            },
                            {
                                icon: Globe,
                                title: "Global Connections",
                                description: "Breaking down barriers and connecting people from all corners of the world.",
                                gradient: "from-purple-500 to-purple-600"
                            },
                            {
                                icon: Zap,
                                title: "Safety & Trust",
                                description: "Your safety is our priority with verified profiles and a comprehensive review system.",
                                gradient: "from-violet-500 to-violet-600"
                            }
                        ].map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} shadow-lg mb-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding-sm">
                <div className="container-wide px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-violet-100 dark:bg-violet-950/50 rounded-full">
                                <Award className="w-5 h-5 text-violet-600" />
                                <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Our Impact</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                                Growing <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Together</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: "10,000+", label: "Active Travelers" },
                                { value: "85+", label: "Countries" },
                                { value: "5,000+", label: "Connections Made" },
                                { value: "4.8/5", label: "Average Rating" }
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-violet-200 dark:border-violet-800"
                                >
                                    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding-sm bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600">
                <div className="container-wide px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                        Ready to Start Your Adventure?
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers already planning their next journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Get Started Free
                        </a>
                        <a
                            href="/find-buddy"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            Browse Travelers
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
