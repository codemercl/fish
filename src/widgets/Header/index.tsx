import styled from "./s.module.scss";
import { Search } from "./elements/Search";
import { Contacts } from "./elements/Contacts";
import { Basket } from "./elements/Basket";
import { Profile } from "./elements/Profile";
import { Logo } from "./elements/Logo";
import { Container } from "../../components";

export const Header = () => {
    return (
        <Container>
            <div className={styled.wrap}>
                <Logo />
                <Search />
                <Contacts />
                <Basket />
                <Profile />
            </div>
        </Container>
    )
}