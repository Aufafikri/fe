import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import TanstackProvider from "../../providers/TanstackProvider";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./context/userContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  title: "Evst Store",
  
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TanstackProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </TanstackProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
