
// tools
import clsx from "clsx";

// css
import styles from "./styles.module.css";

export default function AboutUsTop(){
    return (
        <section className={styles.section}>
            <h1 
                className={
                    clsx(
                        styles.title,
                        "s_title"
                    )
                }
            >
                About Us
            </h1>
            <h2 
                className={
                    clsx(
                        styles.undertitle,
                        "s_undertitle"
                    )
                }
            >
                Welcome to <span className={styles.colored}>Malex Handyman!</span>
            </h2>
            <article className={styles.content}>
                <div className={styles.column}>
                    <p>
                        We provide a wide range of professional repair and installation services for your home or business. 
                        Our expert, <span className={styles.fat}>Alex Handyman</span>, brings years of experience in various repair fields, ensuring that all work is completed with precision and reliability.
                    </p>
                    <p>
                        No matter how complex the task, we are ready to help make your home more comfortable and functional. 
                        Contact us today, and Alex Handyman will get the job done quickly and reliably. 
                        We take pride in serving our clients with great attention to detail. 
                    </p>
                </div>
                <div className={styles.column}>
                    <p>
                        We value your time and comfort, and our goal is to complete every task efficiently and effectively. 
                        Whether it's a small household repair, furniture assembly, plumbing services, or complex system installations, we're here to deliver top-notch service.
                    </p>
                    <p>
                        Alex Handyman handles a wide range of tasks, from small repairs to large-scale projects. 
                        We understand that every home and business is unique, which is why we offer flexible solutions tailored to your needs and budget.
                    </p>
                </div>
            </article>
        </section>
    )
}