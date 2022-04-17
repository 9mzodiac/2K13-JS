import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const InstagramAppBar = styled.div(() => [
  tw`absolute bottom-0 w-full h-auto grid grid-flow-row grid-cols-5 z-20 bg-gradient-to-b from-[#5a5a5a] to-[#464646] m-0!`,
]);

const InstagramNavItem = styled.div((props: any) => [
  tw`z-[-1] w-full h-full py-3 text-center cursor-pointer text-[1.5rem] flex justify-center items-center`,
  tw`border-[#2c2c2c] border-r-[1.5px]`,
  css`
    i {
      ${tw`bg-clip-text text-transparent bg-gradient-to-b from-[#ffffff] to-[#bfbfbf]`}
    }
  `,
  tw`transition-all duration-150 ease-in`,
  tw`hover:(bg-gradient-to-b from-[#101010] to-[#2c2c2c])`,
  props.active && tw`bg-gradient-to-b from-[#101010] to-[#2c2c2c] shadow-inner`,
  props.highlight && tw`bg-[#3F729B]`,
]);

export { InstagramAppBar, InstagramNavItem };
