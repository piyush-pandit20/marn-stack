import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductsDetails = () => {
  const { products, addToCart, navigate } = useContext(AppContext);
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState("");

  // Product dhundte waqt protection
  const product = products?.find((p) => p._id === id);

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product, id]);

  if (!product) return <div className="mt-32 text-center text-xl font-medium">Product Not Found...</div>;

  return (
    <div className="mt-10 px-4 md:px-10 lg:px-20 min-h-screen">
      {/* BREADCRUMBS */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-indigo-500">Home</Link> / 
        <Link to="/products" className="mx-1 hover:text-indigo-500">Products</Link> / 
        <span className="mx-1 capitalize">{product.category || "General"}</span> / 
        <span className="text-indigo-500 ml-1 font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* LEFT: IMAGES */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex md:flex-col gap-3 order-2 md:order-1">
            {product.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className={`w-20 h-20 border-2 rounded-lg cursor-pointer overflow-hidden bg-gray-50 ${thumbnail === img ? 'border-indigo-500 shadow-md' : 'border-gray-200'}`}
              >
                <img src={`http://localhost:5000/images/${img}`} className="w-full h-full object-contain p-1" alt="thumb" />
              </div>
            ))}
          </div>

          <div className="border border-gray-100 rounded-xl overflow-hidden w-full md:w-[450px] bg-white shadow-sm order-1 md:order-2">
            <img 
              src={`http://localhost:5000/images/${thumbnail}`} 
              className="w-full h-auto min-h-[350px] object-contain p-4 transition-all duration-300" 
              alt={product.name}
            />
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-semibold text-gray-800 capitalize">{product.name}</h1>
          <p className="text-gray-400 mt-2 font-medium">({product.rating || 4})</p>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-gray-400 line-through text-lg">MRP: ${product.price}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">MRP: ${product.offerPrice}</p>
            <p className="text-gray-400 text-xs mt-1">(inclusive of all taxes)</p>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 inline-block">About Product</h3>
            <ul className="list-disc ml-5 mt-4 text-gray-600 space-y-2 text-base">
              {Array.isArray(product.description) ? 
                product.description.map((d, i) => <li key={i}>{d}</li>) : 
                <li>{product.description || "Fresh high-quality stock available."}</li>}
            </ul>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button 
              onClick={() => { addToCart(product._id); toast.success("Added to cart"); }}
              className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-md transition text-lg active:scale-95"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => { addToCart(product._id); navigate('/cart'); }}
              className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-md transition text-lg shadow-lg shadow-indigo-100 active:scale-95"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;