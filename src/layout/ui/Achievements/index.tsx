import styles from "./Achievements.module.css";
import Bugs from "../../../images/service/bugs.png";
import Check from "../../../images/service/check.png";
import Dollar from "../../../images/service/dollar.png";
import Up from "../../../images/service/up.png";
import { FC } from "react";

interface IAchievements {}

export const Achievements: FC<IAchievements> = () => {
  return (
    <section className={styles.achievements}>
      <div className={styles.container}>
        <div className={styles.achievementsWrapper}>
          <div className={styles.achievementsElement}>
            <img src={Bugs} alt="icons achievements" />
            <h1>Доставка</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              quasi ad ipsam blanditiis corrupti aliquid aliquam! Fuga
              voluptatum quasi placeat?
            </p>
          </div>
          <div className={styles.achievementsElement}>
            <img src={Check} alt="icons achievements" />
            <h1>Результат</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              quasi ad ipsam blanditiis corrupti aliquid aliquam! Fuga
              voluptatum quasi placeat?
            </p>
          </div>
          <div className={styles.achievementsElement}>
            <img src={Dollar} alt="icons achievements" />
            <h1>Ціни</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              quasi ad ipsam blanditiis corrupti aliquid aliquam! Fuga
              voluptatum quasi placeat?
            </p>
          </div>
          <div className={styles.achievementsElement}>
            <img src={Up} alt="icons achievements" />
            <h1>Швидкість</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              quasi ad ipsam blanditiis corrupti aliquid aliquam! Fuga
              voluptatum quasi placeat?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
