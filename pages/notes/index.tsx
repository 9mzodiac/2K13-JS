import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import { ADMIN_DB } from "@/firebase/admin";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import tw from "twin.macro";
import dayjs from "dayjs";

const Notes: NextPage = ({ notes }: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-[#f7f19e]`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#442f2a" c2="#755548">
        <AppHeadLabel>Notes ({notes.length})</AppHeadLabel>
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
          {notes.length > 0 &&
            notes.map((item: any) => (
              <Link
                href={`/notes/${item.id}`}
                passHref
                key={`notes-${item.id}`}
              >
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
                      {dayjs(item.date).format("MMM DD")}
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

export const getStaticProps: GetStaticProps = async () => {
  const notesCollection = await ADMIN_DB.collection("notes").get();

  const notes = [];
  for await (const note of notesCollection.docs) {
    notes.push({
      id: note.id,
      ...note.data(),
    });
  }

  return {
    props: {
      notes: JSON.parse(JSON.stringify(notes)),
    },
  };
};
