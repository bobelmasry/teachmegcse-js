import Script from "next/script"
import Head from "next/head"

export default function Headstuff({session}) {
    return (
        <>
        <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HN33M7M3RV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
      
          gtag('config', 'G-HN33M7M3RV');
        `}
      </Script>
      </>
    )
  };