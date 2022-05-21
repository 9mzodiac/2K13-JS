import SnapFeedImage from "./FeedItems/image";
import SnapFeedVideo from "./FeedItems/video";

const SnapFeed: React.FC<SnapFeedProps> = ({
  type,
  state,
  messageType,
  title,
  time,
}) => {
  const RenderItem = (type: SnapFeedType) =>
    ({
      image: (
        <SnapFeedImage
          state={state}
          messageType={messageType}
          time={time}
          title={title}
        />
      ),
      video: (
        <SnapFeedVideo
          state={state}
          messageType={messageType}
          time={time}
          title={title}
        />
      ),
    }[type]);

  return RenderItem(type);
};

export default SnapFeed;

type SnapFeedProps = {
  type: SnapFeedType;
  state: SnapFeedState;
  messageType: SnapFeedMessageType;
  title: string;
  time: any;
};

export enum SnapFeedMessageType {
  RECEIVED = "received",
  SENT = "sent",
}

export enum SnapFeedState {
  OPENED = "opened",
  SCREEN_SHOT = "screen_shot",
  SENT = "sent",
  UNOPENED = "unopened",
  FAILED = "failed",
}

export enum SnapFeedType {
  VIDEO = "video",
  IMAGE = "image",
}
