import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import styled from "./s.module.scss";
import { Menu } from "../../assets/images/category-icons/menu.tsx";
import { Fishing } from "../../assets/images/category-icons/fishing.tsx";
import { Osnash } from "../../assets/images/category-icons/osnash.tsx";
import { Hook } from "../../assets/images/category-icons/hook.tsx";
import { Cat } from "../../assets/images/category-icons/cat.tsx";
import { Equipe } from "../../assets/images/category-icons/equip.tsx";
import { Prim } from "../../assets/images/category-icons/prim.tsx";
import { Pidcorm } from "../../assets/images/category-icons/pidcorm.tsx";
import { Spor } from "../../assets/images/category-icons/spor.tsx";
import { Container } from "../../components";

const categories = [
  "catalog",
  "Вудилища",
  "Гачки",
  "Котушки",
  "Оснащення",
  "Одяг",
  "Приманки",
  "Підкормки",
  "Спорядження",
];

export const Choice = () => {
  const queryClient = useQueryClient();

  const setCategory = (category: string) => {
    queryClient.setQueryData("selectedCategory", category);
  };

  const menuItems = [
    { icon: <Menu fill='#707988' />, text: "Каталог" },
    { icon: <Fishing fill='#707988' />, text: "Вудилища" },
    { icon: <Hook fill='#707988' />, text: "Гачки" },
    { icon: <Cat fill='#707988' />, text: "Котушки" },
    { icon: <Osnash fill='#707988' />, text: "Оснащення" },
    { icon: <Equipe fill='#707988' />, text: "Одяг" },
    { icon: <Prim fill='#707988' />, text: "Приманки" },
    { icon: <Pidcorm fill='#707988' />, text: "Підкормки" },
    { icon: <Spor fill='#707988' />, text: "Спорядження" },
  ];

  return (
    <ul className={styled.choice}>
      <Container>
        <div className={styled.wrap}>
          <div className={styled.content}>
            <div className={styled.menu}>
              {menuItems.slice(0, 1).map((item, index) => (
                <li key={index}>
                  <Link to={`/catalog`} onClick={() => setCategory('')}>
                    {item.icon}
                    <p>{item.text}</p>
                  </Link>
                </li>
              ))}
            </div>
            <div className={styled.side}>
              {menuItems.slice(1).map((item, index) => (
                <li key={index}>
                  <Link
                    to="/catalog"
                    onClick={() => setCategory(categories[index + 1])}
                  >
                    {item.icon}
                    <p>{item.text}</p>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </ul>
  );
};