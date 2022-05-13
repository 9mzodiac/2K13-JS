import { CustomPage } from "types/pages";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { SnapCameraBackground } from "@/components/elements/styled/snapchat";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ImagePath = "/snapchat/";
const SnapCamera: CustomPage = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col justify-between h-full bg-white font-roboto`}
    >
      <SnapCameraBackground>
        <Image src="/snap-camera.jpeg" layout="fill" objectFit="cover" />
      </SnapCameraBackground>
      <div css={tw`flex justify-end`}>
        <CameraSwitch
          path={`${ImagePath}camera_switch_btn.png`}
          pressedPath={`${ImagePath}camera_switch_btn_pressed.png`}
        />
      </div>
      <SnapTray>
        <SnapTrayImageWrapper>
          <img
            css={tw`h-auto w-full`}
            src={`${ImagePath}camera_toolbar.9.png`}
          />
        </SnapTrayImageWrapper>
        <div css={tw`absolute w-full h-full`}>
          <div css={tw`relative w-full h-full py-10`}>
            <SnapTrapButton path={`${ImagePath}camera_take_photo_btn.png`} />
          </div>
        </div>
      </SnapTray>
    </motion.div>
  );
};
SnapCamera.inner = true;
export default SnapCamera;

const SnapTray = styled.div(() => [tw`w-full h-32 z-10 relative`]);
const SnapTrayImageWrapper = styled.div(() => [
  tw`absolute w-full h-full flex items-end`,
]);

const SnapTrapButton = styled.div(({ path, pressedPath }: any) => [
  tw`h-full w-full z-20 absolute bg-contain bg-no-repeat cursor-pointer bg-center select-none`,
  tw`left-1/2 -translate-x-1/2 bottom-[.2rem]`,
  css`
    background-image: url("${path}");
    &:active {
      background-image: url("${pressedPath}");
    }
  `,
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
