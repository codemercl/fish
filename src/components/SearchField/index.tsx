import styles from "./SearchField.module.css";
import Search from "../../images/icon/search-icon.png";

export const SearchField = () => {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Пошук ..." />
      <button>
        <img src={Search} alt="search button" />
      </button>
    </div>
  );
};
