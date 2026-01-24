import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy - Travel Buddy",
    description: "Learn how Travel Buddy collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <section className="section-padding-sm bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="container-wide px-4 relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm shadow-xl">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-violet-100 max-w-3xl mx-auto">
                        Last updated: January 24, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container-wide px-4">
                    <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                        <h2>Introduction</h2>
                        <p>
                            At Travel Buddy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully.
                        </p>

                        <h2>Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>
                            When you register for an account, we collect information such as:
                        </p>
                        <ul>
                            <li>Name and email address</li>
                            <li>Profile picture (optional)</li>
                            <li>Location and travel preferences</li>
                            <li>Biography and interests</li>
                            <li>Travel history and reviews</li>
                        </ul>

                        <h3>Usage Information</h3>
                        <p>
                            We automatically collect certain information when you use our platform, including:
                        </p>
                        <ul>
                            <li>Device information and IP address</li>
                            <li>Browser type and operating system</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Search queries and interactions with other users</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, prevent, and address fraud and abuse</li>
                        </ul>

                        <h2>Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul>
                            <li><strong>Other Users:</strong> Your profile information is visible to other users based on your privacy settings</li>
                            <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access and update your personal information</li>
                            <li>Delete your account and associated data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Request a copy of your data</li>
                            <li>Object to certain data processing activities</li>
                        </ul>

                        <h2>Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar tracking technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookies through your browser settings.
                        </p>

                        <h2>Children&apos;s Privacy</h2>
                        <p>
                            Our services are not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.
                        </p>

                        <h2>International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
                        </p>

                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul>
                            <li>Email: privacy@travelbuddy.com</li>
                            <li>Phone: +1 (234) 567-890</li>
                            <li>Address: 123 Travel Street, San Francisco, CA 94102</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
