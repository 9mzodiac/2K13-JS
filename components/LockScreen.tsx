import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { clearNotification, getNotifications } from "repository/notification";
import useSWR from "swr";
import tw from "twin.macro";
import {
  Slider,
  SlideToUnlock,
  UnlockButton,
  UnlockSliderWrapper,
} from "./elements/styled/slideToUnlock";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "%s",
    m: "a m",
    mm: "%dm",
    h: "an h",
    hh: "%dh",
    d: "a d",
    dd: "%dd",
    M: "a m",
    MM: "%dm",
    y: "a y",
    yy: "%dy",
  },
});

const LockScreen: React.FC<any> = ({ onUnlock }: any) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const renderDateTime = () => {
    let date = new Date();

    setDate(dayjs(date).format("dddd, MMMM DD"));
    // setTime("9 00");
    setTime(dayjs(date).format("h mm"));
  };

  const { data } = useSWR("notifications", getNotifications)

  const [notifications, setNotifications] = useState(data ? data : []);
  const constraintsRef = useRef<any>(null);
  const constraintsNotificationRef = useRef<any>(null);

  useEffect(() => {
    if (data) setNotifications(data);
  }, [data]);

  const clearNotificationItem = async (index: number, id: string) => {
    let currentArr = [...notifications];
    currentArr.splice(index, 1);
    setNotifications(currentArr);
    await clearNotification(id);
  };

  useEffect(() => {
    lockSlider();
    renderDateTime();

    var timerID = setInterval(() => renderDateTime(), 60 * 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const lockSlider = () => {};

  const unlockVariants = {
    initial: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
    locked: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      css={tw`w-full h-full flex flex-col`}
      animate="locked"
      initial="initial"
      exit="exit"
      variants={unlockVariants}
    >
      <UnlockTop>
        <p
          css={tw`font-light text-[3.8rem] text-white flex items-center gap-x-1 leading-[4rem]`}
        >
          {time.split(" ")[0]}
          <span css={tw`flex flex-col gap-y-4 mt-2`}>
            <span
              css={tw`leading-3 block w-[.3rem] h-[.3rem] relative bg-white`}
            ></span>
            <span
              css={tw`leading-3 block w-[.3rem] h-[.3rem] relative bg-white`}
            ></span>
          </span>
          {time.split(" ")[1]}
        </p>
        <p css={tw`font-light text-lg text-white`}>{date}</p>
      </UnlockTop>
      <UnlockSpacer>
        <NotificationWrapper layout ref={constraintsNotificationRef}>
          <div
            css={tw`absolute w-full h-full overflow-auto`}
            className="no-scrollbar"
          >
            {notifications?.length > 0 &&
              notifications.map((item: any, key: number) => (
                <NotificationItem
                  // dragConstraints={constraintsNotificationRef}
                  custom={key}
                  animate={mounted && "animate"}
                  initial="initial"
                  variants={{
                    animate: (x) => {
                      const delay = x * 0.05;
                      return {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          delay: delay,
                        },
                      };
                    },
                    initial: {
                      scale: 0,
                      opacity: 0,
                    },
                  }}
                  key={`${item.title}${key}`}
                  drag="x"
                  dragElastic={0.1}
                  dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
                  dragSnapToOrigin
                  whileTap={{ cursor: "grabbing" }}
                  onDragEnd={(event: any, info: any) => {
                    const refRect =
                      constraintsNotificationRef.current?.getBoundingClientRect();

                    if (info.point.x < refRect.left) {
                      clearNotificationItem(key, item.id);
                    }
                  }}
                >
                  <div css={tw`flex gap-x-2 w-full`}>
                    <div css={tw`w-10 h-10 relative self-center`}>
                      <Image
                        src={item.app.iconImage}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div css={tw`flex flex-col w-full`}>
                      <p
                        css={tw`font-bold text-lg leading-4 text-white flex justify-between items-center`}
                      >
                        {item.title}

                        <span css={tw`font-bold text-md text-white leading-5`}>
                          {dayjs.unix(item.createdDate.seconds).format("h:mm")}{" "}
                          <span css={tw`font-normal`}>
                            {dayjs.unix(item.createdDate.seconds).format("A")}
                          </span>
                        </span>
                      </p>
                      <span css={tw`font-normal text-md text-white leading-5`}>
                        {item.description}
                      </span>
                    </div>
                  </div>
                </NotificationItem>
              ))}
          </div>
        </NotificationWrapper>
      </UnlockSpacer>
      <div className="unlock-bottom-container">
        <UnlockButton>
          <UnlockSliderWrapper ref={constraintsRef}>
            <Slider
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0}
              dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
              dragSnapToOrigin
              initial={{ translateY: "-50%" }}
              whileDrag={{ translateY: "-50%" }}
              whileTap={{ cursor: "grabbing", translateY: "-50%" }}
              onDragEnd={(event: any, info: any) => {
                const refRect = constraintsRef.current?.getBoundingClientRect();
                if (info.point.x > refRect.right) {
                  onUnlock();
                }
              }}
            >
              <Image
                src="/images/lock-slider.png"
                layout="fill"
                objectFit="contain"
                className="slider-image"
              />
            </Slider>
            <SlideToUnlock>
              <span>slide to unlock</span>
            </SlideToUnlock>
          </UnlockSliderWrapper>
        </UnlockButton>
      </div>
    </motion.div>
  );
};

export default LockScreen;

const UnlockTop = styled.div(() => [
  tw`relative h-24 w-full flex flex-col items-center justify-center`,
  tw`border-[#00000080] border-b-[1px] bg-[rgba(0,0,0,.65)]`,
  css`
    &:before {
      ${tw`content-[""] absolute top-0 left-0 w-full h-full z-[-1] opacity-60`}
      background: linear-gradient(-180deg, rgb(255 7 7 / 65%), rgba(255,255,255,1) 50%, transparent 10%);
      background-repeat: no-repeat;
    }
  `,
]);

const UnlockSpacer = styled.div(() => [tw`w-full relative flex flex-grow-[1]`]);

const NotificationWrapper = styled(motion.div)(() => [tw`w-full flex-[1]`]);

const NotificationItem = styled(motion.div)(() => [
  tw`w-full flex bg-[#00000080] justify-start items-center text-left px-2 py-2`,
  tw`border-[#00000040] border-b-[2px]`,
]);
