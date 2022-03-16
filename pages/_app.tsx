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

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);

  const onUnlock = () => {
    setUnlocked(true);
  };

  return (
    <CacheProvider value={emotionCache}>
      <GlobalStyles />
      <MobileInterface>
        <AnimatePresence exitBeforeEnter>
          {unlocked ? (
            <Component {...pageProps} key={router.route} />
          ) : (
            <LockScreen onUnlock={onUnlock} />
          )}
        </AnimatePresence>
      </MobileInterface>
    </CacheProvider>
  );
}

export default MyApp;
