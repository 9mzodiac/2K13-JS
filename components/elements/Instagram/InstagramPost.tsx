import styled from "@emotion/styled";
import Image from "next/image";
import tw from "twin.macro";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

var thresholds = [
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
dayjs.extend(relativeTime, { thresholds: thresholds, rounding: Math.floor });
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
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
      <div css={tw`flex text-[#bfbfbf] items-start justify-start gap-x-1`}>
        <PostCaption>
          <i
            className="icomoon icon-message"
            css={tw`text-sm text-[#bfbfbf]`}
          ></i>
          <span css={tw`inline-block`}>{"\u00A0"}</span>
          <PostProfileText>{name}</PostProfileText>
          <span css={tw`inline-block`}>{"\u00A0"}</span>
          <TextWithHashtag content={caption} />
        </PostCaption>
      </div>
      {comments.length > 0 &&
        (comments.length <= 2 ? (
          <div css={tw`mt-1 ml-4`}>
            <span css={tw`text-md text-[#bfbfbf] font-bold cursor-pointer`}>
              view all comments
            </span>
            {comments.map((comment: any) => (
              <PostCaption>
                <PostProfileText>
                  <span css={tw`inline-block`}>{comment.user_handle}</span>
                </PostProfileText>
                <span css={tw`inline-block`}>{"\u00A0"}</span>
                <TextWithHashtag content={comment.content} />
              </PostCaption>
            ))}
          </div>
        ) : (
          <div css={tw`mt-1 ml-4`}>
            <span css={tw`text-md text-[#bfbfbf] font-bold  cursor-pointer`}>
              view all {comments.length} comments
            </span>
            {comments.map((comment: any) => (
              <PostCaption>
                <PostProfileText>
                  <span css={tw`inline-block`}>{comment.user_handle}</span>
                </PostProfileText>
                <span css={tw`inline-block`}>{"\u00A0"}</span>
                <TextWithHashtag content={comment.content} />
              </PostCaption>
            ))}
          </div>
        ))}
    </PostWrapper>
  );
};

export default InstagramPost;

const TextWithHashtag: React.FC<any> = ({ content }: any) => {
  const [match, setMatches] = useState([]);
  useEffect(() => {
    setMatches(content.match(/(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g));
  }, [content]);

  const splitWords = content.split(" ");

  const words: any[] = [];

  for (const [, item] of splitWords.entries()) {
    words.push(item.split(" "));
  }

  words.map((word: string[], index: number) => {
    return words.length - 1 != index && word.push("\u00A0");
  });

  const checkHastag = (element: string) => {
    const matched = match.find((x: any) => x.trim() === element?.trim());
    return matched ? (
      <span css={tw`font-bold text-[#3F729B] inline-block`}>{matched}</span>
    ) : (
      <span css={tw`inline-block`}>{element}</span>
    );
  };
  return (
    <>
      {words.map((word, index) =>
        word
          .flat()
          .map((element: string, index: React.Key | null | undefined) => {
            return (
              <span css={tw`overflow-hidden inline-block text-md`} key={index}>
                {match?.length > 0 ? (
                  checkHastag(element)
                ) : (
                  <span css={tw`inline-block`}>{element}</span>
                )}
              </span>
            );
          })
      )}
    </>
  );
};

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
  tw`font-bold text-md text-[#3F729B] inline-block overflow-hidden`,
]);

const PostProfileLocation = styled.div(() => [
  tw`text-[#36a1f7] gap-x-1 flex flex-row items-center font-bold text-md`,
]);

const PostTimeWrapper = styled.div(() => [
  tw`flex items-center font-bold gap-x-1 text-md text-[#bfbfbf]`,
]);

const PostImage = styled.div(() => [tw`py-4 w-full h-[14rem] relative my-2`]);
