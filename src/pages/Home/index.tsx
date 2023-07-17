import styles from "./Home.module.css";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import AllProduct from "../../store/allProducts";
import { Achievements, Header, Windows } from "../../layout";
import { Categories, Table } from "../../components";

export const Home = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header slider />
      <Categories />
      <Table data={data} title="Новинки" short colorTitle="yellow" />
      <Table data={data} title="Знижки" short colorTitle="blue" />
      <Windows />
      <Achievements />
    </div>
  );
});
