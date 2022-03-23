import {
  AppHeader,
  AppHeadLabel,
  BackButton,
} from "@/components/elements/emotionHeader";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import tw from "twin.macro";

const NotesDetail: React.FC<any> = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-[#f7f19e]`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#442f2a" c2="#755548">
        <AppHeadLabel css={tw`text-center`}>Notes</AppHeadLabel>
        <Link href="/notes">
          <a>
            <BackButton hoverColor="#442f2a">notes</BackButton>
          </a>
        </Link>
      </AppHeader>
      <div css={tw`absolute overflow-auto h-full w-full pt-[4.4rem] z-10`}>
        <NotesWrapper>
          <span
            css={tw`absolute top-0 left-8 h-full w-[1px] bg-[#4b4b4b]`}
          ></span>
          <span
            css={tw`absolute top-0 left-9 h-full w-[1px] bg-[#4b4b4b]`}
          ></span>
          <p css={tw`pl-10 pr-5 text-xl leading-[30px]`}>
            This is test notes, This is test notes, This is test notes, This is
            test notes, This is test notes,This is test notes,This is test
            notes,This is test notes,This is test notes,This is test notes,
          </p>
        </NotesWrapper>
      </div>
    </motion.div>
  );
};

const NotesWrapper = styled.div(() => [
  tw`h-[max-content] min-h-full w-full relative`,
  css`
    background-image: repeating-linear-gradient(
      #ffffc2 0px,
      #ffffc2 29px,
      #442f2a 30px
    );
  `,
]);

export default NotesDetail;
