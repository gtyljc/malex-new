"use client"

// tools
import { useState } from "react";

// assets
import styles from "./scroll-progress-bar.module.css";

export default function ScrollProgressBar({delay}){
    const [index, setIndex] = useState(0);

    return (
        <div className={styles.bar}>
            <span className={styles.point}></span>
            <span className={styles.point}></span>
            <span className={styles.point}></span>
        </div>
    )
}