import { makeAutoObservable } from 'mobx';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface ProductItem {
  product_id: number;
  quantity: number;
}

export interface CreateReservationPayload {
  name: string;
  items: ProductItem[];
}

interface ReservationItem {
  product_id: number;
  quantity: number;
}

interface CreateReservationResponse {
  id: number;
  name: string;
  state: string;
  items: ReservationItem[];
  created_at: string;
}

class CreateOrder {
    data: CreateReservationResponse | null = null;
    error: AxiosError | null = null;
    loading: boolean = false;
  
    constructor() {
      makeAutoObservable(this);
      this.fetchCreateOrder = this.fetchCreateOrder.bind(this);
    }
  
    fetchCreateOrder(payload: CreateReservationPayload) {
      this.loading = true;
  
      axios
        .post<CreateReservationResponse, AxiosResponse<CreateReservationResponse>>(
          `http://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders`,
          payload,
        )
        .then((response) => {
          this.data = response.data; // Присваиваем значение напрямую из response.data
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    }
  }
  

export default new CreateOrder();