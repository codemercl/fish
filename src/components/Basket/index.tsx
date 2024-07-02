import { FC, useState, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Modal, Carousel, Button, Input, message, InputNumber, Select, Badge, Result } from 'antd';
import { ProductTypes } from '../Product/types';
import { useMutation } from 'react-query';
import styled from "./s.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import InputMask from "react-input-mask";

const { Option } = Select;

export const Basket: FC = () => {
    const queryClient = useQueryClient();
    const { data: basketItems } = useQuery<ProductTypes[]>("Basket");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef<any>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [postNumber, setPostNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedSizes, setSelectedSizes] = useState<Record<any, any | undefined>>({});
    const [selectedQuantities, setSelectedQuantities] = useState<any>({});
    const [paymentType, setPaymentType] = useState("");

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const createOrderMutation = useMutation(
        async (orderData: any) => {
            const token = sessionStorage.getItem('token');

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            headers['Content-Type'] = 'application/json';
            try {
                const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(orderData),
                });

                if (!response.ok) {
                    throw new Error('Ошибка при отправке запроса');
                }

                return await response.json();
            } catch (error) {
                throw new Error('Ошибка при обработке запроса:');
            }
        },
        {
            onSuccess: () => {
                message.success("Успішно: Замовлення створено.");
                carouselRef.current.next();
            },
            onError: () => {
                message.error("Помилка: Замовлення не створено.");
            },
        }
    );

    const handleRemoveItem = async (itemId: number) => {
        try {
            await queryClient.setQueryData<ProductTypes[]>(
                "Basket",
                (prevBasketItems: ProductTypes[] | undefined) => {
                    if (!prevBasketItems) return [];

                    // Filter out the item with the given itemId
                    const updatedBasketItems = prevBasketItems.filter(
                        (item: ProductTypes) => item.uid !== itemId
                    );
                    return updatedBasketItems;
                }
            );
        } catch (error) {
            console.error("Error removing item from basket:", error);
        }
    };

    const handleNext = async () => {
        if (currentSlide === 1) {
            // Проверить введенные данные
            if (firstName.trim() === "" || lastName.trim() === "" || name.trim() === "" || city.trim() === "" || region.trim() === "" || address.trim() === "" || postNumber.trim() === "" || phone.trim() === "" || paymentType.trim() === "") {
                message.error("Помилка. Заповніть всі поля");
                return;
            }

            // Собрать данные о товарах
            const items = basketItems?.map((item: any) => ({
                product_id: item.id,
                size: selectedSizes[item.uid] || item?.parameters?.size,
                quantity: selectedQuantities[item.uid] || 1,
            }));

            // Собрать данные о покупателе
            const orderData = {
                items,
                first_name: firstName,
                last_name: lastName,
                name,
                city,
                region,
                address,
                post_office: postNumber,
                phone,
                payment: paymentType,
            };

            // Отправить запрос на создание заказа
            await createOrderMutation.mutateAsync(orderData);
        } else {
            carouselRef.current.next();
        }
    };

    const handlePayment = (paymentType: string) => {
        setPaymentType(paymentType);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        basketItems?.forEach((item: any) => {
            const price = parseFloat(item?.price_uah);
            const quantity = selectedQuantities[item?.uid] || 1;
            totalPrice += price * quantity;
        });
        return totalPrice;
    };

    const slideContents = [
        <div key="1">
            <div className={styled.basket}>
                {basketItems && basketItems.map((item: any) => (
                    <div className={styled.element} key={item.uid}>
                        <img src={item?.images_links[0]} alt="images_links" />
                        <div className={styled.infoBasket}>
                            <p>{item?.article}</p>
                            <h4>{item.title}</h4>
                            <span>{item?.price_uah} грн.</span>
                        </div>
                        <div>
                            {item?.parameters.size && item.parameters.size.split(',').length > 1 ? (
                                <Select
                                    className={styled.select}
                                    placeholder="Виберіть розмір"
                                    value={selectedSizes[item.uid]}
                                    onChange={(value) => setSelectedSizes({ ...selectedSizes, [item.uid]: value })}
                                >
                                    {item?.parameters.size.split(',').map((size: string, index: number) => (
                                        <Option key={index} value={size.trim()}>
                                            {size.trim()}
                                        </Option>
                                    ))}
                                </Select>
                            ) : (
                                item?.parameters.size
                            )}
                        </div>
                        <InputNumber
                            className={styled.textield}
                            defaultValue={1} // Устанавливаем значение по умолчанию равное 1
                            onChange={(value) => setSelectedQuantities({ ...selectedQuantities, [item?.uid]: value })}
                        />
                        <IoMdCloseCircleOutline className={styled.delete} size={20} onClick={() => handleRemoveItem(item?.uid)} />
                    </div>
                ))}
            </div>
            <p className={styled.total}>Сума: <b>{calculateTotalPrice()}</b> грн.</p>
        </div>,
        <div key="2">
            <div className={styled.grid}>
                <div>
                    <label htmlFor="email">Ім'я *</label>
                    <Input name='email' id='email' placeholder="Ім'я..." value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="mail">Прізвище *</label>
                    <Input name='mail' id='mail' placeholder="Прізвище..." value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">Імейл *</label>
                    <Input name='name' id='name' placeholder="Імейл..." value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="city">Місто *</label>
                    <Input name='city' id='city' placeholder="Місто..." value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="region">Область *</label>
                    <Input name='region' id='region' placeholder="Область..." value={region} onChange={e => setRegion(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="address">Адреса *</label>
                    <Input name='address' id='address' placeholder="Адреса..." value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="postNumber">Номер відділення *</label>
                    <Input name='postNumber' id='postNumber' placeholder="Номер відділення..." value={postNumber} onChange={e => setPostNumber(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone">Номер телефону *</label>
                    <InputMask
                        mask="+38 (999) 999-99-99"
                        placeholder='+38 (999) 999-99-99'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styled.phone}
                    />
                </div>
            </div>
            <div className={styled.buttonPayment}>
                <p>Тип оплати *</p>
                <Button value="Оплата карткою" onClick={() => handlePayment("Оплата карткою")}>Оплата карткою</Button>
                <Button value="Накладений платіж" onClick={() => handlePayment("Накладений платіж")}>Накладений платіж</Button>
            </div>
        </div>,
        <div key="3">
            <Result
                status="success"
                title="Дякуємо за замовлення!"
                subTitle="Очікуйте, з вами зв'яжуться менеджер"
            />
        </div>
    ];

    return (
        <>
            <div className={styled.basketIconWrapper}>
                <Badge className={styled.basketIcon} count={basketItems ? basketItems.length : 0}>
                    <FaBasketShopping onClick={() => setModalVisible(true)} fill="rgb(122, 185, 122)" size={45} />
                </Badge>
                <div className={styled.wave}></div>
            </div>

            <Modal
                title="Кошик товарів"
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
                width={700}
            >
                <Carousel
                    autoplay={false}
                    dots={false}
                    ref={carouselRef}
                    beforeChange={(_, to) => setCurrentSlide(to)}
                    swipe={false}
                >
                    {slideContents}
                </Carousel>
                <div className={styled.buttonControll}>
                    <Button type="text" onClick={() => carouselRef.current.prev()} disabled={currentSlide === 0}>Назад</Button>
                    {basketItems ? basketItems.length > 0 && (
                        <Button onClick={handleNext} disabled={currentSlide === slideContents.length - 1}>
                            {currentSlide === 1 ? "Придбати товар" : "Вперед"}
                        </Button>
                    ) : ''}
                </div>
            </Modal>
        </>
    );
};

