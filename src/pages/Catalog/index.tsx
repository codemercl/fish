import styles from "./Catalog.module.css";
import AllProduct from "../../store/allProducts";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../layout";
import { Categories, Subcategories, Table } from "../../components";

export const Catalog = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Categories />
      <Subcategories data={data} />
      <Table data={data} background="#747e8c"/>
    </div>
  );
});
