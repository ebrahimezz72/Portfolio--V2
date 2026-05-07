import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosInit from "@/components/AosInit";
import FloatingContactButton from "@/components/FloatingContactButton";
import "./globals.css";

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
    default: "Ibrahim Ezzeldin | Front-end Developer & Digital Artisan",
    template: "%s | Ibrahim Ezzeldin"
  },
  description: "Ibrahim Ezzeldin is a professional Front-end Developer and Digital Artisan specializing in building premium, high-performance web applications using React, Next.js, and modern CSS.",
  keywords: ["Ibrahim Ezzeldin", "Front-end Developer", "Web Developer", "React Developer", "Next.js", "Portfolio", "UI/UX Designer", "Digital Artisan", "Software Engineer"],
  authors: [{ name: "Ibrahim Ezzeldin" }],
  creator: "Ibrahim Ezzeldin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibrahimezzeldin.com", // Adjust to your actual domain if different
    title: "Ibrahim Ezzeldin | Front-end Developer & Digital Artisan",
    description: "Premium web development and digital craftsmanship by Ibrahim Ezzeldin.",
    siteName: "Ibrahim Ezzeldin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Ezzeldin | Front-end Developer & Digital Artisan",
    description: "Premium web development and digital craftsmanship by Ibrahim Ezzeldin.",
    creator: "@ibrahimezzeldin", // Adjust if you have a different handle
  },
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111111] text-zinc-100 selection:bg-[#d3e97a] selection:text-black">
        <AosInit />
        <Navbar />
        <FloatingContactButton />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
