import styles from "./Catalog.module.css";
import AllProduct from "../../store/allProducts";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../layout";
import { Basket, Categories, Filters, Subcategories, Table } from "../../components";

export const Catalog = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;
  const [open, setOpen] = useState<boolean>(false);
  const [costFilter, setCostFilter] = useState<boolean>(true);
  const [recencyFilter, setRecencyFilter] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  const handleFilterChange = (cost:boolean, recency:boolean) => {
    setCostFilter(cost);
    setRecencyFilter(recency);
  }
  
//создать функции сортировок для стейтов
//после сортировки сохранить в новый стейт и передать в Table
  return (
    <div className={styles.wrapper}>
      <Header />
      {open && <Basket handleClick={setOpen} />}
      <Categories />
      <Subcategories data={data} />
      {/* передать set состояние в Filters */}
      <Filters setCostFilter={setCostFilter} setRecencyFilter={setRecencyFilter} onChange={handleFilterChange}/>
      {/* передать новый массив */}
      <Table data={data} background="#747e8c"/>
    </div>
  );
});
