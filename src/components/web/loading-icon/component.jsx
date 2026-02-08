
// others
import clsx from "clsx";

// css
import styles from "./styles.module.css";

export default function LoadingIcon({ cssStyles }){ // px
    return <span className={ clsx(styles.loading, cssStyles ) }></span>
}