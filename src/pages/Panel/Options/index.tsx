import { SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import { Spin, Result, Table, Input, Button, message } from 'antd';
import styled from "./s.module.scss";

export const Options = () => {
  const [usdValue, setUsdValue] = useState('');
  const { isLoading, isError, data, refetch } = useQuery('settings', fetchSettings);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsdValue(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: null, usd: parseFloat(usdValue) }),
      });

      if (!response.ok) {
        throw new Error('Не вдалося оновити курс');
      }

      message.success('Курс успішно оновлено!');
      refetch();
    } catch (error) {
      message.error('Неможливо оновити курс!');
    }
  };

  async function fetchSettings() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/settings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Не вдалося отримати налаштування');
    }

    const data = await response.json();
    return data;
  }

  const columns = [
    { title: 'USD', dataIndex: 'usd', key: 'usd' },
    { title: 'Створено', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Оновлено', dataIndex: 'updatedAt', key: 'updatedAt' },
    { title: 'Створено користувачем', dataIndex: 'createdBy', key: 'createdBy' },
    { title: 'Оновлено користувачем', dataIndex: 'lastModifiedBy', key: 'lastModifiedBy' }
  ];

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <Result status="error" title="Не вдалося отримати налаштування" subTitle={'Неможливо вивести курс'} />;
  }

  return (
    <div>
      <div className={styled.wrapper}>
        <Input value={usdValue} onChange={handleInputChange} placeholder="Введіть курс у $" />
        <Button type="primary" onClick={handleButtonClick} style={{ marginLeft: '8px' }}>
          Оновити курс
        </Button>
      </div>
      <Table dataSource={[data]} columns={columns} pagination={false} />
    </div>
  );
};