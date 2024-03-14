interface Product {
    id: number;
    title: string;
    article: string;
    description: string | null;
    brand: string;
    marker: string | null;
    images_links: string[];
    parameters: {
      id: number;
      width: number | null;
      height: number | null;
      weight: number | null;
      length: number | null;
      size: string;
      color: string | null;
      material: string | null;
      action: string | null;
      diameter: number | null;
      type: string | null;
      made_by: string | null;
      amount: string | null;
      volume: number | null;
      aroma: string | null;
      number: string | null;
      fastening_type: string | null;
      form: string | null;
      peculiarities: string | null;
    };
    category: {
      id: number;
      name: string;
      image_link: string | null;
      parent: string | null;
      created_date: string | null;
      modified_date: string | null;
      created_by: string | null;
      modified_by: string | null;
    };
    sub_category: {
      id: number;
      name: string;
      image_link: string | null;
      parent: string;
      created_date: string | null;
      modified_date: string | null;
      created_by: string | null;
      modified_by: string | null;
    };
    in_stock: boolean;
    price_usd: number | null;
    price_uah: number;
    discount: number | null;
    price_old: number | null;
    created_date: string | null;
    modified_date: string | null;
    created_by: string | null;
    modified_by: string | null;
  }
  
  export interface ProductsResponse {
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
    totalElements: number;
    last: boolean;
    totalPages: number;
    first: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
  }