import { useQuery } from 'react-query';
import { ProductsResponse } from "./types"
import styled from "./s.module.scss";
import { Product } from '../../components';
import { Menu, Button, Select, Skeleton, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const { SubMenu, Item: MenuItem } = Menu;
const { Option } = Select;

export const Market = () => {

    const [filters, setFilters] = useState<any>({
        marker: "",
        brand: "",
        category: "",
        sub_category: "",
        sort: ""
    });

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [resettingFilters, setResettingFilters] = useState(false);
    const { isLoading, isError, data, refetch } = useQuery<ProductsResponse>('products', () => fetchProducts(filters));
    const { data: selectedCategory } = useQuery<string | undefined>("selectedCategory");
    const { data: selectedSubCategory } = useQuery("selectedSubCategory");

    const fetchProducts = async (params: any) => {
        let headers = {};
    
        const token = sessionStorage.getItem("token");
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`
            };
        }
    
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/products?page=${currentPage}&size=9&${queryParams}`, {
            headers: headers 
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return response.json();
    };
    

    const fetchCategories = async () => {
        const response = await fetch(`https://optm-client-server-ba9b079f683d.herokuapp.com/v1/api/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return response.json();
    };

    const { data: categories } = useQuery('categories', fetchCategories);

    const filterSubCategories = (categories: any[], selectedCategory: string | undefined) => {
        if (!selectedCategory) return []; // Если selectedCategory не определено, вернем пустой массив
        const selectedCategoryObj = categories?.find(category => category.category.name === selectedCategory);
        return selectedCategoryObj ? selectedCategoryObj.sub_categories : [];
    };

    const subCategories = filterSubCategories(categories, selectedCategory); // Argument of type 'unknown' is not assignable to parameter of type 'string'.ts

    const handleFilterChange = (type: string, value: CheckboxValueType[]) => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            [type]: value.join(', ')
        }));
    };

    const handleSortChange = (value: string) => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            sort: value
        }));
    };

    const handleResetFilters = () => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            marker: "",
            brand: "",
            category: "",
            sub_category: "",
            sort: ""
        }));
        setResettingFilters(true);
    };

    useEffect(() => {
        if (resettingFilters) {
            const timer = setTimeout(() => {
                refetch();
                setResettingFilters(false);
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [resettingFilters]);

    useEffect(() => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            category: selectedCategory ? selectedCategory : ''
        }));

        const timer = setTimeout(() => {
            refetch();
        }, 200);

        return () => clearTimeout(timer);
    }, [selectedCategory]);

    useEffect(() => {
        setFilters((prevFilters: any) => ({
            ...prevFilters,
            sub_category: selectedSubCategory ? selectedSubCategory : ''
        }));

        const timer = setTimeout(() => {
            refetch();
        }, 200);

        return () => clearTimeout(timer);
    }, [selectedSubCategory]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page - 1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            refetch();
        }, 200);

        return () => clearTimeout(timer);
    }, [currentPage]);

    const handleRefetch = () => {
        refetch();
    };

    if (isLoading) {
        return (
            <div>
                <div className={styled.wrap}>
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styled.wrap}>
                <div className={styled.filters}>
                    <Select className={styled.select} defaultValue="priceUah,asc" onChange={handleSortChange}>
                        <Option value="priceUah,asc">Ціна: зростання</Option>
                        <Option value="priceUah,desc">Ціна: спадання</Option>
                    </Select>
                    <Menu>
                        <SubMenu key="marker" title={filters.marker ? `Маркери: ${filters.marker}` : 'Маркери'}>
                            <MenuItem key="Новинки" onClick={() => handleFilterChange('marker', ['Новинки'])}>Новинки</MenuItem>
                            <MenuItem key="Супер ціна" onClick={() => handleFilterChange('marker', ['Супер ціна'])}>Супер ціна</MenuItem>
                            <MenuItem key="Знижки" onClick={() => handleFilterChange('marker', ['Знижки'])}>Знижки</MenuItem>
                        </SubMenu>
                        <SubMenu key="brand" title={filters.brand ? `Brand: ${filters.brand}` : 'Бренди'}>
                            <MenuItem key="Optimist" onClick={() => handleFilterChange('brand', ['Optimist'])}>Optimist</MenuItem>
                            <MenuItem key="Carpe Diem" onClick={() => handleFilterChange('brand', ['Carpe Diem'])}>Carpe Diem</MenuItem>
                        </SubMenu>

                        {
                            selectedCategory && filters?.category &&
                            <SubMenu key="sub_category" title={`Підкатегорії: ${filters.sub_category}`}>
                                {subCategories.map((subCategory: any) => (
                                    <MenuItem key={subCategory.name} onClick={() => handleFilterChange('sub_category', [subCategory.name])}>{subCategory.name}</MenuItem>
                                ))}
                            </SubMenu>
                        }

                    </Menu>
                    <Button className={styled.button} onClick={handleRefetch}>Фильтрувати</Button>
                    <Button className={styled.button} onClick={handleResetFilters}>Скинути фільтри</Button>
                </div>

                {
                    !isError ?
                        <div className={styled.table}>
                            {data?.content.map(product => (
                                <Product data={product} key={product.id} />
                            ))}
                        </div>
                        :
                        ''
                }

            </div>
            <div className={styled.pagination}>
                <Pagination
                    current={currentPage + 1}
                    total={data?.totalElements || 0}
                    pageSize={9}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </>
    );
};
