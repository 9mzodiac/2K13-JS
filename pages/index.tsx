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

const Home: NextPage = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(false);

  return (
    <motion.div
      css={tw`flex flex-col justify-between h-full pt-5`}
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
              <Link href="/notes" passHref>
                <a>
                  <AppWrapper>
                    <AppIcon>
                      <Image
                        src={item.path}
                        layout="fill"
                        objectFit="contain"
                      />
                    </AppIcon>
                    <span css={tw`block text-sm font-normal text-white`}>
                      {item.lable}
                    </span>
                  </AppWrapper>
                </a>
              </Link>
            ))}
          </AppSlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <AppSlideWrapper>
            {Apps.map((item) => (
              <AppWrapper>
                <AppIcon>
                  <Image src={item.path} layout="fill" objectFit="contain" />
                </AppIcon>
                <span css={tw`block text-sm font-normal text-white`}>
                  {item.lable}
                </span>
              </AppWrapper>
            ))}
          </AppSlideWrapper>
        </SwiperSlide>
      </Swiper>

      <AppTrayWrapper>
        {TrayApps.map((item, key) => (
          <AppIcon backdrop={item.path}>
            <Image src={item.path} layout="fill" objectFit="contain" />
          </AppIcon>
        ))}
      </AppTrayWrapper>
    </motion.div>
  );
};

export default Home;

const AppTrayWrapper = styled.div(() => [
  tw`w-full grid grid-flow-row grid-cols-4 
  justify-items-center h-20 items-center relative`,
  tw`before:(content-[""] absolute w-full h-full bg-white opacity-40 top-2/3)`,
  css`
    &:before {
      transform: perspective(800px) rotateX(45deg) translateY(-50%);
    }
  `,
]);

const AppIcon = styled.div((props: any) => [
  tw`h-12 w-12 relative cursor-pointer`,
  props.backdrop &&
    css`
      &:before {
        content: "";
        background-image: url("${props.backdrop}");
        ${tw`absolute top-full h-full w-full bg-contain rotate-180 opacity-50`}
      }
    `,
]);

const AppWrapper = styled.div(() => [
  tw`flex flex-col items-center
  justify-center gap-y-2 w-full h-full relative`,
]);

const AppSlideWrapper = styled.div(() => [
  tw`flex-[1] grid grid-flow-row grid-cols-4 grid-rows-3 items-center justify-center gap-y-4`,
  tw`lg:(grid-cols-4 grid-rows-4 gap-y-7)`,
]);

const TrayApps = [
  {
    path: "/images/icon_phone.png",
  },
  {
    path: "/images/icon_safari.png",
  },
  {
    path: "/images/icon_photos.png",
  },
  {
    path: "/images/icon_mail.png",
  },
];

const Apps = [
  {
    path: "/images/icon_appstore.png",
    lable: "App Store",
  },
  {
    path: "/images/icon_camera.png",
    lable: "Camera",
  },
  {
    path: "/images/icon_instagram.png",
    lable: "Instagram",
  },
  {
    path: "/images/icon_soundcloud.png",
    lable: "Soundcloud",
  },
  {
    path: "/images/icon_notes.png",
    lable: "Notes",
  },
  {
    path: "/images/icon_weather.png",
    lable: "Weather",
  },
  {
    path: "/images/icon_youtube.png",
    lable: "YouTube",
  },
];
