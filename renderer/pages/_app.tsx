import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Head from "next/head";
import { Layout } from "../components/layout";
import { Toaster } from "../components/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <title>AI Marketplace</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Toaster />
    </ThemeProvider>
  );
}

export default MyApp;
