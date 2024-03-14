import React, { useEffect, useState } from "react";
import { Layout, Modal } from "antd";
import { ContentItems } from "./panel-content/ContentItems";
import { MenuComponent } from "./panel-menu/MenuComponent";
import styled from "./s.module.scss";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

interface PanelProps { }

export const Panel: React.FC<PanelProps> = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("1");
  const [tokenExists, setTokenExists] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setShowModal(true);
    } else {
      setTokenExists(true);
    }
  }, []);

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    setSelectedMenuItem(key.toString());
  };

  const contentToDisplay: React.ReactNode =
    ContentItems[selectedMenuItem as keyof typeof ContentItems] || ContentItems.default;

  return (
    <Layout className={styled.globalLayout}>
      <Sider width={300}>
        <div className={styled.sidebar}>
          <MenuComponent selectedMenuItem={selectedMenuItem} handleMenuClick={handleMenuClick} />
        </div>
      </Sider>
      <Layout className={styled.layout}>
        <Content className={styled.content}>
          {tokenExists ? contentToDisplay : null}
        </Content>
      </Layout>
      <Modal
        title="Будь ласка, перейдіть в обліковий запис"
        visible={showModal}
        footer={null}
      >
        <p>Токен авторизації згорів, перезайдіть в обліковий запис</p>
        <Link className={styled.exit} to="/">Вийти</Link>
      </Modal>
    </Layout>
  );
};