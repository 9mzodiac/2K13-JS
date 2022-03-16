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
          <div css={tw`w-full h-full`}></div>
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
]);
const UnlockButton = styled.div(() => [tw`w-full relative h-20`]);
const UnlockSpacer = styled.div(() => [
  tw`w-full relative flex flex-grow-[1] px-5 py-3`,
]);

const SlideToUnlock = styled.div(() => [tw`absolute h-full w-full`]);

const UnlockSliderWrapper = styled(motion.div)(() => [
  tw`absolute w-[calc(100% - 3rem)] h-[calc(100% - 2rem)] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`,
]);

const Slider = styled(motion.div)(() => [
  tw`w-16 h-12 absolute cursor-pointer`,
  css`
    .slider-image {
      pointer-events: none;
    }
  `,
]);

const NotificationWrapper = styled.div(() => [tw`w-full h-[max-content] `]);
