
// tools
import clsx from "clsx";

// component
import RedirectButton from "@/components/redirect-btn/component";

// css
import styles from "./styles.module.css";


export default function WorksPanel(){

    // config
    const plumbingHref = "#plumbing";
    const assemlingHref = "#assembling";
    const mountingHref = "#mounting";
    
    return (
        <section>
            <h1
                className={
                    clsx(
                        's_tilte',
                        styles.title
                    )
                }
            >
                Our works
            </h1>
            <div className={styles.btns_con}>
                <RedirectButton 
                    type="white"
                    label="Plumbing"
                    isLink={true}
                    href={plumbingHref}
                    style={{minWidth: "180px"}}
                />
                <RedirectButton 
                    type="white"
                    label="Assembling"
                    isLink={true}
                    href={assemlingHref}
                    style={{minWidth: "180px"}}
                />
                <RedirectButton 
                    type="white"
                    label="Mounting"
                    isLink={true}
                    href={mountingHref}
                    style={{minWidth: "180px"}}
                />
            </div>
        </section>        
    );
}