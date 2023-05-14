import React from "react";
import styles from "./style.module.scss";
import { MdFlashOn } from "react-icons/md";
import CountDown from "@/components/countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./FlashCard";

export default function FlashDeals() {
  return (
    <div className={styles.flash_deals}>
      <div className={styles.flash_deals_header}>
        <h1>
          FLASH SALE <MdFlashOn />
        </h1>
        <CountDown date={new Date(2023, 5, 20)} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={breakoints}
        className="flash_deals_swiper">
        {flashDealsArray.map((deal, i) => (
          <SwiperSlide key={i}>
            <FlashCard product={deal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Swiper slider break points
const breakoints = {
  450: { slidesPerView: 2 },
  630: { slidesPerView: 3 },
  620: { slidesPerView: 4 },
  1232: { slidesPerView: 5 },
  1520: { slidesPerView: 6 },
};
