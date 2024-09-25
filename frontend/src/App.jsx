import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import ProductUpdateForm from './pages/ProductUpdateForm';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path={`/edit-product/:id`} element={<ProductUpdateForm />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
