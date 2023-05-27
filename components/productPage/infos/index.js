import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "../share";
import ProductAccordions from "./accordion";
import SimilarSwiper from "./similarSwiper";

export default function Infos({ product }) {
  const [qty, setQty] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setQty(1);
  }, [router.query.style]);

  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [product.quantity, qty, router.query.size]);

  return (
    <div className={styles.infos}>
      <div className={styles.infos_container}>
        <h1 className={styles.infos_name}>{product.name}</h1>
        <h2 className={styles.infos_sku}>{product.sku}</h2>
        <div className={styles.infos_rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: "#facf19" }}
          />
          {product.numReviews}
          {product.numReviews == 1 ? " review" : " reviews"}
        </div>
        <div className={styles.infos_price}>
          {!router?.query?.size ? (
            <h2>{product.priceRange}</h2>
          ) : (
            <h2>{product.price}</h2>
          )}
          {product.discount > 0 ? (
            <h3>
              {router?.query?.size && (
                <>
                  <span>${product.priceBefore}</span>
                  <span>(-{product.discount}%)</span>
                </>
              )}
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos_shipping}>
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}{" "}
        </span>
        <span>
          {router?.query?.size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available
        </span>
        <div className={styles.infos_sizes}>
          <h4>Select a Size : </h4>
          <div className={styles.infos_sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                key={i}
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}>
                <div
                  className={`${styles.infos_sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}>
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos_colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span
                key={i}
                className={`${
                  i == router.query.style ? styles.active_color : ""
                }`}>
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <Image
                    width={100}
                    height={100}
                    src={color.image}
                    alt={color.image}
                  />
                </Link>
              </span>
            ))}
        </div>
        <div className={styles.infos_qty}>
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() =>
              qty < product.quantity && setQty((prev) => prev + 1)
            }>
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos_actions}>
          <button
            disabled={product.quantity < 1}
            style={{
              cursor: product.quantity < 1 ? "not-allowed" : "pointer",
            }}>
            <BsHandbagFill />
            <b>ADD TO CART</b>
          </button>
          <button>
            <BsHeart />
            <b>WISHLIST</b>
          </button>
        </div>
        <Share />
        <ProductAccordions
          details={[product.description, ...product.details]}
        />
        <SimilarSwiper />
      </div>
    </div>
  );
}
