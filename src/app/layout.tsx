"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/Header";
import { Provider } from "react-redux";
import { appStore } from "../store/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Superstore",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/5fa829b1c9.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Provider store={appStore}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
