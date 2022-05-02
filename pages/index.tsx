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
  justify-items-center h-24 items-center relative`,
  css`
    &:before {
      ${tw`content-[""] absolute w-full h-full bg-white opacity-40 top-2/3`}
      transform: perspective(800px) rotateX(45deg) translateY(-50%);
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
        ${tw`absolute top-full h-full w-full bg-contain rotate-180 opacity-50 z-[-1]`}
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
  justify-center gap-y-1 w-full h-full relative`,
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
    link: "/",
    lable: "Safari",
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
    path: "/images/icon_appstore.png",
    lable: "App Store",
    link: "/",
  },
  {
    path: "/images/icon_camera.png",
    lable: "Camera",
    link: "/",
  },
  {
    path: "/images/icon_instagram.png",
    lable: "Instagram",
    link: "/instagram",
  },
  {
    path: "/images/icon_music.png",
    lable: "Music",
    link: "/music",
  },
  {
    path: "/images/icon_settings.png",
    lable: "Settings",
    link: "/",
  },
  {
    path: "/images/icon_notes.png",
    lable: "Notes",
    link: "/notes",
  },
  {
    path: "/images/icon_weather.png",
    lable: "Weather",
    link: "/",
  },
  {
    path: "/images/icon_youtube.png",
    lable: "YouTube",
    link: "/",
  },
];
