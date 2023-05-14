import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import Image from "next/image";

export default function ProductsSwiper({ header, products, bgColor }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div
          className={styles.header}
          style={{ backgroundColor: bgColor || "" }}>
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={breakoints}
        className="product_swiper">
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className={styles.product}>
              <div className={styles.product_image}>
                <Image
                  fill
                  sizes="500"
                  src={product.image}
                  alt="product image"
                />
              </div>
              <div className={styles.product_infos}>
                <h1 className={styles.product_name}>
                  {product.name.length > 30
                    ? `${product.name.slice(0, 30)}...`
                    : product.name}
                </h1>
                {product.price ? (
                  <span>USD ${product.price}</span>
                ) : (
                  <span>Coming soon...</span>
                )}
              </div>
            </div>
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
