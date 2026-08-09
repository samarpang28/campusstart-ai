import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NewsTicker from "@/components/NewsTicker";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Forces the news ticker's signup count to be fetched fresh on every page
// load instead of using a stale cached build-time value.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CampusStart.AI — Your Boarding Pass to Campus Life",
  description:
    "Verified rooms. Verified roommates. CampusStart.AI helps newly admitted students find both before they even land in their new city.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <body className="bg-parchment font-body text-ink antialiased">
        <NewsTicker />
        <NavBar />
        {children}
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
