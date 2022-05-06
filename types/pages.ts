import { NextPage } from "next";
import { AppProps } from "next/app";

export type CustomPage<P = {}, IP = P> = NextPage<P, IP> & {
  inner?: boolean;
  statusBgColor?: string;
  statusTextColor?: string;
};
export type MyAppProps<P = {}> = AppProps<P> & {
  Component: CustomPage<P>;
  emotionCache: any;
};
