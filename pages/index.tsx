import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { CustomPage } from "types/pages";


const Home: CustomPage = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(false);

  return (
    <motion.div
      css={tw`flex flex-col h-full pt-4`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
        onSwiper={setSwiperInstance}
        lazy={false}
      >
        <SwiperSlide>
          <AppSlideWrapper>
            {Apps.map((item) => (
              <Link href={item.link} passHref key={item.lable}>
                <a>
                  <AppWrapper>
                    <AppIcon>
                      <Image
                        src={item.path}
                        layout="fill"
                        objectFit="contain"
                      />
                    </AppIcon>
                    <AppLabel>{item.lable}</AppLabel>
                  </AppWrapper>
                </a>
              </Link>
            ))}
          </AppSlideWrapper>
        </SwiperSlide>
      </Swiper>

      <AppTrayWrapper>
        {TrayApps.map((item, key) => (
          <Link href={item.link} passHref key={`tray-${key}`}>
            <a>
              <AppWrapper>
                <AppIcon backdrop={item.path}>
                  <Image src={item.path} layout="fill" objectFit="contain" />
                </AppIcon>
                <AppLabel>{item.lable}</AppLabel>
              </AppWrapper>
            </a>
          </Link>
        ))}
      </AppTrayWrapper>
    </motion.div>
  );
};

Home.inner = false;

export default Home;

const AppTrayWrapper = styled.div(() => [
  tw`w-full grid grid-flow-row grid-cols-4 
  justify-items-center h-[6.5rem] items-center relative`,
  css`
    &:before {
      ${tw`content-[""] absolute w-[104%] h-full top-[65%]`}
      transform: perspective(800px) rotateX(45deg) translateY(-50%);
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.74);
      -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.74);
      -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.74);
      background: linear-gradient(
        -200deg,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.3) 20%
      );
      background-repeat: no-repeat;
    }
  `,
]);

const AppIcon = styled.div((props: any) => [
  tw`h-16 w-16 relative cursor-pointer`,
  props.backdrop &&
  css`
      &:before {
        content: "";
        background-image: url("${props.backdrop}");
        ${tw`absolute top-[95%] h-full w-full bg-contain rotate-180 opacity-70 z-[-1]`}
      }
    `,
]);

const AppLabel = styled.span(() => [
  tw`block text-sm font-bold text-white`,
  css`
    text-shadow: 0px 4px 7px rgba(0, 0, 0, 0.56);
  `,
]);

const AppWrapper = styled.div(() => [
  tw`flex flex-col items-center
  justify-center gap-y-0 w-full h-full relative`,
]);

const AppSlideWrapper = styled.div(() => [
  tw`flex-[1] grid grid-flow-row grid-cols-4 grid-rows-none items-center justify-center gap-y-4`,
  tw`lg:(grid-cols-4 gap-y-5)`,
]);

const TrayApps = [
  {
    path: "/images/icon_phone.png",
    link: "/",
    lable: "Phone",
  },
  {
    path: "/images/icon_safari.png",
    link: "https://www.dextools.io/app/en/ether/pair-explorer/0x780faa810bda4f82ca9da5ec84743c804ed92416",
    lable: "Dextools",
  },
  {
    path: "/images/icon_photos.png",
    link: "/photos",
    lable: "Photos",
  },
  {
    path: "/images/icon_mail.png",
    link: "/",
    lable: "Mail",
  },
];

const Apps = [
  {
    path: "/images/icon_imessage.png",
    lable: "iMessage",
    link: "/",
  },
  // {
  //   path: "/images/icon_contacts.png",
  //   lable: "Contacts",
  //   link: "/contacts",
  // },
  // {
  //   path: "/images/icon_appstore.png",
  //   lable: "App Store",
  //   link: "/",
  // },
  // {
  //   path: "/images/icon_camera.png",
  //   lable: "Camera",
  //   link: "/",
  // },
  {
    path: "/images/icon_music.png",
    lable: "Music",
    link: "/music",
  },
  // {
  //   path: "/images/icon_settings.png",
  //   lable: "Settings",
  //   link: "/",
  // },
  {
    path: "/images/icon_notes.png",
    lable: "Notes",
    link: "/notes/k43Nex3rpTn8ygypkXu2",
  },
  {
    path: "/images/icon_youtube.png",
    lable: "YouTube",
    link: "/",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/wallpapers%2Fwallpaper-7a598071-42fa-4e30-afc2-b0351f4310d9.gif?alt=media",
    lable: "Instagram",
    link: "/instagram",
  },
  {
    path: "/images/icon_snapchat.png",
    lable: "Snapchat",
    link: "/snapchat",
  },
  {
    path: "/images/icon_kik.png",
    lable: "Kik",
    link: "/kik",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/wallpapers%2Fwallpaper-96faedc8-6aa4-4ecc-8e71-203c82339b9b.png?alt=media",
    lable: "@2k13ai",
    link: "https://twitter.com/2k13ai",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/icons%2Fdexscreenericon.png?alt=media&token=e14d1437-3ae5-422a-9d2d-030501c12304",
    lable: "Dex",
    link: "https://dexscreener.com/solana/Bifra4YtBnbAwsWVe8nECDocUNoyfLYko2HnfGoGpump",
  }
  // {
  //   path: "/images/icon_flipagram.png",
  //   lable: "Flipagram",
  //   link: "/flipagram",
  // }
];
