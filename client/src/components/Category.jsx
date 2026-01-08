
import React, { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Category() {
  const { navigate } = useContext(AppContext);

  const handleClick = (category) => {
    if (!category.path) {
      console.error("CATEGORY OBJECT ME 'path' MISSING HAI:", category);
      return;
    }
    navigate(`/products/${category.path.toLowerCase()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Categories</p>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 items-center justify-center">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(cat)}
            className="group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center"
            style={{ backgroundColor: cat.bgColor }}
          >
            <img
              src={cat.image}
              alt={cat.text}
              className="max-w-28 transition-transform group-hover:scale-110"
            />
            <p className="text-sm font-medium">{cat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
