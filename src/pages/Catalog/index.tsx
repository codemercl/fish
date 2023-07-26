import styles from "./Catalog.module.css";
import AllProduct, { Product } from "../../store/allProducts";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "../../layout";
import { Basket, Categories, Filters, Subcategories, Table } from "../../components";

export const Catalog = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;
  const [open, setOpen] = useState<boolean>(false);

  // состониями сортировок и фильтров
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isNew, setNew] = useState(false);
  const [isSuperPrice, setSuperPrice] = useState(false);
  const [isHit, setHit] = useState(false);
  const [sortedData, setSortedData] = useState<Product[]>([]);

  // вызов запроса данных на сервер при загрузке компонента
  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  // функция получения клика из дочернего компонента 
  const getFilterChange = (event: any) => {
    setSelectedFilter(event.target.value);
  };

  // вызов загрузке ответа сервера в setSortedData при изменении содержимого ответа (поля data)
  useEffect(() => {
    if (data && data.length > 0) {
      setSortedData(data);
    }
  }, [data]);

  // функция сортировок
  const sortData = () => {
    if (selectedFilter === "new") {
      // сортируем по айди от меньшего к большему
      const sortedByNew = [...data].sort((a, b) => a.id - b.id);
      // обновляем стейт
      setSortedData(sortedByNew);
    } else if (selectedFilter === "cost") {
      // сортируем по цене от меньшего к большему
      const sortedByCost = [...data].sort((a, b) => a.price_bulk - b.price_bulk);
      // обновляем стейт
      setSortedData(sortedByCost);
    }
  };

  // вызор функции сортировки при получении new или cost selectedFilter
  useEffect(() => {
    sortData();
  }, [selectedFilter]);

  return (
    <div className={styles.wrapper}>
      <Header />
      {open && <Basket handleClick={setOpen} />}
      <Categories />
      <Subcategories data={data} />
      <Filters
        onChange={getFilterChange}
        sorting={selectedFilter}
        setSorting={setSelectedFilter}
        isNew={isNew}
        isSuperPrice={isSuperPrice}
        isHit={isHit}
        setNew={setNew}
        setSuperPrice={setSuperPrice}
        setHit={setHit}
      />
      <Table data={sortedData} background="#747e8c" />
    </div>
  );
});
