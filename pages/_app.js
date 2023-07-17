import '../styles/globals.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import Script from 'next/script'
import { ChakraProvider, ColorModeProvider, extendTheme } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const supabase = createClient('https://dgunybghtjqbawjpkcvg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndW55YmdodGpxYmF3anBrY3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMzA3NDcsImV4cCI6MTk5ODYwNjc0N30.YhH31WDmaWw9QZgx4cvu09g4aQojJ6fKer1B8gRnXGM')

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: 'gray.900',
        },
      },
    },
  });
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
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'dark' }}>
        <Component {...pageProps} />
      </ColorModeProvider>
      </ChakraProvider>
    </SessionContextProvider>
  </>
  )
}
export default MyApp