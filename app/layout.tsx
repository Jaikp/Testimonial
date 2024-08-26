import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Outfit } from "next/font/google";


import "./globals.css";

import StoreContextProvider from "@/context/StoreContext";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Endorser • Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <StoreContextProvider>
          <Providers>
            {children}
          </Providers>
        </StoreContextProvider>

      </body>
    </html>
  );
}
