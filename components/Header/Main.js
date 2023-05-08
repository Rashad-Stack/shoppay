import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="" />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search_icon}>
            <RiSearch2Line />
          </div>
        </div>

        <Link href="/cart" className={styles.cart}>
          <FaOpencart />
          <span>{cart.length}</span>
        </Link>
      </div>
    </div>
  );
}
