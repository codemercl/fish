import { FC, ReactNode } from "react";
import styled from "./s.module.scss";

interface Props {
  children: ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return <div className={styled.wrap}>{children}</div>;
};
