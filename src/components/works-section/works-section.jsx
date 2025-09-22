
// components
import RedirectButton from "@/components/redirect-btn/redirect-btn"
import ScrollProgressBar from "@/components/scroll-progress-bar/scroll-progress-bar"

// css
import styles from "./works-section.module.css"

export default function WorksSection(){
    return (
        <section className={styles.section}>
            <h1 className="s_title">Our Works</h1>
            <div className="s_row_con">
                <ul className="s_row">
                    <li className={styles.cards_con}>
                        <div className={styles.card}>
                            
                        </div>
                        <div className={styles.card}>
                            
                        </div>
                        <div className={styles.card}>
                            
                        </div>
                    </li>
                </ul>
            </div>
            <ScrollProgressBar/>
            <RedirectButton
                label="See all works"
                isLink={true}
                href="/works"
            />
        </section>
    )
}