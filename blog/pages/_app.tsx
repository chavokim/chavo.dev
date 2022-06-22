import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Nav from "../common/components/Nav";
import React from "react";
import Footer from '../common/components/Footer';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <div>
        <Head>
            <title>Chavolog</title>
            <meta name="description" content="Chavo Kim의 이것저것 쓰는 blog" key={"description"}/>
            <meta name="naver-site-verification" content="ffd2270ebd7d5eaafd28a54e52a4afda91a05e1f" />
            <link rel="icon" href="/favicon.ico" />
            <meta property="og:site_name" content="blog.chavo.dev" key={"og-site-name"} />
            <meta property="og:title" content="Chavolog" key={"og-title"} />
            <meta property="og:description" content="Chavo Kim의 이것저것 쓰는 blog" key={"og-description"} />
            <meta property="og:type" content="article" key={"og-type"} />
            <meta property="og:image" content="/og_image.png" key={"og-image"} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={""} />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
            />
            <link 
                href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@500&display=swap" 
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                as="style"
                crossOrigin={""}
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
            />
        </Head>
        <Script
            id="gtag-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-1DMF5XVR4Z`}
        />
        <Script
            strategy="afterInteractive"
            id="gtag-script2"
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-1DMF5XVR4Z');
            `,
            }}
        />
        <Nav />
        <section className="py-24 width-screen dark:bg-black">
            <div className="xl:max-w-5xl container mx-auto ">
                <Component {...pageProps} />
            </div>
        </section>
        <Footer />
    </div>
    )
}

export default MyApp
