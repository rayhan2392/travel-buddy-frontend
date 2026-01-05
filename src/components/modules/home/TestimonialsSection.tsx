import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
    name: string;
    location: string;
    rating: number;
    text: string;
    gradient: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Johnson",
        location: "New York, USA",
        rating: 5,
        text: "Found an amazing travel buddy for my Southeast Asia trip! We had similar interests and it made the journey so much better. Highly recommend!",
        gradient: "from-blue-500 to-purple-500"
    },
    {
        name: "Michael Chen",
        location: "Singapore",
        rating: 5,
        text: "As a solo traveler, this platform gave me confidence to explore new places. Met wonderful people and created lifelong friendships.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "Emma Williams",
        location: "London, UK",
        rating: 5,
        text: "The verification system made me feel safe. Found a great group for my Iceland adventure. Already planning our next trip together!",
        gradient: "from-violet-500 to-indigo-500"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-violet-50/50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-pink-200 shadow-md">
                        <Heart className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-semibold text-pink-700">Success Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Traveler <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Stories</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        Hear from travelers who found their perfect companions
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-violet-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden"
                        >
                            {/* Quote icon decoration */}
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <Quote className="w-16 h-16 text-violet-600" />
                            </div>

                            <CardHeader className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className={`w-14 h-14 ring-2 ring-white shadow-lg`}>
                                        <AvatarFallback className={`bg-gradient-to-br ${testimonial.gradient} text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
                                            {testimonial.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm font-medium text-gray-600">
                                            {testimonial.location}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                                            style={{ transitionDelay: `${i * 50}ms` }}
                                        />
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="relative z-10">
                                <p className="text-gray-700 leading-relaxed italic">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>
                            </CardContent>

                            {/* Bottom gradient indicator */}
                            <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${testimonial.gradient} group-hover:w-full transition-all duration-500 rounded-t-full`} />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
