import { CustomPage } from "types/pages";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { GetStaticPaths, GetStaticProps } from "next";
import { ADMIN_DB } from "@/firebase/admin";
import {
  SnapActionButton,
  SnapCameraBackground,
  SnapCaptionBar,
  SnapCaptionType,
} from "@/components/elements/styled/snapchat";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SnapFeedType } from "@/components/elements/Snapchat/SnapsFeed";

const ImagePath = "/snapchat/";

const SnapView: CustomPage = ({ data }: any) => {
  const [counter, setCounter] = useState(parseInt(data.duration));

  const router = useRouter();

  useEffect(() => {
    let counterInstance: any;
    counter > 0
      ? (counterInstance = setTimeout(() => setCounter(counter - 1), 1000))
      : router.replace("/snapchat");
    return () => clearTimeout(counterInstance);
  }, [counter]);

  return (
    <motion.div
      css={tw`flex flex-col justify-between h-full bg-white font-roboto`}
    >
      <SnapCameraBackground>
        {data.type === SnapFeedType.IMAGE && (
          <Image src={data.media} layout="fill" objectFit="cover" />
        )}
        {data.type === SnapFeedType.VIDEO && <video css={tw`object-cover h-full w-full`} autoPlay src={data.media} />}
      </SnapCameraBackground>
      {data.caption && (
        <SnapCaptionBar position={SnapCaptionType.CENTER}>
          {data.caption}
        </SnapCaptionBar>
      )}

      <div css={tw`flex justify-between`}>
        <SnapActionButton
          path={`${ImagePath}camera_x_btn.png`}
          pressedPath={`${ImagePath}camera_x_btn_pressed.png`}
        >
          <Link href="/snapchat">
            <a
              css={tw`absolute w-full h-full top-0 left-0 bottom-0 right-0`}
            ></a>
          </Link>
        </SnapActionButton>
        <SnapActionButton
          css={tw`flex justify-center items-center`}
          path={`${ImagePath}camera_timer_btn.png`}
          pressedPath={`${ImagePath}camera_timer_btn_pressed.png`}
        >
          <span css={tw`text-sm font-light active:text-white`}>{counter}</span>
        </SnapActionButton>
      </div>
    </motion.div>
  );
};

SnapView.inner = true;
export default SnapView;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //@ts-ignore
  const slug: string = params?.slug;
  let snapData;
  if (slug) {
    snapData = await ADMIN_DB.collection("snapchat").doc(slug).get();
  }

  return {
    props: {
      data: snapData && JSON.parse(JSON.stringify(snapData.data())),
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const snapCollection = await ADMIN_DB.collection("snapchat").get();
  const snaps = [];

  for await (const snap of snapCollection.docs) {
    snaps.push({
      params: {
        slug: snap.id,
      },
    });
  }

  return {
    paths: snaps,
    fallback: true,
  };
};
