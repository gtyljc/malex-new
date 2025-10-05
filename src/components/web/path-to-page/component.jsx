
// tools
import Link from "next/link";
import Image from "next/image";

// css
import styles from "./styles.module.css";

// images
import arrow_svg from "./arrow.svg";


export default function PathToPage({ page_name }) {
    return (
        <section className={styles.path}>
            <Link className={styles.start_page} href="/">Home</Link>
            <Image
                src={arrow_svg}
                alt="Path from main page"
            />
            <h1 className={styles.page}>{page_name}</h1>
        </section>
    )
}