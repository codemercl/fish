import React from "react";
import { Menu } from "antd";
import {
  PlusOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  SettingOutlined
} from "@ant-design/icons";

interface MenuComponentProps {
  selectedMenuItem: string;
  handleMenuClick: (key: { key: string }) => void;
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ selectedMenuItem, handleMenuClick }) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      selectedKeys={[selectedMenuItem]}
      onClick={handleMenuClick}
      style={{ borderRight: 0, display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Menu.SubMenu key="sub1" icon={<PlusOutlined />} title="Товари">
        <Menu.Item key="1">Додати товар</Menu.Item>
        <Menu.Item key="2">Усі товари</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub2" icon={<AppstoreOutlined />} title="Категорії">
        <Menu.Item key="3">Додати категорію</Menu.Item>
        <Menu.Item key="4">Усі категорії</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub3" icon={<ProfileOutlined />} title="Заявки">
        <Menu.Item key="5">Додати заявку</Menu.Item>
        <Menu.Item key="6">Усі заявки</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="sub4" icon={<SettingOutlined />} title="Налаштування">
        <Menu.Item key="7">Опції магазину</Menu.Item>
        <Menu.Item key="8">Вийти</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};