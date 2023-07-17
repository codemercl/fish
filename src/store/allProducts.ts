import axios, { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export interface Product {
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

interface ProductsResponse {
  content: Product[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

class AllProduct {
  data: Product[] = [];
  error: AxiosError | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchAllSpotsToday = this.fetchAllSpotsToday.bind(this);
  }

  fetchAllSpotsToday(): void {
    this.loading = true;

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get<ProductsResponse>(
        `http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products?page=0&size=10&sort=id,desc`,
        { headers }
      )
      .then((response: AxiosResponse<ProductsResponse>) => {
        this.data = response.data.content;
        this.loading = false;
      })
      .catch((error: AxiosError) => {
        this.error = error;
        this.loading = false;
      });
  }
}

export default new AllProduct();
