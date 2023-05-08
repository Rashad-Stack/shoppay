import Link from "next/link";
import styles from "./styles.module.scss";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";

export default function Copyrights() {
  return (
    <div className={styles.footer_copyrights}>
      <section>
        &copy;{new Date().getFullYear()} SHOPPAY All Rights Reserved.
      </section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> <span>Bangladesh</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

const data = [
  {
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
];
