import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import tw from "twin.macro";
import LockScreen from "./LockScreen";

const MobileInterface: React.FC<any> = (props: any) => {
  const [unlocked, setUnlocked] = useState(false);

  const onUnlock = () => {
    setUnlocked(true);
  };

  return (
    <IPhoneFrame>
      <Image
        src="/images/iphone-frame.png"
        layout="fill"
        objectFit="contain"
        className="index-behind iphone-frame"
      />
      {!unlocked && <LockScreen hidden={unlocked} onUnlock={onUnlock} />}

      {/* <UnlockScreen hidden={!unlocked} /> */}
      <HomeButton onClick={() => {

      }}></HomeButton>
    </IPhoneFrame>
  );
};

export default MobileInterface;

const HomeButton = styled.div(()=>[
    tw`absolute bottom-10 h-16 w-16 z-10 left-1/2 -translate-x-1/2 rounded-full transition-all duration-150 ease-in`,
    tw`active:(bg-white opacity-25)`
])

const IPhoneFrame = styled.div(() => [
  tw`mx-auto w-full h-screen flex flex-col relative`,
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
