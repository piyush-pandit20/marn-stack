
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

function ProductCategory() {
  const { products } = useContext(AppContext);
  const { category } = useParams();

  // Selected category data
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  // Filter products by category
  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="mt-16 px-6">

      {/* Category Title */}
      {searchCategory && (
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}

      {/* Product Grid */}
      {filterProducts.length > 0 ? (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filterProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-600">
            No products found
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;

