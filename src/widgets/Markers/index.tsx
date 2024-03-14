import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../components/Product"
import styled from "./s.module.scss"
import { useQuery } from "react-query";
import { ProductTypes } from "../../components/Product/types"
import { Skeleton } from "antd";

interface Props {
    marker: string;
}

export const Markers: React.FC<Props> = ({ marker }) => {

    const fetchProducts = async (marker: string) => {
        const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/promo?marker=${marker}`);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        return response.json();
    };

    const { data, isLoading, isError } = useQuery<ProductTypes[], Error>(
        ["products", marker],
        () => fetchProducts(marker)
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
                <h1 className={styled.head}>{marker}</h1>
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
            <h1 className={styled.head}>{marker}</h1>
            <div className={styled.content}>
                {data && data?.length >= 4 ? (
                    <div className={styled.list}>
                        <Slider {...sliderSettings}>
                            {data?.map((item) => (
                                <Product key={item.id} data={item} />
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div>
                        {data?.map((item) => (
                            <Product key={item.id} data={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};