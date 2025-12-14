import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Search } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-background section-padding animate-fade-in">
            <div className="container-narrow px-4">
                <div className="text-center space-y-8">
                    <Badge variant="secondary" className="mb-4">
                        <Plane className="w-3 h-3 mr-1" />
                        Travel Smarter, Together
                    </Badge>
                    <h1 className="text-display">
                        Find Your Perfect
                        <span className="text-gradient-primary block mt-2">Travel Companion</span>
                    </h1>
                    <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect with like-minded travelers heading to your dream destination.
                        Share adventures, split costs, and create unforgettable memories together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="text-lg px-8 elevation-md hover:elevation-lg transition-all">
                            <Search className="w-5 h-5 mr-2" />
                            Find Travel Buddies
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8">
                            How It Works
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
