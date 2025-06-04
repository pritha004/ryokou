import type { Metadata } from "next";
import { Inter, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
const handwritten = Shadows_Into_Light({
  weight: "400",
  variable: "--font-handwritten",
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
      <body className={`${inter.className} ${handwritten.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
            <footer className="bottom-0 left-0 fixed flex justify-center pb-4 w-full text-center font-extralight text-sm">
              <p> 2025 © Ryokou. All rights reserved.</p>
            </footer>
          </main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
