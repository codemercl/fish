import { FC } from "react";
import { Container } from "../../components";
import styled from "./s.module.scss";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { Button, Form, Input, notification } from "antd";
import { useMutation } from "react-query";

export const Contacts: FC = () => {

  const mutation = useMutation(async (data: any) => {
    try {
      const response = await fetch(
        "https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/users/feedback",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      notification.success({
        message: "Успішно",
        description: "Питання успішно відправлено",
      });
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Сталася помилка під час відправки питання",
      });
    }
  });

  const handleSubmit = (values: any) => {
    const { text, phone, name } = values;

    mutation.mutate({ text, phone, name });
  };

  return (
    <div className={styled.wrap}>
      <Container>
        <h1>КОНТАКТИ</h1>
        <p>Ми завжди готові надати вам кваліфіковану пораду чи допомогти з вибором того, що Вам необхідно серед різноманітного асортименту нашого магазину.</p>

        <div className={styled.column}>
          <div className={styled.blockWrapper}>
            <div className={styled.block}>
              <FaPhoneFlip />
              <div className={styled.blockContet}>
                <h3>Телефони:</h3>
                <p><a href="+38 (063) 667 60 97">+38 (063) 667 60 97</a></p>
              </div>
            </div>

            <div className={styled.block}>
              <MdEmail />
              <div className={styled.blockContet}>
                <h3>Написати:</h3>
                <p>Повідомлення на e-mail! <a href="Optimisthook@gmail.com">Optimisthook@gmail.com</a></p>
              </div>
            </div>

            <div className={styled.block}>
              <MdDateRange />
              <div className={styled.blockContet}>
                <h3>Графік роботи:</h3>
                <p>Пн. — Пт.: с 9:00 до 18:00</p>
                <p>Сб.: с 9:00 до 17:00</p>
              </div>
            </div>

          </div>

          <div className={styled.contactForm}>
            <Form layout="vertical" style={{ maxWidth: 400 }} onFinish={handleSubmit}>
              <Form.Item
                name="phone"
                label="Телефон"
                rules={[{ required: true, message: "Будь ласка, введіть телефон" }]}
              >
                <Input className={styled.textfield} placeholder="Телефон" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Ім'я"
                rules={[{ required: true, message: "Будь ласка, введіть ім'я" }]}
              >
                <Input className={styled.textfield} placeholder="Ім'я" />
              </Form.Item>
              <Form.Item
                name="text"
                label="Текст"
                rules={[{ required: true, message: "Будь ласка, введіть текст" }]}
              >
                <Input.TextArea className={styled.textfield} placeholder="Текст" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={mutation.isLoading}>
                  Надіслати питання
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

      </Container>
    </div>
  );
};
