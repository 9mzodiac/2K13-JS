import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { AppHeader, IosButton } from "@/components/elements/styled/header";
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
import InstagramPost from "@/components/elements/Instagram/InstagramPost";
import { ADMIN_DB } from "@/firebase/admin";
import { useRouter } from "next/router";
import { CustomPage } from "types/pages";

const Instagram: CustomPage = ({ posts }: any) => {
  const router = useRouter();

  return (
    <motion.div css={tw`flex flex-col h-full bg-white`}>
      <AppHeader
        c1="#3F729B"
        c2="#4d8cbf"
        css={tw`py-[.15rem] before:opacity-100`}
      >
        <IosButton
          css={tw`right-[.5rem] px-[.8rem]!`}
          hoverColor="#3F729B"
          color="#4d8cbf"
        >
          <i className="icomoon icon-reload_insta"></i>
        </IosButton>
        {/* <Link href="/">
          <a>
            <IosButton left hoverColor="#3F729B" color="#4d8cbf">
              back
            </IosButton>
          </a>
        </Link> */}
        <div css={tw`w-full h-10 relative`}>
          <Image
            src="/images/InstagramLogo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </AppHeader>

      <ListContainer css={tw`pb-[3.2rem] pt-[2.8rem]`}>
        <ListWrapper css={tw`pt-2`}>
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
                location={item.location}
                comments={item.comments}
              />
            ))}
        </ListWrapper>
      </ListContainer>
      <InstagramAppBar>
        {InstagramTabs.map((item: any, index: number) => (
          <Link href={item.link} key={`instapost-${index}`}>
            <a>
              <InstagramNavItem
                active={router.asPath === item.link}
                highlight={item.icon == "instalogo"}
              >
                <i
                  className={`icomoon icon-${item.icon}`}
                  css={
                    item.icon == "instaexplore" || item.icon == "instalogo"
                      ? tw`text-[1.7rem]`
                      : item.icon == "instaprofile"
                      ? tw`text-[1rem]`
                      : item.icon == "instaheart"
                      ? tw`text-[1.35rem]`
                      : tw`text-[1.2rem]`
                  }
                ></i>
              </InstagramNavItem>
            </a>
          </Link>
        ))}
      </InstagramAppBar>
    </motion.div>
  );
};

Instagram.inner = true;

export default Instagram;

export const getStaticProps: GetStaticProps = async () => {
  const instagramCollection = await ADMIN_DB.collection("instagram")
    .orderBy("createdDate", "desc")
    .get();

  const instaposts = [];
  for await (const post of instagramCollection.docs) {
    const commentsCollection = await ADMIN_DB.collection("instagram_comments")
      .where("post_id", "==", post.id)
      .limit(2)
      .get();

    const comments = [];
    if (!commentsCollection.empty) {
      for await (const comment of commentsCollection.docs) {
        comments.push({
          id: comment.id,
          ...comment.data(),
        });
      }
    }

    instaposts.push({
      id: post.id,
      ...post.data(),
      comments: comments,
    });
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(instaposts)),
    },
    revalidate: 10,
  };
};

export const InstagramTabs = [
  {
    icon: "instahome",
    link: "/instagram",
  },
  {
    icon: "instaexplore",
    link: "/instagram/explore",
  },
  {
    icon: "instalogo",
    link: "/instagram/",
  },
  {
    icon: "instaheart",
    link: "/instagram/",
  },
  {
    icon: "instaprofile",
    link: "/instagram/profile",
  },
];
