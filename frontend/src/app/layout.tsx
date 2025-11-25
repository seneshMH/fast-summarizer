import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Fast Summarizer - AI-Powered Text Summarization Tool",
  description: "Transform long articles and documents into concise summaries instantly. Fast Summarizer uses advanced AI algorithms to extract the most important information from your text.",
  keywords: ["text summarizer", "AI summarization", "document summary", "article summarizer", "extractive summarization", "text analysis", "NLP tool"],
  authors: [{ name: "Senesh Hansana" }],
  creator: "Senesh Hansana",
  publisher: "Senesh Hansana",
  robots: "index, follow",

  // Open Graph meta tags for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seneshhansana.com",
    title: "Fast Summarizer - AI-Powered Text Summarization Tool",
    description: "Transform long articles and documents into concise summaries instantly using advanced AI algorithms.",
    siteName: "Fast Summarizer",
  },

  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "Fast Summarizer - AI-Powered Text Summarization Tool",
    description: "Transform long articles and documents into concise summaries instantly using advanced AI algorithms.",
    creator: "@SeneshHansana",
    site: "@SeneshHansana",
  },

  // Viewport and theme settings
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Additional meta tags
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
