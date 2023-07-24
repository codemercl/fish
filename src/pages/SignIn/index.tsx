import { useNavigate } from "react-router-dom";
import { Layout } from "../../components";
import styles from "./SignIn.module.css";
import { Button, Input, Space } from "antd";

export const SignIn = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.wrapper}>
      <Layout>
        <div className={styles.content}>
          <Space direction="vertical">
            <h1>Кабинет администратора</h1>
            <Input placeholder="Введите ваш @gmail" />
            <Input.Password placeholder="Введите ваш password" />
            <Button onClick={redirect} type="primary">
              Ввойти
            </Button>
          </Space>
        </div>
      </Layout>
    </div>
  );
};
