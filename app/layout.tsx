import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniClip | AI Multi-Platform Content Repurposing",
  description:
    "AI-powered multi-platform content repurposing engine. Transform YouTube videos and audio files into high-retention TikTok scripts, X threads, and LinkedIn carousels.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-midnight-900 text-slate-100 antialiased selection:bg-template-cyan/30 selection:text-white relative">
        {/* Ambient Fluid Background Glow Blobs from Template */}
        <div className="bg-ambient-glow" aria-hidden="true" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
