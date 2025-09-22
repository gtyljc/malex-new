
// tools
import Image from "next/image"

// components
import RedirectButton from "@/components/redirect-btn/redirect-btn"

// css
import styles from "./services-section.module.css"

// images
import plumbing_jpg from "./plumbing.jpg"
import assembling_jpg from "./assembling.jpg"
import mounting_jpg from "./mounting.jpg"

function ServiceRow({title, text, services_details, thumbnail, isThumbnailFirst = true}) {
    return (
        <div className={styles.row}>
            <div className="s_half s_thumbnail" style={!isThumbnailFirst ? {order: 2}: {}}>
                {thumbnail}
            </div>
            <div className={styles.info} style={!isThumbnailFirst ? {order: 1}: {}}>
                <h1 className="s_title">{title}</h1>
                <p className={styles.text}>{text}</p>
                <ul className={styles.list} aria-hidden="true">
                    {
                        services_details.map(
                            (detail, i) => (
                                <li key={i}>{detail}</li>
                            )
                        )
                    }
                </ul>
                <RedirectButton 
                    label="Request a Service"
                    type="white"
                    style={{marginTop: "20px"}}
                />
            </div>
        </div>
    )
}

export default function ServicesSection() {
    return (
        <section className={styles.section}>
            <ServiceRow
                title="Our Plumbing Services"
                text="We offer a full range of plumbing services for your home and business. Our skilled professionals handle installation, repair, and maintenance of any system. We guarantee high-quality results on time."
                services_details={
                    [
                        "Pipe installation and replacement",
                        "Plumbing system repair and maintenance",
                        "Water heater and boiler installation"
                    ]
                }
                isThumbnailFirst={false}
                thumbnail={
                    <Image
                        src={plumbing_jpg}
                        alt="Malex plumbing service"
                    />
                }
            />
            <ServiceRow
                title="Assembling"
                text="We offer professional assembly services for various equipment and furniture. Our experts have the experience and skills to perform accurate and fast assembly of items, regardless of their complexity. We guarantee high-quality work to ensure long-lasting and reliable results."
                services_details={
                    [
                        "Precise and reliable assembly",
                        "Experience with complex items",
                        "Quality guarantee"
                    ]
                }
                isThumbnailFirst={true}
                thumbnail={
                    <Image
                        src={assembling_jpg}
                        alt="Malex plumbing service"
                    />
                }
            />
            <ServiceRow
                title="Mounting"
                text="We offer professional assembly services for various equipment and furniture. Our experts have the experience and skills to perform accurate and fast assembly of items, regardless of their complexity. We guarantee high-quality work to ensure long-lasting and reliable results."
                services_details={
                    [
                        "Precise and reliable assembly",
                        "Experience with complex items",
                        "Quality guarantee"
                    ]
                }
                isThumbnailFirst={false}
                thumbnail={
                    <Image
                        src={mounting_jpg}
                        alt="Malex plumbing service"
                    />
                }
            />
        </section>
    )
}

