import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { offersAarray } from "@/data/home";

// import required modules
import { Navigation } from "swiper";
import Link from "next/link";
import Image from "next/image";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Navigation]}
        className="offers_swiper">
        {offersAarray.map((offer, i) => (
          <SwiperSlide key={i}>
            <Link href="#" className={styles.offers_link}>
              <Image src={offer.image} alt="offer image" fill sizes="500" />
              <span className={styles.price}>${offer.price}</span>
              <span className={styles.discount}>-{offer.discount}%</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
