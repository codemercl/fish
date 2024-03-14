import { FC } from "react";
import { Container } from "../../components"
import styled from "./s.module.scss"
import { Advantages, Markers, Partner, Sales } from "../../widgets";

export const Home: FC = () => {
  return (
    <div className={styled.wrap}>
      <Container>
        <Markers marker="Новинки" />
        <Sales />
      </Container>
      <Advantages />
      <Partner />
    </div>
  );
};