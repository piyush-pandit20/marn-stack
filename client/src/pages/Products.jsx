import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from "../components/ProductCard"

function Products() { // Component names should start with a capital letter
  const { products, searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]); // Corrected state variable name to match usage

  useEffect(() => {
    let newFilteredProducts = products;

    // 1. Check if a search query exists
    if (searchQuery && searchQuery.length > 0) {
      newFilteredProducts = products.filter((product) =>
        // 2. Corrected filtering logic: product.name should include the search query
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 3. Update the state with the filtered list
    setFilteredProducts(newFilteredProducts);

  // 4. Corrected dependency array: products and searchQuery are the dependencies
  }, [products, searchQuery]); 
  
  return (
    <div className='mt-16'>
      <h1 className='text-3xl lg:text-4xl font-medium'>All Products</h1>
      <div className='my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
        {
          filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        }
      </div>
    </div>
  )
}

export default Products // Ensure export name matches component name