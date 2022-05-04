import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const AppHeader = styled.div((props: any) => [
  tw`py-2 w-full text-center relative z-20 flex justify-center items-center`,
  props.textureImage
    ? css`
        &:before {
          ${tw`content-[""] absolute top-0 left-0 w-full h-full z-[-1]`}
          background-image: url('${props.textureImage}');
          background-repeat: repeat;
        }
      `
    : css`
        &:before {
          ${tw`content-[""] absolute top-0 left-0 w-full h-full z-[-1]`}
          background-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(0, ${props.c2}),
            color-stop(1, ${props.c1})
          );
          background-repeat: no-repeat;
        }
      `,
]);

const AppHeadLabel = styled.h1(() => [
  tw`font-bold text-[1.2rem] text-white truncate text-center max-w-[7rem]`,
]);

const IosButton = styled.button((props: any) => [
  tw`py-1 px-3 text-white font-bold absolute top-1/2 -translate-y-1/2 leading-3`,
  tw`cursor-pointer block z-[1] absolute w-auto text-white`,
  css`
    height: 30px;
    background-repeat: repeat-x;
    background-size: 100% 30px;
    background-position: 0;
    background-image: -webkit-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
    border-radius: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2) inset,
      0 1px 2px rgba(0, 0, 0, 0.8) inset;
    text-align: center;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.8);
  `,
  props.left &&
    css`
      ${tw`left-4`}
      &:before {
        position: absolute;
        content: " ";
        left: -8px;
        top: 3.5px;
        height: 24px;
        width: 24px;
        z-index: 1;
        background-repeat: repeat-x;
        background-size: 20px 20px;
        background-position: -1px -0.5px;
        background-image: -webkit-gradient(
          linear,
          left bottom,
          right top,
          from(rgba(0, 0, 0, 0)),
          color-stop(0.5, rgba(0, 0, 0, 0)),
          color-stop(0.5, rgba(255, 255, 255, 0.1)),
          to(rgba(255, 255, 255, 0.3))
        );
        -webkit-transform: rotate(-45deg) skew(-10deg, -10deg);
        border-top-right-radius: 10px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 10px;
        border-left: 1.5px solid rgba(255, 255, 255, 0.4);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4) inset,
          -1px 1px 1px rgba(0, 0, 0, 0.5) inset;
        -webkit-mask-image: -webkit-gradient(
          linear,
          left top,
          right bottom,
          from(#000000),
          color-stop(0.4, #000000),
          color-stop(0.5, transparent),
          to(transparent)
        );
      }
    `,
  props.right &&
    css`
      ${tw`right-4`}
      &:after {
        position: absolute;
        content: " ";
        right: -7.5px;
        top: 3px;
        height: 24px;
        width: 24px;
        z-index: 1;
        background-repeat: repeat-x;
        background-size: 20px 20px;
        background-position: -1px -0.5px;
        background-image: -webkit-gradient(
          linear,
          left bottom,
          right top,
          from(rgba(255, 255, 255, 0.3)),
          color-stop(0.5, rgba(255, 255, 255, 0.1)),
          color-stop(0.5, rgba(0, 0, 0, 0)),
          to(rgba(0, 0, 0, 0))
        );
        -webkit-transform: rotate(135deg) skew(-10deg, -10deg);
        border-top-right-radius: 10px;
        border-top-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 10px;
        border-top: 1.5px solid rgba(255, 255, 255, 0.4);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5) inset,
          -1px 1px 1px rgba(0, 0, 0, 0.4) inset;
        -webkit-mask-image: -webkit-gradient(
          linear,
          left top,
          right bottom,
          from(#000000),
          color-stop(0.4, #000000),
          color-stop(0.5, transparent),
          to(transparent)
        );
      }
    `,
  css`
    &,
    &:before,
    &:after {
      ${tw`transition-all duration-150 ease-in`}
      ${props.color && `background-color: ${props.color};`}
    }
    &:hover {
      background-color: ${props.hoverColor};
      &:before,
      &:after {
        background-color: ${props.hoverColor};
      }
    }
  `,
]);

export { IosButton, AppHeader, AppHeadLabel };
