import { CustomPage } from "types/pages";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { AppHeader, IosButton } from "@/components/elements/styled/header";
import Image from "next/image";
import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SnapFeed from "@/components/elements/Snapchat/SnapsFeed";
import Link from "next/link";
import { GetStaticProps } from "next";
import { ADMIN_DB } from "@/firebase/admin";
import { useState } from "react";
import { SnapCameraBackground } from "@/components/elements/styled/snapchat";
import { Swiper, SwiperSlide } from "swiper/react";

const ImagePath = "/snapchat/";

enum CameraSwitchType {
  FRONT = "front_camera",
  BACK = "back_camera",
}

const Snapchat: CustomPage = ({ snaps, cameraImages, snapsCount }: any) => {
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

  const [swiperInstance, setSwiperInstance] = useState<any>(false);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        lazy={false}
        resistanceRatio={0}
      >
        <SwiperSlide>
          <motion.div css={tw`flex flex-col h-full bg-white`}>
            <AppHeader
              c1="#4fab86"
              c2="#8bc9a3"
              css={tw`py-[.4rem] before:opacity-100`}
            >
              <IosButton
                left
                css={tw`px-[.2rem]! flex justify-center items-center`}
                hoverColor="#4fab86"
                color="#8bc9a3"
                onClick={() => {
                  swiperInstance?.slideTo(1);
                }}
              >
                <i
                  css={tw`text-white text-xl pl-1 pr-2`}
                  className="icomoon icon-camera"
                ></i>
              </IosButton>
              <IosButton
                css={tw`right-[.5rem] px-[.8rem]! text-sm font-bold`}
                hoverColor="#4fab86"
                color="#8bc9a3"
              >
                Clear
              </IosButton>

              <div css={tw`w-full h-7 relative`}>
                <Image
                  src="/snapchat/feed_snapchat_logo.png"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </AppHeader>
            <SnapchatBackground>
              <Image
                src="/snapchat/feed_background_ghosts.png"
                layout="fill"
                objectFit="cover"
              />
            </SnapchatBackground>
            <ListContainer css={tw`pb-[3.2rem] pt-[2.5rem]`}>
              <ListWrapper>
                {snaps.length > 0 &&
                  snaps.map((snap: any) => (
                    <Link href={`/snapchat/${snap.id}`} key={snap.id}>
                      <a>
                        <SnapFeed
                          type={snap.type}
                          messageType={snap.messageType}
                          state={snap.state}
                          title={snap.user.username}
                          time={snap.createdDate}
                        />
                      </a>
                    </Link>
                  ))}
              </ListWrapper>
            </ListContainer>
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div css={tw`flex flex-col justify-between h-full bg-white`}>
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
              <SnapFeedNotification
                onClick={() => {
                  swiperInstance?.slideTo(0);
                }}
              >
                <SnapFeedCount>{snapsCount}</SnapFeedCount>
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
        </SwiperSlide>
      </Swiper>
    </>
  );
};

Snapchat.inner = true;

export default Snapchat;

export const getStaticProps: GetStaticProps = async () => {
  const snapchatCollection = await ADMIN_DB.collection("snapchat").get();

  const snaps = [];
  for await (const snap of snapchatCollection.docs) {
    snaps.push({
      id: snap.id,
      ...snap.data(),
    });
  }

  const sanpCameraCollection = await ADMIN_DB.collection(
    "snapchat_camera"
  ).get();

  const cameraImages = [];
  for await (const image of sanpCameraCollection.docs) {
    cameraImages.push({
      id: image.id,
      ...image.data(),
    });
  }

  return {
    props: {
      snaps: JSON.parse(JSON.stringify(snaps)),
      cameraImages: JSON.parse(JSON.stringify(cameraImages)),
      snapsCount: snapchatCollection.size,
    },
    revalidate: 10,
  };
};

const SnapchatBackground = styled.div(() => [
  tw`absolute w-full h-full`,
  css`
    background: rgb(127, 219, 231);
    background: linear-gradient(
      130deg,
      rgba(127, 219, 231, 1) 0%,
      rgba(234, 237, 144, 1) 25%,
      rgba(255, 241, 127, 1) 49%,
      rgba(253, 225, 138, 1) 75%,
      rgba(246, 150, 188, 1) 100%
    );
  `,
]);

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
  tw`absolute flex justify-center items-center text-md text-white font-medium top-0`,
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
