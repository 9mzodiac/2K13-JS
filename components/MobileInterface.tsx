import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWallpaper } from "repository/wallpaper";
import useSWR from "swr";
import tw from "twin.macro";

const MobileInterface: React.FC<any> = ({
  children,
  unlocked,
  innerPage,
  statusBartextColor,
  statusBarbgColor,
}: any) => {
  const { data } = useSWR("wallpapers", getWallpaper);

  const [lockscreen, setLockscreen] = useState(null);
  const [homescreen, setHomescreen] = useState(null);

  const [time, setTime] = useState("");

  const renderTime = () => {
    let date = new Date();
    setTime("9:00 PM");
    //setTime(dayjs(date).format("h:mm A"));
  };

  useEffect(() => {
    renderTime();
    var timerID = setInterval(() => renderTime(), 60 * 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    if (data) {
      if (unlocked) {
        const index = data?.findIndex((x: any) => x.type === "homescreen");
        setHomescreen(data[index].imageURL);
      } else {
        const index = data?.findIndex((x: any) => x.type === "lockscreen");
        setLockscreen(data[index].imageURL);
      }
    }
  }, [unlocked, data]);

  return lockscreen || homescreen ? (
    <IPhoneFrame>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/k13-e9f6f.appspot.com/o/wallpapers%2Fiphone4.png?alt=media&token=e0b4f1a1-4728-4567-9a07-4783ad211f0b"
        layout="fill"
        objectFit="contain"
        className="index-behind iphone-frame"
      />
      <IphoneScreenContainer>
        <IPhoneInside>
          <NotificationTrayBar
            innerPage={innerPage ? 1 : 0}
            statusBartextColor={statusBartextColor}
            statusBarbgColor={statusBarbgColor}
            unlocked={unlocked}
          >
            <div css={tw`flex gap-x-1 justify-self-start`}>
              <span>
                <i className="icomoon icon-signal"></i>
              </span>
              <p>
                <strong>{"AT&T"}</strong>
              </p>
              <span>
                <i className="icomoon icon-wifi"></i>
              </span>
            </div>
            <span css={tw`justify-self-center`}>
              {unlocked ? (
                <span>
                  <strong>{time}</strong>
                </span>
              ) : (
                <i className="icomoon icon-lock"></i>
              )}
            </span>
            <span css={tw`justify-self-end`}>
              <i className="icomoon icon-battery"></i>
            </span>
          </NotificationTrayBar>
          {unlocked
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
                  objectFit="fit"
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
  tw`container mx-auto flex flex-col`,
  tw`w-full h-full relative justify-center items-center px-0 pt-0 pb-0`,
  tw`md:(px-[11%] pt-[30%] pb-[28%])`,
]);

const IPhoneInside = styled.div(() => [
  tw`w-full h-full relative flex flex-col justify-between overflow-hidden`,
]);

const NotificationTrayBar = styled.div(
  ({ innerPage, unlocked, statusBarbgColor, statusBartextColor }: any) => [
    tw`w-full bg-[#00000080] relative grid grid-flow-row grid-cols-3 text-white text-sm items-center px-1 py-1 shadow z-50`,
    innerPage && unlocked && tw`bg-[#000000]`,
    statusBarbgColor &&
      unlocked &&
      css`
        background: ${statusBarbgColor};
      `,
    statusBartextColor &&
      unlocked &&
      css`
        color: ${statusBartextColor};
      `,
  ]
);
