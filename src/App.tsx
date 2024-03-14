import { Routes, Route } from 'react-router-dom';
import { Pages } from './components';
import { Home, About, Catalog, Guaratees, Delivery, Product, Categories, Contacts, Panel } from './pages';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Pages />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="guaratees" element={<Guaratees />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="categories" element={<Categories />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="panel" element={<Panel />} />
      </Routes>
  );
};

export default App;