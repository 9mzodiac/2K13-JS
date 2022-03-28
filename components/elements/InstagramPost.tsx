import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import tw from "twin.macro";

const InstagramPost: React.FC<any> = ({
  postImage,
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
          <span>13h</span>
        </PostTimeWrapper>
      </PostHeaderContainer>
      <PostImage>
        <Image
          src={postImage}
          layout="fill"
          className="post-image"
        />
      </PostImage>
      <div css={tw`flex gap-x-1 text-[#bfbfbf] px-3`}>
        <i className="icomoon icon-heart"></i>
        <PostProfileText>{likes} likes</PostProfileText>
      </div>
    </PostWrapper>
  );
};

export default InstagramPost;

const PostWrapper = styled.div(() => [tw`flex flex-col w-full mb-10`]);

const PostHeaderContainer = styled.div(() => [
  tw`flex justify-between items-center px-3`,
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
