import { FC } from "react";
import styles from "./Table.module.css";
import { Layout } from "../Layout";
import { Product } from "../../store/allProducts";
import { Card } from "../../layout";
import { Link, useLocation, useParams } from "react-router-dom";

interface ITable {
  data: Product[];
  title?: string;
  colorTitle?: string;
  background?: string;
  short?: boolean;
}

export const Table: FC<ITable> = ({ data, title, colorTitle, short }) => {
  const location = useLocation();

  const url = new URL(location.pathname, window.location.origin);
  const catalog = url.pathname.split("/")[1];

  return (
    <section className={styles.table} style={{background: catalog === "catalog" ? "#747e8c" : ""}}>
      <Layout>
        <h1 style={{ background: colorTitle }}>{title}</h1>
        <div className={styles.cardWrapper}>
        {short ? data.slice(0, 4).map((item: any, index: any) => (
            <Card key={index} item={item} />
          )) : data.map((item: any, index: any) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </Layout>
    </section>
  );
};
