import axios, { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

interface Category {
  id: number;
  name: string;
  image_link: string;
  parent: string | null;
}

interface SubCategory {
  id: number;
  name: string;
  image_link: string;
  parent: string;
}

interface CategoryResponse {
  category: Category;
  sub_categories: SubCategory[];
}

class CategoryStore {
  categories: CategoryResponse[] = [];
  error: AxiosError | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories = this.fetchCategories.bind(this);
  }

  fetchCategories(): void {
    this.loading = true;

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get<CategoryResponse[]>(
        'http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories',
        { headers }
      )
      .then((response: AxiosResponse<CategoryResponse[]>) => {
        this.categories = response.data;
        this.loading = false;
      })
      .catch((error: AxiosError) => {
        this.error = error;
        this.loading = false;
      });
  }
}

export default new CategoryStore();
