import { GlobalStyles } from "twin.macro";
import "@/styles/global.scss";
import { CacheProvider } from "@emotion/react";
import { MyAppProps } from "types/pages";
import createEmotionCache from "createEmotionCache";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import { useRouter } from "next/router";
import MobileInterface from "@/components/MobileInterface";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import "react-tabs/style/react-tabs.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  const onUnlock = () => {
    setUnlocked(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="The Years Still 2013 ♡" />
          <meta name="keywords" content="Keywords" />
          <title>BASIC WHITE BITCH</title>
          <link rel="manifest" href="/manifest.json" />
          <link href="https://i.ibb.co/fdWZhZV/icon.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="https://i.ibb.co/fdWZhZV/icon.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
          <meta name="theme-color" content="#0b0b0b" />
        </Head>
        <GlobalStyles />
        <MobileInterface
          unlocked={unlocked}
          innerPage={Component.inner}
          statusBartextColor={Component.statusTextColor}
          statusBarbgColor={Component.statusBgColor}
        >
          <Hydrate state={pageProps.dehydratedState}>
            <AnimatePresence exitBeforeEnter>
              {unlocked ? (
                <Component {...pageProps} key={router.route} />
              ) : (
                <LockScreen onUnlock={onUnlock} />
              )}
            </AnimatePresence>
          </Hydrate>
        </MobileInterface>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
