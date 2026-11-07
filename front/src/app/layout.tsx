import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdReverse AI — Competitor Intelligence & Counter-Campaigns",
  description: "Reverse-engineer winning competitor ads and generate lethal counter-campaigns with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`dark ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[#151821] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
