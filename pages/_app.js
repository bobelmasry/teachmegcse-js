import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  const supabase = createClient('https://dgunybghtjqbawjpkcvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndW55YmdodGpxYmF3anBrY3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzA3NDcsImV4cCI6MTk5ODYwNjc0N30.YhH31WDmaWw9QZgx4cvu09g4aQojJ6fKer1B8gRnXGM')

  return (
    <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-HN33M7M3RV"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HN33M7M3RV', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  </>
  )
}
export default MyApp