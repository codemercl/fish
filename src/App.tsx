import { Route, Routes } from 'react-router-dom';
import { Catalog, Category, Home, Product } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="catalog/:title" element={<Catalog />} />
      <Route path="catalog/:title/:source" element={<Catalog />} />
      <Route path="catalog/:title/:source/:product" element={<Product />} />
      <Route path="category" element={<Category />} />
    </Routes>
  );
}

export default App;
