import { Container } from "../../components";
import styled from "./s.module.scss";
import Part1 from "../../assets/images/Partner/part1.png"
import Part2 from "../../assets/images/Partner/part2.png"
import Part3 from "../../assets/images/Partner/part3.webp"

export const Partner = () => {
    return (
        <div className={styled.wrap}>
            <Container>
                <div className={styled.content}>
                    <div className={styled.block}>
                        <img src={Part1} alt="partner" />
                    </div>
                    <div className={styled.block}>
                       <img src={Part2} alt="partner" />
                    </div>
                    <div className={styled.block}>
                        <img src={Part3} alt="partner" />
                    </div>
                </div>
            </Container>
        </div>
    )
}