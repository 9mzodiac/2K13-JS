import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { SnapFeedMessageType } from "../Snapchat/SnapsFeed";

const SnapFeedItemContainer = styled.div(() => [
  tw`bg-white flex border-b-[.5px] border-[#bfbfbf] items-center justify-start px-3 py-4 gap-x-4 font-sans`,
  tw`cursor-pointer hover:(bg-[#f5f3f2]) transition-all duration-100 ease-in`,
  tw`last:shadow`,
]);

const SnapFeedStateWrapper = styled.div(() => [
  tw`relative h-7 w-7`,
  css`
    aspect-ratio: 1/1;
  `,
]);

const SnapFeedTitle = styled.h2(({ type }: { type: SnapFeedMessageType }) => [
  tw`text-[1.3rem] leading-4 capitalize`,
  { received: [tw`font-medium`], sent: [tw`font-normal`] }[type],
]);

const SnapFeedDetails = styled.span(({ type }: any) => [
  tw`text-[.85rem] font-medium text-[#bfbfbf] leading-3 tracking-tighter`,
]);

const SnapFeedDetailWrapper = styled.div(() => [
  tw`flex flex-col justify-center items-start gap-y-1`,
]);

const SnapCameraBackground = styled.div(() => [
  tw`w-full h-full absolute top-0 left-0 z-0`,
]);

const SnapActionButton = styled.div(({ path, pressedPath }: any) => [
  tw`relative h-12 w-16 z-10 bg-contain bg-no-repeat cursor-pointer bg-center select-none`,
  css`
    background-image: url("${path}");
    &:active {
      background-image: url("${pressedPath}");
    }
  `,
  tw`transition-all duration-100 ease-in`,
]);

const SnapCaptionBar = styled.span(({ position }: any) => [
  tw`absolute h-7 w-full bg-[#00000090] -translate-y-1/2`,
  tw`text-md font-light text-white text-center flex justify-center items-center`,
  position === SnapCaptionType.CENTER && tw`top-1/2`,
  position === SnapCaptionType.BOTTOM && tw`top-3/4`,
  position === SnapCaptionType.TOP && tw`top-1/4`,
]);

enum SnapCaptionType {
  CENTER = "center",
  BOTTOM = "bottom",
  TOP = "top",
}

export {
  SnapFeedItemContainer,
  SnapFeedStateWrapper,
  SnapFeedTitle,
  SnapFeedDetails,
  SnapFeedDetailWrapper,
  SnapCameraBackground,
  SnapActionButton,
  SnapCaptionBar,
  SnapCaptionType,
};
