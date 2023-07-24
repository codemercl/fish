import { FC } from "react";
import styles from "./Information.module.css";

interface Information {
  title: string;
  description?: string | undefined;
  params?: {width: string, height: string, weight: string, length: string, size: string, color: string }
}

export const Information: FC<Information> = ({ title, description, params }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{title}</div>
      {description ? (
        <div className={styles.content}>{description}</div>
      ) : (
        <div className={styles.parameters}>
            <p>{params?.width}</p>
            <p>{params?.height}</p>
        </div>
      )}
    </div>
  );
};
