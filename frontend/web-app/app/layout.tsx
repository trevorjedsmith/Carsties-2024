import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carsties",
  description: "Specialised auctions for cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
