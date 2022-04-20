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
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import Gallery from "@/components/Gallery";

import { getMainProfile, getMainProfilePosts } from "repository/instaProfile";
import { CustomPage } from "types/pages";

const Profile: CustomPage = ({ photos, profile }: any) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <motion.div css={tw`flex flex-col h-full bg-white`}>
      <AppHeader
        c1="#3F729B"
        c2="#4d8cbf"
        css={tw`py-[.15rem] before:opacity-100`}
      >
        <Link href="/">
          <a>
            <IosButton
              css={tw`right-[.5rem] px-[.5rem]!`}
              hoverColor="#3F729B"
              color="#4d8cbf"
            >
              <i className="icomoon icon-reload_insta"></i>
            </IosButton>
          </a>
        </Link>
        {/* <Link href="/instagram">
          <a>
            <IosButton left hoverColor="#3F729B" color="#4d8cbf">
              home
            </IosButton>
          </a>
        </Link> */}
        <div css={tw`w-full h-10 relative`}>
          <Image
            src="/images/instagram_logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </AppHeader>

      <ListContainer css={tw`pb-[3.2rem] pt-[2.8rem]`}>
        <ListWrapper css={tw`p-2 bg-gray-300`}>
          <ProfileInfoContainer>
            <div css={tw`grid grid-flow-col grid-rows-2 grid-cols-3 h-24`}>
              <div
                css={tw`w-full h-full relative row-span-2 p-2 border-[1px] border-l-0 border-t-0 border-b-0`}
              >
                <ProfileWrapper>
                  <Image
                    src={profile?.profilePic}
                    layout="fill"
                    objectFit="cover"
                    className="profile-pic"
                  />
                </ProfileWrapper>
              </div>
              <ProfileStatContainer>
                <ProfileStatItem>
                  {photos.length}
                  <ProfileStatCaption>photos</ProfileStatCaption>
                </ProfileStatItem>
                <ProfileStatItem>
                  0<ProfileStatCaption>followers</ProfileStatCaption>
                </ProfileStatItem>
                <ProfileStatItem>
                  2000
                  <ProfileStatCaption>following</ProfileStatCaption>
                </ProfileStatItem>
              </ProfileStatContainer>
              <div
                css={tw`col-start-2 col-span-2 flex justify-between items-center px-4 text-lg font-bold cursor-pointer`}
              >
                Edit Your Profile
                <i
                  className="icomoon icon-chevron-right"
                  css={tw`text-gray-400 text-xl`}
                ></i>
              </div>
            </div>

            <div
              css={tw`flex flex-col justify-center items-start px-2 py-1 border-[1px] border-b-0 border-r-0 border-l-0 relative`}
            >
              <h1 css={tw`text-lg font-bold capitalize`}>
                {profile?.username}
              </h1>
              <span
                css={tw`text-lg font-normal text-gray-400 truncate w-full block`}
              >
                {profile?.bio}
              </span>
            </div>
          </ProfileInfoContainer>

          <Tabs
            selectedIndex={tabIndex}
            css={tw`py-5`}
            onSelect={(index) => setTabIndex(index)}
          >
            <ProfileTabContainer>
              <ProfileTab
                onClick={() => setTabIndex(0)}
                active={tabIndex === 0}
                direction="bottom"
                css={tw`text-[2.3rem]`}
              >
                <i className="icomoon icon-grid" />
              </ProfileTab>
              <ProfileTab
                // onClick={() => setTabIndex(1)}
                active={tabIndex === 1}
                direction="bottom"
                css={tw`text-[1.5rem]`}
              >
                <i className="icomoon icon-list" />
              </ProfileTab>
              <ProfileTab
                // onClick={() => setTabIndex(2)}
                active={tabIndex === 2}
                direction="bottom"
                css={tw`text-[1.4rem]`}
              >
                <i className="icomoon icon-location" />
              </ProfileTab>
              <ProfileTab
                // onClick={() => setTabIndex(3)}
                active={tabIndex === 3}
                direction="bottom"
                css={tw`text-[1.3rem]`}
              >
                <i className="icomoon icon-user-solid-square" />
              </ProfileTab>
            </ProfileTabContainer>
            <TabPanel>
              <Gallery images={photos} />
            </TabPanel>
            <TabPanel>Panel 2</TabPanel>
            <TabPanel>Panel 2</TabPanel>
            <TabPanel>Panel 2</TabPanel>
          </Tabs>
        </ListWrapper>
      </ListContainer>
      <InstagramAppBar>
        {InstagramTabs.map((item: any, index: number) => (
          <Link href={item.link} key={`insta-app-nav-${index}`}>
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

Profile.inner = true;

export default Profile;

export const getStaticProps: GetStaticProps = async () => {
  const profile = await getMainProfile();
  const posts = await getMainProfilePosts(profile.id);
  const photos = [];
  for await (let post of posts) {
    photos.push(post.image);
  }

  return {
    props: {
      photos: photos,
      profile: profile,
    },
    revalidate: 10,
  };
};

const ProfileStatItem = styled.div(() => [
  tw`flex flex-col justify-center items-center text-lg font-bold leading-4 border-[1px] border-l-0 border-t-0 last:border-r-0`,
]);

const ProfileStatCaption = styled.span(() => [
  tw`items-center text-sm font-bold text-gray-400`,
]);

const ProfileWrapper = styled.div(() => [
  tw`w-full h-full relative`,
  css`
    .profile-pic {
      ${tw`rounded-md`}
    }
  `,
]);

const ProfileStatContainer = styled.div(() => [
  tw`col-start-2 col-span-2 grid grid-flow-row grid-cols-3`,
]);

const ProfileInfoContainer = styled.div(() => [tw`bg-white shadow rounded-md`]);

const ProfileTab = styled.div((props: any) => [
  tw`flex justify-center items-center py-2 px-5 w-full flex-grow border-r-[1px] border-gray-400 last:border-r-0`,
  tw`relative text-gray-400`,
  props.active && tw`text-[#3F729B]`,
  tw`before:(contents[""] absolute h-1 w-1)`,

  css`
    &:before {
      border: solid transparent;
      border-color: rgba(136, 183, 213, 0);
      border-width: 6px;
    }
  `,

  props.active &&
    props.direction == "bottom" && [
      tw`before:(top-full left-1/2 -translate-x-1/2)`,
      css`
        &:before {
          border-top-color: #fff;
        }
      `,
    ],

  props.active &&
    props.direction == "right" && [
      tw`before:(left-full top-1/2 -translate-y-1/2)`,
      css`
        &:before {
          border-left-color: #fff;
        }
      `,
    ],
  props.active &&
    props.direction == "left" && [
      tw`before:(right-full top-1/2 -translate-y-1/2)`,
      css`
        &:before {
          border-right-color: #393939;
        }
      `,
    ],
]);

const ProfileTabContainer = styled.div(() => [
  tw`flex w-full bg-white justify-between shadow rounded-md mb-5`,
]);
