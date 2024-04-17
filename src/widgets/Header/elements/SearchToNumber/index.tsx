import { useState } from "react";
import { Modal, Button, Form } from "antd";
import styled from "./s.module.scss";
import { FaBoxTissue } from "react-icons/fa6";
import InputMask from "react-input-mask";

export const SearchToNumber = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signInForm] = Form.useForm();

  const searchOrders = async (phone: any) => {
    try {
      const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders/search?phone=${phone}`);
      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
      const data = await response.json();
      console.log(data);
      // Здесь вы можете обработать ответ сервера или выполнить другие действия с данными
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      // Здесь вы можете обработать ошибку
    }
  };

  const handleSearch = async () => {
    try {
      const values = await signInForm.validateFields();
      const { phone } = values;
      await searchOrders(phone);
    } catch (error) {
      console.error('Ошибка при валидации формы:', error);
      // Здесь вы можете обработать ошибку валидации формы
    }
  };

  return (
    <>
      <FaBoxTissue
        fill="rgb(116, 125, 142)"
        size={20}
        onClick={() => setSignInVisible(true)}
        className={styled.profile}
      />
      <Modal
        title="Пошук за номером"
        visible={signInVisible}
        onCancel={() => setSignInVisible(false)}
        footer={null}
        width={450}
      >
        <Form
          form={signInForm}
          onFinish={handleSearch}
          initialValues={{ phone: "" }}
          className={styled.form}
          layout="vertical"
        >
          <Form.Item
            name="phone"
            label="Телефон"
            rules={[{ required: true, message: "Будь ласка, введіть телефон" }]}
          >
            <InputMask
              mask="+38 (999) 999-99-99"
              placeholder="Телефон"
              className={styled.phone}
            />
          </Form.Item>
          <Form.Item className={styled.buttonForm}>
            <Button
              htmlType="submit"
              className={styled.button}
            >
              Шукати
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};