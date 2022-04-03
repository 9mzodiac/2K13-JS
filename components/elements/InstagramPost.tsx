import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import tw from "twin.macro";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

const InstagramPost: React.FC<any> = ({
  postImage,
  caption,
  name,
  time,
  profile,
  likes,
}: any) => {
  return (
    <PostWrapper>
      <PostHeaderContainer>
        <PostProfileWrapper>
          <PorfileImage>
            <Image src={profile} layout="fill" objectFit="cover" />
          </PorfileImage>
          <PostProfileText>{name}</PostProfileText>
        </PostProfileWrapper>
        <PostTimeWrapper>
          <i className="icomoon icon-clock"></i>
          <span>
            {dayjs(
              dayjs(dayjs.unix(time._seconds)).format("YYYY-MM-DD")
            ).fromNow()}
          </span>
        </PostTimeWrapper>
      </PostHeaderContainer>
      <PostImage>
        <Image
          src={postImage}
          layout="fill"
          className="post-image"
          blurDataURL={postImage}
          placeholder="blur"
        />
      </PostImage>
      <PostCaption>{caption}</PostCaption>
      <div css={tw`flex gap-x-1 text-[#bfbfbf] mx-3`}>
        <i className="icomoon icon-heart"></i>
        <PostProfileText>{likes} likes</PostProfileText>
      </div>
    </PostWrapper>
  );
};

export default InstagramPost;

const PostWrapper = styled.div(() => [tw`flex flex-col w-full mb-10`]);

const PostCaption = styled.div(() => [
  tw`font-normal text-md text-[#3F729B] mb-2 mx-3`,
]);

const PostHeaderContainer = styled.div(() => [
  tw`flex justify-between items-center mx-3`,
]);

const PostProfileWrapper = styled.div(() => [tw`flex items-center gap-x-2`]);
const PorfileImage = styled.span(() => [
  tw`h-8 w-8 rounded-full relative overflow-hidden`,
]);
const PostProfileText = styled.span(() => [
  tw`font-bold text-md text-[#3F729B]`,
]);
const PostTimeWrapper = styled.div(() => [
  tw`flex items-center font-bold gap-x-1 text-md text-[#bfbfbf]`,
]);

const PostImage = styled.div(() => [
  tw`py-4 w-full`,
  css`
    div,
    span {
      position: unset !important;
    }

    .post-image {
      object-fit: contain;
      width: 100% !important;
      position: relative !important;
      height: unset !important;
    }
  `,
]);
