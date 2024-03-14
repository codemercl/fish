import { AddProductContent } from "../PanelProduct/add-product/AddProductContent";
import { AllProductContent } from "../PanelProduct/all-products/AllProductContent";

interface ContentItemsType {
  [key: string]: React.ReactNode;
  default: React.ReactNode;
}

export const ContentItems: ContentItemsType = {
  "1": <AddProductContent />,
  "2": <AllProductContent />,
  "3": "Содержимое для Додати категорію",
  "4": "Содержимое для Усі категорії",
  "5": "Содержимое для Додати заявку",
  "6": "Содержимое для Усі заявки",
  "7": "Содержимое для Опції магазину",
  "8": "Содержимое для Вийти",
  default: "Выберите пункт меню"
};
