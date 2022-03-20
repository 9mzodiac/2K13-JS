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
        <GlobalStyles />
        <MobileInterface>
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
