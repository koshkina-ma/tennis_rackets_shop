"use client";

import React from "react";
import styles from "./filters.module.css";

export function Filters() {
  return (
    <div className={styles.filters}>
      <h3 className={styles.filterTitle}>Бренд</h3>
      <ul className={styles.filterList}>
        <li className={styles.filterItem}>All</li>
        <li className={styles.filterItem}>Wilson</li>
        <li className={styles.filterItem}>Head</li>
        <li className={styles.filterItem}>Yonex</li>
        <li className={styles.filterItem}>Babolat</li>
        <li className={styles.filterItem}>Tecnifibre</li>
      </ul>
    </div>
  );
}

