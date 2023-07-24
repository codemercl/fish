import { FC } from "react";
import styles from "./Card.module.css";
import { Product } from "../../../store/allProducts";

import Shop from "../../../images/icon/cart-logo.png";
import { Link, useLocation } from "react-router-dom";

interface ICard {
  item: Product;
}

export const Card: FC<ICard> = ({ item }) => {
  const location = useLocation();
  const url = new URL(location.pathname, window.location.origin);
  const path = url.pathname.split("/")[2];

  const handleCardClick = (item: Product) => {
    window.location.href = `/catalog/${item?.category?.name}/${item?.sub_category?.name}/${item?.title}`;
    localStorage.setItem("selectedItemId", item?.id.toString());
  };

  return (
    <div className={styles.card} style={{background: path ? "#fff" : ""}}>
      <div className={styles.headCard}>
        <p>{item?.marker}</p>
        <span>{item?.discount} %</span>
      </div>
      <div className={styles.imageCard}>
        <img src={item?.images_links[0]} alt="photo" />
      </div>
      <div className={styles.footerCard}>
        <span>art. {item?.article}</span>
        <h2 onClick={() => handleCardClick(item)}>{item?.title}</h2>
        <h4>{item?.price_bulk} грн.</h4>
        <h3>{item?.price_retail} грн.</h3>
        <button className={styles.cardShop}>
          <img src={Shop} alt="shop" />
        </button>
      </div>
    </div>
  );
};
