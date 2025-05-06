"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import "./globals.css";
import AdSense from "@/components/adsense/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata can't be exported from a Client Component
const metadata = {
  title: "Nightfall Assault - Minecraft Server",
  description: "Experience adventure like never before on the Nightfall Assault Minecraft server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for dark mode preference
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      document.documentElement.classList.add(storedTheme);
    } else if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="./favicon.ico"/>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta
          property="og:description"
          content={metadata.description}
        />
        <AdSense pId="ca-pub-7395920081704697"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isLoading ? (
          <Loading onFinished={() => setIsLoading(false)} />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
