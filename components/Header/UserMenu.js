import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function UserMenu() {
  const { data: session } = useSession();
  const { name: username, image } = session?.user || {};
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay !</h4>
      {session ? (
        <div className={styles.flex}>
          <div className={styles.menu_user_photo}>
            <Image fill sizes="800" alt="User Photo" src={image} />
          </div>
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{username}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/message">Message</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
