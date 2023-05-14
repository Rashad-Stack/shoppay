import React from "react";
import styles from "./styles.module.scss";
import { BsArrowRightCircle } from "react-icons/bs";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Categories({ header, products = [], bgColor }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <div className={styles.category} style={{ backgroundColor: `${bgColor}` }}>
      <div className={styles.category_header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category_products}>
        {products
          .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .map((product, index) => (
            <div key={index} className={styles.category_image}>
              <Image fill sizes="500" src={product.image} alt={product.image} />
            </div>
          ))}
      </div>
    </div>
  );
}
