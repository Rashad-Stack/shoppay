import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${styles.swiper} main_swiper`}>
        {[...Array(10).keys()].map((i) => (
          <SwiperSlide key={i}>
            <Image
              fill
              sizes="1080"
              priority
              src={`/images/swiper/${i + 1}.jpg`}
              alt="slider image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
