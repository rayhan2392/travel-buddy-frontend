import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service - Travel Buddy",
    description: "Read the terms and conditions for using Travel Buddy platform.",
};

export default function TermsPage() {
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
                            <FileText className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Terms of Service
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
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing and using Travel Buddy, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                        </p>

                        <h2>Use of Service</h2>
                        <h3>Eligibility</h3>
                        <p>
                            You must be at least 18 years old to use Travel Buddy. By using our platform, you represent and warrant that you meet this age requirement.
                        </p>

                        <h3>Account Registration</h3>
                        <p>To use certain features, you must register for an account. You agree to:</p>
                        <ul>
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized use</li>
                            <li>Be responsible for all activities under your account</li>
                        </ul>

                        <h2>User Conduct</h2>
                        <p>You agree NOT to:</p>
                        <ul>
                            <li>Provide false or misleading information</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Use the platform for illegal activities</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Scrape, copy, or misuse platform content</li>
                            <li>Create multiple accounts to circumvent restrictions</li>
                            <li>Spam or send unsolicited communications</li>
                        </ul>

                        <h2>Travel Plans and Connections</h2>
                        <h3>User Responsibility</h3>
                        <p>
                            Travel Buddy is a platform for connecting travelers. We are not responsible for:
                        </p>
                        <ul>
                            <li>The conduct or safety of users you meet through the platform</li>
                            <li>Travel arrangements, accommodations, or activities</li>
                            <li>Disputes between users</li>
                            <li>Financial transactions between users</li>
                        </ul>

                        <h3>Safety Recommendations</h3>
                        <p>We strongly recommend that you:</p>
                        <ul>
                            <li>Meet in public places when first connecting</li>
                            <li>Inform friends or family of your travel plans</li>
                            <li>Trust your instincts and report suspicious behavior</li>
                            <li>Review profiles and ratings before connecting</li>
                        </ul>

                        <h2>Content and Intellectual Property</h2>
                        <h3>User Content</h3>
                        <p>
                            You retain ownership of content you post, but grant us a license to use, display, and distribute it on our platform. You represent that you have the right to post such content.
                        </p>

                        <h3>Platform Content</h3>
                        <p>
                            All platform content, including design, text, graphics, and software, is owned by Travel Buddy and protected by copyright and other intellectual property laws.
                        </p>

                        <h2>Verification and Premium Features</h2>
                        <p>
                            Some features require a paid subscription. Subscription fees are non-refundable except as required by law. We reserve the right to modify pricing with notice.
                        </p>

                        <h2>Reviews and Ratings</h2>
                        <p>
                            Users may leave reviews after traveling together. Reviews must be:
                        </p>
                        <ul>
                            <li>Based on actual experiences</li>
                            <li>Truthful and not defamatory</li>
                            <li>Free from offensive language</li>
                            <li>Relevant to the travel experience</li>
                        </ul>

                        <h2>Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate accounts that violate these terms. You may also close your account at any time through your account settings.
                        </p>

                        <h2>Disclaimers and Limitations of Liability</h2>
                        <p>
                            Travel Buddy is provided &quot;as is&quot; without warranties of any kind. We are not liable for:
                        </p>
                        <ul>
                            <li>Indirect, incidental, or consequential damages</li>
                            <li>Loss of data, profits, or goodwill</li>
                            <li>Service interruptions or errors</li>
                            <li>Actions or conduct of users</li>
                        </ul>

                        <h2>Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless Travel Buddy from any claims, damages, or expenses arising from your use of the platform or violation of these terms.
                        </p>

                        <h2>Dispute Resolution</h2>
                        <p>
                            Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
                        </p>

                        <h2>Governing Law</h2>
                        <p>
                            These terms are governed by the laws of the State of California, without regard to conflict of law provisions.
                        </p>

                        <h2>Changes to Terms</h2>
                        <p>
                            We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, contact us at:
                        </p>
                        <ul>
                            <li>Email: legal@travelbuddy.com</li>
                            <li>Phone: +1 (234) 567-890</li>
                            <li>Address: 123 Travel Street, San Francisco, CA 94102</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
