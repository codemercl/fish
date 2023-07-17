import { Link, useParams } from "react-router-dom";
import styles from "./Subcategories.module.css";
import { Layout } from "../Layout";
import { FC, useEffect } from "react";
import { Product } from "../../store/allProducts";

interface ISubcategories {
  data: Product[];
}

export const Subcategories: FC<ISubcategories> = ({ data }) => {
  const {title, source, product} = useParams();

  return (
    <section className={styles.subcategories}>
      <Layout>
        <div className={styles.container}>
          <div className={styles.lines}>
            {title && <Link to={`/catalog/${title}`}>{title}</Link>}
            {source && <Link to={`/catalog/${title}/${source}`}>{source}</Link>}
            {product && <Link to={`/catalog/${title}/${source}/${product}`}>{product}</Link>}
          </div>
        </div>
      </Layout>
    </section>
  );
};
