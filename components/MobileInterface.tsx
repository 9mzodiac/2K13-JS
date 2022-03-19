import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";

const MobileInterface: React.FC<any> = ({ children }: any) => {
  return (
    <IPhoneFrame>
      <Image
        src="/images/iphone-frame.png"
        layout="fill"
        objectFit="contain"
        className="index-behind iphone-frame"
      />
      <IphoneScreenContainer>
        <IPhoneInside>
          <Image
            src="/images/iphone-wallpaper.png"
            layout="fill"
            objectFit="cover"
            className="index-behind"
          />
          {children}
        </IPhoneInside>
      </IphoneScreenContainer>
      <Link href="/">
        <a>
          <HomeButton></HomeButton>
        </a>
      </Link>
    </IPhoneFrame>
  );
};

export default MobileInterface;

const HomeButton = styled.div(() => [
  tw`absolute bottom-8 h-16 w-16 z-10 left-1/2 -translate-x-1/2 rounded-full transition-all duration-150 ease-in`,
  tw`active:(bg-white opacity-25)`,
]);

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

const IphoneScreenContainer = styled.div(() => [
  tw`container mx-auto flex`,
  tw`w-full h-full relative justify-center items-center px-0 pt-0 pb-0`,
  tw`md:(px-[11%] pt-[34%] pb-[28%])`,
]);

const IPhoneInside = styled.div(() => [
  tw`w-full h-full relative flex flex-col justify-between overflow-hidden`,
]);
