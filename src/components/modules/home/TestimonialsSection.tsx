import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
    name: string;
    location: string;
    rating: number;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Johnson",
        location: "New York, USA",
        rating: 5,
        text: "Found an amazing travel buddy for my Southeast Asia trip! We had similar interests and it made the journey so much better. Highly recommend!"
    },
    {
        name: "Michael Chen",
        location: "Singapore",
        rating: 5,
        text: "As a solo traveler, this platform gave me confidence to explore new places. Met wonderful people and created lifelong friendships."
    },
    {
        name: "Emma Williams",
        location: "London, UK",
        rating: 5,
        text: "The verification system made me feel safe. Found a great group for my Iceland adventure. Already planning our next trip together!"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Traveler Stories</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Hear from travelers who found their perfect companions
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                        <CardDescription className="text-sm">{testimonial.location}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{testimonial.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
