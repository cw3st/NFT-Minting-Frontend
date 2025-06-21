import Navbar from "./components/navBar";
import "./globals.css";
import { Providers } from "./providers"; 
import React from "react";

export const metadata = {
  title: "NFT Minting Frontend",
  description: "NFT Minting Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
        Dark gradient background, covering the entire screen. 
        Adjust gradient colors to match your design. 
      */}
      <body className="bg-gradient-to-r from-[#000000] to-[#111827] min-h-screen text-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
