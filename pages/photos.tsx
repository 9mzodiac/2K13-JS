import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/emotionHeader";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import tw from "twin.macro";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { ListContainer } from "@/components/elements/common";

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
            <IosButton left hoverColor="black" color="#1c1c1c">
              back
            </IosButton>
          </a>
        </Link>
        <AppHeadLabel>Photos</AppHeadLabel>
      </AppHeader>
      <ListContainer>
        <Gallery />
      </ListContainer>
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
