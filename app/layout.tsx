import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "pie-r_market", description: "ร้านค้าออนไลน์ pie-r_market" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="th"><body>{children}</body></html>; }
