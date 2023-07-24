import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AllProduct from "../../store/allProducts";
import { Achievements, Header, Windows } from "../../layout";
import { Basket, Categories, Table } from "../../components";

export const Home = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header slider openBasket={setOpen} />
      <Categories />
      {open && <Basket handleClick={setOpen} />}
      <Table data={data} title="Новинки" short colorTitle="yellow" />
      <Table data={data} title="Знижки" short colorTitle="blue" />
      <Windows />
      <Achievements />
    </div>
  );
});
