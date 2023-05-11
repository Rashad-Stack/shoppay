import React from "react";
import styles from "./styles.module.scss";
import { DotLoader as Loader } from "react-spinners";

export default function DotLoader({ loading }) {
  return (
    <div className={styles.loader}>
      <Loader color="#2f82ff" loading={loading} />
    </div>
  );
}
