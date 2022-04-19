import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import tw from "twin.macro";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

var thresholds = [
  { l: "s", r: 1 },
  { l: "m", r: 1 },
  { l: "ss", r: 59, d: "second" },
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
dayjs.extend(relativeTime, { thresholds: thresholds, rounding: Math.floor });
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  },
});

const InstagramPost: React.FC<any> = ({
  postImage,
  caption,
  location,
  name,
  time,
  profile,
  likes,
  comments,
}: any) => {
  return (
    <PostWrapper>
      <PostHeaderContainer>
        <PostProfileWrapper>
          <PorfileImage>
            <Image src={profile} layout="fill" objectFit="cover" />
          </PorfileImage>
          <div css={tw`flex flex-col justify-start items-start gap-y-1`}>
            <PostProfileText>{name}</PostProfileText>
            {location && (
              <PostProfileLocation>
                <i className="icomoon icon-location" css={tw`text-sm`}></i>
                <span css={tw`block`}>{location}</span>
              </PostProfileLocation>
            )}
          </div>
        </PostProfileWrapper>
        <PostTimeWrapper>
          <i className="icomoon icon-clock" css={tw`text-xs`}></i>
          <span>{dayjs(dayjs(dayjs.unix(time._seconds))).fromNow()}</span>
        </PostTimeWrapper>
      </PostHeaderContainer>
      <PostImage>
        <Image
          src={postImage}
          layout="fill"
          objectFit="cover"
          className="post-image"
          blurDataURL={postImage}
          placeholder="blur"
        />
      </PostImage>

      <div
        css={tw`flex gap-x-1 text-[#bfbfbf] items-center justify-start pb-1`}
      >
        <i className="icomoon icon-heart" css={tw`text-sm`}></i>
        <PostProfileText>{likes} likes</PostProfileText>
      </div>
      <div css={tw`flex gap-x-1 text-[#bfbfbf] items-center justify-start`}>
        <i className="icomoon icon-message" css={tw`text-sm`}></i>
        <div css={tw`flex gap-x-1 text-[#bfbfbf] items-center justify-start`}>
          <PostProfileText>{name}</PostProfileText>
          <PostCaption>{caption}</PostCaption>
        </div>
      </div>
      {comments.length > 0 &&
        (comments.length <= 2 ? (
          <div css={tw`mt-1 ml-4`}>
            <span css={tw`text-md text-[#bfbfbf] font-bold cursor-pointer`}>
              view all comments
            </span>
            {comments.map((comment: any) => (
              <div
                css={tw`flex gap-x-1 text-[#bfbfbf] items-center justify-start truncate mb-1`}
                key={comment.id}
              >
                <PostProfileText>{comment.user_handle}</PostProfileText>
                <PostCaption>{comment.content}</PostCaption>
              </div>
            ))}
          </div>
        ) : (
          <div css={tw`mt-1 ml-4`}>
            <span css={tw`text-md text-[#bfbfbf] font-bold  cursor-pointer`}>
              view all {comments.length} comments
            </span>
            {comments.map((comment: any) => (
              <div
                css={tw`flex gap-x-1 text-[#bfbfbf] items-center justify-start truncate`}
                key={comment.id}
              >
                <PostProfileText>{comment.user_handle}</PostProfileText>
                <PostCaption>{comment.content}</PostCaption>
              </div>
            ))}
          </div>
        ))}
    </PostWrapper>
  );
};

export default InstagramPost;

const PostWrapper = styled.div(() => [tw`flex flex-col w-full mb-10 px-2`]);

const PostCaption = styled.div(() => [tw`font-normal text-md text-black`]);

const PostHeaderContainer = styled.div(() => [
  tw`flex justify-between items-center`,
]);

const PostProfileWrapper = styled.div(() => [tw`flex items-center gap-x-2`]);
const PorfileImage = styled.span(() => [
  tw`h-10 w-10 relative overflow-hidden`,
]);
const PostProfileText = styled.span(() => [
  tw`font-bold text-md text-[#3F729B]`,
]);

const PostProfileLocation = styled.div(() => [
  tw`text-[#36a1f7] gap-x-1 flex flex-row items-center font-bold text-md`,
]);

const PostTimeWrapper = styled.div(() => [
  tw`flex items-center font-bold gap-x-1 text-md text-[#bfbfbf]`,
]);

const PostImage = styled.div(() => [tw`py-4 w-full h-[14rem] relative my-2`]);
