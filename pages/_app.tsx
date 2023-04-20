import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../contexts/ThemeContext.js';
import Script from 'next/script.js';


export default function App({ Component, pageProps }: AppProps) {
    return(
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
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4840148949688052"
     crossOrigin="anonymous" strategy="afterInteractive"></Script>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      </>
    )
}
