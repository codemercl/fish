import { Container } from "../../components";
import styled from "./s.module.scss";
import Rocket from "../../assets/images/Advantages/rocket.png"
import Bag from "../../assets/images/Advantages/bag.png"
import Done from "../../assets/images/Advantages/done.png"
import Price from "../../assets/images/Advantages/price.png"

export const Advantages = () => {
    return (
        <div className={styled.wrap}>
            <Container>
                <div className={styled.content}>
                    <div className={styled.block}>
                        <img src={Bag} alt="Rocket" />
                        <h3>Доставка</h3>
                        <p>Забезпечуємо швидку та надійну доставку по всій Україні! Вибирайте своє рибацьке спорядження та одяг, і ми забезпечимо його своєчасне прибуття до вашого міста.</p>
                    </div>
                    <div className={styled.block}>
                        <img src={Done} alt="Rocket" />
                        <h3>Ціни</h3>
                        <p>Ми пишаємося пропонуючи якісні товари за конкурентні ціни. Кожен рибалка зможе знайти для себе ідеальне спорядження, не порушуючи свого бюджету.</p>
                    </div>
                    <div className={styled.block}>
                        <img src={Price} alt="Rocket" />
                        <h3>Швидкість</h3>
                        <p>Наш інтернет-магазин оптимізований для швидкого та зручного вибору товарів. Від вибору до оплати - все зроблено так, щоб вам не довелося витрачати зайвий час.</p>
                    </div>
                    <div className={styled.block}>
                        <img src={Rocket} alt="Rocket" />
                        <h3>Результат</h3>
                        <p>Забезпечуємо швидку та надійну доставку по всій Україні! Вибирайте своє рибацьке спорядження та одяг, і ми забезпечимо його своєчасне прибуття до вашого міста.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}