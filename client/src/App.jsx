
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

import Home from "./pages/Home";
import Products from "./pages/products";
import ProductsDetails from "./pages/ProductsDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import Auth from "./models/Auth"; 
import ProductCategory from "./pages/ProductCategory";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import AddAddress from "./pages/AddAddress";

// Seller pages
import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from "./components/seller/SellerLogin";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

function App() {
  const { showUserLogin, isSeller } = useContext(AppContext);
  const location = useLocation();

  const isSellerPath = location.pathname.startsWith("/seller");

  return (
    <div className="text-default min-h-screen flex flex-col"> 
      <Toaster position="top-center" />

      {/* Auth Modal */}
      {showUserLogin && <Auth />}

      {/* 1. Navbar केवल तभी दिखाओ जब seller path नहीं हो */}
      {!isSellerPath && <Navbar />}

      {/* 2. Content Area - Seller routes के लिए full-width हो सकता है, 
            Customer routes के लिए padding (px-...) लागू करें */}
      <div className={`${!isSellerPath ? "px-6 md:px-16 lg:px-24 xl:px-32 flex-grow" : "flex-grow"}`}>
        <Routes>
          {/* Public Routes (Customer Side) */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductsDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* ✅ My Orders: Navbar में आपने '/myorders' इस्तेमाल किया है, इसलिए इसे मैच करें */}
          <Route path="/myorders" element={<MyOrders />} /> 
          
          <Route path="/add-address" element={<AddAddress />} />

          {/* Seller Routes (Nested) */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            {/* Index Route */}
            <Route index element={isSeller ? <AddProduct /> : <SellerLogin />} />
            <Route path="product-list" element={isSeller ? <ProductList /> : <SellerLogin />} />
            <Route path="orders" element={isSeller ? <Orders /> : <SellerLogin />} />
          </Route>
        </Routes>
      </div>

      {/* 3. Footer केवल non-seller path पर दिखाओ */}
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;