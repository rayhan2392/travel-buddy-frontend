import Link from "next/link";
import { Plane, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-300 border-t border-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                                <Plane className="w-6 h-6 text-white transform -rotate-45" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Travel Buddy
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Connect with like-minded travelers and explore the world together. Your perfect travel companion is just a click away.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Linkedin, href: "#" }
                            ].map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-violet-600 transition-all duration-300 hover:scale-110 hover:rotate-6 group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Find Buddy", href: "/find-buddy" },
                                { label: "Explore Travelers", href: "/explore" },
                                { label: "My Plans", href: "/my-plans" },
                                { label: "Dashboard", href: "/dashboard" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-violet-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Help Center", href: "/help" },
                                { label: "About Us", href: "/about" },
                                { label: "Terms of Service", href: "/terms" },
                                { label: "Privacy Policy", href: "/privacy" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-violet-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                <a href="mailto:support@travelbuddy.com" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                                    support@travelbuddy.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400">
                                    123 Travel Street,<br />Adventure City, AC 12345
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Travel Buddy. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link href="/terms" className="text-gray-500 hover:text-violet-400 transition-colors duration-200">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-gray-500 hover:text-violet-400 transition-colors duration-200">
                                Privacy
                            </Link>
                            <Link href="/contact" className="text-gray-500 hover:text-violet-400 transition-colors duration-200">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
