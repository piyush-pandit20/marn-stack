// import { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Auth = () => {
//   // ✅ setCartItems yahan se nikaal liya
//   const { setShowUserLogin, setUser, axios, navigate, setCartItems } = useContext(AppContext);
//   const [state, setState] = useState("login"); 
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { name, email, password } = formData;
      
//       const { data } = await axios.post(`/api/user/${state}`, {
//         name,
//         email,
//         password,
//       });

//       if (data.success) {
//         toast.success(data.message);
        
//         // ✅ 1. User profile set ki
//         setUser(data.user); 

//         // ✅ 2. MongoDB wala cart frontend mein load kiya (Sabse Zaroori)
//         if (data.user.cartItems) {
//             setCartItems(data.user.cartItems);
//         } else {
//             setCartItems({});
//         }
        
//         setShowUserLogin(false); 
//         navigate("/");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div
//       onClick={() => setShowUserLogin(false)}
//       className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm"
//     >
//       <form
//         onClick={(e) => e.stopPropagation()}
//         onSubmit={handleSubmit}
//         className="sm:w-[350px] w-[90%] text-center border border-gray-100 rounded-2xl px-8 py-8 bg-white shadow-2xl"
//       >
//         <h1 className="text-gray-900 text-3xl font-semibold mb-2">
//           {state === "login" ? "Login" : "Sign up"}
//         </h1>
//         <p className="text-sm text-gray-500 mb-6">Welcome back! Please enter your details.</p>

//         {state !== "login" && (
//           <input
//             type="text"
//             name="name"
//             required
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
//           />
//         )}

//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
//         />

//         <input
//           type="password"
//           name="password"
//           required
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-6 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all"
//         />

//         <button
//           type="submit"
//           className="w-full h-12 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-medium transition-all active:scale-95 shadow-lg shadow-indigo-100"
//         >
//           {state === "login" ? "Login" : "Sign up"}
//         </button>

//         <p className="text-gray-500 text-sm mt-5">
//           {state === "login" ? "Don't have an account?" : "Already have an account?"}
//           <span 
//             onClick={() => setState(state === "login" ? "register" : "login")}
//             className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-1"
//           >
//             Click here
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Auth;
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {
  const { setShowUserLogin, setUser, axios, navigate, setCartItems } = useContext(AppContext);
  const [state, setState] = useState("login"); 
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, formData);

      if (data.success) {
        toast.success(data.message);
        
        // 1. User profile set ki
        setUser(data.user); 

        // 2. MongoDB wala cart load kiya (Safe check ke saath)
        if (data.user && data.user.cartItems) {
            setCartItems(data.user.cartItems);
            console.log("Cart loaded from DB:", data.user.cartItems);
        } else {
            setCartItems({});
        }
        
        setShowUserLogin(false); 
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div onClick={() => setShowUserLogin(false)} className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 backdrop-blur-sm">
      <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="sm:w-[350px] w-[90%] text-center border border-gray-100 rounded-2xl px-8 py-8 bg-white shadow-2xl">
        <h1 className="text-gray-900 text-3xl font-semibold mb-2">{state === "login" ? "Login" : "Sign up"}</h1>
        <p className="text-sm text-gray-500 mb-6">Welcome back!</p>

        {state !== "login" && (
          <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all" />
        )}

        <input type="email" name="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all" />
        <input type="password" name="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-6 p-3 border border-gray-200 rounded-xl focus:border-indigo-500 outline-none transition-all" />

        <button type="submit" className="w-full h-12 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-medium transition-all active:scale-95 shadow-lg shadow-indigo-100">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p className="text-gray-500 text-sm mt-5">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setState(state === "login" ? "register" : "login")} className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-1">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Auth;