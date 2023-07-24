import styles from "./Product.module.css";

import { observer } from "mobx-react-lite";
import ProductStore from "../../store/singleProduct";
import AllProduct from "../../store/allProducts";
import { useEffect, useState } from "react";
import ImageGallery, { ReactImageGalleryProps } from "react-image-gallery";
import { Basket, Categories, Layout, Subcategories, Table } from "../../components";
import { Header } from "../../layout";
import { Information } from "../../components/Information";
import { toJS } from "mobx";

interface CustomImageGalleryProps extends ReactImageGalleryProps {
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export const Product = observer(() => {
  const { product, fetchProduct } = ProductStore;
  const { data, fetchAllSpotsToday } = AllProduct;
  const [open, setOpen] = useState<boolean>(false);

  const id = localStorage.getItem("selectedItemId");

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      fetchProduct(productId);
    }
  }, []);

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  const images =
    product?.images_links.map((link: string) => ({
      original: link,
      thumbnail: link,
    })) || [];

  const galleryOptions: CustomImageGalleryProps = {
    items: images,
    lazyLoad: true,
    thumbnailPosition: "right",
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    showNav: false,
    showFullscreenButton: false,
    showPlayButton: false,
    disableThumbnailScroll: true,
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      {open && <Basket handleClick={setOpen} />}
      <Categories />
      <Subcategories data={data} />
      <section className={styles.detail}>
        <Layout>
          <div className={styles.detailWrapper}>
            <div className={styles.detailImage}>
              <ImageGallery {...galleryOptions} />
            </div>
            <div className={styles.detailContent}>
              <div className={styles.detailHead}>
                <h1>{product?.title}</h1>
                <span>{product?.article}</span>
              </div>
              <div className={styles.detailmiddle}>
                <div className={styles.detailPrice}>
                  <h3>{product?.price_retail} грн.</h3>
                  <h2>{product?.price_bulk} грн.</h2>
                </div>
                <div className={styles.detailControll}>
                  <button>Купити</button>
                  <button>У кошик</button>
                </div>
              </div>
              <div className={styles.detailFooter}>
                <div className={styles.detailColumn}>
                  <p>Розмір виробника: {product?.parameters?.size}</p>
                  <button>{product?.parameters?.size}</button>
                </div>
                <div className={styles.detailColumn}>fsd</div>
              </div>
            </div>
          </div>
          <Information title="Опис" description={toJS(product?.description)} />
          <Information title="Опис" params={product?.parameters} />
        </Layout>
      </section>

      <Table data={data} title="Знижки" short colorTitle="blue" />
    </div>
  );
});
