import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const SongsNavBarContainer = styled.div((props: any) => [
  tw`absolute bottom-0 w-full py-1 h-auto gap-x-2 px-2 grid grid-flow-row grid-cols-5 z-20 bg-black`,
  css`
    &:before {
      ${tw`content-[""] absolute top-0 left-0 w-full h-full z-[-1]`}
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

const SongsNavItem = styled.div((props: any) => [
  tw`w-full h-full py-1 text-center flex flex-col rounded-md text-[#ffffff80] gap-y-1 cursor-pointer`,
  props.active && tw`bg-[#ffffff20]`,
  props.active &&
    css`
      span {
        ${tw`text-white`}
      }
    `,
  tw`transition-all duration-150 ease-in`,
  tw`hover:(bg-[#ffffff20])`,
  css`
    i {
      ${tw`text-[#ffffff80]`}
      ${props.active && tw`text-[#52abff]`}
    }
    span {
      ${tw`font-bold text-xs`}
    }
  `,
]);

export { SongsNavBarContainer, SongsNavItem };
