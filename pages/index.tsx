import { motion } from "framer-motion";
import type { NextPage } from "next";
import Image from "next/image";
import tw from "twin.macro";

const Home: NextPage = () => {
  const pageVariants = {
    initial: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 1,
        type: "linear",
      },
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      css={tw`flex flex-col h-full py-5`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <div css={tw`flex-[1] grid grid-flow-row grid-cols-4 grid-rows-5`}>
        {Apps.map((item) => (
          <div
            css={tw`flex flex-col items-center gap-y-2 w-full h-full relative`}
          >
            <div css={tw`h-12 w-12 relative`}>
              <Image src={item.path} layout="fill" objectFit="contain" />
            </div>
            <span css={tw`block text-sm font-normal text-white`}>
              {item.lable}
            </span>
          </div>
        ))}
      </div>
      <div></div>
    </motion.div>
  );
};

export default Home;

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
