import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {/* {children} */}
        <Navbar />
        <main className="p-4 max-w-6xl mx-auto">
          {" "}
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </main>
        <footer className="p-4 mt-8 border-t text-center text-sm text-gray-600">
          &copy; 2025 College Finder. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
