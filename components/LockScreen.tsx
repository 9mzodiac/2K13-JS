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

const LockScreen: React.FC<any> = ({ onUnlock }: any) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data } = useSWR("notifications", getNotifications);

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

  const renderDateTime = () => {
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let currentDay = date.getDay();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();

    setDate(
      `${dayNames[currentDay]}, ${monthNames[currentMonth]} ${currentDate}`
    );

    setTime(`${("0" + currentHour).slice(-2)}:${("0" + currentMin).slice(-2)}`);
  };

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
        <p css={tw`font-normal text-2xl text-white`}>{time}</p>
        <p css={tw`font-normal text-lg text-white`}>{date}</p>
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
                  variants={{
                    animate: (x) => {
                      const delay = x * 0.1;
                      return {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 1,
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
                  <div css={tw`flex gap-x-2`}>
                    <div css={tw`w-8 h-8 relative self-center`}>
                      <Image
                        src={item.app.iconImage}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div css={tw`flex flex-col`}>
                      <p css={tw`font-bold text-lg text-white`}>{item.title}</p>
                      <span css={tw`font-normal text-md text-white`}>
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <span css={tw`font-bold text-sm text-white`}>
                    {item.time}
                  </span>
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
              dragElastic={0.1}
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
              <span>Slide to Unlock</span>
            </SlideToUnlock>
          </UnlockSliderWrapper>
        </UnlockButton>
      </div>
    </motion.div>
  );
};

export default LockScreen;

const UnlockTop = styled.div(() => [
  tw`relative h-20 w-full flex flex-col items-center justify-center`,
  tw`border-[#00000040] border-b-[1px]`,
  css`
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0, #3b3b3b80),
      color-stop(1, #000000)
    );
    background-repeat: no-repeat;
  `,
]);

const UnlockSpacer = styled.div(() => [tw`w-full relative flex flex-grow-[1]`]);

const NotificationWrapper = styled(motion.div)(() => [tw`w-full flex-[1]`]);

const NotificationItem = styled(motion.div)(() => [
  tw`w-full flex bg-[#00000080] justify-between items-center text-left px-2 py-2`,
  tw`border-[#00000040] border-b-[2px]`,
]);
const Notifications = [
  {
    icon: "/images/icon_instagram.png",
    title: "Docotor appointment",
    subtitle: "",
    time: "in 3m",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Meeting with Bob",
    subtitle: "",
    time: "in 3m",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy 2",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy 3",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy 4",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy 5",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy 6",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
];
