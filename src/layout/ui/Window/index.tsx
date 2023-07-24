import styles from "./Window.module.css";

export const Windows = () => {
  return (
    <section className={styles.window}>
      <video></video>
      <div className={styles.windowBlock}>
        <h1>
          Риболовля <br /> це завжди відпочинок
        </h1>
        <button>Приєднуйся до нас</button>
      </div>
    </section>
  );
};
