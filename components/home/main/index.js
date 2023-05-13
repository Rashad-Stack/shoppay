import React from "react";
import styles from "./styles.module.scss";
import SwiperSlider from "./SwiperSlider";
import Offers from "./Offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";

export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <SwiperSlider />
      <Offers />
      <User />
    </div>
  );
}
