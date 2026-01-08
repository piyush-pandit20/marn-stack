import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SellerLayout = () => {
  const { isSeller, setIsSeller } = useContext(AppContext);
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const handleLogout = () => {
    setIsSeller(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (पूरी width में, sidebar के ऊपर) */}
      <header className="flex justify-between items-center border-b border-gray-300 px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold text-orange-600">Grocery App</h1>
        <div className="flex items-center gap-6">
          <p className="text-gray-600">Hi! Admin</p>
          <button
            className="border border-gray-400 px-4 py-1 rounded-full text-sm hover:bg-gray-100 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Content wrapper */}
      <div className="flex flex-1 bg-white">
        {/* Sidebar */}
        <div className="md:w-64 w-20 border-r border-gray-300 h-full flex flex-col pt-6">
          {sidebarLinks.map(({ name, path, icon }) => (
            <NavLink
              to={path}
              key={name}
              end={path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3 cursor-pointer rounded-r-lg
                 ${
                   isActive
                     ? "bg-indigo-100 border-r-4 border-indigo-600 text-indigo-700 font-semibold"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
              }
            >
              <img src={icon} alt={`${name} icon`} className="w-6 h-6" />
              <span className="md:block hidden">{name}</span>
            </NavLink>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
