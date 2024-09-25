import React from 'react';
import { useCreateProduct } from '../hooks/useCreateProduct';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const { createProduct, loading, error } = useCreateProduct();

  const handleCreateProduct = async (productData) => {
    try {
      await createProduct(productData);
      alert('Product created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default AddProduct;
