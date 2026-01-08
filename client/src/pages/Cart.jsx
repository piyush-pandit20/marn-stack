import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function Cart() {
  const {
    products,
    navigate,
    cartCount,
    cartItems,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setcartItems
  } = useContext(AppContext);

  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ✅ ADDRESS STATES
  const [address, setAddress] = useState([]); 
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getCart = () => {
    console.log("1. Mapping Cart Items:", cartItems);
    const tempArray = Object.keys(cartItems)
      .map((key) => {
        const product = products.find((p) => String(p._id) === String(key));
        if (product) return { ...product, quantity: cartItems[key] };
        return null;
      })
      .filter((p) => p !== null);

    console.log("2. Final Cart Array:", tempArray);
    setCartArray(tempArray);
  };

  const getAddress = async () => {
    try {
      console.log("3. Fetching Address from API...");
      const response = await axios.get("/api/address/get");
      const data = response.data; 
      console.log("4. API Response Data:", data);

      if (data.success) {
        setAddress(data.addresses);
        console.log("5. Addresses set in state:", data.addresses);
        if (data.addresses && data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        console.warn("6. API Success False:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("7. Address API Error:", error.response || error.message);
    }
  };

  useEffect(() => {
    console.log("Effect 1: User status changed:", user);
    if (user) {
      getAddress();
    }
  }, [user]);

  useEffect(() => {
    console.log("Effect 2: Products or CartItems changed");
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    // place order with cod

    if (paymentOption === "COD") {
      const { data } = await axios.post("/api/order/cod", {
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address:selectedAddress._id,
      });
      if(data.success){
        toast.success(data.message);
        setcartItems({});
        navigate("/my-orders")
      }else{
        toast.error(error.message)
      }
    }
  } catch (error) {
    // Error handling logic usually goes here
    console.error(error);
  }
};

  const totalAmount = cartArray.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );

  // Debugging UI conditions
  console.log("UI Check - Products Length:", products.length, "CartItems:", !!cartItems);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">

      {/* LEFT PART */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{cartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3 border-b pb-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={`http://localhost:5000/images/${product.image[0]}`}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold text-black">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: <span>{product.weight || "N/A"}</span></p>
                  <div className="flex items-center gap-2 mt-1">
                    <p>Qty:</p>
                    <select
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      value={product.quantity}
                      className="outline-none border px-2 py-1 rounded"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">${product.offerPrice * product.quantity}</p>

            <button className="cursor-pointer mx-auto" onClick={() => removeFromCart(product._id)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => { navigate("/products"); scrollTo(0, 0); }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
        >
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* RIGHT PART */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 md:ml-10">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            
            <div className="text-sm text-gray-600">
              {selectedAddress ? (
                <div>
                  <p className="font-bold text-black uppercase">{selectedAddress.firstName} {selectedAddress.lastName}</p>
                  <p>{selectedAddress.street}, {selectedAddress.city}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No address found</p>
              )}
            </div>

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 hover:underline cursor-pointer text-sm font-medium"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10 shadow-lg rounded">
                {address.length > 0 ? address.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => { setSelectedAddress(item); setShowAddress(false); }}
                    className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                  >
                    {item.street}, {item.city}
                  </p>
                )) : <p className="p-2 text-gray-400">No saved addresses</p>}

                <p
                  onClick={() => { setShowAddress(false); navigate("/add-address"); }}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10 font-bold border-t"
                >
                  + Add New Address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between"><span>Price</span><span>${totalAmount}</span></p>
          <p className="flex justify-between"><span>Shipping Fee</span><span className="text-green-600">Free</span></p>
          <p className="flex justify-between text-lg font-medium mt-3 text-black border-t pt-2">
            <span>Total Amount:</span>
            <span>${(totalAmount * 1.02).toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition rounded"
        >
          {paymentOption === "COD" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-96 text-xl font-medium">Loading Cart Data...</div>
  );
}

export default Cart;
