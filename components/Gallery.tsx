import styled from "@emotion/styled";
import ExternalPortal from "portal/external";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "twin.macro";
import { motion } from "framer-motion";
import Image from "next/image";

const Gallery: React.FC<any> = ({ images }: any) => {
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
    <GalleryContainer>
      {images.length > 0 &&
        images.map((item: any, key: number) => (
          <GalleryItem
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

const GalleryContainer = styled.div(() => [
  tw`grid grid-flow-row grid-cols-4 gap-1`,
]);

const GalleryItem = styled(motion.div)(() => [
  tw`relative h-20 w-full cursor-pointer`,
]);

const ImageContainerSwiper = styled.div(() => [tw`h-full w-full relative`]);

export default Gallery;
