import styled from "./s.module.scss";
import Logos from "../../../../assets/images/default-logo.png"

export const Logo = () => {
    return (
        <img className={styled.logo} src={Logos} alt="Logos" />

    )
}