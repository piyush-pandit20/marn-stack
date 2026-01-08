import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; 
axios.defaults.withCredentials = true;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const isInitialMount = useRef(true); // 🚨 Fix: Initial empty cart sync rokne ke liye

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(!!data.success); 
    } catch (error) {
      console.log("Seller Auth Error:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Cart Sync Logic Fix
  useEffect(() => {
    const updateCartInDB = async () => {
      try {
        // Agar user login hai aur ye pehli baar load nahi ho raha, tabhi sync karo
        if (user && !isInitialMount.current) {
          const { data } = await axios.post("/api/cart/update", { cartItems });
          if (!data.success) {
            console.error(data.message);
          }
        }
        // Pehli baar load hone ke baad isse false kar do
        isInitialMount.current = false;
      } catch (error) {
        console.error("Cart update error:", error.message);
      }
    };

    updateCartInDB();
  }, [cartItems, user]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] = (updated[itemId] || 0) + 1;
      return updated;
    });
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] = quantity;
      return updated;
    });
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
    toast.success("Removed from cart");
  };

  const cartCount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);

  const totalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) total += cartItems[itemId] * (product.offerPrice || 0);
    }
    return total;
  };

  useEffect(() => {
    fetchProducts();
    fetchSeller();
  }, []);

  const value = {
    user, setUser,
    isSeller, setIsSeller,
    showUserLogin, setShowUserLogin,
    navigate,
    products, setProducts,
    cartItems, setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartCount,
    totalCartAmount,
    searchQuery, setSearchQuery,
    fetchProducts,
    axios,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
