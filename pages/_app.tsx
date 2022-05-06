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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

var thresholds = [
  { l: "ss", r: 59, d: "second" },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y" },
  { l: "yy", d: "year" },
];
dayjs.extend(updateLocale);
dayjs.extend(relativeTime, { thresholds: thresholds, rounding: Math.floor });
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  },
});

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
          <meta name="description" content="Iphone App" />
          <meta name="keywords" content="Keywords" />
          <title>2K13Boyz</title>
          <link rel="manifest" href="/manifest.json" />
          <link href="/favicon.ico" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon.ico" rel="icon" type="image/png" sizes="32x32" />
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
