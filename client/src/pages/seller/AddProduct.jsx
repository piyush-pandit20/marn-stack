
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios"; // ✅ Sahi tarika: Axios ko direct import karein

const AddProduct = () => {
  // Context se products fetch karne wala function nikal sakte hain taaki add ke baad list update ho
  const { fetchProducts } = useContext(AppContext);

  // State variables
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const categories = [
    { path: 'Vegetables' },
    { path: 'Fruits' },
    { path: 'Drinks' },
    { path: 'Instant' },
    { path: 'Dairy' },
    { path: 'Bakery' },
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sabse pehle preventDefault karein
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("category", category);

      // Multiple images handle karne ke liye (Sahi logic)
      files.forEach((file) => {
        if (file) {
          formData.append("image", file); // Backend 'image' field expect kar raha hai
        }
      });

      // API Call
      const { data } = await axios.post("/api/product/add-product", formData);

      if (data.success) {
        toast.success(data.message);
        // Form clear karein
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setCategory("");
        setFiles([]);
        
        // Agar context mein fetchProducts hai toh list refresh karein
        if(fetchProducts) fetchProducts();
        
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      // Backend error message dikhane ke liye
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* Product Image Upload */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer border rounded"
                  src={files[index] ? URL.createObjectURL(files[index]) : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={category}
            required
          >
            <option value="">Select Category</option>
            {categories.map((categoryItem, index) => (
              <option key={index} value={categoryItem.path}>
                {categoryItem.path}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600 transition-colors">ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;
