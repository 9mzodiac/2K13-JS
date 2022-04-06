import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { pageVariants } from "animations/variants";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import Link from "next/link";
import Image from "next/image";
import {
  InstagramAppBar,
  InstagramNavItem,
} from "@/components/elements/styled/instagram";
import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import InstagramPost from "@/components/elements/InstagramPost";
import { ADMIN_DB } from "@/firebase/admin";

const Instagram: NextPage = ({ posts }: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#3F729B" c2="#4d8cbf">
        <Link href="/">
          <a>
            <IosButton css={tw`right-4`} hoverColor="#3F729B" color="#4d8cbf">
              <i className="icomoon icon-rotate"></i>
            </IosButton>
          </a>
        </Link>
        <Link href="/">
          <a>
            <IosButton left hoverColor="#3F729B" color="#4d8cbf">
              back
            </IosButton>
          </a>
        </Link>
        <div css={tw`w-auto h-6`}>
          <Image src="/instagram_logo.svg" layout="fill" objectFit="contain" />
        </div>
      </AppHeader>

      <ListContainer css={tw`pb-10`}>
        <ListWrapper>
          {posts.length > 0 &&
            posts.map((item: any) => (
              <InstagramPost
                key={`instapost-${item.id}`}
                postImage={item.image}
                profile={item.user.avatar}
                name={item.user.username}
                likes={item.likes}
                time={item.createdDate}
                caption={item.title}
              />
            ))}
        </ListWrapper>
      </ListContainer>

      <InstagramAppBar>
        <InstagramNavItem active>
          <i className="icomoon icon-home"></i>
        </InstagramNavItem>
        <InstagramNavItem>
          <i className="icomoon icon-compass"></i>
        </InstagramNavItem>
        <InstagramNavItem>
          <i className="icomoon icon-insta-cam"></i>
        </InstagramNavItem>
        <InstagramNavItem>
          <i className="icomoon icon-comment-love"></i>
        </InstagramNavItem>
        <InstagramNavItem>
          <i className="icomoon icon-profile"></i>
        </InstagramNavItem>
      </InstagramAppBar>
    </motion.div>
  );
};

export default Instagram;

export const getStaticProps: GetStaticProps = async () => {
  const instagramCollection = await ADMIN_DB.collection("instagram").get();

  const instaposts = [];
  for await (const post of instagramCollection.docs) {
    instaposts.push({
      id: post.id,
      ...post.data(),
    });
  }
  console.log(instaposts);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(instaposts)),
    },
  };
};
