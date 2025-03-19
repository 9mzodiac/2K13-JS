import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import styled from "@emotion/styled";
import {
  SongsNavBarContainer,
  SongsNavItem,
} from "@/components/elements/styled/musicNavBar";
import tw from "twin.macro";
import { motion } from "framer-motion";
import Link from "next/link";
import { CustomPage } from "types/pages";

const videos = [/* your video array here */];

const ListContainer = styled.div(() => [
  tw`flex-1 overflow-y-auto px-0 py-2 pb-28`, // pb-28 to avoid overlapping with the nav bar
]);

const VideoItem = styled.div(() => [
  tw`flex flex-row items-center py-3 border-b border-gray-300 px-3`,
]);

const Thumbnail = styled.img(() => [
  tw`w-[160px] h-[90px] object-cover border border-gray-400 rounded`,
]);

const VideoInfo = styled.div(() => [tw`flex flex-col ml-4 flex-1`]);

const VideoTitle = styled.span(() => [
  tw`font-bold text-black text-sm leading-tight truncate max-w-[14rem]`,
]);

const StatsRow = styled.div(() => [
  tw`flex flex-row items-center gap-1 text-[0.7rem] text-gray-700 mt-1`,
]);

const Stars = styled.span(() => [tw`text-red-500 text-sm`]);

const ArrowIcon = styled.div(() => [
  tw`text-blue-600 ml-3 font-bold`,
  { lineHeight: "0.5" },
]);

const YouTubeFavorites: CustomPage = () => {
  return (
    <motion.div
      css={tw`h-screen flex flex-col bg-[#f2f2f2]`}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AppHeader
        c1="#c3c6c9"
        style={{
          background: "linear-gradient(to bottom, #748fb6, #5d78a4)",
          boxShadow: "inset 0 -1px 0 rgba(255, 255, 255, 0.4)",
        }}
        css={tw`border-b border-gray-400 relative`}
      >
        <Link href="/">
          <a>
            <IosButton
              css={tw`left-2 text-md`}
              hoverColor="#6e8aaf"
              color="#476a99"
            >
              Sign Out
            </IosButton>
          </a>
        </Link>
        <AppHeadLabel>Favorites</AppHeadLabel>
        <IosButton
          right
          hoverColor="#6e8aaf"
          color="#476a99"
          css={tw`text-md`}
        >
          Edit
        </IosButton>
      </AppHeader>

      <ListContainer>
        {videos.map((video, index) => (
          <VideoItem key={index}>
            <Thumbnail src={video.thumbnail} alt={video.title} />
            <VideoInfo>
              <VideoTitle>{video.title}</VideoTitle>
              <StatsRow>
                <Stars>★★★★★</Stars>
                <span>{video.views} views</span>
              </StatsRow>
              <StatsRow>
                <span>{video.duration}</span>
                <span css={tw`text-orange-600 font-bold`}>
                  {video.channel}
                </span>
              </StatsRow>
            </VideoInfo>
            <ArrowIcon>›</ArrowIcon>
          </VideoItem>
        ))}
      </ListContainer>

      <SongsNavBarContainer
        c1="#000000"
        c2="#222222"
        css={tw`fixed bottom-0 left-0 w-full z-50`}
      >
        <SongsNavItem>
          <i css={tw`text-xl text-white`} className="icomoon icon-playlist"></i>
          <span css={tw`text-white`}>Featured</span>
        </SongsNavItem>
        <SongsNavItem>
          <i css={tw`text-xl text-white`} className="icomoon icon-artist"></i>
          <span css={tw`text-white`}>Most Viewed</span>
        </SongsNavItem>
        <SongsNavItem active>
          <i
            css={tw`text-xl text-white`}
            className="icomoon icon-book-open"
          ></i>
          <span css={tw`text-white`}>Favorites</span>
        </SongsNavItem>
        <SongsNavItem>
          <i css={tw`text-xl text-white`} className="icomoon icon-search"></i>
          <span css={tw`text-white`}>Search</span>
        </SongsNavItem>
        <SongsNavItem>
          <i
            css={tw`text-xl text-white`}
            className="icomoon icon-more-dots"
          ></i>
          <span css={tw`text-white`}>More</span>
        </SongsNavItem>
      </SongsNavBarContainer>
    </motion.div>
  );
};

YouTubeFavorites.inner = true;
YouTubeFavorites.statusBgColor = "#dcdcdc";
YouTubeFavorites.statusTextColor = "#000";

export default YouTubeFavorites;
