import { FC } from "react"

interface Props {
    fill: string;
}

export const Menu: FC<Props> = ({ fill }) => {
    return (
        <svg stroke={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" strokeLinejoin="round" />
        </svg>
    )
}