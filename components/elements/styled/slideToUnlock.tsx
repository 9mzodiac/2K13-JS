import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import tw from "twin.macro";

const UnlockButton = styled.div(() => [
  tw`w-full relative h-[5.5rem] flex justify-center items-center px-5`,
  css`
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #3b3b3b),
      color-stop(1, #000000)
    );
    background-repeat: no-repeat;
  `,
]);

const UnlockSliderWrapper = styled(motion.div)(() => [
  tw`relative w-full h-12`,
  tw`px-1 pr-5 py-1 rounded-xl overflow-hidden flex justify-center items-center`,
  css`
    background: -moz-linear-gradient(top, #010101, #181818);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #010101),
      color-stop(1, #181818)
    );
    border: 2px solid #454545;
    -webkit-user-select: none;
  `,
]);

const Slider = styled(motion.div)(() => [
  tw`w-16 h-10 absolute cursor-pointer top-1/2 -translate-y-1/2 left-0`,
  css`
    .slider-image {
      pointer-events: none;
    }
  `,
]);

const SlideToUnlock = styled.h2(() => [
  tw`text-[1.4rem] text-right mr-[1.625rem]`,
  css`
    background: -moz-linear-gradient(
      left,
      #4d4d4d,
      0.4,
      #4d4d4d,
      0.5,
      white,
      0.6,
      #4d4d4d,
      #4d4d4d
    );
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0, #4d4d4d),
      color-stop(0.4, #4d4d4d),
      color-stop(0.5, white),
      color-stop(0.6, #4d4d4d),
      color-stop(1, #4d4d4d)
    );
    -moz-background-clip: text;
    -webkit-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-animation: ${SlideToUnlockAnimate} 3s infinite;
    padding: 0;
    width: 100%;
    -webkit-text-size-adjust: none;
  `,
]);

const SlideToUnlockAnimate = keyframes`
  0% {
    background-position: -110px 0;
  }
  100%{
    background-position: 130px 0;
  }
  `;

export { UnlockButton, UnlockSliderWrapper, Slider, SlideToUnlock };
