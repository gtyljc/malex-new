
// tools
import Image from "next/image";

// css
import styles from "./styles.module.css";

// images
import experience_svg from "./experience.svg";
import client_svg from "./client.svg";
import certicate_svg from "./certificate.svg";


function Card({ label, img }){
    return(
        <div className={styles.card}>
            {img}
            <h1 className={styles.label}>{label}</h1>
        </div>
    );
}

export default function AboutUsMiddle(){
    return (
        <section className={styles.section}>
            <Card
                label={<span>Experience <br/>and Expertise</span>}
                img={<Image src={experience_svg} alt="Malex is experienced company"/>}
            />
            <Card
                label={<span>Personalized approach <br/>for every client</span>}
                img={<Image src={client_svg} alt="Malex appreciates it's clients"/>}
            />
            <Card
                label={<span>Quality guarantee <br/>on all services</span>}
                img={<Image src={certicate_svg} alt="Malex is experienced company"/>}
            />
        </section>        
    )
}