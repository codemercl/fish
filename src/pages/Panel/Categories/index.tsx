import { useQuery } from 'react-query';
import { Spin, Result, Table, Tag, Modal, notification } from 'antd';
import styled from "./s.module.scss";
import { TiDelete } from "react-icons/ti";

export const Categories = () => {
  const { isLoading, isError, data, refetch } = useQuery('categories', fetchCategories);

  const deleteSubCategory = async (subCategoryId: any, categoryName: any) => {
    Modal.confirm({
      title: "Видалення категорії",
      content: `Ви впевнені, що бажаєте видалити категорію "${categoryName}"?`,
      onOk: async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            throw new Error('No token found in local storage');
          }

          const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories/${subCategoryId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            refetch()
            notification.success({
              message: "Успішно",
              description: "Категорії успішно змінено",
            });
          } else {
            throw new Error('Failed to delete subcategory');
          }
        } catch (error) {
          console.error(error);
          notification.error({
            message: "Помилка",
            description: "Категорії не змінено",
          });
        }
      },
      okText: "Видалити",
      cancelText: "Відміна"
    });
  };

  const columns = [
    {
      title: 'Категорія',
      dataIndex: 'category.name',
      key: 'category.name',
      render: (text: string | undefined, record: { category: any }) => {
        return (
          <div className={styled.category}>
            <TiDelete onClick={() => deleteSubCategory(record?.category?.id, record.category.name)} className={styled.icon} size={20} />
            <img src={record.category.image_link} alt={text} style={{ width: '50px', marginRight: '10px' }} />
            <p>{record.category.name}</p>
          </div>
        );
      },
    },
    {
      title: 'Підкатегорії',
      dataIndex: 'sub_categories',
      key: 'sub_categories',
      render: (subCategories: any[]) => {
        return (
          <div className={styled.sub}>
            {subCategories.map((subCategory) => (
              <Tag className={styled.tab} key={subCategory.id} color="blue" onClick={() => deleteSubCategory(subCategory.id, subCategory.name)}>
                {subCategory.name} <span>x</span>
              </Tag>
            ))}
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <Result status="error" title="Failed to fetch categories" subTitle="Не вдалося завантажити категорії" />;
  }

  return <Table dataSource={data} columns={columns} pagination={false} />;
};

async function fetchCategories() {
  const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories/');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data;
}
