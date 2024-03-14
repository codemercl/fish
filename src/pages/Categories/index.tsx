import { FC } from "react";
import { Container } from "../../components"
import styled from "./s.module.scss"
import { ListOfCat } from "../../widgets";

export const Categories: FC = () => {
  return (
    <div className={styled.wrap}>
      <Container>
        <ListOfCat />
      </Container>
    </div>
  );
};