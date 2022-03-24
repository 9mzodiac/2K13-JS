import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { motion } from "framer-motion";
import { useState } from "react";
const CircleControl: React.FC<any> = (props: any) => {
  const variant = {
    animate: {
      pathLength: 1,
    },
    close: {
      pathLength: 0,
    },
  };
  const [prog, setProgres] = useState(false);

  const PlaySong = () => {
    setProgres(true);
  };

  return (
    <OuterContainer>
      <CircleSvg viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="39"
          strokeWidth="20"
          stroke="#043247"
          fill="none"
          animate={prog ? "animate" : "close"}
          initial="close"
          variants={variant}
          transition={{
            duration: 1,
          }}
        />
      </CircleSvg>
      <CircleController onClick={PlaySong}>
        <i className={`icomoon icon-${prog ? "pause" : "play"}`}></i>
      </CircleController>
    </OuterContainer>
  );
};

const CircleSvg = styled.svg(() => [
  tw`absolute z-10 top-0 h-full w-full -rotate-90`,
]);

const OuterContainer = styled.div(() => [
  tw`rounded-full h-10 w-10 relative z-20`,
  css`
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2) inset,
      0 1px 2px rgba(0, 0, 0, 0.8) inset;
  `,
]);

const CircleController = styled.div(() => [
  tw`rounded-full h-7 w-7 bg-white absolute flex justify-center items-center cursor-pointer z-30 relative`,
  tw`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
  css`
    box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.2) inset,
      0px 1px 2px rgba(0, 0, 0, 0.8) inset;
    &:focus,
    &:active {
      box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.2) inset,
        0px 2px 2px rgba(0, 0, 0, 0.8) inset;
    }
  `,
  css`
    i {
      ${tw`text-xs text-[#c7c7c7] relative`}
    }
  `,
]);

export default CircleControl;
