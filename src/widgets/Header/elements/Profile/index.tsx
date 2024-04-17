import { useEffect, useState } from "react";
import { Modal, Input, Button, Form, notification, Space, Select } from "antd";
import { useMutation } from "react-query";
import { MdPersonalInjury } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "./s.module.scss";
import { InfoCircleOutlined } from "@ant-design/icons";
import InputMask from "react-input-mask";
import { RiLogoutBoxRFill } from "react-icons/ri";

const { Option } = Select;

export const Profile = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [signInForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const signInMutation = useMutation<any, Error, FormData>(async (formData) => {
    const clientId = "optimist-app";
    const clientSecret = "optimist-client-secret";
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    try {
      const response = await fetch(
        "https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/authenticate/sign-in",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();

      // Сохраняем access_token в сессионное хранилище под именем "token"
      sessionStorage.setItem("token", responseData.access_token);

      setSignInVisible(false);
      const userRole = responseData.user.role;
      if (userRole !== "ROLE_ADMIN") {
        notification.success({
          message: "Успішно",
          description: "Ви успішно увійшли в систему, будь ласка, перенаправляємо вас на сторінку каталогу",
        });
        setSignInVisible(false);
        navigate('/catalog');
      } else {
        sessionStorage.setItem("token", responseData.access_token);

        notification.success({
          message: "Успішно",
          description: "Ви успішно увійшли в систему",
        });
        setSignInVisible(false);
        navigate('/panel');
      }
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Перевірте ваш Email чи пароль",
      });
    }
  });

  const registerMutation = useMutation<any, Error, FormData>(async (values) => {
    // Логика регистрации...
    try {
      const response = await fetch(
        "https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/authenticate/sign-up",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      notification.success({
        message: "Успішно",
        description: "Ви успішно зареєструвалися",
      });
      setRegisterVisible(false);
      setSignInVisible(true); // Открываем модальное окно для входа после успешной регистрации
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Сталася помилка під час реєстрації",
      });
    }
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      const formData = new FormData();
      formData.append("user_name", values.email);
      formData.append("password", values.password);
      formData.append("grant_type", "password");

      signInMutation.mutate(formData); // Вызываем мутацию для входа с передачей данных формы
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const handleRegister = async (values: any) => {
    // Логика регистрации...
    console.log(values, 'values')
    try {
      registerMutation.mutate(values); // Вызываем мутацию для регистрации с передачей данных формы
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  const [token, setToken] = useState<string | null>(null);

  const deleteToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log('delete')
  }, [deleteToken, token]);
  
  const functIcons = (token: any) => {
    if (token) {
      return (
        <RiLogoutBoxRFill
          fill="rgb(116, 125, 142)"
          size={20}
          onClick={deleteToken}
          className={styled.profile}
        />
      );
    } else {
      return (
        <MdPersonalInjury
          fill="rgb(116, 125, 142)"
          size={20}
          onClick={() => setSignInVisible(true)}
          className={styled.profile}
        />
      );
    }
  };
  return (
    <>
      {functIcons(token)}
      <Modal
        title="Увійти"
        visible={signInVisible}
        onCancel={() => setSignInVisible(false)}
        footer={null}
        width={450}
      >
        <Form
          form={signInForm}
          onFinish={handleSignIn}
          initialValues={{ email: "", password: "" }}
          className={styled.form}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Імайл"
            tooltip={{ title: "Введіть свій email, отриманий при рееєстрації", icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: "Будь ласка, введіть iмайл" }]}
          >
            <Input className={styled.textfield} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Будь ласка, введіть пароль" }]}
          >
            <Input.Password className={styled.textfield} placeholder="Пароль" />
          </Form.Item>
          <Form.Item className={styled.buttonForm}>
            <Space>
              <Button type="link" onClick={() => setRegisterVisible(true)}>
                Реєстрація профілю
              </Button>
              <Button
                htmlType="submit"
                loading={signInMutation.isLoading}
                className={styled.button}
              >
                Увійти
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Реєстрація"
        visible={registerVisible}
        onCancel={() => setRegisterVisible(false)}
        footer={null}
        width={450}
      >
        <Form
          form={registerForm}
          onFinish={handleRegister}
          initialValues={{
            email: "",
            password: "",
            repeated_password: "",
            role: "ROLE_USER",
            first_name: "",
            last_name: "",
            phone: "",
            city: "",
            region: "",
            post_office: "",
            address: ""
          }}
          className={styled.form}
          layout="vertical"
        >
          <Form.Item
            name="role"
            label="Тип аккаунту"
            rules={[{ required: true, message: "Будь ласка, виберіть роль" }]}
          >
            <Select>
              <Option value="ROLE_USER">Роздріб</Option>
              <Option value="ROLE_USER_PLUS">Гурт</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Імайл"
            rules={[{ required: true, message: "Будь ласка, введіть iмайл" }]}
          >
            <Input className={styled.textfield} placeholder="Email" />
          </Form.Item>
          {/* <Form.Item
            name="phone"
            label="Телефон"
            rules={[{ required: true, message: "Будь ласка, введіть телефон" }]}
          >
            <Input className={styled.textfield} placeholder="Телефон" />
          </Form.Item> */}
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
          <div className={styled.grid}>
            <Form.Item
              name="first_name"
              label="Ім'я"
              rules={[{ required: true, message: "Будь ласка, введіть Ім'я" }]}
            >
              <Input className={styled.textfield} placeholder="Ім'я" />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Прізвище"
              rules={[{ required: true, message: "Будь ласка, введіть Прізвище" }]}
            >
              <Input className={styled.textfield} placeholder="Прізвище" />
            </Form.Item>
            <Form.Item
              name="city"
              label="Місто"
              rules={[{ required: true, message: "Будь ласка, введіть Місто" }]}
            >
              <Input className={styled.textfield} placeholder="Місто" />
            </Form.Item>
            <Form.Item
              name="region"
              label="Область"
              rules={[{ required: true, message: "Будь ласка, введіть Область" }]}
            >
              <Input className={styled.textfield} placeholder="Область" />
            </Form.Item>
            <Form.Item
              name="post_office"
              label="Відділення (НП)"
              rules={[{ required: true, message: "Будь ласка, введіть відділення" }]}
            >
              <Input className={styled.textfield} placeholder="Відділення" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Адреса"
              rules={[{ required: true, message: "Будь ласка, введіть Адресу" }]}
            >
              <Input className={styled.textfield} placeholder="Адреса" />
            </Form.Item>
          </div>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Будь ласка, введіть пароль" }]}
          >
            <Input.Password className={styled.textfield} placeholder="Пароль" />
          </Form.Item>
          <Form.Item
            name="repeated_password"
            label="Повторіть пароль"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Будь ласка, повторіть пароль" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Паролі не співпадають"));
                },
              }),
            ]}
          >
            <Input.Password className={styled.textfield} placeholder="Повторіть пароль" />
          </Form.Item>
          <Form.Item className={styled.buttonForm}>
            <Space>
              <Button type="link" onClick={() => setRegisterVisible(false)}>
                Повернутись до входу
              </Button>
              <Button
                htmlType="submit"
                loading={registerMutation.isLoading}
                className={styled.button}
              >
                Зареєструватися
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
