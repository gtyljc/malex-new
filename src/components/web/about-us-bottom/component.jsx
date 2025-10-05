
// tools
import Image from "next/image";

// css
import styles from "./styles.module.css";

// images
import thumbnail_jpg from "./thumbnail.jpg";


export default function AboutUsBottom(){
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <p>
                    Our goal is not just to get the job done but to exceed your expectations. 
                    We use only high-quality materials and modern tools to ensure the durability and safety of all completed work.
                </p>
                <p>
                    Malex Handyman is your trusted partner for all your home repair and handyman needs. 
                    We’re here to help you save time and effort by taking care of all the work, whether it’s small repairs or complex installations.
                </p>
            </div>
            <div className={styles.thumbnail}>
                <Image
                    src={thumbnail_jpg}
                    alt="Malex it's your "
                />
            </div>
        </section>
    );
}