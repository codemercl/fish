import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Button, Modal, Input, Select, notification } from "antd";
import { ProductTypes } from "../../../../components/Product/types";
import { useQuery } from "react-query";
import styled from "./s.module.scss"
const { Option } = Select;

interface EditProductModalProps {
  visible: boolean;
  onCancel: () => void;
  product: ProductTypes;
  id: number | null;
  refetch: any;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ visible, onCancel, product, id, refetch }) => {

  const getProduct = async (productId: number) => {
    const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json() as unknown as ProductTypes;
  };

  const { data: productSingle } = useQuery(['product', id], () => {
    if (id === null) {
      return null;
    } else {
      return getProduct(id);
    }
  });


  const [formData, setFormData] = useState(product);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleChange = (fieldName: string, nestedField?: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      if (nestedField) {
        return {
          ...prevFormData,
          parameters: {
            ...prevFormData.parameters,
            [nestedField]: value,
          },
        };
      }
      return {
        ...prevFormData,
        [fieldName]: value,
      };
    });
  };

  const handleSelectChange = (value: any, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
  };

  const handleSubCategoryChange = (value: any) => {
    setSelectedSubCategory(value);
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");

    const subCategoryParentObject = {
      id: categoryData.id,
      name: categoryData.name,
      image_link: categoryData.image_link,
      parent: null
    };

    try {
      const productData = {
        title: formData.title,
        article: formData.article,
        description: formData.description,
        brand: formData.brand,
        marker: formData.marker,
        in_archive: formData.in_archive,
        parameters: {
          width: formData.parameters.width,
          height: formData.parameters.height,
          weight: formData.parameters.weight,
          length: formData.parameters.length,
          size: formData.parameters.size,
          color: formData.parameters.color,
          material: formData.parameters.material,
          action: formData.parameters.action,
          diameter: formData.parameters.diameter,
          type: formData.parameters.type,
          made_by: formData.parameters.made_by,
          amount: formData.parameters.amount,
          volume: formData.parameters.volume,
          aroma: formData.parameters.aroma,
          number: formData.parameters.number,
          fastening_type: formData.parameters.fastening_type,
          form: formData.parameters.form,
          peculiarities: formData.parameters.peculiarities
        },
        price_uah: formData.price_uah,
        in_stock: formData.in_stock,
        price_usd: formData.price_usd,
        discount: formData.discount,
        markup: formData.markup,
        images_links: formData.images_links,
        category: {
          id: categoryData.id,
          name: categoryData.name,
          image_link: categoryData.image_link,
          parent: categoryData.parent
        },
        sub_category: {
          id: subCategoryData.id,
          name: subCategoryData.name,
          image_link: subCategoryData.image_link,
          parent: subCategoryParentObject
        }
      };

      const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        notification.success({
          message: "Успішно",
          description: "Товар змінено",
        });
        refetch();
        onCancel();
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Товар не змінено",
      });
      console.error("Ошибка при изменении товара", error);
    }
  };

  const { data: categories } = useQuery('categories', async () => {
    const response = await fetch('https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  });

  const categoryData = categories?.find((category: { category: { name: string; }; }) => category.category.name === selectedCategory)?.category || {};
  const subCategoryData = categories?.find((category: { category: { name: string; }; }) => category.category.name === selectedCategory)?.sub_categories.find((subCategory: { name: string; }) => subCategory.name === selectedSubCategory) || {};

  useEffect(() => {
    if (productSingle) {
      setFormData(productSingle);
    }
  }, [productSingle]);
  return (
    <Modal
      width={850}
      title="Змінити товар"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Назад
        </Button>,
        <Button key="save" onClick={handleSave}>
          Змінити
        </Button>,
      ]}
    >
      <div className={styled.grid}>
        <div>
          <label htmlFor="title">Назва</label>
          <Input name="title" value={formData.title} onChange={handleChange("title")} />
        </div>
        <div>
          <label htmlFor="article">Артикул</label>
          <Input name="article" value={formData?.article} onChange={handleChange("article")} />
        </div>
        <div>
          <label htmlFor="description">Опис</label>
          <Input name="description" value={formData?.description || ''} onChange={handleChange("description")} />
        </div>
        <div>
          <label htmlFor="brand">Бренд</label>
          <Input name="brand" value={formData?.brand} onChange={handleChange("brand")} />
        </div>
        <div>
          <label htmlFor="marker">Маркер</label>
          <Input name="marker" value={formData?.marker} onChange={handleChange("marker")} />
        </div>
        <div>
          <label htmlFor="in_archive">Стан товару</label>
          <Select className={styled.select} value={formData.in_archive ? "В архіві" : "Не в архіві"} onChange={(value) => handleSelectChange(value === "В архіві", "in_archive")}>
            <Option value="В архіві">В архіві</Option>
            <Option value="Не в архіві">Не в архіві</Option>
          </Select>
        </div>
        <div>
          <label htmlFor="in_stock">Наявність товару</label>
          <Select className={styled.select} value={formData.in_stock ? "В наявності" : "Не в наявности"} onChange={(value) => handleSelectChange(value === "В наявності", "in_stock")}>
            <Option value="В наявності">В наявності</Option>
            <Option value="Нема в наявности">Нема в наявности</Option>
          </Select>
        </div>
        <div>
          <label htmlFor="width">Ширина</label>
          <Input name="width" value={formData?.parameters?.width} onChange={handleChange("parameters", "width")} />
        </div>
        <div>
          <label htmlFor="height">Висота</label>
          <Input name="height" value={formData?.parameters?.height} onChange={handleChange("parameters", "height")} />
        </div>
        <div>
          <label htmlFor="weight">Вага</label>
          <Input name="weight" value={formData?.parameters?.weight} onChange={handleChange("parameters", "weight")} />
        </div>
        <div>
          <label htmlFor="length">Довжина</label>
          <Input name="length" value={formData?.parameters?.length} onChange={handleChange("parameters", "length")} />
        </div>
        <div>
          <label htmlFor="size">Розмір</label>
          <Input name="size" value={formData?.parameters?.size} onChange={handleChange("parameters", "size")} />
        </div>
        <div>
          <label htmlFor="color">Колір</label>
          <Input name="color" value={formData?.parameters?.color} onChange={handleChange("parameters", "color")} />
        </div>
        <div>
          <label htmlFor="material">Матеріал</label>
          <Input name="material" value={formData?.parameters?.material} onChange={handleChange("parameters", "material")} />
        </div>
        <div>
          <label htmlFor="action">Дія</label>
          <Input name="action" value={formData?.parameters?.action} onChange={handleChange("parameters", "action")} />
        </div>
        <div>
          <label htmlFor="diameter">Діаметр</label>
          <Input name="diameter" value={formData?.parameters?.diameter} onChange={handleChange("parameters", "diameter")} />
        </div>
        <div>
          <label htmlFor="type">Тип</label>
          <Input name="type" value={formData?.parameters?.type} onChange={handleChange("parameters", "type")} />
        </div>
        <div>
          <label htmlFor="made_by">Виробник</label>
          <Input name="made_by" value={formData?.parameters?.made_by} onChange={handleChange("parameters", "made_by")} />
        </div>
        <div>
          <label htmlFor="amount">Кількість</label>
          <Input name="amount" value={formData?.parameters?.amount} onChange={handleChange("parameters", "amount")} />
        </div>
        <div>
          <label htmlFor="volume">Об'єм</label>
          <Input name="volume" value={formData?.parameters?.volume} onChange={handleChange("parameters", "volume")} />
        </div>
        <div>
          <label htmlFor="aroma">Аромат</label>
          <Input name="aroma" value={formData?.parameters?.aroma} onChange={handleChange("parameters", "aroma")} />
        </div>
        <div>
          <label htmlFor="number">Номер</label>
          <Input name="number" value={formData?.parameters?.number} onChange={handleChange("parameters", "number")} />
        </div>
        <div>
          <label htmlFor="fastening_type">Тип кріплення</label>
          <Input name="fastening_type" value={formData?.parameters?.fastening_type} onChange={handleChange("parameters", "fastening_type")} />
        </div>
        <div>
          <label htmlFor="form">Форма</label>
          <Input name="form" value={formData?.parameters?.form} onChange={handleChange("parameters", "form")} />
        </div>
        <div>
          <label htmlFor="peculiarities">Особливості</label>
          <Input name="peculiarities" value={formData?.parameters?.peculiarities} onChange={handleChange("parameters", "peculiarities")} />
        </div>
        <div>
          <label htmlFor="price_uah">Ціна (UAH)</label>
          <Input name="price_uah" value={formData?.price_uah} onChange={handleChange("price_uah")} />
        </div>
        <div>
          <label htmlFor="price_usd">Ціна (USD)</label>
          <Input name="price_usd" value={formData?.price_usd} onChange={handleChange("price_usd")} />
        </div>
        <div>
          <label htmlFor="discount">Знижка</label>
          <Input name="discount" value={formData?.discount} onChange={handleChange("discount")} />
        </div>
        <div>
          <label htmlFor="markup">Націнка</label>
          <Input name="markup" value={formData?.markup} onChange={handleChange("markup")} />
        </div>
        <div>
          <label htmlFor="images_links">Посилання на зображення</label>
          <Input name="images_links" value={formData?.images_links?.join(', ')} onChange={handleChange("images_links")} />
        </div>
        <div>
          <label htmlFor="category">Категорія</label>
          <Select className={styled.select} value={selectedCategory || formData?.category?.name} onChange={handleCategoryChange}>
            {categories && categories?.map((category: { category: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) => (
              <Option key={category?.category?.id} value={category?.category?.name}>
                {category?.category?.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="sub_category">Підкатегорія</label>
          <Select className={styled.select} value={selectedSubCategory || productSingle?.sub_category?.name} onChange={handleSubCategoryChange} disabled={!selectedCategory}>
            {selectedCategory && categories && categories
              ?.find((category: { category: { name: string; }; }) => category?.category?.name === selectedCategory)
              ?.sub_categories?.map((subCategory: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                <Option key={subCategory?.id} value={subCategory?.name}>
                  {subCategory?.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <div className={styled.images}>
        {formData?.images_links?.map((el) => <img className={styled.img} src={el} />)}
      </div>
    </Modal>
  );
};