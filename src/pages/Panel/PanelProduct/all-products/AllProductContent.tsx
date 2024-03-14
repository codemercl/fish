import { useState } from "react";
import { useQuery } from "react-query";
import { Table, Pagination, Input, Button, Modal, notification } from "antd";
import { productColumns } from "./columns";
import styled from "./s.module.scss";
import { EditProductModal } from "./EditProductModal";

const fetchProducts = async (page: number, pageSize: number) => {
  const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products?page=${page}&size=${pageSize}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchSearchResults = async (searchQuery: string) => {
  const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/search?request=${searchQuery}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const AllProductContent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowId, setRowId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery(["products", currentPage, pageSize], () => fetchProducts(currentPage, pageSize));

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handlePageSizeChange = (_: number, size: number) => {
    setPageSize(size);
  };

  const handleSearch = async () => {
    try {
      const searchData = await fetchSearchResults(searchQuery);
      Modal.info({
        title: "Результаты поиска",
        content: (
          <Table dataSource={searchData} columns={productColumns(deleteProduct, editProduct)} pagination={false} scroll={{ x: true }} />
        ),
        width: 900,
        onOk: () => { },
      });
    } catch (error) {
      console.error("Ошибка при выполнении поиска", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;


  const deleteProduct = async (productId: number) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        notification.success({
          message: "Успішно",
          description: "Товар видалено",
        });
        refetch();
      }
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      notification.error({
        message: "Помилка",
        description: "Товар не видалено",
      });
      console.error("Ошибка при удалении продукта", error);
    }
  };

  const editProduct = (id: number) => {
    const selected = data.content.find((product: any) => product.id === id);
    setSelectedProduct(selected);
    setRowId(id)
    setIsModalVisible(true);
  };

  return (
    <>
      <div className={styled.search}>
        <Input
          placeholder="Шукати товар у сховищі ..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Шукати</Button>
      </div>
      <Table dataSource={data.content} columns={productColumns(deleteProduct, editProduct)} scroll={{ x: true }} pagination={false} />
      <EditProductModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        product={selectedProduct || {}}
        id={rowId}
        refetch={refetch}
      />
      <Pagination
        className={styled.pagination}
        current={currentPage + 1}
        pageSize={pageSize}
        total={data.totalElements}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        showSizeChanger={false}
        showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} товарів`}
      />
    </>
  );
};