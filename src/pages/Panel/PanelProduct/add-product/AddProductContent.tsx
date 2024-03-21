import { Form, Input, Select, Button, Space, InputNumber, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import styled from "./s.module.scss";

const { Option } = Select;

export const AddProductContent = () => {
  const { data: categories } = useQuery('categories', async () => {
    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  });

  const [parentCategory, setParentCategory] = useState(null);
  const [_, setSubCategory] = useState(null);
  const [imageLinks, setImageLinks] = useState([""]);

  const handleParentCategoryChange = (value: SetStateAction<null>) => {
    setParentCategory(value);
    setSubCategory(null);
  };

  const handleSubCategoryChange = (value: SetStateAction<null>) => {
    setSubCategory(value);
  };

  const handleAddInput = () => {
    setImageLinks([...imageLinks, ""]);
  };

  const handleRemoveInput = (index: number) => {
    const updatedLinks = [...imageLinks];
    updatedLinks.splice(index, 1);
    setImageLinks(updatedLinks);
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedLinks = [...imageLinks];
    updatedLinks[index] = value;
    setImageLinks(updatedLinks);
  };

  const onFinish = async (values: any) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }
  
    let { parentCategory, subCategory, ...restValues } = values;

    let categoryData = {};
    if (subCategory) {
      categoryData = {
        id: subCategory,
        name: null,
        image_link: null,
        parent: {
          id: parentCategory,
          name: null,
          image_link: null,
        },
      };
    } else {
      categoryData = {
        id: parentCategory,
        name: null,
        image_link: null,
        parent: null,
      };
    }
  
    try {
      const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...restValues, category: categoryData, images_links: imageLinks }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      notification.success({
        message: "Успішно",
        description: "Товар створено",
      });
  
      // Handle success
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: `Товар не створено`,
      });
      console.error('Error creating product:', error);
    }
  };
  

  return (
    <div className={styled.wrapper}>
      <Form
        className={styled.form}
        layout="vertical"
        name="Додати товар"
        onFinish={onFinish}
      >
        <Form.Item>
          <Button htmlType="submit">
            Завантажити товар
          </Button>
        </Form.Item>
        <div className={styled.textfieldBlocks}>
          <Form.Item
            label="Категорія"
            name="parentCategory"
            rules={[{ required: true, message: 'Оберіть категорію!' }]}
          >
            <Select placeholder="Оберіть категорію" onChange={handleParentCategoryChange}>
              {categories &&
                categories.map((categoryObj: { category: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
                  <Option key={categoryObj.category.id} value={categoryObj.category.id}>
                    {categoryObj.category.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Підкатегорія"
            name="subCategory"
          >
            <Select placeholder="Оберіть підкатегорію" onChange={handleSubCategoryChange} disabled={!parentCategory}>
              {categories &&
                parentCategory &&
                categories
                  .find((cat: { category: { id: any; }; }) => cat.category.id === parentCategory)
                  ?.sub_categories.map((subCat: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <Option key={subCat.id} value={subCat.id}>
                      {subCat.name}
                    </Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Назва"
            name="title"
            rules={[{ required: true, message: 'Впишіть поле "назва"!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Опис"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Артікль"
            name="article"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Бренд"
            name="brand"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Маркер"
            name="marker"
            valuePropName="checked"
          >
            <Select placeholder="Оберіть варіант">
              <Option value="Супер ціна">Супер ціна</Option>
              <Option value="Хіт">Хіт</Option>
              <Option value="Новинки">Новинки</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Ціна (UAH)"
            name="price_uah"
          >
            <InputNumber style={{width: '100%'}} type="text" />
          </Form.Item>
          <Form.Item
            label="Ціна (USD)"
            name="price_usd"
          >
            <InputNumber style={{width: '100%'}} type="text" />
          </Form.Item>
          <Form.Item
            label="Дісконт"
            name="discount"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Націнка"
            name="markup"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ширина"
            name={['parameters', 'width']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Висота"
            name={['parameters', 'height']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Вага"
            name={['parameters', 'weight']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Довжина"
            name={['parameters', 'length']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Розмір"
            name={['parameters', 'size']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Колір"
            name={['parameters', 'color']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="У наявності"
            name="in_stock"
            valuePropName="checked"
          >
            <Select placeholder="Оберіть варіант">
              <Option value={true}>Так</Option>
              <Option value={false}>Ні</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="В архіві"
            name="in_archive"
            valuePropName="checked"
          >
            <Select placeholder="Оберіть варіант">
              <Option value={true}>Так</Option>
              <Option value={false}>Ні</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Матеріал"
            name={['parameters', 'material']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Дія"
            name={['parameters', 'action']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Діаметр"
            name={['parameters', 'diameter']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Тип"
            name={['parameters', 'type']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Виробник"
            name={['parameters', 'made_by']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Кількість"
            name={['parameters', 'amount']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Обсяг"
            name={['parameters', 'volume']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Аромат"
            name={['parameters', 'aroma']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Номер"
            name={['parameters', 'number']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Тип кріплення"
            name={['parameters', 'fastening_type']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Форма"
            name={['parameters', 'form']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Особливості"
            name={['parameters', 'peculiarities']}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Картинки товарів">
            {imageLinks.map((link, index) => (
              <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Input
                  value={link}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  placeholder="Скопіюйте лінк на фото"
                />
                <Button
                  onClick={() => handleRemoveInput(index)}
                  icon={<PlusOutlined />}
                />
              </Space>
            ))}
            <Button type="dashed" onClick={handleAddInput} block icon={<PlusOutlined />}>
              Додати
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
