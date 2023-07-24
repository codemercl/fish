import styles from "./Catalog.module.css";
import AllProduct from "../../store/allProducts";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../layout";
import { Basket, Categories, Filters, Subcategories, Table } from "../../components";

export const Catalog = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      {open && <Basket handleClick={setOpen} />}
      <Categories />
      <Subcategories data={data} />
      <Filters />
      <Table data={data} background="#747e8c"/>
    </div>
  );
});
