"use client"

// others
import clsx from "clsx";
import Link from "next/link";

// css
import styles from "./styles.module.css";

export default function RedirectButton(
    {
        label,
        type = "blue", // blue / white
        style = {},
        isLink = false, 
        href = "",
        isSubmit = "",
        onClick = () => {}
    }
) {

    // redirect btn as link
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
    
    // redirect btn as submit btn of form
    if(isSubmit) {
        return (
            <input
                type="submit"
                className={
                    clsx(
                        styles.btn,
                        type == "blue" ? styles.btn_blue: styles.btn_white
                    )
                }
                style={style}
                onClick={onClick}
                value={label}
            />
        )
    }

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
            type="button"
        >
            <span>{label}</span>
        </button>
    )
}