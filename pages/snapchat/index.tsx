import { CustomPage } from "types/pages";
import { motion } from "framer-motion";
import tw from "twin.macro";
import { AppHeader, IosButton } from "@/components/elements/styled/header";
import Image from "next/image";
import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SnapFeed, {
  SnapFeedMessageType,
  SnapFeedState,
  SnapFeedType,
} from "@/components/elements/Snapchat/SnapsFeed";
import Link from "next/link";

const Snapchat: CustomPage = (props: any) => {
  return (
    <motion.div css={tw`flex flex-col h-full bg-white font-roboto`}>
      <AppHeader
        c1="#4fab86"
        c2="#8bc9a3"
        css={tw`py-[.4rem] before:opacity-100`}
      >
        <Link href="/snapchat/camera" passHref>
          <a>
            <IosButton
              left
              css={tw`px-[.2rem]! flex justify-center items-center`}
              hoverColor="#4fab86"
              color="#8bc9a3"
            >
              <div css={tw`relative w-9 h-9`}>
                <Image
                  src="/snapchat/camera_menu_btn.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </IosButton>
          </a>
        </Link>
        <IosButton
          css={tw`right-[.5rem] px-[.8rem]! text-sm`}
          hoverColor="#4fab86"
          color="#8bc9a3"
        >
          Clear
        </IosButton>

        <div css={tw`w-full h-7 relative`}>
          <Image
            src="/snapchat/feed_snapchat_logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </AppHeader>
      <SnapchatBackground>
        <Image
          src="/snapchat/feed_background_ghosts.png"
          layout="fill"
          objectFit="cover"
        />
      </SnapchatBackground>
      <ListContainer css={tw`pb-[3.2rem] pt-[2.5rem]`}>
        <ListWrapper>
          <SnapFeed
            type={SnapFeedType.IMAGE}
            messageType={SnapFeedMessageType.RECEIVED}
            state={SnapFeedState.UNOPENED}
          />
          <SnapFeed
            type={SnapFeedType.VIDEO}
            messageType={SnapFeedMessageType.SENT}
            state={SnapFeedState.OPENED}
          />
          <SnapFeed
            type={SnapFeedType.VIDEO}
            messageType={SnapFeedMessageType.SENT}
            state={SnapFeedState.SCREEN_SHOT}
          />
          <SnapFeed
            type={SnapFeedType.VIDEO}
            messageType={SnapFeedMessageType.RECEIVED}
            state={SnapFeedState.SENT}
          />
          <SnapFeed
            type={SnapFeedType.IMAGE}
            messageType={SnapFeedMessageType.RECEIVED}
            state={SnapFeedState.OPENED}
          />
        </ListWrapper>
      </ListContainer>
    </motion.div>
  );
};

Snapchat.inner = true;

export default Snapchat;

const SnapchatBackground = styled.div(() => [
  tw`absolute w-full h-full`,
  css`
    background: rgb(127, 219, 231);
    background: linear-gradient(
      130deg,
      rgba(127, 219, 231, 1) 0%,
      rgba(234, 237, 144, 1) 25%,
      rgba(255, 241, 127, 1) 49%,
      rgba(253, 225, 138, 1) 75%,
      rgba(246, 150, 188, 1) 100%
    );
  `,
]);
