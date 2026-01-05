import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-violet-100 section-padding animate-fade-in">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
            </div>

            <div className="container-narrow px-4 relative z-10">
                <div className="text-center space-y-8">
                    <Badge
                        variant="secondary"
                        className="mb-4 bg-white/80 backdrop-blur-sm border-2 border-violet-200 text-violet-700 font-semibold px-4 py-2 hover:scale-105 transition-transform duration-200 shadow-md"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Travel Smarter, Together
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        Find Your Perfect
                        <span className="block mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                            Travel Companion
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                        Connect with like-minded travelers heading to your dream destination.
                        Share adventures, split costs, and create unforgettable memories together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link href="/find-buddy">
                            <Button
                                size="lg"
                                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                            >
                                <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                Find Buddy
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-10 py-6 border-3 border-violet-400 bg-white/80 backdrop-blur-sm hover:bg-violet-600 hover:text-white hover:border-violet-600 font-bold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
                            >
                                <Compass className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                Explore Travelers
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
