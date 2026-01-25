import { Metadata } from "next";
import { HelpCircle, Search, Users, Shield, CreditCard, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Help Center - Travel Buddy",
    description: "Find answers to common questions and get support for using Travel Buddy.",
};

export default function HelpPage() {
    const helpCategories = [
        {
            icon: Users,
            title: "Getting Started",
            description: "Learn how to create your profile and find travel buddies",
            articles: [
                "How to create an account",
                "Setting up your profile",
                "Finding compatible travelers",
                "Creating your first travel plan"
            ]
        },
        {
            icon: Shield,
            title: "Safety & Security",
            description: "Stay safe while connecting with travelers",
            articles: [
                "Safety tips for meeting travelers",
                "Verification process explained",
                "Reporting suspicious behavior",
                "Privacy settings guide"
            ]
        },
        {
            icon: CreditCard,
            title: "Payments & Subscriptions",
            description: "Manage your subscription and payments",
            articles: [
                "Subscription plans overview",
                "How to upgrade to verified",
                "Payment methods accepted",
                "Cancellation and refunds"
            ]
        },
        {
            icon: MessageSquare,
            title: "Communication",
            description: "Connect and communicate with other travelers",
            articles: [
                "Sending join requests",
                "Managing your connections",
                "Leaving reviews and ratings",
                "Messaging best practices"
            ]
        }
    ];

    const popularQuestions = [
        {
            question: "How do I verify my account?",
            answer: "Visit the Pricing page and choose a subscription plan. Once payment is processed, your account will be verified within minutes."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes, we take privacy seriously. Your email and phone number are never shared publicly. You control what information appears on your profile."
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel anytime from your account settings. Your benefits will continue until the end of your billing period."
        },
        {
            question: "How do I report a user?",
            answer: "Click the three dots on any user's profile or message and select 'Report User'. Our team reviews all reports within 24 hours."
        },
        {
            question: "What if my travel plans change?",
            answer: "You can edit or delete your travel plans anytime. We recommend notifying any travelers who have joined your plan."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="section-padding-sm bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
                </div>

                <div className="container-wide px-4 relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm shadow-xl">
                            <HelpCircle className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Help Center
                    </h1>
                    <p className="text-xl text-violet-100 max-w-3xl mx-auto mb-8">
                        Find answers, get support, and learn how to make the most of Travel Buddy
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Categories */}
            <section className="section-padding">
                <div className="container-wide px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                        Browse by <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Category</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {helpCategories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg flex-shrink-0">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.articles.map((article, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href="#"
                                                    className="text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                                                >
                                                    {article}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Questions */}
            <section className="section-padding bg-gradient-to-br from-violet-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container-wide px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                        Popular <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Questions</span>
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {popularQuestions.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md"
                            >
                                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                                    {item.question}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="section-padding">
                <div className="container-wide px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                            Still Need Help?
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                            Can&apos;t find what you are looking for? Our support team is here to help.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <Link
                                href="/contact"
                                className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Contact Support</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Get in touch with our team
                                    </p>
                                </div>
                            </Link>

                            <a
                                href="mailto:support@travelbuddy.com"
                                className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-violet-200 dark:border-violet-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        support@travelbuddy.com
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
