import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { MdFlashOn } from "react-icons/md";

export default function FlashCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <Link href={product.link}>
          <Image fill sizes="500" alt={product.name} src={product.image} />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn /> <span>-{product.discount}</span>
        </div>
      </div>

      <div className={styles.card_price}>
        <span>
          USD
          {(product.price - product.price / product.discount).toFixed(2)}$
        </span>
        <span>
          -USD
          {(
            product.price -
            (product.price - product.price / product.discount)
          ).toFixed(2)}
          $
        </span>
      </div>
      <div className={styles.card_bar}>
        <div
          className={styles.card_bar_inner}
          style={{ width: `${product.sold}%` }}></div>
      </div>
      <div className={styles.card_percentage}>{product.sold}%</div>
    </div>
  );
}
