import type { Metadata } from "next";
import { Nanum_Pen_Script, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const nanumPen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secret Diary",
  description: "Your emotional AI diary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumPen.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-pastel-cream text-ink font-hand`}
      >
        {children}
      </body>
    </html>
  );
}
