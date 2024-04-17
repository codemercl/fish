import React, { useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useQuery, useQueryClient } from 'react-query';
import styled from "./s.module.scss";

interface Category {
  id: number;
  name: string;
  image_link: string;
}

interface ParentCategory {
  category: Category;
}

interface CategoryResponse {
  category: Category;
  sub_categories: Category[];
}

const { Option } = Select;

const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const AddProductForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [imageLink, setImageLink] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<ParentCategory | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: categories, isLoading } = useQuery<CategoryResponse[]>('categories', fetchCategories);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        name,
        image_link: imageLink,
        parent: parentCategory ? {
          id: parentCategory.category.id,
          name: parentCategory.category.name,
          image_link: parentCategory.category.image_link
        } : null,
      };

      const token = sessionStorage.getItem('token');
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories', requestOptions);

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Обновляем данные в кеше
      queryClient.invalidateQueries('categories');

      // Очищаем форму
      setName('');
      setImageLink('');
      setParentCategory(null);

      notification.success({
        message: "Успішно",
        description: "Категорія додана",
    });

      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product', error);
      notification.error({
        message: "Помилка",
        description: "Категорія не додана",
    });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !categories) return <div>Loading...</div>;

  return (
    <Form onFinish={handleSubmit} className={styled.wrapper}>
      <Form.Item label="Назва категорії">
        <Input placeholder='напр. Гачки' value={name} onChange={e => setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Фото категорії">
        <Input placeholder='напр. https://...' value={imageLink} onChange={e => setImageLink(e.target.value)} />
      </Form.Item>
      <Form.Item label="Категорія (опціонально)">
        <Select
          loading={isLoading}
          value={parentCategory ? parentCategory?.category?.id : undefined}
          onChange={(value: number) => setParentCategory(categories.find(category => category.category.id === value))}
          placeholder="Обрати категорію"
        >
          {categories.map((category: CategoryResponse) => (
            <Option key={category.category.id} value={category.category.id}>
              {category.category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={loading}>
          Додати категорію
        </Button>
      </Form.Item>
    </Form>
  );
};
