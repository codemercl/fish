import { FC, useEffect, useState } from "react";
import { Container } from "../../components";
import styled from "./s.module.scss";
import { useQuery, useQueryClient } from 'react-query';
import { ProductTypes } from "../../components/Product/types";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { useParams } from "react-router-dom";
import { notification } from "antd";

const fetchProduct = async (productId: number) => {
  const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${productId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const Product: FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [productId, setProductId] = useState<number | null>(null);
  const { isLoading, isError, data, refetch } = useQuery<ProductTypes>('product', () => fetchProduct(productId || 0), {
    enabled: !!productId,
  });

  const queryClient = useQueryClient();

  const addToBasket = (product: ProductTypes) => {
    const basketItems = queryClient.getQueryData<ProductTypes[]>("Basket") || [];
    
    const isProductInBasket = basketItems.some(item => item.id === product.id);
    
    if (isProductInBasket) {
        notification.info({
            message: 'Інформація',
            description: 'Даний товар вже є в корзині.'
        });
        return;
    }
  
    // Создаем объект для добавления в корзину
    const productToAdd: ProductTypes = {
      ...product, // Копируем все свойства продукта
      parameters: {
        ...product.parameters, // Копируем все параметры
        size: selectedSize || (product.parameters && product.parameters.size) || "" // Используем выбранный размер, если выбран, иначе размер из данных о продукте
      }
    };
    
    basketItems.push(productToAdd);
    queryClient.setQueryData<ProductTypes[]>("Basket", basketItems);
    notification.success({
        message: 'Успішно',
        description: 'Замовлення створено.'
    });
  };

  const { id } = useParams<{ id?: string }>();
  useEffect(() => {
    if (id) {
      const idFromUrl = parseInt(id);
      if (!isNaN(idFromUrl)) {
        setProductId(idFromUrl);
      }
    }
  }, [id]);

  useEffect(() => {
    if (productId !== null) {
      refetch();
    }
  }, [productId, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product data</div>;
  }

  if (!data) {
    return <div>No product data available</div>;
  }

  return (
    <div className={styled.wrap}>
      <Container>
        <div className={styled.content}>
          <div className={styled.image}>
            <img src={data?.images_links[0]} alt="images_links" />
            {data?.description &&
              <div className={styled.productFeature}>
                <div className={styled.productHead}>
                  <h3>Опиc</h3>
                </div>
                <div className={styled.productDescList}>
                  <li>{data?.description}</li>
                </div>
              </div>
            }
          </div>
          <div className={styled.datails}>
            <h1>{data.title}</h1>
            <p>{data.article}</p>
            <div className={styled.prices}>
              <div className={styled.price}>
                <h5>{data.price_old} {data.price_old && 'грн'}</h5>
                <h2>{data.price_uah} грн</h2>
              </div>
              <button onClick={() => addToBasket(data)}>У кошик</button>
            </div>
            <div className={styled.size}>
              <p className={styled.headSize}>
                Розмір виробника: {selectedSize || (data?.parameters?.size && data.parameters.size.split(',')[0].trim())}
              </p>
              <div className={styled.sizeList}>
                {data?.parameters?.size && data.parameters.size.split(',').map((size, index) => (
                  <button key={index} onClick={() => setSelectedSize(size.trim())}>{size.trim()}</button>
                ))}
              </div>
            </div>
            <div className={styled.productDetails}>
              <div className={styled.productBlock}>
                <div className={styled.productHead}>
                  <TbTruckDelivery />
                  <h3>Доставка замовлення</h3>
                </div>
                <ul>
                  <li>Поштоватом (НП)</li>
                  <li>Кур'єром по Києву</li>
                  <li>Нова пошта</li>
                  <li>Самовивіз</li>
                </ul>
              </div>
              <div className={styled.productBlock}>
                <div className={styled.productHead}>
                  <MdOutlinePayment />
                  <h3>Оплата замовлення</h3>
                </div>
                <ul>
                  <li>Оплата готівкою при отриманні (Післяплата)</li>
                  <li>Оплата карткою через ПриватБанк</li>
                  <li>Оплата карткою Visa, MasterCard</li>
                  <li>Оплата кредиту</li>
                  <li>Оплата сертифікатом</li>
                </ul>
              </div>
            </div>
            <div className={styled.productFeature}>
              <div className={styled.productHead}>
                <MdOutlinePayment />
                <h3>Оплата замовлення</h3>
              </div>
              <div className={styled.productFeatureList}>
                {data.brand && <li>Бренд: {data.brand}</li>}
                {data?.parameters?.size && <li>Розмір: {data?.parameters?.size}</li>}
                {data?.parameters?.height && <li>Висота: {data?.parameters?.height}</li>}
                {data?.parameters?.length && <li>Довжина: {data?.parameters?.length}</li>}
                {data?.parameters?.width && <li>Ширина: {data?.parameters?.width}</li>}
                {data?.parameters?.weight && <li>Вага: {data?.parameters?.weight}</li>}
                {data?.parameters?.diameter && <li>Діаметр: {data?.parameters?.diameter}</li>}
                {data?.parameters?.type && <li>Тип: {data?.parameters?.type}</li>}
                {data?.parameters?.material && <li>Матеріал: {data?.parameters?.material}</li>}
                {data?.parameters?.made_by && <li>Вироблено: {data?.parameters?.made_by}</li>}
                {data?.parameters?.color && <li>Колір: {data?.parameters?.color}</li>}
                {data?.parameters?.fastening_type && <li>Тип кріплення: {data?.parameters?.fastening_type}</li>}
                {data?.parameters?.form && <li>Форма: {data?.parameters?.form}</li>}
                {data?.parameters?.peculiarities && <li>Особливості: {data?.parameters?.peculiarities}</li>}
                {data?.parameters?.aroma && <li>Аромат: {data?.parameters?.aroma}</li>}
                {data?.parameters?.volume && <li>Гучність: {data?.parameters?.volume}</li>}

              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};