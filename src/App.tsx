import { Route, Routes } from 'react-router-dom';
import { Admin, Catalog, Category, Home, Product, SignIn } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="catalog/:title" element={<Catalog />} />
      <Route path="catalog/:title/:source" element={<Catalog />} />
      <Route path="catalog/:title/:source/:product" element={<Product />} />
      <Route path="category" element={<Category />} />

      <Route path="sign-in" element={<SignIn />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
