import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { jost } from "./ui/fonts";
import Providers from "./ui/providers";

export const metadata: Metadata = {
  title: "Emilio Laurence Dimalanta",
  description:
    "Portfolio of Emilio Laurence Dimalanta, Information Technology graduate. This portfolio is also a REST API, try /api.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
