import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const AppHeader = styled.div((props: any) => [
  tw`py-5 w-full text-center relative z-20`,
  css`
    &:before {
      ${tw`content-[""] absolute top-0 left-0 w-full h-full opacity-90 z-[-1]`}
      background-repeat: repeat-x;
      background-position: 0;

      background-image: -webkit-linear-gradient(
        90deg,
        ${props.c1} 0%,
        ${props.c1} 50%,
        ${props.c2} 60%,
        ${props.c2} 100%
      );
    }
  `,
]);

const AppHeadLabel = styled.h1(() => [tw`font-bold text-xl text-white`]);

const BackButton = styled.button((props: any) => [
  tw`py-1 px-4 text-white font-bold absolute left-4 top-1/2 -translate-y-1/2`,
  css`
    width: auto;
    background-size: 30px 30px;

    background-repeat: repeat-x;
    background-position: 0;

    background-image: -webkit-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );

    border-radius: 5px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.4);

    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2) inset,
      0 1px 2px rgba(0, 0, 0, 0.8) inset;

    color: #fff;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    z-index: 1;
    &:before {
      position: absolute;
      content: " ";
      left: -8px;
      top: 4px;
      height: 25px;
      width: 25px;
      z-index: -1;
      background-repeat: repeat-x;
      background-size: 30px 30px;
      background-position: -1px -1.5px;
      background-image: -moz-linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(255, 255, 255, 0.1) 52%,
        rgba(255, 255, 255, 0.4) 100%
      );
      background-image: -o-linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(255, 255, 255, 0.1) 52%,
        rgba(255, 255, 255, 0.4) 100%
      );
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(255, 255, 255, 0.1) 52%,
        rgba(255, 255, 255, 0.4) 100%
      );
      background-image: linear-gradient(
        45deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(255, 255, 255, 0.1) 52%,
        rgba(255, 255, 255, 0.4) 100%
      );

      -moz-transform: rotateZ(-45deg) skewY(-10deg) skewX(-10deg);
      -o-transform: rotateZ(-45deg) skewY(-10deg) skewX(-10deg);
      -webkit-transform: rotateZ(-45deg) skewY(-10deg) skewX(-10deg);
      transform: rotateZ(-45deg) skewY(-10deg) skewX(-10deg);
      border-top-right-radius: 11px;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 10px;

      border-left: 1px solid rgba(255, 255, 255, 0.4);

      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7) inset,
        2px -2px 2px -3px rgba(0, 0, 0, 0.5) inset;
    }
  `,
  tw`transition-all duration-150 ease-in`,
  css`
    &:before {
      ${tw`transition-all duration-150 ease-in`}
    }
    &:hover {
      background-color: ${props.hoverColor};
      &:before {
        background-color: ${props.hoverColor};
      }
    }
  `,
]);

export { BackButton, AppHeader, AppHeadLabel };
