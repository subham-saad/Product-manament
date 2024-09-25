import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useProductContext } from '../context/ProductContext';

const ProductUpdateForm = () => {
  const { updateProduct, loading: updateLoading, error: updateError } = useUpdateProduct();
  const { id } = useParams();
  const { productId } = useProductContext(); 

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: '',
    isRecommended: false,
    isBestseller: false,
  });
  const [error, setError] = useState(null);

  // Function to fetch product by ID
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/product/getproduct/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await fetchProductById(productId || id);

        setFormData({
          name: productDetails.name || '',
          description: productDetails.description || '',
          price: productDetails.price || '',
          status: productDetails.status || '',
          isRecommended: productDetails.isRecommended || false,
          isBestseller: productDetails.isBestseller || false,
        });
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProduct(productId || id, formData);
      console.log('Product updated successfully:', data);
    } catch (err) {
      console.error('Error updating product:', err); // Log error details for debugging
    }
  };
  

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Status</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Recommended</label>
        <input
          type="checkbox"
          name="isRecommended"
          checked={formData.isRecommended}
          onChange={handleChange}
          className="mr-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Best Seller</label>
        <input
          type="checkbox"
          name="isBestseller"
          checked={formData.isBestseller}
          onChange={handleChange}
          className="mr-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {updateLoading ? 'Updating...' : 'Update Product'}
      </button>
      {updateError && <p className="text-red-500 mt-4">Error: {updateError}</p>}
    </form>
  );
};

export default ProductUpdateForm;
