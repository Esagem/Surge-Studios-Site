import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import ScrollHeader from "@/components/ScrollHeader";

const bodySans = Space_Grotesk({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const displaySerif = Bricolage_Grotesque({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Surge Studios",
  description: "High-quality websites and apps, built with you.",
};

const themeInitScript = `
  try {
    var savedTheme = window.localStorage.getItem("theme");
    var theme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodySans.variable} ${displaySerif.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ScrollHeader />
        {children}
      </body>
    </html>
  );
}
