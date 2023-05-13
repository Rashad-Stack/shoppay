import React, { useState } from "react";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";

import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";
import Image from "next/image";

export default function Top({ country }) {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  const { name, flag } = country || {};
  const { name: username, image } = session?.user || {};

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.li}>
            <div className={styles.img}>
              <Image fill sizes="500" src={flag} alt={name} />
            </div>
            <span>{name} / bdt</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}>
            {session ? (
              <div className={styles.flex}>
                <div className={styles.img}>
                  <Image fill sizes="500" src={image} alt="profile photo" />
                </div>
                <span>{username}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            )}
            {isVisible && <UserMenu />}
          </li>
        </ul>
      </div>
    </div>
  );
}
