import React from "react";
import styles from "./styles.module.scss";
import SwiperSlider from "./SwiperSlider";
import Offers from "./Offers";
import Menu from "./Menu";
import User from "./User";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <Menu />
      <SwiperSlider />
      <Offers />
      <User />
    </div>
  );
}
