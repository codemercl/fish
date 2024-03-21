import { Button, Modal, Tag } from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const formatDate = (date: string) => {
  return format(new Date(date), "dd MM yyyy - HH:mm");
};

export const productColumns = (deleteProduct: (id: number) => void, editProduct: (id: number) => void) => [

  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Картинка",
    dataIndex: "images_links",
    key: "images_links",
    render: (images_links: string[]) => (
      <img src={images_links[0]} alt="product" style={{ maxWidth: "50px", maxHeight: "50px" }} />
    ),
  },
  {
    title: "Назва",
    dataIndex: "title",
    key: "title",
    render: (text: any) => <div style={{ width: 310 }}>{text}</div>
  },
  {
    title: "Артікль",
    dataIndex: "article",
    key: "article",
  },
  {
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Наявність",
    dataIndex: "in_stock",
    key: "in_stock",
    render: (in_stock: boolean) => (
      <Tag color={in_stock ? "green" : "red"}>{in_stock ? "В наявності" : "Немає в наявності"}</Tag>
    ),
  },
  {
    title: "Ціна",
    dataIndex: "price_uah",
    key: "price_uah",
  },
  {
    title: "Дата створення",
    dataIndex: "created_date",
    key: "created_date",
    render: (created_date: string) => <div style={{ width: 140 }}>{formatDate(created_date)}</div>,
  },
  {
    title: "Дата модифікації",
    dataIndex: "modified_date",
    key: "modified_date",
    render: (modified_date: string) => <div style={{ width: 140 }}>{formatDate(modified_date)}</div>,
  },
  {
    title: "Розмір",
    dataIndex: ["parameters", "size"],
    key: "size",
  },
  {
    title: "Цвет",
    dataIndex: ["parameters", "color"],
    key: "color",
  },
  {
    title: "Ширина",
    dataIndex: ["parameters", "width"],
    key: "width",
  },
  {
    title: "Вага",
    dataIndex: ["parameters", "weight"],
    key: "weight",
  },
  {
    title: "Висота",
    dataIndex: ["parameters", "height"],
    key: "height",
  },
  {
    title: "Довжина",
    dataIndex: ["parameters", "length"],
    key: "length",
  },
  {
    title: "Действия",
    key: "actions",
    render: (_: any, record: any) => (
      <div style={{display: 'flex', gap: "10px"}}>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Видалення товару",
              content: `Ви впевнені, що бажаєте видалити товар "${record.title}"?`,
              onOk: () => deleteProduct(record.id),
              okText: "Видалити",
              cancelText: "Відміна"
            });
          }}
        >
          Видалити
        </Button>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => editProduct(record.id)}
        >
          Змінити
        </Button>
      </div>
    )
  }
];
