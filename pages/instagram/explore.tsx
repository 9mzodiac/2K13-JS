import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { pageVariants } from "@/animations/variants";
import { AppHeader, IosButton } from "@/components/elements/styled/header";
import Link from "next/link";
import Image from "next/image";
import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import {
  InstagramAppBar,
  InstagramNavItem,
} from "@/components/elements/styled/instagram";
import { InstagramTabs } from ".";
import { useRouter } from "next/router";
import { ADMIN_BUCKET } from "@/firebase/admin";
import Gallery from "@/components/Gallery";
import { getExplorePost } from "repository/instaProfile";

const Explore: NextPage = ({ photos }: any) => {
  const router = useRouter();

  return (
    <motion.div css={tw`flex flex-col h-full bg-white`}>
      <AppHeader c1="#3F729B" c2="#4d8cbf">
        <Link href="/">
          <a>
            <IosButton css={tw`right-4`} hoverColor="#3F729B" color="#4d8cbf">
              <i className="icomoon icon-rotate"></i>
            </IosButton>
          </a>
        </Link>
        <Link href="/instagram">
          <a>
            <IosButton left hoverColor="#3F729B" color="#4d8cbf">
              home
            </IosButton>
          </a>
        </Link>
        <div css={tw`w-auto h-6`}>
          <Image src="/instagram_logo.svg" layout="fill" objectFit="contain" />
        </div>
      </AppHeader>

      <ListContainer css={tw`pb-[3.2rem] pt-[2.5rem]`}>
        <ListWrapper>
          <div css={tw`bg-gray-400 p-2 flex`}>
            <input
              css={tw`w-full px-2 py-1 text-gray-300 rounded focus:(border-none outline-none)`}
              placeholder="Search users and hashtags"
            />
          </div>
          <div css={tw`p-2`}>
            <Gallery images={photos} />
          </div>
        </ListWrapper>
      </ListContainer>
      <InstagramAppBar>
        {InstagramTabs.map((item: any, index: number) => (
          <Link href={item.link} key={`explore-post-${index}`}>
            <a>
              <InstagramNavItem active={router.asPath === item.link}>
                <i className={`icomoon icon-${item.icon}`}></i>
              </InstagramNavItem>
            </a>
          </Link>
        ))}
      </InstagramAppBar>
    </motion.div>
  );
};

export default Explore;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getExplorePost();
  const photos = [];
  for await (let post of posts) {
    photos.push(post.image);
  }

  return {
    props: {
      photos: photos,
    },
  };
};
