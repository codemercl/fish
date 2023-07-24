import * as React from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import AllProduct from "../../store/allProducts";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FeedIcon from "@mui/icons-material/Feed";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import allCategory from "../../store/allCategory";
import addProduct from "../../store/addProduct";
import addCategory from "../../store/addCategory";
import addCategoryInstance from "../../store/addCategory";
import { ThreeDots } from "react-loader-spinner";

const drawerWidth = 240;

interface ProductParameter {
  width: number;
  height: number;
  weight: number;
  length: number;
  size: string;
  color: string;
}

interface ProductCategory {
  id: number;
  name: string;
  parent: {
    id: number;
    name: string;
  };
}

interface Product {
  title: string;
  description: string;
  article: string;
  brand: string;
  marker: string;
  images_links: string[];
  parameters: ProductParameter;
  category: ProductCategory;
  in_stock: boolean;
  price_retail: number;
  price_bulk: number;
  discount: number;
}

export const Admin = observer(() => {
  const { data, fetchAllSpotsToday } = AllProduct;
  const { categories, fetchCategories } = allCategory;
  const { response } = addProduct;
  const { addedCategory, sendCreateCategory, isLoading } = addCategory;

  const [page, setPage] = React.useState<number>(1);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [article, setArticle] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [marker, setMarker] = React.useState("");
  const [imagesLinks, setImagesLinks] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [length, setLength] = React.useState("");
  const [size, setSize] = React.useState("");
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [priceRetail, setPriceRetail] = React.useState("");
  const [priceBulk, setPriceBulk] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [newSubcategory, setNewSubcategory] = React.useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAllSpotsToday();
  }, [response]);

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSub = (event: SelectChangeEvent) => {
    setSubcategory(event.target.value as string);
  };

  console.log(category);

  const handleSubmit = async () => {
    const productPayload: Product = {
      title: title,
      description: description,
      article: article,
      brand: brand,
      marker: marker,
      images_links: [imagesLinks],
      parameters: {
        width: parseFloat(width),
        height: parseFloat(height),
        weight: parseFloat(weight),
        length: parseFloat(length),
        size: size,
        color: color,
      },
      category: {
        id: typeof category === "number" ? category : parseInt(category),
        name: "Спининги",
        parent: {
          id:
            typeof subcategory === "number"
              ? subcategory
              : parseInt(subcategory),
          name: "Удочки",
        },
      },
      in_stock: true,
      price_retail: parseFloat(priceRetail),
      price_bulk: parseFloat(priceBulk),
      discount: parseFloat(discount),
    };

    await addProduct.sendCreate(productPayload);
    // Обработка успешного запроса и ошибки уже происходит в addProduct store
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: newSubcategory,
      parent: {
        name: category,
        image_link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjNeJHIY1RWOE5_xDehawyTaykkk6dN6f7Hg&usqp=CAU",
      },
    };

    addCategoryInstance.sendCreateCategory(newCategory);
  };

  const rows = data.map((item) => ({
    id: item.id,
    title: item.title,
    article: item.article,
    brand: item.brand,
    category: item.category?.name,
    subcategory: item.sub_category?.name,
    instock: item.in_stock,
    priceRetail: item.price_retail,
    priceBulk: item.price_bulk,
    discount: item.discount,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "article", headerName: "Article", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "category", headerName: "Category", width: 160 },
    { field: "subcategory", headerName: "Subcategory", width: 160 },
    { field: "instock", headerName: "In stock", width: 160 },
    { field: "priceRetail", headerName: "Price retail", width: 160 },
    { field: "priceBulk", headerName: "Price bulk", width: 160 },
    { field: "discount", headerName: "Discount", width: 160 },
  ];

  const rowss = categories.map((item) => ({
    id: item.category.id,
    name: item.category.name,
    image_link: item.category.image_link,
    parent: item.category.parent,
    sub_categoriesID: item.sub_categories.map((items) => items.id),
    sub_categories: item.sub_categories.map((items) => items.name),
  }));

  const columnss = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "image_link", headerName: "Image link", width: 450 },
    { field: "parent", headerName: "Parent", width: 250 },
    { field: "sub_categoriesID", headerName: "Sub cat ID", width: 160 },
    { field: "sub_categories", headerName: "Subcategory", width: 160 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Панель Адміністратора
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage(1)}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Товари"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setPage(2)}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={"Категорії"} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List>
          {["Вийти"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {page === 1 && (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="title"
                variant="filled"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="description"
                variant="filled"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="article"
                variant="filled"
                size="small"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="brand"
                variant="filled"
                size="small"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="marker"
                variant="filled"
                size="small"
                value={marker}
                onChange={(e) => setMarker(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="images_links"
                variant="filled"
                size="small"
                value={imagesLinks}
                onChange={(e) => setImagesLinks(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="price_retail"
                variant="filled"
                size="small"
                value={priceRetail}
                onChange={(e) => setPriceRetail(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="price_bulk"
                variant="filled"
                size="small"
                value={priceBulk}
                onChange={(e) => setPriceBulk(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="discount"
                variant="filled"
                size="small"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Вудилища</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleCategory}
                >
                  {categories.map((categoryData) => (
                    <MenuItem
                      key={categoryData.category.id}
                      value={categoryData.category.id}
                    >
                      {categoryData.category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Спінінги</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subcategory}
                  label="Subcategory"
                  onChange={handleSub}
                >
                  {categories.map((categoryData) =>
                    categoryData.sub_categories.map((subCategoryData) => (
                      <MenuItem
                        key={subCategoryData.id}
                        value={subCategoryData.id}
                      >
                        {subCategoryData.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <TextField
                id="filled-basic"
                label="width"
                variant="standard"
                size="small"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="height"
                variant="standard"
                size="small"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="weight"
                variant="standard"
                size="small"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="length"
                variant="standard"
                size="small"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="size"
                variant="standard"
                size="small"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="color"
                variant="standard"
                size="small"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Button variant="contained" size="large" onClick={handleSubmit}>
                Додати товар
              </Button>
            </Box>
            <DataGrid
              sx={{ marginTop: "30px" }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </>
        )}
        {page === 2 && (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="Name category"
                variant="filled"
                size="small"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Спінінги</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Subcategory"
                  onChange={handleCategory}
                >
                  {categories.map((categoryData) =>
                    categoryData.sub_categories.map((subCategoryData) => (
                      <MenuItem
                        key={subCategoryData.id}
                        value={subCategoryData.name}
                      >
                        {subCategoryData.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              {isLoading ? (
                <Button variant="contained" size="large">
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddCategory}
                >
                  Додати категорію
                </Button>
              )}
            </Box>
            <DataGrid
              sx={{ marginTop: "30px" }}
              rows={rowss}
              columns={columnss}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </>
        )}
      </Box>
    </Box>
  );
});
