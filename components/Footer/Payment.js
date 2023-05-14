import Image from "next/image";
import styles from "./styles.module.scss";
import React from "react";

export default function Payment() {
  return (
    <div className={styles.footer_payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer_flexwrap}>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/visa.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/mastercard.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/paypal.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/maestro.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/jcb.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/cb.webp"
          />
        </div>
        <div className={styles.footer_card}>
          <Image
            fill
            sizes="500"
            alt="payment card"
            src="/images/payment/american_express.webp"
          />
        </div>
      </div>
    </div>
  );
}
