import { Link } from "react-router-dom";
import styles from "./Navigate.module.css";
import { links } from "./data/links";

export const Navigate = () => {
  return (
    <ul className={styles.menu}>
      {links.map((item, index) => (
        <Link className={styles.menuItem} to={item?.path} key={index}>
          {item?.name}
        </Link>
      ))}
    </ul>
  );
};
