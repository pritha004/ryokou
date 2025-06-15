import type { Metadata } from "next";
import { Shadows_Into_Light, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PreloaderWrapper } from "@/context/preloader-wrapper";

const handwritten = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-handwritten",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: "300",
  style: "normal",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Ryokou - Your Personal Trip Planner",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${handwritten.variable} ${playfair.variable} ${lato.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PreloaderWrapper>
            <main>{children}</main>
            <Toaster richColors />
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
