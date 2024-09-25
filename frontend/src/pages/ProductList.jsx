// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import imagecomingsoon from '../assets/imagescoming.png';
// import { useProductContext } from '../context/ProductContext';
// const apiurl = import.meta.env.VITE_APP_API_URL;

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Hook to navigate programmatically
//   const { setProductId } = useProductContext();
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);


//    const handleEdit = (product) => {
//     setProductId(product._id); // Set the product ID in the context
//     navigate(`/edit-product/${product._id}`);
//   };
  
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await fetch(`${apiurl}/products`);
        
//   //       if (!response.ok) {
//   //         throw new Error('Failed to fetch products');
//   //       }

//   //       const data = await response.json();
//   //       console.log('API Response:', data);

//   //       if (Array.isArray(data.data)) {
//   //         setProducts(data.data);
//   //       } else {
//   //         setError('Invalid data format');
//   //       }
//   //     } catch (err) {
//   //       console.error('Error fetching products:', err);
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`${apiurl}/products?page=${page}&limit=${limit}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data = await response.json();
//         console.log('API Response:', data);
  
//         if (Array.isArray(data.data)) {
//           setProducts(data.data);
//           setTotalPages(data.totalPages);
//         } else {
//           setError('Invalid data format');
//         }
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [page, limit]); // Re-run API call whenever `page` or `limit` changes

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };
  
//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };
  
  

//   if (loading) {
//     return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="min-h-screen bg-gray-100 p-6">Error: {error}</div>;
//   }

//   const handleAddProduct = () => {
//     navigate('/add-product'); // Navigate to the AddProduct page
//   };

//   const handleToggleSwitch = (id, field) => {
//     // Logic to update the recommended/bestseller status in your backend
//     console.log(`Toggling ${field} for product with id: ${id}`);
//     // Here you can call an API to update the specific product's field
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//     if (confirmDelete) {
//       try {
//         const response = await fetch(`${apiurl}/deleteproduct/${id}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete the product');
//         }

//         // Remove the deleted product from the state
//         setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
//         alert('Product deleted successfully');
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Failed to delete product');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex gap-4">
//         <h1 className="text-2xl font-bold p-2">Product List</h1>
//         <button
//           className="text-xl font-semibold border-2 p-2 rounded-2xl"
//           onClick={handleAddProduct}
//         >
//           Add Product
//         </button>
//       </div>
     
//       <div className="overflow-x-auto my-2">
//         <table className="table-auto w-full bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">Image</th>
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Selling Price</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Recommended</th>
//               <th className="px-4 py-2 text-left">Best Seller</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="border-t">
//                 {product.productImage ? <td className="px-4 py-2"><img src={product.productImage} alt='product image' width={30} height={30} className=' rounded-md'/></td>:<td><img src={imagecomingsoon} alt='product image' width={50} height={50} className='ml-3 rounded-md'/></td>}
//                 {/* <td className="px-4 py-2"><tooltip title={product.description}>{product.name}</tooltip></td> */}
//                 <td className="px-4 py-2 relative group">
//                 <span>{product.name}</span>
//                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-sm rounded px-2 py-1">
//                  {product.description}
//                 </div>
//               </td>

//                 <td className="px-4 py-2">${product.price.toFixed(2)}</td>
//                 <td className="px-4 py-2">{product.status}</td>
//                 <td className="px-4 py-2">
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       checked={product.isRecommended}
//                       onChange={() => handleToggleSwitch(product._id, 'isRecommended')}
//                     />
//                     <span className="slider round"></span>
//              </label>
//                 </td>
//                 <td className="px-4 py-2">
//                   <label className="switch">
//                     <input
//                       type="checkbox"
//                       checked={product.isBestseller}
//                       onChange={() => handleToggleSwitch(product._id, 'isBestseller')}
//                     />
//                     <span className="slider round"></span>
//                   </label>
//                 </td>
//                 <td className="gap-2 py-3 items-center flex">
//                   <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline text-center">Edit</button>
//                   <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline text-center ">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-between items-center mt-4">
//   <button
//     className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//     onClick={handlePreviousPage}
//     disabled={page === 1}
//   >
//     Previous
//   </button>
//   <span>
//     Page {page} of {totalPages}
//   </span>
//   <button
//     className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//     onClick={handleNextPage}
//     disabled={page === totalPages}
//   >
//     Next
//   </button>
// </div>

//       </div>
//     </div>
//   );
// };

// export default ProductList;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagecomingsoon from '../assets/imagescoming.png';
import { useProductContext } from '../context/ProductContext';
const apiurl = import.meta.env.VITE_APP_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Track search term
  const [page, setPage] = useState(1); // Pagination states
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { setProductId } = useProductContext();

  const handleEdit = (product) => {
    setProductId(product._id);
    navigate(`/edit-product/${product._id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${apiurl}/deleteproduct/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the product');
        }

        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiurl}/products?page=${page}&limit=${limit}&search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
      } else {
        setError('Invalid data format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]); // Re-run API call on page or search term change

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-auto sm:p-6 p-4">
      <div className="flex  sm:gap-4 gap-2 items-center mb-4">
        <h1 className="sm:text-2xl text-lg  font-bold">Product List</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 sm:w-48 w-24 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button
          className="text-blue-500 ml-2 p-2 border-2 rounded"
          onClick={() => setPage(1)}
        >
          Search
        </button> */}
        <button
          className=" font-semibold border-2 p-2 sm:text-lg text-xs rounded-2xl"
          onClick={() => navigate('/add-product')}
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto my-2">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Recommended</th>
              <th className="px-4 py-2 text-left">Best Seller</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">
                  <img src={product.productImage || imagecomingsoon} alt="product" width={50} height={50} className="rounded-md" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.status}</td>
                <td className="px-4 py-2">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={product.isRecommended}
                      onChange={() => handleToggleSwitch(product._id, 'isRecommended')}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="px-4 py-2">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={product.isBestseller}
                      onChange={() => handleToggleSwitch(product._id, 'isBestseller')}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className="gap-2 py-3 items-center flex">
                  <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
