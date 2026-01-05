import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Travel Buddy - Find Your Perfect Travel Companion",
    template: "%s | Travel Buddy"
  },
  description: "Connect with like-minded travelers, discover amazing destinations, and plan your next adventure together. Join thousands of travelers worldwide on Travel Buddy.",
  keywords: [
    "travel buddy",
    "travel companion",
    "find travel partner",
    "travel planning",
    "adventure travel",
    "travel community",
    "backpacking",
    "group travel",
    "solo travel",
    "travel matching"
  ],
  authors: [{ name: "Travel Buddy Team" }],
  creator: "Travel Buddy",
  publisher: "Travel Buddy",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://travel-buddy-frontend.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Travel Buddy - Find Your Perfect Travel Companion",
    description: "Connect with like-minded travelers, discover amazing destinations, and plan your next adventure together.",
    siteName: "Travel Buddy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Travel Buddy - Your Ultimate Travel Companion Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Buddy - Find Your Perfect Travel Companion",
    description: "Connect with like-minded travelers and discover your next adventure together.",
    images: ["/og-image.png"],
    creator: "@travelbuddy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'Travel Buddy',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Travel Buddy',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Travel Buddy',
    description: 'Find your perfect travel companion and plan amazing adventures together',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://travel-buddy-frontend.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://travel-buddy-frontend.vercel.app'}/find-buddy?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Travel Buddy',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://travel-buddy-frontend.vercel.app'}/icon-512x512.png`,
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <ConditionalNavbar />
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
