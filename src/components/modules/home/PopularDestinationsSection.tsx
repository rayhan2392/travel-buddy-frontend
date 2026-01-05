import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, MapPin } from "lucide-react";
import Image from "next/image";

interface Destination {
    name: string;
    country: string;
    travelers: string;
    image: string;
    gradient: string;
}

const destinations: Destination[] = [
    { name: "Paris", country: "France", travelers: "142", image: "/destinations/paris.jpg", gradient: "from-blue-400 to-purple-500" },
    { name: "Tokyo", country: "Japan", travelers: "128", image: "/destinations/tokyo.avif", gradient: "from-pink-400 to-red-500" },
    { name: "Bali", country: "Indonesia", travelers: "156", image: "/destinations/Bali.avif", gradient: "from-green-400 to-teal-500" },
    { name: "New York", country: "USA", travelers: "98", image: "/destinations/newyork.avif", gradient: "from-yellow-400 to-orange-500" },
    { name: "Barcelona", country: "Spain", travelers: "89", image: "/destinations/Barcelona.avif", gradient: "from-orange-400 to-pink-500" },
    { name: "Dubai", country: "UAE", travelers: "112", image: "/destinations/dubai.avif", gradient: "from-purple-400 to-indigo-500" }
];

export function PopularDestinationsSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-violet-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-purple-200 shadow-md">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700">Trending Now</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Popular <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Destinations</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        Discover where travelers are heading next
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {destinations.map((destination, index) => (
                        <Card
                            key={index}
                            className="group overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-violet-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 bg-white/80 backdrop-blur-sm"
                        >
                            {/* Image area */}
                            <div className={`relative aspect-video bg-gradient-to-br ${destination.gradient} flex items-center justify-center overflow-hidden`}>
                                {(destination.image.startsWith('http') || destination.image.startsWith('/')) ? (
                                    <Image
                                        src={destination.image}
                                        alt={`${destination.name}, ${destination.country}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300" />
                                        <span className="relative z-10 text-7xl group-hover:scale-110 transition-transform duration-300">
                                            {destination.image}
                                        </span>
                                    </>
                                )}
                                {/* Overlay badge */}
                                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md z-10">
                                    <Users className="w-3.5 h-3.5 text-violet-600" />
                                    <span className="text-sm font-bold text-gray-900">{destination.travelers}</span>
                                </div>
                            </div>

                            {/* Card content */}
                            <CardHeader className="p-5">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl font-bold mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                            {destination.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center text-gray-600 font-medium">
                                            <MapPin className="w-4 h-4 mr-1.5 text-violet-500" />
                                            {destination.country}
                                        </CardDescription>
                                    </div>
                                </div>
                                {/* Bottom indicator */}
                                <div className={`mt-4 h-1 w-0 bg-gradient-to-r ${destination.gradient} group-hover:w-full transition-all duration-300 rounded-full`} />
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
