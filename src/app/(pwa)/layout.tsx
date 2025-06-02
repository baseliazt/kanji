import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kantabi",
  description: "Perjalanan Kanji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
