import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const BackButton = styled.button(() => [
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
  tw`bg-[#00000070] before:(bg-[#00000070] transition-all duration-150 ease-in)`,
  tw`hover:(bg-[#00000090] before:(bg-[#00000090]))`,
]);

export { BackButton };
