import { ListContainer } from "@/components/elements/styled/common";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import { ADMIN_DB } from "@/firebase/admin";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import tw from "twin.macro";
import { CustomPage } from "types/pages";

const LineLeft = styled.span(() => [
  tw`absolute top-0 left-8 h-full w-[1px] bg-[#4b4b4b] z-50`,
]);
const LineLeftTwo = styled.span(() => [
  tw`absolute top-0 left-9 h-full w-[1px] bg-[#4b4b4b] z-50`,
]);
const NotesDetail: CustomPage = ({ data }: any) => {
  console.log(data);

  return (
    <motion.div
      css={tw`flex flex-col h-full bg-[#f7f19e]`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#3c2d26" c2="#78584b">
        <AppHeadLabel>{data.title}</AppHeadLabel>
        <Link href="/notes">
          <a>
            <IosButton left hoverColor="#78584b" color="#3c2d26">
              Notes
            </IosButton>
          </a>
        </Link>
        <IosButton hoverColor="#78584b" color="#3c2d26" css={tw`right-2`}>
          <span css={tw`text-md`} className="icomoon icon-plus-thick"></span>
        </IosButton>
      </AppHeader>
      <ListContainer css={tw`pb-5 pt-[2.9rem]!`}>
        <LineLeft />
        <LineLeftTwo />
        <div css={tw`w-full h-8 bg-[#ffffc2] pl-12 pr-2 flex justify-between text-[#78584b]`}>
          <span css={tw`font-bold`}>
            {dayjs(dayjs(dayjs.unix(data.createdDate._seconds))).fromNow()}
            {/* {dayjs(data.createdDate._seconds).format("MMMM")} */}
          </span>
          <div css={tw`flex gap-x-3 font-medium`}>
            <span>{dayjs(data.createdDate._seconds).format("MMM DD")}</span>
            <span>{dayjs(data.createdDate._seconds).format("H:mm A")}</span>
          </div>
        </div>
        {data && (
          <NotesWrapper>
            <LineLeft />
            <LineLeftTwo />
            <div css={tw`pl-12 pr-5 text-xl leading-[30px]`}>{data.content}</div>
          </NotesWrapper>
        )}
      </ListContainer>
    </motion.div>
  );
};

const NotesWrapper = styled.div(() => [
  tw`h-[max-content] min-h-full w-full relative pr-2`,
  css`
    background-image: repeating-linear-gradient(
      #ffffc2 0px,
      #ffffc2 29px,
      #442f2a 30px
    );
  `,
]);

NotesDetail.inner = true;

export default NotesDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //@ts-ignore
  const slug: string = params?.slug;
  let noteData;
  if (slug) {
    noteData = await ADMIN_DB.collection("notes").doc(slug).get();
  }

  return {
    props: {
      data: noteData && JSON.parse(JSON.stringify(noteData.data())),
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const notesCollection = await ADMIN_DB.collection("notes").get();

  const notes = [];
  for await (const note of notesCollection.docs) {
    notes.push({
      params: {
        slug: note.id,
      },
    });
  }
  return {
    paths: notes,
    fallback: true,
  };
};
