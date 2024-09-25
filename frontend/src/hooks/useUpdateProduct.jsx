import { useState } from 'react';
const apiurl = import.meta.env.VITE_APP_API_URL;
export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${apiurl}/updateproduct/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(productData), // Send the data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };
  
  return { updateProduct, loading, error };
};
 

