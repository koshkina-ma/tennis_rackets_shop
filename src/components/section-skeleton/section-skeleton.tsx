import styles from "./section-skeleton.module.css";

const CARD_COUNT = 4;

export function SectionSkeleton() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.titleLine} />
        <div className={styles.linkLine} />
      </div>
      <div className={styles.track}>
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardMedia} />
            <div className={styles.cardTitle} />
          </div>
        ))}
      </div>
    </section>
  );
}
