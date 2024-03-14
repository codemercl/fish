import { Outlet, useLocation } from 'react-router-dom';
import styled from "./s.module.scss"
import { Header, Menu, Choice, Footer, Markers, Sales } from '../../widgets';
import { Basket, Container } from '..';

export const Pages = () => {
  const location = useLocation();
  const shouldRenderContainer = location.pathname !== '/';

  return (
    <div className={styled.wrap}>
      <Header />
      <Menu />
      <Choice />
      <Basket />
      <Outlet />
      {shouldRenderContainer && (
        <Container>
          <Markers marker="Новинки" />
          <Sales />
        </Container>
      )}
      <Footer />
    </div>
  );
};