import CircleControl from "@/components/elements/CircleControls";
import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import {
  SongsNavBarContainer,
  SongsNavItem,
} from "@/components/elements/styled/musicNavBar";
import { ADMIN_BUCKET } from "@/firebase/admin";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Link from "next/link";
import tw from "twin.macro";
import { CustomPage } from "types/pages";

const AlphaSelectionContainer = styled.div(() => [
  tw`absolute top-full h-5 w-full bg-[#aeb8c090] flex px-4 items-center shadow-inner`,
  css`
    -webkit-box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.33);
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.33);
    span {
      text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.3);
    }
  `,
]);

const MusicPlayer: CustomPage = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader
        c1="#6D83A1"
        c2="#8eabd4"
        css={tw`relative border-black border-b-[1.5px]`}
      >
        <Link href="/">
          <a>
            <IosButton
              right
              hoverColor="black"
              color="#1c1c1c"
              css={tw`text-[.7rem] leading-[.7rem]`}
            >
              Now
              <br /> Playing
            </IosButton>
          </a>
        </Link>
        <Link href="/">
          <a>
            <IosButton
              css={tw`left-2 text-md`}
              hoverColor="#6e8aaf"
              color="#476a99"
            >
              Store
            </IosButton>
          </a>
        </Link>
        <AppHeadLabel>Songs</AppHeadLabel>
        <AlphaSelectionContainer>
          <span css={tw`font-bold text-white leading-3`}>A</span>
        </AlphaSelectionContainer>
      </AppHeader>

      <div
        css={tw`sticky right-0 top-0 h-full w-full flex flex-col justify-start items-end px-2 py-1 text-[#6a737d] z-50 pointer-events-none`}
      >
        <div css={tw`flex flex-col justify-start items-center mb-16`}>
          <span>
            <i css={tw`text-xs block leading-3`} className="icomoon icon-search"></i>
          </span>
          {Alpha.map((num) => (
            <span
              css={tw`block text-xs font-bold cursor-pointer pointer-events-auto text-center`}
              key={`alpha-${num}`}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
      <ListContainer css={tw`pb-20`}>
        <ListWrapper>
          {Songs.map((item: any, key: number) => (
            <div
              css={tw`flex flex-row justify-between items-start border-b-[#cccccc] border-b-[1px] px-4 py-1`}
              key={`notes-${key}`}
            >
              <div css={tw`flex flex-col items-start cursor-pointer`}>
                <span
                  css={tw`text-[1.2rem] text-black font-bold truncate max-w-[16rem]`}
                >
                  {item.title}
                </span>
                <span css={tw`text-md text-[#848484] font-medium`}>
                  {`${item.album} - ${item.artist}`}
                </span>
              </div>
              {/* <div>
                <CircleControl />
              </div> */}
            </div>
          ))}
        </ListWrapper>
      </ListContainer>
      <SongsNavBarContainer c1="#000000" c2="#222222">
        <SongsNavItem>
          <i css={tw`text-xl text-black`} className="icomoon icon-playlist"></i>
          <span>Playlist</span>
        </SongsNavItem>
        <SongsNavItem>
          <i css={tw`text-xl text-black`} className="icomoon icon-singer"></i>
          <span>Artists</span>
        </SongsNavItem>
        <SongsNavItem active>
          <i
            css={tw`text-xl text-black`}
            className="icomoon icon-music-note"
          ></i>
          <span>Songs</span>
        </SongsNavItem>
        <SongsNavItem>
          <i
            css={tw`text-xl text-black`}
            className="icomoon icon-music-album"
          ></i>
          <span>Albums</span>
        </SongsNavItem>
        <SongsNavItem>
          <i
            css={tw`text-xl text-black`}
            className="icomoon icon-more-dots"
          ></i>
          <span>More</span>
        </SongsNavItem>
      </SongsNavBarContainer>
    </motion.div>
  );
};

MusicPlayer.inner = true;
export default MusicPlayer;

const Alpha = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,#`.split(",");

const Songs = [
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
  {
    title: "Somebody that I used to know",
    album: "Making Mirrors",
    artist: "Suyog Mishal",
  },
];

export const getServerSideProps: GetServerSideProps = async () => {
  const [files] = await ADMIN_BUCKET.getFiles({ directory: "songs" });

  const urls = await Promise.all(
    files.map((file) =>
      file.getSignedUrl({
        action: "read",
        expires: "04-05-2042", // this is an arbitrary date
      })
    )
  );

  return {
    props: {
      songs: urls,
    },
  };
};
