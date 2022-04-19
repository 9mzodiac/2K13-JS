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
import { pageVariants } from "animations/variants";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import tw from "twin.macro";
import { CustomPage } from "types/pages";

const MusicPlayer: CustomPage = (props: any) => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
      variants={pageVariants}
    >
      <AppHeader c1="#6D83A1" c2="#8eabd4">
        <Link href="/">
          <a>
            <IosButton
              right
              hoverColor="black"
              color="#1c1c1c"
              css={tw`text-xs leading-[0.6rem]`}
            >
              Now
              <br /> Playing
            </IosButton>
          </a>
        </Link>
        <Link href="/">
          <a>
            <IosButton left hoverColor="#6D83A1" color="#8eabd4">
              back
            </IosButton>
          </a>
        </Link>
        <AppHeadLabel>Songs</AppHeadLabel>
      </AppHeader>
      <ListContainer css={tw`pb-14`}>
        <ListWrapper>
          {Songs.map((item: any, key: number) => (
            <div
              css={tw`flex flex-row justify-between items-start border-b-[#442f2a] border-b-[1px] px-4 py-3`}
              key={`notes-${key}`}
            >
              <div css={tw`flex flex-col items-start`}>
                <span
                  css={tw`text-lg text-black font-bold truncate max-w-[14rem]`}
                >
                  {item.title}
                </span>
                <span css={tw`text-md text-[#00000050] font-bold`}>
                  {`${item.album} - ${item.artist}`}
                </span>
              </div>
              <div>
                <CircleControl />
              </div>
            </div>
          ))}
        </ListWrapper>
      </ListContainer>
      <SongsNavBarContainer c1="#000000" c2="#4d4d4d">
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

const Alpha = [
  `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z`.split(","),
];

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
  console.log(urls);

  return {
    props: {
      songs: urls,
    },
  };
};
