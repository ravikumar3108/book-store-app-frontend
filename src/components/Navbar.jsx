import React, { useState } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaOpencart } from "react-icons/fa";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

function Navbar() {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogout = ()=>{
    logout()
  }

  return (
    <>
      <header className="max-w-screen-2xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center md:gap-16 gap-4 ">
            <Link to={"/"}>
              <HiMiniBars3CenterLeft />
            </Link>
            <div className="relative sm:w-72 w-40 space-x-2">
              <IoSearch className="absolute inline-block left-3 inset-y-2" />
              <input
                type="text"
                name=""
                id=""
                className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                placeholder="Search Here"
              />
            </div>
          </div>

          {/* right side */}
          <div className="relative flex items-center md:space-x-3 space-x-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setisDropDownOpen(!isDropDownOpen);
                  }}
                >
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* Show Dropdown  */}
                {isDropDownOpen && (
                  <div className="absolute right-0 top-10 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => {
                            setisDropDownOpen(false);
                          }}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to={"/login"}>
                <FaRegUser className="size-6 " />
              </Link>
            )}
            <button className="hidden sm:block">
              <IoIosHeartEmpty className="size-6" />
            </button>
            <Link
              to={"/cart"}
              className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
            >
              <FaOpencart className="size-6" />
              {cartItems.length > 0 ? (
                <span className="text-sm font-semibold sm:ml-1">
                  {cartItems.length}
                </span>
              ) : (
                <span className="text-sm font-semibold sm:ml-1">0</span>
              )}
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
