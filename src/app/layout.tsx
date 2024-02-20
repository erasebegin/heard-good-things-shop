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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.SnipcartSettings = {
                publicApiKey: "${process.env.SNIPCART_API_KEY}",
                // loadStrategy: "on-user-interaction",
                modalStyle: "side",
            };
            (function(){var c,d;(d=(c=window.SnipcartSettings).version)!=null||(c.version="3.0");var s,S;(S=(s=window.SnipcartSettings).currency)!=null||(s.currency="gbp");var l,p;(p=(l=window.SnipcartSettings).timeoutDuration)!=null||(l.timeoutDuration=2750);var w,u;(u=(w=window.SnipcartSettings).domain)!=null||(w.domain="cdn.snipcart.com");var m,g;(g=(m=window.SnipcartSettings).protocol)!=null||(m.protocol="https");var f,v;(v=(f=window.SnipcartSettings).loadCSS)!=null||(f.loadCSS=!0);var E=window.SnipcartSettings.version.includes("v3.0.0-ci")||window.SnipcartSettings.version!="3.0"&&window.SnipcartSettings.version.localeCompare("3.4.0",void 0,{numeric:!0,sensitivity:"base"})===-1,y=["focus","mouseover","touchmove","scroll","keydown"];window.LoadSnipcart=o;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();function r(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy==="on-user-interaction"&&(y.forEach(function(t){return document.addEventListener(t,o)}),setTimeout(o,window.SnipcartSettings.timeoutDuration)):o()}var a=!1;function o(){if(a)return;a=!0;let t=document.getElementsByTagName("head")[0],n=document.querySelector("#snipcart"),i=document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][src$="snipcart.js"]')),e=document.querySelector('link[href^="'.concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,'"][href$="snipcart.css"]'));n||(n=document.createElement("div"),n.id="snipcart",n.setAttribute("hidden","true"),document.body.appendChild(n)),$(n),i||(i=document.createElement("script"),i.src="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.js"),i.async=!0,t.appendChild(i)),!e&&window.SnipcartSettings.loadCSS&&(e=document.createElement("link"),e.rel="stylesheet",e.type="text/css",e.href="".concat(window.SnipcartSettings.protocol,"://").concat(window.SnipcartSettings.domain,"/themes/v").concat(window.SnipcartSettings.version,"/default/snipcart.css"),t.prepend(e)),y.forEach(function(h){return document.removeEventListener(h,o)})}function $(t){!E||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();

            document.addEventListener('snipcart.cart.confirmed', function() {
              
              const shopMain = document.querySelector(".shop-main");
              console.log({shopMain})
              if (shopMain) {
                shopMain.style.border = "1px solid red";
              }
            });
            document.addEventListener('snipcart.order.completed', function() {
              
              const shopMain = document.querySelector(".shop-main");
              console.log({shopMain})
              if (shopMain) {
                shopMain.style.border = "1px solid blue"; 
              }
            });
          `,
          }}
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
