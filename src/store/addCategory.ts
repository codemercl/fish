import { makeAutoObservable } from "mobx";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ParentCategory {
  name: string;
  image_link: string;
}

interface Category {
  name: string;
  parent: ParentCategory | null;
}

class AddCategory {
  addedCategory: Category | null = null;
  error: AxiosError<unknown> | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendCreateCategory(category: Category) {
    try {
      this.isLoading = true;

      const response = await axios.post<Category, AxiosResponse<Category>>(
        "http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories",
        category
      );

      this.addedCategory = response.data;
      this.error = null;
      this.isLoading = false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error;
      }
    }
  }
}

const addCategoryInstance = new AddCategory();
export default addCategoryInstance;
