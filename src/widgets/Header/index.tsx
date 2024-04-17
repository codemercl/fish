import styled from "./s.module.scss";
import { Search } from "./elements/Search";
import { Contacts } from "./elements/Contacts";
import { Basket } from "./elements/Basket";
import { Profile } from "./elements/Profile";
import { Logo } from "./elements/Logo";
import { Container } from "../../components";
import { SearchToNumber } from "./elements/SearchToNumber";

export const Header = () => {
    return (
        <Container>
            <div className={styled.wrap}>
                <Logo />
                <Search />
                <Contacts />
                <Basket />
                <SearchToNumber />
                <Profile />
            </div>
        </Container>
    )
}