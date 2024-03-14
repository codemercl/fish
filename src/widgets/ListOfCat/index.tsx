import { FC, useState, useEffect } from "react";
import styled from "./s.module.scss";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";

interface Category {
  id: number;
  name: string;
  image_link: string;
  parent: string | null;
}

interface SubCategory extends Category {}

interface CategoryWithSubCategories {
  category: Category;
  sub_categories: SubCategory[];
}

export const ListOfCat: FC = () => {
  const [categories, setCategories] = useState<CategoryWithSubCategories[]>([]);
  const queryClient = useQueryClient();

  const setCategory = (category: string) => {
    queryClient.setQueryData("selectedCategory", category);
  };

  const setSubCategory = (subcategory: string, categoryName: string) => {
    queryClient.setQueryData("selectedSubCategory", subcategory);
    queryClient.setQueryData("selectedCategory", categoryName); // Set the selected category here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styled.wrap}>
      {categories.map((categoryWithSubCategories) => (
        <div className={styled.element} key={categoryWithSubCategories.category.id}>
          <img
            src={categoryWithSubCategories.category.image_link}
            alt={categoryWithSubCategories.category.name}
          />
          <Link onClick={() => setCategory(categoryWithSubCategories.category.name)} className={styled.title} to="/catalog">{categoryWithSubCategories.category.name}</Link>
          <ul className={styled.subList}>
            {categoryWithSubCategories.sub_categories.map((subcategory) => (
              <Link
                onClick={() => setSubCategory(subcategory.name, categoryWithSubCategories.category.name)} // Pass the category name here
                className={styled.subTitle}
                to="/catalog"
                key={subcategory.id}
              >
                {subcategory.name}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
