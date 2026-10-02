import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaj Kya Banega | Your kitchen companion",
  description: "Plan meals from the ingredients already in your kitchen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
