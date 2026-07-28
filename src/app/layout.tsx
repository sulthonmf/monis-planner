import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "monis.rent — Build Your Workspace",
  description:
    "Design your perfect workspace setup for work, streaming, or gaming. Rent premium furniture and accessories weekly in Bali.",
  keywords: [
    "workspace rental",
    "Bali",
    "digital nomad",
    "office furniture",
    "desk rental",
    "chair rental",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
