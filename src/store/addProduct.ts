import { makeAutoObservable } from "mobx";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ProductParameter {
  width: number;
  height: number;
  weight: number;
  length: number;
  size: string;
  color: string;
}

interface ProductCategory {
  id: number;
  name: string;
  parent: {
    id: number;
    name: string;
  };
}

interface Product {
  title: string;
  description: string;
  article: string;
  brand: string;
  marker: string;
  images_links: string[];
  parameters: ProductParameter;
  category: ProductCategory;
  in_stock: boolean;
  price_retail: number;
  price_bulk: number;
  discount: number;
}

class AddProduct {
  response: any = null; // Update the type based on your actual response data structure
  error: AxiosError<unknown> | null = null; // Use AxiosError with unknown type
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async sendCreate(product: Product) {
    try {
      this.loading = true;

      const response = await axios.post<Product, AxiosResponse<Product>>(
        "http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products",
        product
      );

      this.response = response.data;
      this.error = null; 
      this.loading = false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error;
      }
      this.loading = false;
    }
  }
}

export default new AddProduct();