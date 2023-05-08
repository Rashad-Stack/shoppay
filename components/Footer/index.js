import styles from "./styles.module.scss";
import React from "react";
import Links from "./Links";
import Socials from "./Socials";
import NewsLetter from "./NewsLetter";
import Payment from "./Payment";
import Copyrights from "./Copyrights";

export default function Footer({ country }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyrights country={country} />
      </div>
    </footer>
  );
}
