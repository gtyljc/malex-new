"use client";

// tools
import clsx from "clsx";

// components
import RedirectButton from "@/components/redirect-btn/redirect-btn";

// css
import styles from "./f-form-step.module.css";


export default function FirstFormStep({scrollToNextFunc}) {

    // should be insert in ul
    return (
        <li 
            className={
                clsx(
                    styles.step,
                    "s_row_e"
                )
            }
        >
            <h1 className={
                clsx(
                    styles.title,
                    "s_title"
                )
            }>Make an appointment</h1>
            <div className={styles.row}>
                <div className={styles.input_con}>
                    <label className={styles.input_title} htmlFor="name">Name</label>
                    <input name="name" type="text" className={styles.input} id="name" />
                </div>
                <div className={styles.input_con}>
                    <label className={styles.input_title} htmlFor="surname">Surname</label>
                    <input name="surname" type="text" className={styles.input} id="surname"/>
                </div>
            </div>
            <div className={styles.input_con}>
                <label className={styles.input_title} htmlFor="bwt">Address</label>
                <input name="address" type="text" className={styles.input} />
            </div>
            <div className={styles.input_con}>
                <label className={styles.input_title} htmlFor="bwt">Job description</label>
                <input name="job_desc" type="text" className={styles.input} />
            </div>
            <div className={styles.row}>
                <div className={styles.input_con}>
                    <label className={styles.input_title} htmlFor="bwt">The best way to get in touch</label>
                    <select name="bwt" id="bwt" className={styles.select}>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                <div className={styles.input_con}>
                    <input name="number" type="text" className={styles.input} />
                </div>
            </div>
            <RedirectButton
                label="Next"
                onClick={scrollToNextFunc}
                style={{marginTop: "25px"}}                         
            />
        </li>
    )
}