import styles from "./Window.module.css";
// import background from "../../../images/video/background-fishing.gif";

export const Windows = () => {
  return (
    <section className={styles.window}>
      {/* <img src={background} /> */}
      <div className={styles.windowBlock}>
        <h1>
          Риболовля <br /> це завжди відпочинок
        </h1>
        <button>Приєднуйся до нас</button>
      </div>
    </section>
  );
};
