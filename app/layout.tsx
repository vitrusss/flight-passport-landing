import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flight Passport — Flight intelligence for people who fly",
  description:
    "Flight Passport helps you understand your journey before, during, and after your flight — real-time tracking, predictive insights, and a personal travel history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload LCP hero phone image */}
        <link rel="preload" as="image" href="/Images/asset-28ac99e6-1e5b-405d-842f-3140b8f96b46.png" />
        <script dangerouslySetInnerHTML={{__html: `
          if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
          window.scrollTo(0, 0);
        `}} />
      </head>
      <body className="antialiased" style={{ margin: 0, padding: 0, width: '100%', minWidth: '100%', overflowX: 'hidden' }}>{children}</body>
    </html>
  );
}
