
// tools
import Link from "next/link"
import Image from "next/image"

// content
import AppointmentButton from "@/components/appointment-btn/appointment-btn"
import styles from "./index.module.css"
import banner_jpg from "./banner-1.jpg"

export default function Page() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.row_con}>
                    <div className={styles.row}>
                        <div className={styles.banner}>
                            <div className={styles.banner_info}>
                                <div>
                                    <h1 className={styles.banner_title}>Professional Plumbing Services for Your Home and Business</h1>
                                    <h2 className={styles.banner_undertitle}>Quick and reliable plumbing solutions for any need.</h2>
                                </div>
                                <div className={styles.banner_interactive}>
                                    <AppointmentButton/>
                                    <Link href="/about-us" className={styles.banner_undertitle}>Learn More About Us</Link>
                                </div>
                            </div>
                            <div className={styles.banner_thumbnail}>
                                <Image
                                    src={banner_jpg}
                                    alt="Man installs heating system "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.scroll_progress_bar}>
                    <span className={styles.progress_point}></span>
                    <span className={styles.progress_point}></span>
                    <span className={styles.progress_point}></span>
                </div>
            </section>
        </main>
    )
}