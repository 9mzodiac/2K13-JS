import SnapFeedImage from "./FeedItems/image";
import SnapFeedVideo from "./FeedItems/video";

const SnapFeed: React.FC<any> = ({
  type,
  state,
  messageType,
}: SnapFeedProps) => {
  const RenderItem = (type: SnapFeedType) =>
    ({
      image: <SnapFeedImage state={state} messageType={messageType} />,
      video: <SnapFeedVideo state={state} messageType={messageType} />,
    }[type]);

  return RenderItem(type);
};

export default SnapFeed;

type SnapFeedProps = {
  type: SnapFeedType;
  state: SnapFeedState;
  messageType: SnapFeedMessageType;
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
