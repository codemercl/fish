import styles from "./Category.module.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import CategoryStore from "../../store/allCategory";
import AllProduct from "../../store/allProducts";
import { observer } from "mobx-react-lite";
import { Header } from "../../layout";
import { Categories, Table } from "../../components";

export const Category = observer(() => {
  const { categories, fetchCategories } = CategoryStore;
  const { data, fetchAllSpotsToday } = AllProduct;

  useEffect(() => {
    fetchCategories();
    fetchAllSpotsToday();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <Categories />

      <section className={styles.settCategory}>
        <div className={styles.container}>
          <div className={styles.settCategoryWrapper}>
            {categories.map((item, index) => (
              <div key={index} className={styles.settCategoryBlock}>
                <img src={item?.category?.image_link} alt="visualisation" />
                <h1>
                  <Link to={`/catalog/${item?.category?.name}`}>
                    {item?.category?.name}
                  </Link>
                </h1>
                {item?.sub_categories.map((subCategory, subIndex) => (
                  <p key={subIndex}>
                    <Link to={`/catalog/${item?.category?.name}/${subCategory?.name}`}>
                      {subCategory.name}
                    </Link>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Table short data={data} title="Знижки" colorTitle="yellow" />
      <Table short data={data} title="Знижки" colorTitle="blue" />
    </div>
  );
});
