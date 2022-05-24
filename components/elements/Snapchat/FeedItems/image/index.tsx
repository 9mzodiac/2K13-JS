import {
  SnapFeedDetails,
  SnapFeedDetailWrapper,
  SnapFeedItemContainer,
  SnapFeedStateWrapper,
  SnapFeedTitle,
} from "@/components/elements/styled/snapchat";
import Image from "next/image";
import { getTime } from "utils/time";
import { SnapFeedMessageType, SnapFeedState } from "../../SnapsFeed";

const ImagePath = "/snapchat/";

const SnapFeedImage: React.FC<any> = ({
  messageType,
  state,
  title,
  time,
}: any) => {
  const RenderImageReceived = (type: SnapFeedState) =>
    ({
      opened: `${ImagePath}feed_item_opened.png`,
      screen_shot: `${ImagePath}feed_item_opened.png`,
      sent: `${ImagePath}feed_item_unopened.png`,
      unopened: `${ImagePath}feed_item_unopened.png`,
      failed: `${ImagePath}feed_item_send_failed.png`,
    }[type]);

  const RenderImageSent = (type: SnapFeedState) =>
    ({
      opened: `${ImagePath}feed_item_sent.png`,
      screen_shot: `${ImagePath}feed_item_screenshot.png`,
      sent: `${ImagePath}feed_item_sent.png`,
      unopened: `${ImagePath}feed_item_sent.png`,
      failed: `${ImagePath}feed_item_send_failed.png`,
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
            <SnapFeedTitle type={messageType}>{title}</SnapFeedTitle>
            <SnapFeedDetails>
              {getTime(time._seconds)} {GetStateMessageReceived(state)}
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
            <SnapFeedTitle type={messageType}>{title}</SnapFeedTitle>
            <SnapFeedDetails>
              {getTime(time._seconds)} {GetStateMessageSent(state)}
            </SnapFeedDetails>
          </SnapFeedDetailWrapper>
        </>
      ),
    }[type]);
  return (
    <SnapFeedItemContainer>{RenderMessage(messageType)}</SnapFeedItemContainer>
  );
};

export default SnapFeedImage;
