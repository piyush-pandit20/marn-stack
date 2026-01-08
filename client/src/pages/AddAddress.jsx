            import React, { useContext, useEffect, useState } from "react";
            import * as assets from "../assets/assets"; 
            import { AppContext } from "../context/AppContext"; 
            import toast from "react-hot-toast"; // Aapke project mein yahi use ho raha hai

            const AddAddress = () => {
              const [address, setAddress] = useState({
                firstName: "",
                lastName: "",
                email: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                phone: "",
              });

              const { axios, navigate, user } = useContext(AppContext);

              const handleChange = (e) => {
                setAddress({ ...address, [e.target.name]: e.target.value });
              };

              const submitHandler = async (e) => {
                e.preventDefault();
                try {
                  // Data spread karke bhejein taaki backend read kar sake
                  const { data } = await axios.post("/api/address/add", { ...address });

                  if (data.success) {
                    toast.success(data.message);
                    navigate("/cart");
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  toast.error(error.response?.data?.message || error.message);
                }
              };

              useEffect(() => {
                // Agar user logged in nahi hai to hi redirect karein
                // user === null check zaroori hai taaki initial load pe redirect na ho
                if (user === null) {
                  // navigate("/cart"); // Testing ke liye ise comment karke check karein
                }
              }, [user, navigate]);

              return (
                <div className="mt-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 mb-10">
                  
                  {/* LEFT FORM CARD */}
                  <div className="flex-1 bg-white p-8 rounded-lg shadow-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                      Address Details
                    </h2>

                    <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">First Name</label>
                        <input type="text" name="firstName" value={address.firstName} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Last Name</label>
                        <input type="text" name="lastName" value={address.lastName} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-gray-600 font-medium mb-1">Email</label>
                        <input type="email" name="email" value={address.email} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-gray-600 font-medium mb-1">Street</label>
                        <input type="text" name="street" value={address.street} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1">City</label>
                        <input type="text" name="city" value={address.city} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1">State</label>
                        <input type="text" name="state" value={address.state} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Zip Code</label>
                        <input type="text" name="zipCode" value={address.zipCode} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Country</label>
                        <input type="text" name="country" value={address.country} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-gray-600 font-medium mb-1">Phone</label>
                        <input type="text" name="phone" value={address.phone} onChange={handleChange} className="w-full p-2.5 border rounded focus:border-indigo-500 outline-none transition" required />
                      </div>

                      <button type="submit" className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-md mt-2 hover:bg-indigo-700 font-bold shadow-lg transition duration-200 uppercase">
                        Save Address
                      </button>
                    </form>
                  </div>

                  {/* RIGHT IMAGE SECTION */}
                  <div className="flex-1 hidden md:flex items-center justify-center">
                    <img src={assets.add_address_image} alt="Address Illustration" className="w-full max-w-sm" />
                  </div>
                </div>
              );
            };

            export default AddAddress;
            