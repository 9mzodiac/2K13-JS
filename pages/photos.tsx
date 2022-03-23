import {
  AppHeader,
  AppHeadLabel,
  BackButton,
} from "@/components/elements/emotionHeader";
import { API } from "@/lib/api";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import tw from "twin.macro";
import Link from "next/link";
import Gallery from "@/components/Gallery";

const Photos: React.FC<any> = ({ photos }: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#000000" c2="#4d4d4d">
        <Link href="/">
          <a>
            <BackButton hoverColor="black">back</BackButton>
          </a>
        </Link>
        <AppHeadLabel css={tw`text-center`}>Photos</AppHeadLabel>
      </AppHeader>
      <div css={tw`absolute overflow-auto h-full w-full pt-[4.4rem] z-10`}>
        <Gallery />
      </div>
    </motion.div>
  );
};

export default Photos;

export const getStaticProps: GetStaticProps = async () => {
  // const response = await API.get("/list?page=1&limit=20");
  // const data = await response.json();
  return {
    props: {
      photos: [],
    },
  };
};
