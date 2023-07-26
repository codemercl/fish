import { FC } from "react";
import styles from "./Categories.module.css";

import { categories } from "./data";
import { Layout } from "../Layout";

export const Categories: FC = () => {
  return (
    <section className={styles.category}>
      <Layout>
        <div className={styles.wrapperCategory}>
          {categories.map((item, index) => (
            <a href={item?.path} key={index}>
              <img src={item?.images} alt={item?.alt} />
              <p>{item?.text}</p>
            </a>
          ))}
        </div>
      </Layout>
    </section>
  );
};
