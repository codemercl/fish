import { FC } from "react"
import { ProductTypes } from "./types"
import styled from "./s.module.scss"
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { notification } from 'antd';

interface Props {
    data: ProductTypes;
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
        
        basketItems.push(product);
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
                <Link to={`/product/${data?.id}`}>{data.title}</Link>
                <h1>{data.price_uah} грн.</h1>
                <FaShoppingBasket size={25} fill="#feda03" className={styled.basket} onClick={() => addToBasket(data)} />
            </div>
        </div>
    )
}
