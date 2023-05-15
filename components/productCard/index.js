import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getColor, sortByPrice } from "./utils";
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    sortByPrice("acc", product.subProducts[active]?.sizes)
  );
  const [colors, setColors] = useState(getColor(product.subProducts));

  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(sortByPrice("acc", product.subProducts[active]?.sizes));
    setColors(getColor(product.subProducts));
  }, [active, product.subProducts]);

  return (
    <div className={styles.product}>
      <Link href={`/product/${product.slug}?style=${active}`}>
        <ProductSwiper images={images} />
      </Link>
      {product.subProducts[active].discount > 0 && (
        <div className={styles.product_discount}>
          -{product.subProducts[active].discount}%
        </div>
      )}
      <div className={styles.product_infos}>
        <h1>
          {product.name.length > 45
            ? `${product.name.substring(0, 45)}...`
            : product.name}
        </h1>
        <span>
          {prices.length === 1
            ? `USD $${prices[0]}`
            : `USD $${prices[0]} - $${prices[prices.length - 1]}`}
        </span>
        <div className={styles.product_colors}>
          {colors &&
            colors.map((color, index) =>
              color.image ? (
                <div
                  key={index}
                  className={`${index === active && styles.active} ${
                    styles.image
                  }`}
                  onMouseOver={() => {
                    setImages(product.subProducts[index].images);
                    setActive(index);
                  }}>
                  <Image fill sizes="500" src={color.image} alt={color.image} />
                </div>
              ) : (
                <span
                  key={index}
                  style={{ backgroundColor: color.color }}
                  onMouseOver={() => {
                    setImages(product.subProducts[index].images);
                    setActive(index);
                  }}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
}
