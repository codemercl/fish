import { FC } from "react";
import { Container } from "../../components"
import styled from "./s.module.scss"
import { Market } from "../../widgets";

export const Catalog: FC = () => {
  return (
    <div className={styled.wrap}>
      <Container>
        <Market />
      </Container>
    </div>
  );
};