import { FC, useState } from "react";
import styled from "./s.module.scss";
import { Container } from "../../components";
import { Modal, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { FaTelegram } from "react-icons/fa";
import { FaViber } from "react-icons/fa";

const { TextArea } = Input;

export const Footer: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        text: "",
        phone: "",
        name: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("-server-ba9b079f683d.herokuapp.com/v1/api/users/callback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            message.success('Ваше повідомлення успішно надіслано');
            setModalVisible(false);
        } catch (error) {
            console.error("Помилка при надсиланні повідомлення:", error);
            message.error('Помилка при надсиланні повідомлення');
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            const response = await fetch("https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            message.success('Ваш відгук успішно відправлено');
            setFeedbackModalVisible(false);
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            message.error('Помилка при надсиланні відгука');
        }
    };

    return (
        <div className={styled.wrap}>
            <Container>
                <ul className={styled.list}>
                    <li>
                        <h1>Про нас</h1>
                        <Link to="/about">Про нас</Link>
                        <Link to="/contacts">Контакты</Link>
                        <Link to="/contacts">Гарантії</Link>
                        <Link to="/contacts">Доставка</Link>
                    </li>
                    <li>
                        <h1>Контакти</h1>
                        <p>optimisthook@gmail.com</p>

                        <p><FaViber style={{marginRight: '10px'}} /> +38 (063) 667 60 97 </p>

                        <a target="_blank" href="https://t.me/ByCarpeDiem" style={{color: "#feda03"}}><FaTelegram color="#feda03" style={{marginRight: '10px'}} />Телеграм</a>
                        
                        <ul>
                            <li>Пн. — Пт.: с 9:00 до 18:00</li>
                            <li>Сб.: с 9:00 до 17:00</li>
                        </ul>
                    </li>
                    <li>
                        <h1>Зв'язок з нами</h1>
                        <Link to="#" onClick={() => setModalVisible(true)}>Зворотній зв'язок</Link>
                        <Link to="#" onClick={() => setFeedbackModalVisible(true)}>Залишити відгук</Link>
                    </li>
                </ul>
            </Container>
            <Modal
                title="Зворотній зв'язок"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>Скасувати</Button>,
                    <Button key="submit" onClick={handleSubmit}>Відправити</Button>
                ]}
            >
                <div className={styled.modal}>
                    <div className={styled.modalGroup}>
                        <InputMask
                            mask="+38 (999) 999-99-99"
                            placeholder='+38 (999) 999-99-99'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={styled.phone}
                        />
                        <Input
                            placeholder="Ім'я"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <TextArea
                        placeholder="Текст"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                    />
                </div>
            </Modal>
            <Modal
                title="Залишити відгук"
                visible={feedbackModalVisible}
                onCancel={() => setFeedbackModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setFeedbackModalVisible(false)}>Скасувати</Button>,
                    <Button key="submit" onClick={handleFeedbackSubmit}>Відправити</Button>
                ]}
            >
                <div className={styled.modal}>
                    <div className={styled.modalGroup}>
                        <InputMask
                            mask="+38 (999) 999-99-99"
                            placeholder='+38 (999) 999-99-99'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={styled.phone}
                        />
                        <Input
                            placeholder="Ім'я"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <TextArea
                        placeholder="Текст"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                    />
                </div>
            </Modal>
        </div>
    );
};
