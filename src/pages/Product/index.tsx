import styles from "./Product.module.css";
import Logo from "../../images/logo/default-logo.png";
import Phone from "../../images/icon/phone-icon.png";
import Mail from "../../images/icon/mail-icon.png";
import Shop from "../../images/icon/shop-icon.png";
import Account from "../../images/icon/account-icon.png";
import Search from "../../images/icon/search-icon.png";
import Menu from "../../images/category/category.svg";
import Personal from "../../images/utill/personal-image.jpg";
import { Link, useParams } from "react-router-dom";
import Fishing from "../../images/icon/fishing.png";
import Hook from "../../images/icon/hook.png";
import Settings from "../../images/icon/settings.png";
import GetFish from "../../images/icon/get-fish.png";
import Set from "../../images/icon/set.png";
import hookAndFishs from "../../images/icon/hook-and-fishs.png";
import Trape from "../../images/icon/trape.png";
import Sea from "../../images/icon/sea.png";
import { observer } from "mobx-react-lite";
import ProductStore from "../../store/singleProduct";
import AllProduct from "../../store/allProducts";
import { useEffect } from "react";
import ImageGallery, { ReactImageGalleryProps } from "react-image-gallery";
import { Categories, Subcategories, Table } from "../../components";
import { Header } from "../../layout";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

interface CustomImageGalleryProps extends ReactImageGalleryProps {
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export const Product = observer(() => {
  const { product, fetchProduct } = ProductStore;
  const { data, fetchAllSpotsToday } = AllProduct;

  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      const productId = parseInt(params?.id);
      fetchProduct(productId);
    }
  }, []);

  useEffect(() => {
    fetchAllSpotsToday();
  }, []);

  const galleryOptions: CustomImageGalleryProps = {
    items: images,
    lazyLoad: true,
    thumbnailPosition: "right",
    thumbnailWidth: 500,
    thumbnailHeight: 500,
    showNav: false,
    showFullscreenButton: false,
    showPlayButton: false,
  };

  return (
    <div className={styles.wrapper}>
      {/* header */}
      <Header />

      <Categories />

      <Subcategories data={data} />

      <section className={styles.detail}>
        <div className={styles.container}>
          <div className={styles.detailWrapper}>
            <div className={styles.detailImage}>
              <ImageGallery {...galleryOptions} />
            </div>
            <div className={styles.detailContent}>
              <div className={styles.detailHead}>
                <h1>Вітрівка Windbreaker графітовий</h1>
                <span>art. 011001</span>
              </div>
              <div className={styles.detailmiddle}>
                <div className={styles.detailPrice}>
                  <h3>$15 342</h3>
                  <h2>$13 312</h2>
                </div>
                <div className={styles.detailControll}>
                  <button>Купити</button>
                  <button>У кошик</button>
                </div>
              </div>
              <div className={styles.detailFooter}>
                <div className={styles.detailColumn}>
                  <p>Розмір виробника: xl</p>
                  <button>s</button>
                  <button>l</button>
                  <button>xl</button>
                </div>
                <div className={styles.detailColumn}>
                  fsd
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Table data={data} title="Знижки" short colorTitle="blue" />
    </div>
  );
});
