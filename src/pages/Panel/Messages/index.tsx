import { FC } from 'react';
import { Table } from 'antd';
import { useQuery } from 'react-query';

interface Feedback {
    id: number;
    text: string;
    phone: string | null;
    name: string;
    created_date: string;
}

const fetchFeedbacks = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/feedbacks', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const Messages: FC = () => {
    const { data, isLoading } = useQuery<Feedback[]>('feedbacks', fetchFeedbacks);

    if (isLoading) return <div>Loading...</div>;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Текст',
            dataIndex: 'text',
            key: 'text',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: "Ім'я",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата створення',
            dataIndex: 'created_date',
            key: 'created_date',
        },
    ];

    return <Table pagination={{ pageSize: 10 }} scroll={{ x: true }} columns={columns} dataSource={data} rowKey="id" />;
};
