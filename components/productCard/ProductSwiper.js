import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

export default function ProductSwiper({ images }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  }, []);

  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}>
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={styles.image}>
              <Image fill sizes="1080" src={image.url} alt={image.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
