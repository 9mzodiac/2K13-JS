import {
  ListContainer,
  ListWrapper,
} from "@/components/elements/styled/common";
import {
  AppHeader,
  AppHeadLabel,
  IosButton,
} from "@/components/elements/styled/header";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Link from "next/link";
import tw from "twin.macro";
import { CustomPage } from "types/pages";

const MerchPage: CustomPage = () => {
  return (
    <motion.div
      css={tw`flex flex-col h-full bg-white`}
      animate="animate"
      initial="initial"
      exit="exit"
    >
      {/* Header */}
      <AppHeader
        c1="#6D83A1"
        c2="#8eabd4"
        css={tw`relative border-black border-b-[1.5px]`}
      >
        <AppHeadLabel>Shop</AppHeadLabel>
        <Link href="/">
          <IosButton
            css={tw`left-2 text-md`}
            hoverColor="#6e8aaf"
            color="#476a99"
          >
            Home
          </IosButton>
        </Link>
      </AppHeader>

      {/* Scrollable Content */}
      <div css={tw`flex-1 overflow-y-auto px-4 py-2`}>
        <ListContainer>
          <ListWrapper>
            <div css={tw`flex flex-row justify-between items-start border-b-[#cccccc] border-b-[1px] px-4 py-3`}>
              {/* Product Image */}
              <img src="https://zeros.world/cdn/shop/products/supremewesthollywoodboxlogotee.png?v=1676683551" alt="Supreme Box Logo Tee" css={tw`w-24 h-24 object-cover rounded`} />
              
              {/* Product Details */}
              <div css={tw`flex flex-col items-start flex-1 ml-4`}>
                <span css={tw`text-[1.2rem] text-black font-bold`}>Supreme Box Logo Tee</span>
                <span css={tw`text-md text-[#848484] font-medium`}>$150</span>
              </div>

              {/* Buy Button */}
              <a href="https://your-shopify-link.com/product/supreme-box-logo-tee" target="_blank" rel="noopener noreferrer">
                <IosButton css={tw`text-sm px-3 py-1 bg-black text-white rounded-md`}>Buy</IosButton>
              </a>
            </div>
          </ListWrapper>
        </ListContainer>
      </div>


    </motion.div>
  );
};

MerchPage.inner = true;
MerchPage.statusBgColor = "#8eabd4";
MerchPage.statusTextColor = "#000";

export default MerchPage;
