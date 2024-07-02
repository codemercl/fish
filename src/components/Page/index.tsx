import { Outlet, useLocation } from 'react-router-dom';
import styled from "./s.module.scss"
import { Header, Menu, Choice, Footer, Markers, Sales } from '../../widgets';
import { Basket, Container } from '..';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Page = () => {
  const location = useLocation();
  const shouldRenderContainer = location.pathname !== '/';

  return (
    <div className={styled.wrap}>
      <Header />
      <Menu />
      <Container>
        <Slider
          arrows={false}
          infinite={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
          className={styled.sliders}
        >
          <div className={styled.slide} >
            <h3>Великі знижки</h3>
            <h1>Риболовля <br /> це завжди відпочинок</h1>
            <h4>Акції на оптову та роздрібну продукцію</h4>
          </div>
          <div className={styled.slide}>
            <h3>Роздріб та гурт</h3>
            <h1>Діє знижка на зимовий одяг дізнавайтесь у менеджера</h1>
          </div>
          <div className={styled.slide}>
            <h3>Під замовлення</h3>
            <h1>Власне виробництво одягу та спорядження</h1>
            <h4>А також під ваш бренд</h4>
          </div>
          <div className={styled.slide}>
            <h3>Ціни на гурт</h3>
            <h1>Ви можете побачити гуртові ціни при реєстрації як гурт клієнт</h1>
            <h4>Ціни будуть доступні після підтвердження менеджера</h4>
          </div>
        </Slider>
      </Container>
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