import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { LanguageProvider } from "@/pwa/core/i18n/context/LanguageProvider";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kantabi",
  description: "Kanji Roadmap",
  icons: "/logo/small.svg",
};

export const viewport: Viewport = {
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body
          className={clsx(
            inter.variable,
            "antialiased",
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <main
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "max-w-[1200px] w-full"
            )}
          >
            {children}
          </main>
        </body>
      </html>
    </LanguageProvider>
  );
}
