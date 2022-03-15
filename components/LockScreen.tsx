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
    console.log("Render date time");
    // Set the date and time
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

    setTime(`${currentHour.toPrecision(2)}:${currentMin.toPrecision(2)}`);
  };
  const constraintsRef = useRef(null);
  return (
    <IphoneScreenContainer>
      <IPhoneInside>
        <Image
          src="/images/iphone-lockscreen-image.jpeg"
          layout="fill"
          objectFit="cover"
          className="index-behind"
        />
        <UnlockTop>
          <Image
            src="/images/lock-top.png"
            layout="fill"
            objectFit="cover"
            className="index-behind"
          />
          <p className="time">{time}</p>
          <p className="date">{date}</p>
        </UnlockTop>
        <UnlockSpacer>{/* <NotificationCenter /> */}</UnlockSpacer>
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
                onDragEnd={(event: any, info: any) => {
                  console.log(info);
                  console.log(event);
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
      </IPhoneInside>
    </IphoneScreenContainer>
  );
};

export default LockScreen;

const IphoneScreenContainer = styled.div(() => [
  tw`container mx-auto flex`,
  tw`w-full h-full relative justify-center items-center px-0 pt-0 pb-0`,
  tw`md:(px-[11%] pt-[34%] pb-[28%])`,
]);

const IPhoneInside = styled.div(() => [
  tw`w-full h-full relative flex flex-col justify-between`,
]);

const UnlockTop = styled.div(() => [
  tw`relative h-20 w-full flex flex-col items-center justify-center`,
]);
const UnlockButton = styled.div(() => [tw`w-full relative h-20`]);
const UnlockSpacer = styled.div(() => [tw`w-full relative flex flex-grow-[1]`]);

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
