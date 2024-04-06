import type { Metadata } from "next";
import "./globals.css";
import { fetchGeneralContent } from "@/services/hygraph";
import { moonblossom } from "./fonts";

export const metadata: Metadata = {
  title: "Heard Good Things",
  description: "Shop for the sample packs by creative duo Heard Good Things",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, errors } = await fetchGeneralContent();
  return (
    <html lang="en">
      <head></head>
      <body className="bg-blue-100">
        {children}
        {errors ? (
          <p className={moonblossom.className}>Could not load data...</p>
        ) : (
          <footer className="px-5 pb-20 pt-32">
            <p className={`text-center text-2xl ${moonblossom.className}`}>
              {data?.general?.footerText}
            </p>
          </footer>
        )}
      </body>
    </html>
  );
}
