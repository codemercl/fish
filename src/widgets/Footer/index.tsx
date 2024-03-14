import { FC } from "react"
import styled from "./s.module.scss";
import { Container } from "../../components";

export const Footer: FC = () => {
    return (
        <div className={styled.wrap}>
            <Container>
                <ul className={styled.list}>
                    <li>
                        <h1>Про нас</h1>
                        <a href="#">Про компанію </a>
                        <a href="#">Оплата доставкою</a>
                        <a href="#">Опт</a>
                        <a href="#">Сервісний центр</a>
                        <a href="#">Ваканції </a>
                    </li>
                    <li>
                        <h1>Про нас</h1>
                        <a href="#">Про компанію </a>
                        <a href="#">Оплата доставкою</a>
                        <a href="#">Опт</a>
                        <a href="#">Сервісний центр</a>
                        <a href="#">Ваканції </a>
                    </li>
                    <li>
                        <h1>Про нас</h1>
                        <a href="#">Про компанію </a>
                        <a href="#">Оплата доставкою</a>
                        <a href="#">Опт</a>
                        <a href="#">Сервісний центр</a>
                        <a href="#">Ваканції </a>
                    </li>
                    <li>
                        <h1>Про нас</h1>
                        <a href="#">Про компанію </a>
                        <a href="#">Оплата доставкою</a>
                        <a href="#">Опт</a>
                        <a href="#">Сервісний центр</a>
                        <a href="#">Ваканції </a>
                    </li>
                </ul>
            </Container>
        </div>
    )
}