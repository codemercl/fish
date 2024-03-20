import { FC } from 'react';
import { Table, Button, message, Tag } from 'antd';
import { useQuery } from 'react-query';

interface User {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    phone: string;
    city: string;
    region: string;
    post_office: string;
    address: string;
    is_verified: boolean;
}

const fetchUsers = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.content;
};

const verifyUser = async (userId: number) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/verify/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Assuming successful verification, show success message
    message.success(`Юзер ${userId} успішно верифікований`);
};

export const Users: FC = () => {
    const { data, isLoading, refetch } = useQuery<User[]>('users', fetchUsers);

    const handleVerifyUser = async (userId: number) => {
        try {
            await verifyUser(userId);
            // После успешной верификации делаем refetch запроса
            refetch();
        } catch (error) {
            console.error('Помилка верифікації:', error);
            // Обработка ошибки
            message.error('Error verifying user. Please try again later.');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let color: string;
                let text: string;

                switch (role) {
                    case 'ROLE_USER':
                        color = 'blue';
                        text = 'Користувач';
                        break;
                    case 'ROLE_USER_PLUS':
                        color = 'green';
                        text = 'Оптовий користувач';
                        break;
                    case 'ROLE_ADMIN':
                        color = 'red';
                        text = 'Адмін';
                        break;
                    default:
                        color = 'default';
                        text = 'Невідомо';
                        break;
                }

                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Ім'я",
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Прізвіще',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Місто',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Область',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Відділення (НП)',
            dataIndex: 'post_office',
            key: 'post_office',
        },
        {
            title: 'Вулиця',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Підтверджений',
            dataIndex: 'is_verified',
            key: 'is_verified',
            render: (isVerified: boolean) => (isVerified ? 'Так' : 'Ні'),
        },
        {
            title: '',
            key: 'actions',
            render: (_: any, record: User) => (
                <Button onClick={() => handleVerifyUser(record.id)}>Підтвердити</Button>
            ),
        },
    ];

    return <Table columns={columns} pagination={{ pageSize: 10 }} scroll={{ x: true }} dataSource={data} rowKey="id" />;
};
