import { useState } from "react";
import { Modal, Button, Form, Tooltip, Table } from "antd";
import styled from "./s.module.scss";
import { FaBoxTissue } from "react-icons/fa6";
import InputMask from "react-input-mask";

// Интерфейс для объекта товара
interface Item {
  id: number;
  productId: number;
  title: string;
  quantity: number;
  size: string;
  price: number;
  priceSum: number;
  image: string;
}

export const SearchToNumber = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signInForm] = Form.useForm();
  const [itemsData, setItemsData] = useState<Item[]>([]); // Установка типа данных для itemsData

  const columns = [
    {
      title: 'Картинка',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} alt="Item" style={{ width: '80px', height: 'auto' }} />,
    },
    {
      title: 'Назва',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Кількість',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Розмір',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
      key: 'price',
    }
  ];

  const handleSearch = async () => {
    try {
      const values = await signInForm.validateFields();
      const { phone } = values;
      const data = await searchOrders(phone);
      if (data && data.length > 0) {
        // Assuming items are under data[0].items based on your previous response structure
        setItemsData(data[0].items);
      } else {
        setItemsData([]);
      }
    } catch (error) {
      console.error('Ошибка при валидации формы:', error);
      setItemsData([]);
    }
  };

  const searchOrders = async (phone: string | number | boolean) => {
    try {
      let headers = {};
      const token = sessionStorage.getItem("token");
      if (token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${token}`
        };
      }

      const encodedPhone = encodeURIComponent(phone);
      const url = `https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders/search?phone=${encodedPhone}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return null;
    }
  };

  return (
    <>
      <Tooltip title="Замовлені товари">
        <FaBoxTissue
          fill="rgb(116, 125, 142)"
          size={20}
          onClick={() => setSignInVisible(true)}
          className={styled.profile}
        />
      </Tooltip>
      <Modal
        title="Пошук за номером"
        visible={signInVisible}
        onCancel={() => setSignInVisible(false)}
        footer={null}
        width={900} // Adjust width as needed
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
        {itemsData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={itemsData} // Set dataSource to itemsData directly
            pagination={false} // Disable pagination if needed
          />
        ) : (
          <p>Немає даних для відображення</p>
        )}
      </Modal>
    </>
  );
};
