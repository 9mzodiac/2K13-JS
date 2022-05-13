import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { SnapFeedMessageType } from "../Snapchat/SnapsFeed";

const SnapFeedItemContainer = styled.div(() => [
  tw`bg-white flex border-b-[.5px] border-[#bfbfbf] items-center justify-start p-3 gap-x-4 font-sans`,
  tw`cursor-pointer hover:(bg-[#f5f3f2]) transition-all duration-100 ease-in`,
  tw`last:shadow`,
]);

const SnapFeedStateWrapper = styled.div(() => [
  tw`relative h-8 w-8`,
  css`aspect-ratio:1/1`,
]);

const SnapFeedTitle = styled.h2(({ type }: { type: SnapFeedMessageType }) => [
  tw`text-[1.2rem] leading-5`,
  { received: [tw`font-medium`], sent: [tw`font-normal`] }[type],
]);

const SnapFeedDetails = styled.span(({ type }: any) => [
  tw`text-sm font-medium text-[#bfbfbf] leading-3`,
]);

const SnapFeedDetailWrapper = styled.div(() => [
  tw`flex flex-col justify-center items-start gap-y-1`,
]);

const SnapCameraBackground = styled.div(() => [
  tw`w-full h-full absolute top-0 left-0 z-0`,
]);

export {
  SnapFeedItemContainer,
  SnapFeedStateWrapper,
  SnapFeedTitle,
  SnapFeedDetails,
  SnapFeedDetailWrapper,
  SnapCameraBackground,
};
