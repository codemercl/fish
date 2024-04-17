import { Container } from "../../components";
import styled from "./s.module.scss";
import { Link, useLocation } from "react-router-dom"

export const Menu = () => {
    const location = useLocation();
    const shouldRenderContainer = location.pathname !== '/';
  
    return (
        <Container>
            <ul className={shouldRenderContainer ? styled.wrap : styled.wrapLarge}>
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