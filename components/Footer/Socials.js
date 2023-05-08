import styles from "./styles.module.scss";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import React from "react";
import {
  BsInstagram,
  BsPinterest,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

export default function Socials() {
  return (
    <div className={styles.footer_socials}>
      <section>
        <h1>STAY CONNECTED</h1>
        <ul>
          <li>
            <a href="/" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsInstagram />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsYoutube />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsPinterest />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <BsSnapchat />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
