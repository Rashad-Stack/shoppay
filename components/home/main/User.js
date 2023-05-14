import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Navigation, EffectCards } from "swiper";
import { userSwiperArray } from "@/data/home";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <Image
          fill
          sizes="500"
          src="/images/userHeader.jpg"
          alt="user header"
        />
      </div>
      <div className={styles.user_container}>
        {session ? (
          <div className={styles.user_infos}>
            <div className={styles.user_image}>
              <Image
                fill
                sizes="500"
                src={session.user?.image}
                alt="user image"
              />
            </div>
            <h4>{session.user?.name}</h4>
          </div>
        ) : (
          <div className={styles.user_infos}>
            <div className={styles.user_image}>
              <Image
                fill
                sizes="500"
                src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
                alt="user image"
              />
            </div>
            <div className={styles.user_infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user_links}>
          <li>
            <Link href="#">
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="#">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="#">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="#">
              <BsHeart />
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.user_swiper}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          navigation={true}
          modules={[Navigation, EffectCards]}
          className="user_menu_swiper">
          {userSwiperArray.map((item, i) => (
            <SwiperSlide key={i}>
              <Link href="#" className={styles.user_card}>
                <Image
                  fill
                  sizes="500"
                  src={item.image}
                  alt="user recommend item"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
