import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import tw from "twin.macro";

const LockScreen: React.FC<any> = ({ onUnlock }: any) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
        duration: 1,
        type: "linear",
      },
    },
    locked: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        type: "linear",
      },
    },
    exit: {
      scale: 1.5,
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const constraintsRef = useRef<any>(null);
  return (
    <motion.div
      css={tw`w-full h-full flex flex-col`}
      animate="locked"
      initial="initial"
      exit="exit"
      variants={unlockVariants}
    >
      <UnlockTop>
        <Image
          src="/images/lock-top.png"
          layout="fill"
          objectFit="cover"
          className="index-behind"
        />
        <p css={tw`font-normal text-2xl text-white`}>{time}</p>
        <p css={tw`font-normal text-lg text-white`}>{date}</p>
      </UnlockTop>
      <UnlockSpacer>
        <NotificationWrapper>
          <div
            css={tw`absolute w-full h-full overflow-auto`}
            className="no-scrollbar"
          >
            {Notifications.map((item, key) => (
              <NotificationItem
                key={key}
                drag="x"
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
                dragSnapToOrigin
                whileTap={{ cursor: "grabbing" }}
              >
                <div css={tw`flex gap-x-2`}>
                  <div css={tw`w-8 h-8 relative self-center`}>
                    <Image src={item.icon} layout="fill" objectFit="contain" />
                  </div>
                  <div css={tw`flex flex-col`}>
                    <p css={tw`font-bold text-lg text-white`}>{item.title}</p>
                    <span css={tw`font-normal text-md text-white`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <span css={tw`font-bold text-sm text-white`}>{item.time}</span>
              </NotificationItem>
            ))}
          </div>
        </NotificationWrapper>
      </UnlockSpacer>
      <div className="unlock-bottom-container">
        <UnlockButton>
          <Image
            src="/images/lock-bottom.png"
            layout="fill"
            objectFit="cover"
          />
          <SlideToUnlock>
            <Image
              src="/images/slide-to-unlock.gif"
              layout="fill"
              objectFit="cover"
            />
          </SlideToUnlock>
          <UnlockSliderWrapper ref={constraintsRef}>
            <Slider
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
              dragSnapToOrigin
              whileDrag={{ scale: 1.1 }}
              whileTap={{ cursor: "grabbing" }}
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
]);
const UnlockButton = styled.div(() => [tw`w-full relative h-16`]);
const UnlockSpacer = styled.div(() => [tw`w-full relative flex flex-grow-[1]`]);

const SlideToUnlock = styled.div(() => [tw`absolute h-full w-full`]);

const UnlockSliderWrapper = styled(motion.div)(() => [
  tw`absolute w-[calc(100% - 2.2rem)] h-[calc(100% - 1.6rem)] 
  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`,
  tw`lg:(w-[calc(100% - 3rem)] h-[calc(100% - 1rem)] )`,
]);

const Slider = styled(motion.div)(() => [
  tw`w-16 h-10 lg:(h-12) absolute cursor-pointer`,
  css`
    .slider-image {
      pointer-events: none;
    }
  `,
]);

const NotificationWrapper = styled.div(() => [tw`w-full flex-[1]`]);

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
    title: "Troy",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
  {
    icon: "/images/icon_instagram.png",
    title: "Troy",
    subtitle: "Doesn't work bro.",
    time: "2:44 PM",
  },
];
