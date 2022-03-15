import { GlobalStyles } from "twin.macro";
import "@/styles/global.scss";
import { CacheProvider } from "@emotion/react";
import { MyAppProps } from "types/pages";
import createEmotionCache from "createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <GlobalStyles />
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
