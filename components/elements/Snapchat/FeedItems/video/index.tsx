import {
  SnapFeedDetails,
  SnapFeedDetailWrapper,
  SnapFeedItemContainer,
  SnapFeedStateWrapper,
  SnapFeedTitle,
} from "@/components/elements/styled/snapchat";
import Image from "next/image";
import { SnapFeedMessageType, SnapFeedState } from "../../SnapsFeed";

const ImagePath = "/snapchat/";

const SnapFeedVideo: React.FC<any> = ({ messageType, state }: any) => {
  const RenderImageReceived = (type: SnapFeedState) =>
    ({
      opened: `${ImagePath}feed_item_opened_video.png`,
      screen_shot: `${ImagePath}feed_item_opened_video.png`,
      sent: `${ImagePath}feed_item_unopened_video.png`,
      unopened: `${ImagePath}feed_item_unopened_video.png`,
      failed: `${ImagePath}feed_item_send_failed_video.png`,
    }[type]);

  const RenderImageSent = (type: SnapFeedState) =>
    ({
      opened: `${ImagePath}feed_item_sent_video.png`,
      screen_shot: `${ImagePath}feed_item_screenshot_video.png`,
      sent: `${ImagePath}feed_item_sent_video.png`,
      unopened: `${ImagePath}feed_item_sent_video.png`,
      failed: `${ImagePath}feed_item_send_failed_video.png`,
    }[type]);

  const GetStateMessageReceived = (type: SnapFeedState) =>
    ({
      opened: "",
      screen_shot: "",
      sent: "",
      unopened: "- Press and hold to view",
      failed: "- Failed",
    }[type]);

  const GetStateMessageSent = (type: SnapFeedState) =>
    ({
      opened: "- Opened",
      screen_shot: "- Screenshot!",
      sent: "",
      unopened: "",
      failed: "- Failed",
    }[type]);

  const RenderMessage = (type: SnapFeedMessageType) =>
    ({
      received: (
        <>
          <SnapFeedStateWrapper>
            <Image
              src={RenderImageReceived(state)}
              layout="fill"
              objectFit="contain"
            />
          </SnapFeedStateWrapper>
          <SnapFeedDetailWrapper>
            <SnapFeedTitle type={messageType}>Sara Miller</SnapFeedTitle>
            <SnapFeedDetails>
              3 minutes ago {GetStateMessageReceived(state)}
            </SnapFeedDetails>
          </SnapFeedDetailWrapper>
        </>
      ),
      sent: (
        <>
          <SnapFeedStateWrapper>
            <Image
              src={RenderImageSent(state)}
              layout="fill"
              objectFit="contain"
            />
          </SnapFeedStateWrapper>
          <SnapFeedDetailWrapper>
            <SnapFeedTitle type={messageType}>Sara Miller</SnapFeedTitle>
            <SnapFeedDetails>
              3 minutes ago {GetStateMessageSent(state)}
            </SnapFeedDetails>
          </SnapFeedDetailWrapper>
        </>
      ),
    }[type]);
  return (
    <SnapFeedItemContainer>{RenderMessage(messageType)}</SnapFeedItemContainer>
  );
};

export default SnapFeedVideo;
