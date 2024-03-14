import { useState } from 'react';
import { Modal } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from 'react-query';
import styled from "./s.module.scss"
import { ProductTypes } from '../../../../components/Product/types';
import { Link } from 'react-router-dom';

export const Search = () => {
    const [text, setText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { data, isLoading, refetch } = useQuery<ProductTypes[]>(['products', text], async () => {
        if (text.trim() !== '') {
            const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/search?request=${text}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    }, {
        enabled: false,
    });

    const handleSearch = () => {
        if (text.trim() !== '') {
            refetch();
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleLinkClick = () => {
        setIsModalVisible(false); // Закрыть модальное окно после клика на ссылку
    };

    return (
        <div className={styled.wrap}>
            <input
                placeholder="Пошук.."
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSearch}>
                <FaSearch fill="rgb(116, 125, 142)" size={15} />
            </button>

            <Modal
                title="Результати пошуку"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={900}
            >
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    data && data.map((el) => (
                        <Link to={`product/${el.id}`} className={styled.list} onClick={handleLinkClick}>
                            <div className={styled.block}>
                                <p>{el.article}</p>
                            </div>
                            <div className={styled.block}>
                                <img src={el.images_links[0]} alt="images_links" />
                            </div>
                            <div className={styled.block}>
                                <h4>{el.title}</h4>
                            </div>
                            <div className={styled.block}>
                                <p>{el.brand}</p>
                            </div>
                            <div className={styled.block}>
                                <p>{el.in_stock}</p>
                            </div>
                            <div className={styled.block}>
                                <span>{el.price_uah} грн.</span>
                            </div>
                        </Link>
                    ))
                )}
            </Modal>
        </div>
    );
};
