import { BackButton } from "@/components/elements/emotionHeader";
import { API } from "@/lib/api";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import tw from "twin.macro";
//@ts-ignore
import Gallery from "react-grid-gallery";
import Link from "next/link";

const Photos: React.FC<any> = ({ photos }: any) => {
  console.log(photos);

  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader>
        <Link href="/">
          <a>
            <BackButton css={tw`float-left`}>Back</BackButton>
          </a>
        </Link>
        <AppHeadLabel css={tw`text-center`}>Photos</AppHeadLabel>
      </AppHeader>
      <div css={tw`absolute overflow-auto h-full w-full pt-16 z-10`}>
        <Gallery
          css={tw`relative`}
          images={IMAGES}
          enableLightbox={true}
          enableImageSelection={false}
          backdropClosesModal
          rowHeight={200}
          margin={2}
        />
      </div>
    </motion.div>
  );
};

const AppHeader = styled.div(() => [
  tw`py-5 w-full text-center relative z-20`,
  css`
    &:before {
      ${tw`content-[""] absolute top-0 left-0 w-full h-full opacity-60 z-[-1]`}
      background: linear-gradient(
        180deg,
        rgba(77, 77, 77, 1) 0%,
        rgba(0, 0, 0, 1) 57%,
        rgba(0, 0, 0, 1) 100%
      );
    }
  `,
]);

const AppHeadLabel = styled.h1(() => [tw`font-bold text-lg text-white`]);

export default Photos;

export const getStaticProps: GetStaticProps = async () => {
  const response = await API.get("/list?page=1&limit=20");
  const data = await response.json();
  return {
    props: {
      photos: data,
    },
  };
};

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
];
