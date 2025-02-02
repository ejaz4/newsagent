import type { Metadata } from "next";
import { Domine, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/header";
import { Suspense } from "react";

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "newsagent",
  description: "The world, from on top of the fence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${domine.variable} ${inter.variable}`}>
        <Header />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
