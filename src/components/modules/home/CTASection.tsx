import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-violet-600 to-violet-800 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold">
                        Ready to Start Your Next Adventure?
                    </h2>
                    <p className="text-xl text-violet-100">
                        Join thousands of travelers finding their perfect companions.
                        Your next great journey is just a match away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            <Users className="w-5 h-5 mr-2" />
                            Get Started Free
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent hover:bg-white/10 text-white border-white">
                            View All Destinations
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
