import { NextPage } from "next";
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

const Instagram: NextPage = (props: any) => {
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
          <InstagramPost
            postImage="/insta1.jpeg"
            profile="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
            name="2K13Boyz"
            likes="225"
          />
          <InstagramPost
            postImage="/insta2.jpeg"
            profile="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
            name="2K13Boyz"
            likes="225"
          />
          <InstagramPost
            postImage="/insta3.jpeg"
            profile="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
            name="2K13Boyz"
            likes="225"
          />
          <InstagramPost
            postImage="/insta1.jpeg"
            profile="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
            name="2K13Boyz"
            likes="225"
          />
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
