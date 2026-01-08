

// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import profile_icon from "../assets/profile_icon.png";
// import cart_icon from "../assets/cart_icon.svg";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const { user, setUser, setShowUserLogin, cartCount, searchQuery, setSearchQuery } =
//     useContext(AppContext);

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       navigate("/products");
//     }
//   }, [searchQuery, navigate]); // Added 'navigate' to dependency array

//   // Function to handle navigation to My Orders page
//   const handleMyOrdersClick = () => {
//     navigate("/myorders"); // ✅ /myorders पर नेविगेट करें
//     setOpen(false); // Mobile menu बंद करें, यदि खुला हो
//   };

//   // Function to handle Logout
//   const handleLogout = () => {
//     setUser(null);
//     navigate("/"); // Logout के बाद होम पेज पर नेविगेट करें
//     setOpen(false); // Mobile menu बंद करें
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
//       <Link to={"/"}>
//         <h1 className="text-2xl font-bold text-orange-600 cursor-pointer">
//           Grocery App
//         </h1>
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center gap-8">
//         <Link to={"/"}>Home</Link>
//         <Link to={"/products"}>All Products</Link>

//         <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//           <input
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
//             type="text"
//             placeholder="Search products"
//           />
//         </div>

//         {/* Cart */}
//         <Link to="/cart" className="relative cursor-pointer">
//           <img src={cart_icon} alt="Cart" className="w-6 h-6" />
//           <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
//             {cartCount()}
//           </button>
//         </Link>

//         {user ? (
//           <div className="relative group">
//             <img
//               src={profile_icon}
//               alt="Profile"
//               className="w-10 cursor-pointer"
//             />
//             {/* Desktop Dropdown */}
//             <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-10 text-sm">
//               <li
//                 onClick={handleMyOrdersClick} // ✅ सही फंक्शन कॉल
//                 className="p-1.5 cursor-pointer hover:bg-gray-100"
//               >
//                 My Orders
//               </li>
//               <li
//                 onClick={handleLogout} // ✅ सही फंक्शन कॉल
//                 className="p-1.5 cursor-pointer hover:bg-gray-100"
//               >
//                 Logout
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <button
//             className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
//             onClick={() => {
//               setShowUserLogin(true);
//             }}
//           >
//             Login
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       <button onClick={() => setOpen(!open)} className="sm:hidden">
//         ☰
//       </button>
//       <div
//         className={`${
//           open ? "flex" : "hidden"
//         } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-center gap-2 px-5 text-sm md:hidden`}
//       >
//         <Link to={"/"}>Home</Link>
//         <Link to={"/products"}>All Products</Link>

//         {/* Mobile menu में My Orders और Logout लिंक्स */}
//         {user && (
//           <>
//             <button
//               onClick={handleMyOrdersClick} // ✅ सही फंक्शन कॉल
//               className="w-full text-center py-2 hover:bg-gray-100"
//             >
//               My Orders
//             </button>
//             <button
//               onClick={handleLogout} // ✅ सही फंक्शन कॉल
//               className="w-full text-center py-2 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </>
//         )}

//         {!user && (
//           <button
//             className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
//             onClick={() => {
//               setShowUserLogin(true);
//               setOpen(false); // Login के बाद मेनू बंद करें
//             }}
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, setUser, setShowUserLogin, cartCount, searchQuery, setSearchQuery } =
    useContext(AppContext);

  useEffect(() => {
    // ✅ Fix 1: Added optional chaining and null check
    if (searchQuery && searchQuery?.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  const handleMyOrdersClick = () => {
    navigate("/myorders");
    setOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    setOpen(false);
  };

  return (
    // ✅ Fix 2: Added z-50 to ensure button is on top
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-orange-600 cursor-pointer">
          Grocery App
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Products</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            // ✅ Fix 3: Controlled input with fallback string
            value={searchQuery || ""} 
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative cursor-pointer">
          <img src={cart_icon} alt="Cart" className="w-6 h-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {/* ✅ Fix 4: Safe function call */}
            {typeof cartCount === 'function' ? cartCount() : 0}
          </button>
        </Link>

        {user ? (
          <div className="relative group">
            <img
              src={profile_icon}
              alt="Profile"
              className="w-10 cursor-pointer"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-10 text-sm">
              <li onClick={handleMyOrdersClick} className="p-1.5 cursor-pointer hover:bg-gray-100">
                My Orders
              </li>
              <li onClick={handleLogout} className="p-1.5 cursor-pointer hover:bg-gray-100 text-red-500">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            // ✅ Fix 5: Explicit cursor-pointer and higher z-index
            className="relative z-50 cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full active:scale-95"
            onClick={() => setShowUserLogin(true)}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <button onClick={() => setOpen(!open)} className="sm:hidden text-2xl">
        ☰
      </button>
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md py-4 flex-col items-center gap-2 px-5 text-sm md:hidden z-40`}
      >
        <Link onClick={() => setOpen(false)} to={"/"}>Home</Link>
        <Link onClick={() => setOpen(false)} to={"/products"}>All Products</Link>

        {user && (
          <>
            <button onClick={handleMyOrdersClick} className="w-full text-center py-2 hover:bg-gray-100">
              My Orders
            </button>
            <button onClick={handleLogout} className="w-full text-center py-2 hover:bg-gray-100 text-red-500">
              Logout
            </button>
          </>
        )}

        {!user && (
          <button
            className="w-full px-6 py-2 bg-indigo-500 text-white rounded-full"
            onClick={() => {
              setShowUserLogin(true);
              setOpen(false);
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;