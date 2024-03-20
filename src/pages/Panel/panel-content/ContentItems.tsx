import { AddProductContent } from "../PanelProduct/add-product/AddProductContent";
import { AllProductContent } from "../PanelProduct/all-products/AllProductContent";
import { Orders } from "../PanelOrder"
import { Messages } from "../Messages";
import { Callback } from "../Callback";
import { Users } from "../Users";
import { Options } from "../Options";
import { Categories } from "../Categories";
import { AddProductForm } from "../AppCategories.tsx";

interface ContentItemsType {
  [key: string]: React.ReactNode;
  default: React.ReactNode;
}

export const ContentItems: ContentItemsType = {
  "1": <AddProductContent />,
  "2": <AllProductContent />,
  "3": <AddProductForm />,
  "4": <Categories />,
  "6": <Orders />,
  "7": <Options />,
  "9": <Messages />,
  "11": <Users />,
  default: <Callback />
};
