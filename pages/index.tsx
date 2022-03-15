import MobileInterface from "@/components/MobileInterface";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MobileInterface />
    </>
  );
};

export default Home;
