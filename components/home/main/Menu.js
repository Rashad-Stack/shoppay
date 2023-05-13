import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import {
  GiLargeDress,
  GiClothes,
  GiHeadphones,
  GiWatch,
  GiHealthCapsule,
  GiBallerinaShoes,
  GiBigDiamondRing,
  GiSportMedal,
  Gi3DHammer,
} from "react-icons/gi";
import { HiOutlineHome } from "react-icons/hi";
import { BiCameraMovie, BiCategory, BiGift } from "react-icons/bi";
import { menuArray } from "@/data/home";
import { FaBaby } from "react-icons/fa";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { MdOutlineSmartToy, MdOutlineSportsEsports } from "react-icons/md";
import { BsPhoneVibrate } from "react-icons/bs";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <Link href="#" className={styles.menu_header}>
        <BiCategory />
        <b>Category</b>
      </Link>
      <ul className={styles.menu_list}>
        {menuArray.map((menu, i) => (
          <li key={i}>
            <Link href={menu.link}>
              {menuIcons[i]}
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const menuIcons = {
  0: <GiLargeDress />,
  1: <GiClothes />,
  2: <GiHeadphones />,
  3: <GiWatch />,
  4: <HiOutlineHome />,
  5: <GiHealthCapsule />,
  6: <GiBallerinaShoes />,
  7: <GiBigDiamondRing />,
  8: <GiSportMedal />,
  9: <FaBaby />,
  10: <BiCameraMovie />,
  11: <MdOutlineSportsEsports />,
  12: <BsPhoneVibrate />,
  13: <MdOutlineSmartToy />,
  14: <BiGift />,
  15: <Gi3DHammer />,
  16: <AiOutlineSecurityScan />,
};
