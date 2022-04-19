import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Head>
            <title>Chavolog</title>
            <meta name="description" content="Chavo's blog" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
            <main>
                <Component {...pageProps} />
            </main>
        </div>
    </>
  )
}

export default MyApp
