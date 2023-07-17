import { FC, ReactNode } from "react";
import styles from "./Layout.module.css";

interface Layout {
  children: ReactNode
}

export const Layout:FC<Layout> = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};
