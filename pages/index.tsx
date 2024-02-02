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
    lable: "Tokenomics",
    link: "/notes/k43Nex3rpTn8ygypkXu2",
  },
  {
    path: "/images/icon_youtube.png",
    lable: "YouTube",
    link: "/",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/icons%2Ficons-d13b5e83-9623-433a-bc89-87d68bfa8e0d.png?alt=media&token=ee3bc7e1-5133-4eb0-997e-928045f343a5",
    lable: "Instagram",
    link: "/",
  },
  {
    path: "/images/icon_snapchat.png",
    lable: "Snapchat",
    link: "/snapchat",
  },
  {
    path: "/images/icon_kik.png",
    lable: "Kik",
    link: "/",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/icons%2F999.png?alt=media&token=b81fb70d-a92f-4a61-b28c-35aa4effe0f5",
    lable: "SolScan",
    link: "https://birdeye.so/token/7q5A9cF7mBNpRCWYYuQoAe9Nh79M5wKPva9sHtaLcU7j?chain=solana",
  },
  {
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/wallpapers%2Fwallpaper-96faedc8-6aa4-4ecc-8e71-203c82339b9b.png?alt=media",
    lable: "@ios5Solana",
    link: "https://twitter.com/ios5Solana",
  },{
    path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/instagram%2Finstapost-217faadd-e0e9-4667-b928-a71f9b0ee4d2.png?alt=media",
    lable: "Telegram",
    link: "https://t.me/ios5_portal",
  },
  // {
  //   path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/icons%2Ficon_banana_gun.png?alt=media&token=ea2f5262-4f47-4c1b-9a52-0f26fc547646",
  //   lable: "Banana",
  //   link: "https://t.me/BananaGunSniper_bot?start=snp_Basic_0xf170eb4553Ca743EF403B3c2b8c1Ad38fb5cb5c8",
  // },
  // {
  //   path: "https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/icons%2Ficon_unibot.png?alt=media&token=40cb55b3-7f2f-4c16-bbed-91d428517d13",
  //   lable: "Unibot",
  //   link: "https://t.me/unibotsniper_bot?start=basic-0xf170eb4553Ca743EF403B3c2b8c1Ad38fb5cb5c8",
  // }
  // {
  //   path: "/images/icon_flipagram.png",
  //   lable: "Flipagram",
  //   link: "/flipagram",
  // }
];
