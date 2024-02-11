import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { fetchGeneralContent } from "@/services/hygraph";
import Script from "next/script";

const inter = Noto_Sans({ subsets: ["latin"] });

export const moonblossom = localFont({
  src: "../../public/moonblossom.otf",
  display: "swap",
});

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
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css"
        />

        <Script
          src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-blue-100">
        <div
          hidden
          id="snipcart"
          data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
        />
        {/* <header>
          <button className="snipcart-checkout">CHECKOUT</button>
        </header> */}
        {children}
        {errors ? (
          <p className={moonblossom.className}>Could not load data...</p>
        ) : (
          <footer className="pb-20 pt-32 px-5">
            <p className={`text-2xl text-center ${moonblossom.className}`}>
              {data?.general?.footerText}
            </p>
          </footer>
        )}
      </body>
    </html>
  );
}
