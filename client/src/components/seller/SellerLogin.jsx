import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {toast} from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault(); // prevent default form submit
    try {
      // 🔴 Axios POST call
      const { data } = await axios.post("/api/seller/login", { email, password });

      if (data.success) {
        setIsSeller(true);
        navigate("/seller"); // redirect to seller dashboard
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // better error handling
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    !isSeller && (
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <form
          onSubmit={submitHandler}
          className="sm:w-[350px] w-full border text-center border-gray-300/60 rounded-2xl px-8 py-8 bg-white"
        >
          <h1 className="text-gray-900 text-3xl font-medium">Seller Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 p-3 border rounded-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 p-3 border rounded-full"
          />

          <button
            type="submit"
            className="w-full mt-4 h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
