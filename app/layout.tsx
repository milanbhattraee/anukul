import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anukul Store - Your One-Stop E-commerce Shop",
  description: "Shop the latest products in electronics, accessories, home & kitchen, and sports & fitness. Quality products at great prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
