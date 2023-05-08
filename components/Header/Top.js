import React, { useState } from "react";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";

import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";

export default function Top() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top_container}>
        <div></div>
        <ul className={styles.top_list}>
          <li className={styles.li}>
            <img
              src="https://www.seekpng.com/png/detail/298-2988630_illustration-of-flag-of-bangladesh-bangladesh-flag-logo.png"
              alt="Illustration Of Flag Of Bangladesh - Bangladesh Flag Logo Png@seekpng.com"
            />
            <span>Bangladesh / bdt</span>
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
            onMouseLeave={() => setIsVisible(false)}
          >
            {isLoggedIn ? (
              <li>
                <div className={styles.flex}>
                  <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" />
                  <span>Rashad</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {isVisible && <UserMenu isLoggedIn={isLoggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
