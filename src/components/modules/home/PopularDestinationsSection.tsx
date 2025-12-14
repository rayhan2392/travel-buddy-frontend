import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface Destination {
    name: string;
    travelers: string;
    image: string;
}

const destinations: Destination[] = [
    { name: "Paris, France", travelers: "142 travelers", image: "🗼" },
    { name: "Tokyo, Japan", travelers: "128 travelers", image: "🗾" },
    { name: "Bali, Indonesia", travelers: "156 travelers", image: "🏝️" },
    { name: "New York, USA", travelers: "98 travelers", image: "🗽" },
    { name: "Barcelona, Spain", travelers: "89 travelers", image: "🏖️" },
    { name: "Dubai, UAE", travelers: "112 travelers", image: "🏜️" }
];

export function PopularDestinationsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover where travelers are heading next
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {destinations.map((destination, index) => (
                        <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="aspect-video bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-6xl">
                                {destination.image}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">{destination.name}</CardTitle>
                                <CardDescription className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    {destination.travelers}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
