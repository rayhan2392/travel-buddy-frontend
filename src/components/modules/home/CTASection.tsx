import { Button } from "@/components/ui/button";
import { Users, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-violet-600 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">Join Our Community</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        Ready to Start Your Next
                        <span className="block mt-2">Adventure?</span>
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of travelers finding their perfect companions.
                        Your next great journey is just a match away.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link href="/find-buddy">
                            <Button
                                size="lg"
                                className="text-lg px-10 py-6 bg-white text-violet-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                            >
                                <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-10 py-6 bg-transparent hover:bg-white/20 text-white border-2 border-white hover:border-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                            >
                                <Compass className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                View All Destinations
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
