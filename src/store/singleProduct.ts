import axios, { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

interface Product {
  id: number;
  title: string;
  article: string;
  description: string;
  brand: string;
  marker: string;
  images_links: string[];
  parameters: {
    id: number;
    width: string;
    height: string;
    weight: string;
    length: string;
    size: string;
    color: string;
  };
  category: {
    id: number;
    name: string;
    image_link: string;
    parent: any;
  };
  sub_category: {
    id: number;
    name: string;
    image_link: string;
    parent: string;
  };
  in_stock: boolean;
  price_retail: number;
  price_bulk: number;
  discount: number;
}

class ProductStore {
  product: Product | null = null;
  error: AxiosError | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchProduct = this.fetchProduct.bind(this);
  }

  fetchProduct(productId: number): void {
    this.loading = true;

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get<Product>(
        `http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${productId}`,
        { headers }
      )
      .then((response: AxiosResponse<Product>) => {
        this.product = response.data;
        this.loading = false;
      })
      .catch((error: AxiosError) => {
        this.error = error;
        this.loading = false;
      });
  }
}

export default new ProductStore();