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

const ImagePath = "/snapchat/";

const SnapView: CustomPage = (props: any) => {
  const [counter, setCounter] = useState(10);

  const router = useRouter();

  useEffect(() => {
    counter > 0
      ? setTimeout(() => setCounter(counter - 1), 1000)
      : router.replace("/snapchat");
  }, [counter]);

  return (
    <motion.div
      css={tw`flex flex-col justify-between h-full bg-white font-roboto`}
    >
      <SnapCameraBackground>
        <Image src="/snap-camera.jpeg" layout="fill" objectFit="cover" />
      </SnapCameraBackground>
      <SnapCaptionBar position={SnapCaptionType.CENTER}>
        Woo crazy night!!!!
      </SnapCaptionBar>
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

export default SnapView;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //@ts-ignore
  const slug: string = params?.slug;
  let noteData;
  if (slug) {
    noteData = await ADMIN_DB.collection("notes").doc(slug).get();
  }

  return {
    props: {
      data: noteData && JSON.parse(JSON.stringify(noteData.data())),
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const notesCollection = await ADMIN_DB.collection("notes").get();
  const notes = [];

  for await (const note of notesCollection.docs) {
    notes.push({
      params: {
        slug: note.id,
      },
    });
  }

  return {
    paths: notes,
    fallback: true,
  };
};
