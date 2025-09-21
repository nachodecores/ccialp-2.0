import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Kanit, Abel, Aboreto, ADLaM_Display, Afacad } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fuentes oficiales del proyecto
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"], // Bold para sigla logo
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "600"], // Light y Semibold para logo escrito
});

const abel = Abel({
  variable: "--font-abel",
  subsets: ["latin"],
  weight: ["400"],
});

const aboreto = Aboreto({
  variable: "--font-aboreto",
  subsets: ["latin"],
  weight: ["400"],
});

const adlam = ADLaM_Display({
  variable: "--font-adlam",
  subsets: ["latin"],
  weight: ["400"],
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CCIALP",
  description: "Centro Comercial, Industrial y Agrario de Las Piedras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Kanit:wght@300;600&family=Abel&family=Aboreto&family=ADLaM+Display&family=Afacad&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${kanit.variable} ${abel.variable} ${aboreto.variable} ${adlam.variable} ${afacad.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
