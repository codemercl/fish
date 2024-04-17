import { FC, useEffect, useState } from "react";
import { Container } from "../../components";
import styled from "./s.module.scss";
import { useQuery, useQueryClient } from 'react-query';
import { ProductTypes } from "../../components/Product/types";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { useParams } from "react-router-dom";
import { notification } from "antd";
import { v4 as uuidv4 } from 'uuid';

const fetchProduct = async (productId: number) => {

  let headers = {};

  const token = sessionStorage.getItem("token");
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }

  const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${productId}`, {
    headers: headers
  });
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
  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    setMainImage(data?.images_links[0])
  }, [data])

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const queryClient = useQueryClient();

  const addToBasket = (product: ProductTypes) => {
    const basketItems = queryClient.getQueryData<ProductTypes[]>("Basket") || [];

    const isProductInBasket = basketItems.some(item =>
      item.id === product.id &&
      item.parameters?.size === (selectedSize || (product.parameters && product.parameters.size) || "")
    );

    if (isProductInBasket) {
      notification.info({
        message: 'Інформація',
        description: 'Даний товар вже є в корзині.'
      });
      return;
    }

    const uuidString = uuidv4(); // Генерируем UUID в виде строки
    const uuidNumber = parseInt(uuidString.replace(/\D/g, ''), 10); // Преобразуем строку в числовое значение

    const productToAdd: ProductTypes = {
      ...product,
      uid: uuidNumber, // Используем числовое значение UUID
      parameters: {
        ...product.parameters,
        size: selectedSize || (product.parameters && product.parameters.size) || ""
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
            <div>
              <img src={mainImage} alt="main" style={{ width: '100%', height: 'auto' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                {data?.images_links.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`thumbnail-${index}`}
                    style={{ width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))}
              </div>
            </div>
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

            <div className={styled.productFeature}>
              <div className={styled.productHead}>
                <h3>Деталі товару</h3>
              </div>
              <div className={styled.productFeatureList}>
                {data.brand && <li>Бренд: {data.brand}</li>}
                {data?.parameters?.size && <li>Розмір: {data?.parameters?.size}</li>}
                {data?.parameters?.amount && <li>Кількість: {data?.parameters?.amount}</li>}
                {data?.parameters?.height && <li>Висота: {data?.parameters?.height}</li>}
                {data?.parameters?.length && <li>Довжина: {data?.parameters?.length}</li>}
                {data?.parameters?.width && <li>Ширина: {data?.parameters?.width}</li>}
                {data?.parameters?.weight && <li>Вага: {data?.parameters?.weight}</li>}
                {data?.parameters?.action && <li>Дія: {data?.parameters?.action}</li>}
                {data?.parameters?.diameter && <li>Діаметр: {data?.parameters?.diameter}</li>}
                {data?.parameters?.type && <li>Тип: {data?.parameters?.type}</li>}
                {data?.parameters?.material && <li>Матеріал: {data?.parameters?.material}</li>}
                {data?.parameters?.made_by && <li>Вироблено: {data?.parameters?.made_by}</li>}
                {data?.parameters?.color && <li>Колір: {data?.parameters?.color}</li>}
                {data?.parameters?.fastening_type && <li>Тип кріплення: {data?.parameters?.fastening_type}</li>}
                {data?.parameters?.form && <li>Форма: {data?.parameters?.form}</li>}
                {data?.parameters?.peculiarities && <li>Особливості: {data?.parameters?.peculiarities}</li>}
                {data?.parameters?.aroma && <li>Аромат: {data?.parameters?.aroma}</li>}
                {data?.parameters?.volume && <li>Об'єм: {data?.parameters?.volume}</li>}
                {data?.parameters?.number && <li>Номер: {data?.parameters?.number}</li>}
              </div>
            </div>
            <div className={styled.productDetails}>
              <div className={styled.productBlock}>
                <div className={styled.productHead}>
                  <TbTruckDelivery />
                  <h3>Доставка замовлення</h3>
                </div>
                <ul>
                  <li>Поштоматом (НП)</li>
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
                  <li>Оплата карткою на рахунок</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};