import { CustomPage } from "types/pages";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { SnapCameraBackground } from "@/components/elements/styled/snapchat";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { ADMIN_DB } from "@/firebase/admin";
import { useEffect, useState } from "react";

const ImagePath = "/snapchat/";

enum CameraSwitchType {
  FRONT = "front_camera",
  BACK = "back_camera",
}
const SnapCamera: CustomPage = ({ cameraImages, snapsCount }: any) => {
  const [cameraSwitchType, setCameraSwitchType] = useState(
    CameraSwitchType.FRONT
  );

  const toggleSwitch = () => {
    cameraSwitchType === CameraSwitchType.FRONT &&
      setCameraSwitchType(CameraSwitchType.BACK);

    cameraSwitchType === CameraSwitchType.BACK &&
      setCameraSwitchType(CameraSwitchType.FRONT);
  };

  const frontCameraBG = cameraImages.find(
    (image: any) => image.type == CameraSwitchType.FRONT
  ).imageURL;

  const backCameraBG = cameraImages.find(
    (image: any) => image.type == CameraSwitchType.BACK
  ).imageURL;

  return (
    <motion.div
      css={tw`flex flex-col justify-between h-full bg-white font-roboto`}
    >
      {cameraSwitchType === CameraSwitchType.FRONT && (
        <SnapCameraBackground>
          <Image
            src={frontCameraBG}
            layout="fill"
            objectFit="cover"
            blurDataURL={backCameraBG}
            placeholder="blur"
          />
        </SnapCameraBackground>
      )}
      {cameraSwitchType === CameraSwitchType.BACK && (
        <SnapCameraBackground>
          <Image
            src={backCameraBG}
            layout="fill"
            objectFit="cover"
            blurDataURL={backCameraBG}
            placeholder="blur"
          />
        </SnapCameraBackground>
      )}
      <div css={tw`flex justify-end`}>
        <CameraSwitch
          onClick={toggleSwitch}
          path={`${ImagePath}camera_switch_btn.png`}
          pressedPath={`${ImagePath}camera_switch_btn_pressed.png`}
        />
      </div>
      <SnapTray>
        <SnapFeedNotification>
          <SnapFeedCount>{snapsCount}</SnapFeedCount>
          <Link href="/snapchat">
            <a
              css={tw`justify-self-center items-end absolute top-0 left-0 right-0 bottom-0`}
            ></a>
          </Link>
          <div css={tw`h-6 w-6 relative pointer-events-none`}>
            <Image
              src="/snapchat/snap_feed_white.png"
              layout="fill"
              objectFit="contain"
              blurDataURL="/snapchat/snap_feed_white.png"
              placeholder="blur"
            />
          </div>
        </SnapFeedNotification>
        <SnapCameraButton></SnapCameraButton>

        <CameraMenu
          path={`${ImagePath}camera_menu_btn.png`}
          pressedPath={`${ImagePath}camera_menu_btn_pressed.png`}
        ></CameraMenu>
      </SnapTray>
    </motion.div>
  );
};
SnapCamera.inner = true;
export default SnapCamera;

export const getStaticProps: GetStaticProps = async () => {
  const sanpCameraCollection = await ADMIN_DB.collection(
    "snapchat_camera"
  ).get();

  const snapchatCollection = await ADMIN_DB.collection("snapchat").get();

  const cameraImages = [];
  for await (const image of sanpCameraCollection.docs) {
    cameraImages.push({
      id: image.id,
      ...image.data(),
    });
  }

  return {
    props: {
      cameraImages: JSON.parse(JSON.stringify(cameraImages)),
      snapsCount: snapchatCollection.size,
    },
    revalidate: 10,
  };
};

const SnapCameraButton = styled.div(() => [
  tw`h-20 w-20 rounded-full justify-self-center items-end border-2 border-white`,
  tw`transition-all duration-100 ease-in cursor-pointer`,
  css`
    box-shadow: inset 8px 10px 9px -6px white;
    &:hover {
      box-shadow: inset 12px 10px 12px -6px white;
    }
  `,
]);

const SnapFeedNotification = styled.div(() => [
  tw`flex justify-center items-center mb-2`,
  tw`cursor-pointer h-10 w-10 bg-[#fb3662] rounded-lg border-2 border-white justify-self-start self-end relative`,
  css`
    box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.34);
  `,
]);

const SnapFeedCount = styled.span(() => [
  tw`absolute flex justify-center items-center text-md text-white font-normal top-0`,
  tw`-right-1/2 w-5 h-5 rounded-full bg-[#fb3662] border-2 border-white -translate-x-1/2 -translate-y-1/2`,
  css`
    box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.34);
  `,
]);

const CameraMenu = styled.div(({ path, pressedPath }: any) => [
  tw`relative h-12 w-12 justify-self-end self-end z-10 bg-transparent bg-contain bg-no-repeat cursor-pointer bg-center select-none`,
  css`
    background-image: url("${path}");
    &:active {
      background-image: url("${pressedPath}");
    }
  `,
  tw`transition-all duration-100 ease-in`,
]);

const SnapTray = styled.div(() => [
  tw`w-full h-auto px-4 pb-5 z-10 relative grid grid-flow-row grid-cols-3`,
]);

const CameraSwitch = styled.div(({ path, pressedPath }: any) => [
  tw`h-12 w-16 z-10 bg-contain bg-no-repeat cursor-pointer bg-center select-none`,
  css`
    background-image: url("${path}");
    &:active {
      background-image: url("${pressedPath}");
    }
  `,
  tw`transition-all duration-100 ease-in`,
]);
