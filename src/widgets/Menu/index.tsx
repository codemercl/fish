import { Container } from "../../components";
import styled from "./s.module.scss";
import { Link } from "react-router-dom"

export const Menu = () => {
    return (
        <Container>
            <ul className={styled.wrap}>
                <li>
                    <Link to="/">Головнa
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        Категорії
                    </Link>
                </li>
                <li>
                    <Link to="/guaratees">
                        Гарантії
                    </Link>
                </li>
                <li>
                    <Link to="/delivery">
                        Доставка
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        Про нас
                    </Link>
                </li>
                <li>
                    <Link to="/contacts">
                        Контакти
                    </Link>
                </li>
            </ul>
        </Container>
    )
}