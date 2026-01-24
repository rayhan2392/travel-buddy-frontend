"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "How does Travel Buddy work?",
        answer: "Travel Buddy connects you with like-minded travelers heading to the same destination. Simply create a profile, share your travel plans, and browse through potential travel companions. You can send join requests and start planning your adventure together!"
    },
    {
        question: "Is Travel Buddy safe?",
        answer: "Yes! We take safety seriously. All users can verify their accounts, and we have a comprehensive review and rating system. You can read reviews from other travelers before connecting, and we recommend always meeting in public places and following safety guidelines."
    },
    {
        question: "How much does it cost?",
        answer: "Creating an account and browsing travelers is completely free! We offer a verified membership at $4.99/month or $53.89/year which gives you a verified badge, increased visibility, and priority support. This helps build trust in the community."
    },
    {
        question: "Can I travel solo and still use this platform?",
        answer: "Absolutely! Many solo travelers use Travel Buddy to find companions for specific activities, share accommodation costs, or just meet up for meals. You can specify your travel style and preferences to find the perfect match."
    },
    {
        question: "What if I need to cancel my travel plans?",
        answer: "You can update or delete your travel plans at any time from your dashboard. If you've connected with other travelers, we recommend communicating with them directly about any changes. You can also leave your plans in the system but mark them as closed to new requests."
    },
    {
        question: "How do I get verified?",
        answer: "To get verified, upgrade to our premium membership. The verified badge appears on your profile and helps build trust with other travelers. Verified members also get increased visibility in search results and access to exclusive features."
    },
    {
        question: "Can I search for travel buddies in specific destinations?",
        answer: "Yes! Our advanced search and filtering system lets you find travelers by destination, travel dates, budget, interests, and more. You can also browse all active travel plans and see who's heading where."
    },
    {
        question: "What happens after I join a travel plan?",
        answer: "Once your join request is accepted by the trip host, you'll gain access to full trip details and can communicate directly with other participants. You can view all your joined trips in your dashboard under 'Joined Trips' or 'Upcoming Trips'."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section-padding bg-gradient-to-b from-white to-violet-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container-wide px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-violet-200 shadow-md">
                        <HelpCircle className="w-4 h-4 text-violet-600" />
                        <span className="text-sm font-semibold text-violet-700">Got Questions?</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Frequently Asked <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">Questions</span>
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                        Everything you need to know about Travel Buddy
                    </p>
                </div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-violet-50/50 transition-all duration-200 group"
                            >
                                <span className={`font-semibold text-lg pr-4 transition-colors duration-200 ${openIndex === index
                                        ? 'text-violet-600'
                                        : 'text-gray-900 group-hover:text-violet-600'
                                    }`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${openIndex === index
                                            ? 'transform rotate-180 text-violet-600'
                                            : 'text-gray-500 group-hover:text-violet-600'
                                        }`}
                                />
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <HelpCircle className="w-5 h-5" />
                        Contact Support
                    </a>
                </div>
            </div>
        </section>
    );
}
