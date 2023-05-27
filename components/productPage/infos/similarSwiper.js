import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { similar_products } from "@/data/products";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function SimilarSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={1}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="swiper similar_swiper">
      {similar_products.map((url, i) => (
        <SwiperSlide key={i}>
          <Image width={1000} height={1000} src={url} alt={url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
