import styles from "./appointment-btn.module.css"

export default function AppointmentButton({label}) {
    return (
        <button className={styles.button}>
            <span>{label}</span>
        </button>
    )
}