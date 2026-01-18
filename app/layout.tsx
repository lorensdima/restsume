import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { bebas, workSans } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Emilio Laurence Dimalanta",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${workSans.variable} ${workSans.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
