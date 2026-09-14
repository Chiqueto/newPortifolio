import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luís Felipe Chiqueto — Software Developer",
  description:
    "Software across backend, web and mobile. Java · Spring Boot · React · Next.js · React Native.",
  icons: {
    icon: [
      { url: "/portifolioIcon92.png", sizes: "any" },
      { url: "/portifolioIcon.png", sizes: "16x16", type: "image/x-icon" },
      { url: "/portifolioIcon32.png", sizes: "32x32", type: "image/x-icon" },
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
