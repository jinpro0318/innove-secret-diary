import type { Metadata } from "next";
import { Nanum_Pen_Script, Caveat } from "next/font/google";
import "./globals.css";

const nanumPen = Nanum_Pen_Script({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nanum",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "My Secret Handmade Diary",
  description: "A digital diary with a warm, analog soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nanumPen.variable} ${caveat.variable} font-body bg-bg-parchment text-text-sepia`}>
        {children}
      </body>
    </html>
  );
}
