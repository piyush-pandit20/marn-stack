import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom"; 
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cartItems } = useContext(AppContext);

  const toastId = `cart-${product?._id}`;
  const categoryName = product?.category ? product.category.toLowerCase() : "fruits";
  const detailPath = `/product/${categoryName}/${product?._id}`;
  const quantity = cartItems[product?._id] || 0;

  const imageFileName = product?.image?.[0] || product?.image || "";
  const imageUrl = imageFileName 
    ? `http://localhost:5000/images/${imageFileName}`
    : "https://via.placeholder.com/300x300?text=No+Image";

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product?._id);
    toast.dismiss(); 
    toast.success(`${product?.name} added`, { id: toastId, position: "top-center" });
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product?._id);
    toast.dismiss();
    toast.error(`${product?.name} removed`, { id: toastId, position: "top-center" });
  };

  if (!product) return null;

  return (
    <Link
      to={detailPath}
      className="group relative border border-gray-100 rounded-3xl p-4 bg-white min-w-[200px] max-w-[230px] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 block overflow-hidden"
    >
      {/* Product Image Section */}
      <div className="flex items-center justify-center h-44 w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white rounded-2xl relative">
        <img
          className="group-hover:scale-110 transition duration-700 object-contain h-full w-full p-4"
          src={imageUrl}
          alt={product?.name}
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=Not+Found"; }}
        />
      </div>

      <div className="mt-4 px-1">
        <p className="text-indigo-400 text-[10px] uppercase tracking-[0.2em] font-black">{product?.category || "Grocery"}</p>
        <h3 className="text-gray-900 font-bold text-base truncate capitalize mt-1">
          {product?.name}
        </h3>
        
        <div className="flex items-center justify-between mt-5">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900">${product?.offerPrice}</span>
            <span className="text-gray-400 text-[10px] line-through">${product?.price}</span>
          </div>
          
          {/* ✅ PREMIUM QUANTITY SELECTOR */}
          {!quantity ? (
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all font-bold text-sm active:scale-90"
            >
              + Add
            </button>
          ) : (
            <div className="flex items-center bg-gray-900 p-1 rounded-2xl shadow-inner">
              <button 
                onClick={handleRemoveFromCart}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="text-white font-bold text-sm px-3 min-w-[32px] text-center">
                {quantity}
              </span>
              
              <button 
                onClick={handleAddToCart}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-gray-900 shadow-sm hover:scale-105 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;