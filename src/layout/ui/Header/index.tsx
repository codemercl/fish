import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./Header.module.css";
import Logo from "../../../images/logo/default-logo.png";
import { Layout, Navigate } from "../../../components";
import { Link } from "react-router-dom";
import { account, contacts } from "./data";
import { SearchField } from "../../../components/SearchField";
import Shop from "../../../images/icon/cart-logo.png";

interface IHeader {
  slider?: boolean;
  openBasket?: (value: boolean) => void;
}

export const Header: FC<IHeader> = ({ slider, openBasket }) => {

  const handleOpenBasket = () => {
    if (openBasket) {
      openBasket(true);
    }
  };

  return (
    <header className={`${styles.header} ${slider ? styles.sliderHeader : ""}`}>
      <Layout>
        <div className={styles.block}>
          <div className={styles.controll}>
            <a className={styles.logo} href="#">
              <img src={Logo} alt="logo" />
            </a>

            <SearchField />

            <div className={styles.contacts}>
              {contacts.map((item, index) => (
                <a key={index} href={item?.path}>
                  <img src={item?.image} alt={item?.alt} />
                  <p>{item?.text}</p>
                </a>
              ))}
            </div>

            <div className={styles.account}>
              <div onClick={handleOpenBasket}>
                <img src={Shop} alt="shop" />
              </div>
              {account.map((item, index) => (
                <Link key={index} to={item?.path}>
                  <img src={item?.image} alt={item?.alt} />
                </Link>
              ))}
            </div>

          </div>
        </div>

        <Navigate />

        {slider && (
          <div className={styles.sliderContainer}>
            <div className={styles.content}>
              <h2>Великі знижки</h2>
              <h1>
                Риболовля <br /> це завжди відпочинок
              </h1>
              <p>Акції на оптову та роздрібнену продукцію</p>
            </div>
          </div>
        )}
      </Layout>
    </header>
  );
};
