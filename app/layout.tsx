import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins, Shrikhand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shrikhand = Shrikhand({
  variable: "--font-shrikhand",
  subsets: ["latin"],
  weight: "400"
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Portifólio Chiqueto",
  description: "Bem vindo ao meu portifólio de desenvolvedor/programador! Aqui você encontra um pouco de tudo sobre mim.",
  icons: {
    icon: [
      {
        url: "/portifolioIcon92.png",
        sizes: "any",
      },
      {
        url: "/portifolioIcon.png",
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        url: "/portifolioIcon32.png",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
    apple: {
      url: "/portifolioIcon92.png",
      sizes: "180x180",
      type: "image/x-icon",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${shrikhand.variable} antialiased font-body`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html >
  );
}
