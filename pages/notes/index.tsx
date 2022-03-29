import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import tw from "twin.macro";

const Notes: NextPage = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-[#f7f19e]`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#442f2a" c2="#755548">
        <AppHeadLabel>Notes (2)</AppHeadLabel>
        <Link href="/">
          <a>
            <IosButton left hoverColor="#442f2a" color="#755548">
              back
            </IosButton>
          </a>
        </Link>
      </AppHeader>
      <ListContainer>
        <ListWrapper>
          {NOTES.map((item: any, key: number) => (
            <Link href={`/notes/${item.slug}`} passHref key={`notes-${key}`}>
              <a>
                <div
                  css={tw`flex justify-between border-b-[#442f2a] border-b-[1px] px-4 py-3`}
                >
                  <span css={tw`text-lg text-[#755548] font-bold`}>
                    {item.title}
                  </span>
                  <span
                    css={tw`text-md text-[#b7b079] font-bold flex items-center`}
                  >
                    {item.date}
                    <i className="icomoon icon-chevron-right"></i>
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </ListWrapper>
      </ListContainer>
    </motion.div>
  );
};

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
