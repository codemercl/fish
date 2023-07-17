import React, { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Header.module.css";
import Logo from "../../../images/logo/default-logo.png";
import { Layout, Navigate } from "../../../components";
import { Link } from "react-router-dom";
import { account, contacts } from "./data";
import { SearchField } from "../../../components/SearchField";

interface IHeader {
  slider?: boolean;
}

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768, // Mobile breakpoint
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        height: "50vh",
      },
    },
    {
      breakpoint: 1200, // Tablet breakpoint
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        height: "60vh",
      },
    },
    {
      breakpoint: 1600, // Large screen breakpoint
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        height: "70vh",
      },
    },
  ],
};

export const Header: FC<IHeader> = ({ slider }) => {
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
            <Slider {...settings}>
              <div className={styles.content}>
                <h2>Великі знижки</h2>
                <h1>Риболовля <br /> це завжди відпочинок</h1>
                <p>Акції на оптову та роздрібнену продукцію</p>
              </div>
              <div className={styles.content}>
                <h2>Великі знижки</h2>
                <h1>Риболовля <br /> це завжди відпочинок</h1>
                <p>Акції на оптову та роздрібнену продукцію</p>
              </div>
              <div className={styles.content}>
                <h2>Великі знижки</h2>
                <h1>Риболовля <br /> це завжди відпочинок</h1>
                <p>Акції на оптову та роздрібнену продукцію</p>
              </div>
            </Slider>
          </div>
        )}
      </Layout>
    </header>
  );
};
