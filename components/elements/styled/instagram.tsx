import styled from "@emotion/styled";
import tw from "twin.macro";

const InstagramAppBar = styled.div(() => [
  tw`absolute bottom-0 w-full h-auto grid grid-flow-row grid-cols-5 z-20 bg-black`,
  
]);

const InstagramNavItem = styled.div((props:any) => [
  tw`w-full h-full py-2 text-center text-white cursor-pointer text-[1.5rem]`,
  tw`transition-all duration-150 ease-in`,
  tw`hover:(bg-[#3F729B])`,
  props.active && tw`bg-[#3F729B]`
]);

export { InstagramAppBar, InstagramNavItem };
