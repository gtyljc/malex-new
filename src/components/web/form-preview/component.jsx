
"use client";

// others
import Image from "next/image";
import { useContext } from "react";
import clsx from "clsx";
import { FormCtx } from "@web/form/ctx";

// styles
import styles from "./styles.module.css";

// images
import thumbnail from "./thumbnail.jpg";

export default function FormPreviewSection () {
    const { openForm } = useContext(FormCtx);

    return (
        <section className={ styles.preview } onClick={ openForm }>
            <div className={ styles.left_part }>
                <h1 className={ styles.title }>We’re Here to Help.</h1>
                <h2 className={ styles.undertitle }>Contact us for a free consultation!</h2>
                <div className={ styles.form }>
                    <div className={ styles.row }>
                        <div className={ styles.input_con }>
                            <p className={ styles.input_label }>Name</p>
                            <div className="input"></div>
                        </div>
                        <div className={ styles.input_con }>
                            <p className={ styles.input_label }>Surname</p>
                            <div className="input"></div>
                        </div>
                    </div>
                    <div className={ styles.input_con }>
                        <p className={ styles.input_label }>Address</p>
                        <div className="input"></div>
                    </div>
                    <div className={ styles.input_con }>
                        <p className={ styles.input_label }>Job Description</p>
                        <div className="input"></div>
                    </div>
                    <div className={ styles.row }>
                        <div className={ styles.input_con }>
                            <p className={ styles.input_label }>The best way to get in touch</p>
                            <div className={ clsx(styles.input, styles.select) }>
                                <span>Select</span>
                            </div>
                        </div>
                        <div className={ styles.input_con }>
                            <div className="input">
                                <span>Number</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <RedirectButton label="Contact Us Now" /> */}
            </div>
            <div className={ styles.right_part }>
                <Image 
                    src={ thumbnail }
                    alt="Contact us now!"
                />
            </div>
        </section>
    )
}