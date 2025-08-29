import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Social Media Post Generator | Buat Konten Otomatis & Cepat",
    template: "%s | AI Social Media",
  },
  description:
    "Buat konten media sosial menarik hanya dalam hitungan detik dengan AI Social Media Post Generator. Praktis, hemat waktu, dan mudah digunakan!",
  keywords: [
    "AI Social Media",
    "Artificial Intelligence",
    "Social Media Automation",
    "Content Generator",
    "Fatiha Eros Perdana",
  ],
  authors: [{ name: "Fatiha Eros Perdana" }],
  creator: "Fatiha Eros Perdana",
  generator: "Next.js",
  metadataBase: new URL("https://www.aisocialmedia.com"),
  openGraph: {
    title: "AI Social Media",
    description: "Revolutionize your content strategy with AI-powered tools.",
    url: "https://www.ordal.my.id",
    siteName: "AI Social Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Social Media Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Social Media",
    description: "Create, manage, and optimize content using AI.",
    creator: "@yourhandle",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const generateViewport = (): Viewport => ({
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
