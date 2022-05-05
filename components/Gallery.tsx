import styled from "@emotion/styled";
import ExternalPortal from "portal/external";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { motion } from "framer-motion";
import Image from "next/image";
import { css } from "@emotion/react";

const Gallery: React.FC<any> = ({ images, gridCols, borderImage }: any) => {
  const [swiperInstance, setSwiper] = useState<any>(false);
  const [selectedImage, setSelectedImage] = useState<any>(0);
  const [openGallery, setOpenGallery] = useState<any>(false);

  useEffect(() => {
    if (openGallery) {
      document.getElementById("external-portal")?.classList.add("active");
    } else {
      document.getElementById("external-portal")?.classList.remove("active");
    }

    if (openGallery && swiperInstance && !swiperInstance?.destroyed) {
      swiperInstance?.slideTo(selectedImage);
    }
  }, [swiperInstance, openGallery, selectedImage]);
  return (
    <GalleryContainer gridCols={gridCols}>
      {images.length > 0 &&
        images.map((item: any, key: number) => (
          <GalleryItem
            borderImage={borderImage}
            key={`gallery-item-${key}`}
            onClick={() => {
              setOpenGallery(true);
              setSelectedImage(key);
            }}
          >
            <Image
              src={item}
              layout="fill"
              objectFit="cover"
              alt={`gallery image - ${key}`}
            />
          </GalleryItem>
        ))}
      <ExternalPortal>
        {openGallery && (
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            onSwiper={setSwiper}
            lazy={false}
          >
            {images.length > 0 &&
              images.map((item: any, key: number) => (
                <SwiperSlide key={`gallery-image-${key}`}>
                  <ImageContainerSwiper>
                    <Image
                      src={item}
                      layout="fill"
                      objectFit="contain"
                      alt={`gallery slide - ${key}`}
                    />
                  </ImageContainerSwiper>
                </SwiperSlide>
              ))}

            <i
              className="icomoon icon-circle-with-cross"
              css={tw`absolute top-20 z-20 right-4 text-xl text-center text-white cursor-pointer hover:text-blue-400 transition-all duration-150 ease-in`}
              onClick={() => setOpenGallery(false)}
            ></i>
          </Swiper>
        )}
      </ExternalPortal>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div((props: any) => [
  tw`grid grid-flow-row gap-1`,
  props.gridCols
    ? css`
        grid-template-columns: repeat(${props.gridCols}, minmax(0, 1fr));
      `
    : tw`grid-cols-4`,
]);

const GalleryItem = styled(motion.div)((props: any) => [
  tw`relative h-full w-full cursor-pointer shadow`,
  props.borderImage && tw`border-4 border-white`,
  css`
    aspect-ratio: 1/1;
  `,
]);

const ImageContainerSwiper = styled.div(() => [tw`h-full w-full relative`]);

export default Gallery;
