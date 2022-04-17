import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWallpaper } from "repository/wallpaper";
import useSWR from "swr";
import tw from "twin.macro";

const MobileInterface: React.FC<any> = ({ children, state }: any) => {
  const { data } = useSWR("wallpapers", getWallpaper);

  const [lockscreen, setLockscreen] = useState(null);
  const [homescreen, setHomescreen] = useState(null);

  useEffect(() => {
    if (data) {
      if (state) {
        const index = data?.findIndex((x: any) => x.type === "homescreen");
        setHomescreen(data[index].imageURL);
      } else {
        const index = data?.findIndex((x: any) => x.type === "lockscreen");
        setLockscreen(data[index].imageURL);
      }
    }
  }, [state, data]);

  return lockscreen || homescreen ? (
    <IPhoneFrame>
      <Image
        src="/images/iphone-frame.png"
        layout="fill"
        objectFit="contain"
        className="index-behind iphone-frame"
      />
      <IphoneScreenContainer>
        <IPhoneInside>
          {state
            ? homescreen && (
                <Image
                  src={homescreen}
                  layout="fill"
                  objectFit="cover"
                  className="index-behind"
                  priority
                  blurDataURL={homescreen}
                  placeholder="blur"
                />
              )
            : lockscreen && (
                <Image
                  src={lockscreen}
                  layout="fill"
                  objectFit="cover"
                  className="index-behind"
                  priority
                  blurDataURL={lockscreen}
                  placeholder="blur"
                />
              )}

          {children}
          <div
            css={tw`z-50 absolute top-0 left-0 w-full h-full`}
            id="external-portal"
          ></div>
        </IPhoneInside>
      </IphoneScreenContainer>
      <Link href="/">
        <a>
          <HomeButton></HomeButton>
        </a>
      </Link>
    </IPhoneFrame>
  ) : (
    <></>
  );
};

export default MobileInterface;

const HomeButton = styled.div(() => [
  tw`absolute bottom-8 h-16 w-16 z-10 left-1/2 -translate-x-1/2 rounded-full transition-all duration-150 ease-in`,
  tw`active:(bg-white opacity-25)`,
]);

const IPhoneFrame = styled.div(() => [
  tw`mx-auto w-full h-screen flex flex-col relative select-none`,
  tw`max-w-none min-w-full min-h-full max-h-full`,
  tw`md:(max-w-[350px] min-w-[350px] min-h-[600px] max-h-[600px])`,
  tw`lg:(max-w-[400px] min-w-[400px] min-h-[700px] max-h-[700px])`,
  css`
    .index-behind {
      ${tw`z-[-1]`}
    }
    .iphone-frame {
      ${tw`hidden! md:(block!)`}
    }
  `,
]);

const IphoneScreenContainer = styled.div(() => [
  tw`container mx-auto flex`,
  tw`w-full h-full relative justify-center items-center px-0 pt-0 pb-0`,
  tw`md:(px-[11%] pt-[34%] pb-[28%])`,
]);

const IPhoneInside = styled.div(() => [
  tw`w-full h-full relative flex flex-col justify-between overflow-hidden`,
]);
