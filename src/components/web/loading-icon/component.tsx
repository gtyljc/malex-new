
// others
import clsx from "clsx";

// css
import styles from "./styles.module.css";

interface LoadinIconParams {
    className: string
}

export default function LoadingIcon({ className }: LoadinIconParams){ // px
    return <span className={ clsx(styles.loading, className ) }></span>
}