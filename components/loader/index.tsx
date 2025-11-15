"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  useEffect(() => {
    setTimeout(() => {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.classList.add(styles.hidden);
      }
    }, 1500);
  }, []);

  return (
    <div className={styles.loader} id="loader">
      <div className={styles.loaderText}>&lt; Initializing... /&gt;</div>

      <div className={styles.loaderBar}>
        <div className={styles.loaderProgress}></div>
      </div>
    </div>
  );
};

export default Loader;
