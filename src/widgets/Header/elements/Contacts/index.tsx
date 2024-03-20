import styled from "./s.module.scss"
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Contacts = () => {
    return (
        <ul className={styled.wrap}>
            <li>
                <FaPhone fill="rgb(116, 125, 142)" size={20} />
                <p>+38 (063) 667 60 97</p>
            </li>
            <li>
                <IoIosMail fill="rgb(116, 125, 142)" size={28} />
                <p>optimisthook@gmail.com</p>
            </li>
        </ul>
    )
}