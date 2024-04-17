import styled from "./s.module.scss";
import Logos from "../../../../assets/images/default-logo.png"
import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link className={styled.link} to="/"><img className={styled.logo} src={Logos} alt="Logos" /></Link>

    )
}