import {
  AppHeader,
  AppHeadLabel,
  BackButton,
} from "@/components/elements/emotionHeader";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import tw from "twin.macro";

const Notes: React.FC<any> = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-[#f7f19e]`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#442f2a" c2="#755548">
        <AppHeadLabel css={tw`text-center`}>Notes (2)</AppHeadLabel>
        <Link href="/">
          <a>
            <BackButton hoverColor="#442f2a">back</BackButton>
          </a>
        </Link>
      </AppHeader>
      <div css={tw`absolute overflow-auto h-full w-full pt-[4.4rem] z-10`}>
        <NotesListWrapper>
          {NOTES.map((item: any, key: number) => (
            <Link href={`/notes/${item.slug}`} passHref>
              <a>
                <div
                  css={tw`flex justify-between border-b-[#442f2a] border-b-[1px] px-4 py-3`}
                >
                  <span css={tw`text-lg text-[#755548] font-bold`}>
                    {item.title}
                  </span>
                  <span css={tw`text-md text-[#b7b079] font-bold`}>
                    {item.date}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </NotesListWrapper>
      </div>
    </motion.div>
  );
};

const NotesListWrapper = styled.div(() => [
  tw`h-[max-content] min-h-full w-full relative`,
]);

export default Notes;

const NOTES = [
  {
    slug: 1,
    title: "Test 1",
    date: "Wednesday",
  },
  {
    slug: 1,
    title: "Test 1",
    date: "Apr 1",
  },
  {
    slug: 1,
    title: "Test 1",
    date: "Mar 27",
  },
];
