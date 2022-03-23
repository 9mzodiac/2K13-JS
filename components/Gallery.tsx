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
      {IMAGES.map((item: any, key: number) => (
        <GalleryItem
          key={`gallery-item-${key}`}
          onClick={() => {
            console.log("COMES GAL");

            setOpenGallery(true);
            setSelectedImage(key);
          }}
        >
          <Image src={item.src} layout="fill" objectFit="cover" />
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
            {IMAGES.map((item: any, key: number) => (
              <SwiperSlide key={`gallery-image-${key}`}>
                <ImageContainerSwiper>
                  <Image src={item.src} layout="fill" objectFit="contain" />
                </ImageContainerSwiper>
              </SwiperSlide>
            ))}
            <span
              css={tw`absolute top-20 z-20 right-4 h-4 w-4 bg-white rounded-full text-center text-sm cursor-pointer`}
              onClick={() => setOpenGallery(false)}
            >
              x
            </span>
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

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
  },
];
