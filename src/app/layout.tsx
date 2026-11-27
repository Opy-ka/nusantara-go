import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nusantara.go — Atlas Budaya 3D Indonesia",
    template: "%s · Nusantara.go",
  },
  description:
    "Jelajahi warisan budaya Indonesia dalam peta diorama 3D interaktif: rumah adat, tarian, kuliner, alat musik, dan Paspor Budaya Nusantara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
