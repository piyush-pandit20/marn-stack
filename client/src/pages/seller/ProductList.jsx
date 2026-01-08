
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios"; // ✅ Axios import kiya

const ProductList = () => {
  // ✅ fetchProducts ko bhi Context se nikala taaki toggle ke baad list update ho sake
  const { products, fetchProducts } = useContext(AppContext);

  const toggleStock = async (id, inStock) => {
    try {
      // API call to update status
      const { data } = await axios.post("/api/product/stock", { id, inStock: !inStock });
      
      if (data.success) {
        fetchProducts(); // ✅ List refresh karne ke liye call kiya
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Selling Price</th>
                <th className="px-4 py-3 font-semibold text-center">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {products && products.map((product) => (
                <tr key={product._id} className="border-b border-gray-300 hover:bg-gray-50 last:border-none">
                  
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <div className="border border-gray-300 rounded overflow-hidden w-16 h-16 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={`http://localhost:5000/images/${product.image[0]}`} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {product.name} 
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    ₹{product.offerPrice}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={product.inStock} 
                          onChange={() => toggleStock(product._id, product.inStock)} 
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
                      </label>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;