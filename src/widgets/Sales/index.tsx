import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../components/Product"
import styled from "./s.module.scss"
import { useQuery } from "react-query";
import { ProductTypes } from "../../components/Product/types"
import { Skeleton } from "antd";

export const Sales: React.FC = () => {

    const fetchProducts = async () => {
        let headers = {};
    
        const token = sessionStorage.getItem("token");
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`
            };
        }
    
        const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/discount`, {
            headers: headers 
        });
    
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
    
        return response.json();
    };
    

    const { data, isLoading, isError } = useQuery<ProductTypes[], Error>(
        ["discount"],
        () => fetchProducts()
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    if (isLoading) {
        return (
            <div>
                <h1 className={styled.head}>Знижка</h1>
                <div className={styled.content}>
                    <div className={styled.list}>
                        <Skeleton active paragraph={{ rows: 10 }} />
                    </div>
                </div>
            </div>
        );
    }
    if (isError) return <div>Error fetching data</div>;

    return (
        <div>
            <h1 className={styled.head}>Знижка</h1>
            <div className={styled.content}>
                {data && data?.length >= 4 ? (
                    <div className={styled.list}>
                        <Slider {...sliderSettings}>
                            {data?.map((item) => (
                                <Product key={item?.id} data={item} />
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className={styled.list}>
                        {data && data?.map((item) => (
                            <Product key={item?.id} data={item} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};