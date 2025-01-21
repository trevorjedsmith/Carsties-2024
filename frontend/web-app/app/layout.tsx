import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";

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
        <Navbar />
        <main className="container mx-auto pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
