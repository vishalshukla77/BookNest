import React, { useState, useEffect, useRef } from 'react';
import {
  HiMenuAlt3,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/Addcontext';

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.cartItems);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMenuAlt3 className="text-2xl" />
          </Link>

          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 pl-10 pr-4 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          {currentUser ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={avatar}
                  alt="User"
                  className={`w-8 h-8 rounded-full object-cover ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item, index) => (
                      <li key={index}>
                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button onClick={handleLogout} className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <HiOutlineUser className="text-2xl" />
            </Link>
          )}

          <button className="hidden sm:block">
            <HiOutlineHeart className="text-2xl" />
          </button>

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center">
            <HiOutlineShoppingCart className="text-2xl" />
            <span className="ml-1 text-sm font-semibold">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
