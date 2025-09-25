"use client"

// tools
import clsx from "clsx";
import Link from "next/link";

// css
import styles from "./redirect-btn.module.css";

export default function RedirectButton(
    {
        label,
        type = "blue", // blue / white
        onClick = () => {},
        style = {},
        isLink = false, 
        href = ""
    }
) {
    if(isLink){
        return (
            <Link 
                href={href}
                className={
                    clsx(
                        styles.btn,
                        type == "blue" ? styles.btn_blue: styles.btn_white
                    )
                }
                style={style}
            >
                <span>{label}</span>
            </Link>
        )
    }
    else {
        return (
            <button 
                className={
                    clsx(
                        styles.btn,
                        type == "blue" ? styles.btn_blue: styles.btn_white
                    )
                }
                style={style}
                onClick={onClick}
            >
                <span>{label}</span>
            </button>
        )
    }
}