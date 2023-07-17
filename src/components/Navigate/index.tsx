import { Link } from "react-router-dom";
import styles from "./Navigate.module.css";
import { links } from "./data/links";

export const Navigate = () => {
  return (
    <ul className={styles.menu}>
      {links.map((item) => (
        <Link to={item?.path}>{item?.name}</Link>
      ))}
    </ul>
  );
};
