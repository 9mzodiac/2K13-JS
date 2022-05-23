import {
  SnapFeedDetails,
  SnapFeedDetailWrapper,
  SnapFeedItemContainer,
  SnapFeedStateWrapper,
  SnapFeedTitle,
} from "@/components/elements/styled/snapchat";
import Image from "next/image";
import { SnapFeedMessageType, SnapFeedState } from "../../SnapsFeed";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

var thresholds = [
  { l: "s", r: 1, d: "second" },
  { l: "ss", r: 59, d: "second" },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y" },
  { l: "yy", d: "year" },
];
dayjs.extend(updateLocale);
dayjs.extend(relativeTime, {
  thresholds: thresholds,
  rounding: Math.floor,
});
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1 second ago",
    ss: "%d seconds ago",
    m: "1 minute ago",
    mm: "%d minutes ago",
    h: "1 hour ago",
    hh: "%d hours ago",
    d: "1 day ago",
    dd: "%d days ago",
    M: "1 minute",
    MM: "%d minutes ago",
    y: "1 year ago",
    yy: "%d years ago",
  },
});

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
              {dayjs(dayjs(dayjs.unix(time._seconds)))?.fromNow()}{" "}
              {GetStateMessageReceived(state)}
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
              {dayjs(dayjs(dayjs.unix(time._seconds))).fromNow()}{" "}
              {GetStateMessageSent(state)}
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
