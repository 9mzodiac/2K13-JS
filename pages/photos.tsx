import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import tw from "twin.macro";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { ListContainer } from "@/components/elements/styled/common";
import { ADMIN_BUCKET, ADMIN_DB } from "@/firebase/admin";

const Photos: NextPage = ({ photos }: any) => {
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
        <Gallery images={photos} />
      </ListContainer>
    </motion.div>
  );
};

export default Photos;

export const getStaticProps: GetStaticProps = async () => {
  const [files] = await ADMIN_BUCKET.getFiles({ directory: "photos" });

  const urls = await Promise.all(
    files.map((file) =>
      file.getSignedUrl({
        action: "read",
        expires: "04-05-2042", // this is an arbitrary date
      })
    )
  );

  return {
    props: {
      photos: urls,
    },
  };
};
