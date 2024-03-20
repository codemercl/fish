import { FC } from 'react';
import { Table, Collapse, Button, Modal, notification, Tag } from 'antd';
import { useQuery } from 'react-query';
import { DeleteOutlined } from "@ant-design/icons";
import { format } from 'date-fns';

interface Order {
    id: number;
    name: string;
    state: string;
    items: {
        product_id: number;
        title: string;
        quantity: number;
        size: string;
        price: number;
        price_sum: number;
        image: string;
    }[];
    first_name: string;
    last_name: string;
    phone: string;
    city: string;
    region: string;
    post_office: string;
    address: string;
    total_price: number;
    payment: string;
    created_date: string;
    modified_date: string;
    created_by: string;
    modified_by: string;
}

const { Panel } = Collapse;

const fetchOrders = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders', {
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

const formatDate = (date: string) => {
    return format(new Date(date), "dd MM yyyy - HH:mm");
  };

export const Orders: FC = () => {
    const { data, isLoading, refetch } = useQuery<Order[]>('orders', fetchOrders);

    const deleteOrder = async (orderId: number) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in local storage');
        }
        try {
            const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                notification.success({
                    message: "Успішно",
                    description: "Заявка видалена",
                });
                refetch();
            }

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
        } catch (error) {
            notification.error({
                message: "Помилка",
                description: "Заявка не видалена",
            });
            console.error("Ошибка при удалении продукта", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    const columns = [
        {
            title: '',
            key: 'action',
            render: (_: any, record: Order) => (
                <Collapse>
                    <Panel header="Покупки" key={record.id}>
                        <Table
                            scroll={{ x: true }} pagination={false}
                            columns={[
                                { title: 'Title', dataIndex: 'title', key: 'title' },
                                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                                { title: 'Size', dataIndex: 'size', key: 'size' },
                                { title: 'Price', dataIndex: 'price', key: 'price' },
                                {
                                    title: 'Image',
                                    dataIndex: 'image',
                                    key: 'image',
                                    render: (image: string) => <img src={image} alt="Product" style={{ maxWidth: '100px' }} />,
                                },
                            ]}
                            dataSource={record.items}
                        />
                    </Panel>
                </Collapse>
            ),
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: "Ім'я",
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Прізвище',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Стан',
            dataIndex: 'state',
            key: 'state',
            render: (role: string) => {
                let color: string;
                let text: string;

                switch (role) {
                    case 'PENDING':
                        color = 'blue';
                        text = 'В очікуванні';
                        break;
                    case 'COMPLETED':
                        color = 'green';
                        text = 'Виконано';
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
            title: 'Адреса',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Відділення',
            dataIndex: 'post_office',
            key: 'post_office',
        },
        {
            title: 'Дата створення',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (created_date: string) => <div style={{ width: 140 }}>{formatDate(created_date)}</div>,

        },
        {
            title: 'Повная ціна',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Тип оплати',
            dataIndex: 'payment',
            key: 'payment',
        },
        {
            title: 'Видалення',
            dataIndex: 'id',
            key: 'delete',
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        Modal.confirm({
                            title: "Видалення заявки",
                            content: `Ви впевнені, що бажаєте видалити заявку "${record.id}"?`,
                            onOk: () => deleteOrder(record.id),
                            okText: "Видалити",
                            cancelText: "Відміна"
                        });
                    }}
                >
                    Видалити
                </Button>
            ),
        },
    ];

    return <Table pagination={{ pageSize: 7 }} columns={columns} scroll={{ x: true }} dataSource={data} rowKey="id" />;
};