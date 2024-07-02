import { FC } from "react"
import { ProductTypes } from "./types"
import styled from "./s.module.scss"
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    data: ProductTypes | any;
}

export const Product: FC<Props> = ({ data }) => {
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

        const productWithUUID: ProductTypes = {
            ...product,
            uid: uuidv4(),
        };

        basketItems.push(productWithUUID); // Добавляем product с UUID в корзину
        queryClient.setQueryData<ProductTypes[]>("Basket", basketItems);
        notification.success({
            message: 'Успішно',
            description: 'Замовлення створено.'
        });
    };


    return (
        <div className={styled.wrap}>
            <div className={styled.head}>
                <p>{data.marker}</p>
                <span>{data.discount && '-'} {data.discount} {data.discount && '%'}</span>
            </div>
            <div className={styled.images}>
                <img src={data.images_links[0]} alt="product" />
            </div>
            <div className={styled.body}>
                <p>{data.article}</p>
                <div className={styled.stock}>
                    <span>{data.in_stock ? <div>наявності</div> : <p>Нема в наявності</p>}</span>
                </div>
                <Link to={`/product/${data?.id}`}>{data.title}</Link>
                {data.price_old && <h3>{data.price_old} грн.</h3>}
                <h1>{data.price_uah} грн.</h1>
                <FaShoppingBasket size={25} fill="#feda03" className={styled.basket} onClick={() => addToBasket(data)} />
            </div>
        </div>
    )
}
