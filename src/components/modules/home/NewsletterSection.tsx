"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubscribed(true);
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
        setIsSubmitting(false);

        // Reset subscription state after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
    };

    return (
        <section className="section-padding bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
            </div>

            <div className="container-wide px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm shadow-xl">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Stay Updated with Travel Tips
                    </h2>
                    <p className="text-xl text-violet-100 mb-10 leading-relaxed">
                        Subscribe to our newsletter and get exclusive travel guides, destination recommendations,
                        and special offers delivered to your inbox every week.
                    </p>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 h-14 px-6 text-base bg-white/95 backdrop-blur-sm border-2 border-white/50 focus:border-white shadow-lg text-gray-900 placeholder:text-gray-500"
                                disabled={isSubmitting || isSubscribed}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting || isSubscribed}
                                className="h-14 px-8 bg-white text-violet-600 hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                {isSubscribed ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        Subscribed!
                                    </>
                                ) : isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 mr-2 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Subscribe
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Trust indicators */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-violet-100 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>No spam, ever</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Unsubscribe anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>5,000+ subscribers</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
