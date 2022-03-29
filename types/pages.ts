import { NextPage } from "next";
import { AppProps } from "next/app";

export type MyAppProps<P = {}> = AppProps<P> & {
  Component: NextPage<P>;
  emotionCache: any;
};
