"use client";

import React, { useState, useEffect } from "react";
import ButtonRegisterUser from "./ButtonRegisterUser";
import ButtonLoginUser from "./ButtonLoginUser";
import { useRouter } from "next/navigation";
import { useFetchProfileUser } from "@/features";
import ProfileUser from "./ProfileUser";
import toast, { Toaster } from "react-hot-toast";
import '../../app/globals.css'
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from "../../../hooks/useCartStore";
import { trunCateText } from "@/utils/truncateText";
import convertRupiah from 'rupiah-format'
import { motion } from 'framer-motion'
import { IoTrashOutline } from "react-icons/io5";

const Navbar = () => {
  const { data } = useFetchProfileUser();
  console.log(data)
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { cartItems, decrementQuantity, incrementQuantity, removeFromCart } = useCartStore()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const [showCart, setShowCart] = useState(false)

  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([]);

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedCartItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleLogout = () => {
    const logoutToast = toast(
      (t) => (
        <div className="">
          <p className="">Apakah Anda yakin ingin logout?</p>
          <div className="flex justify-evenly pt-2">

          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              setIsLoggedIn(false);
              toast.dismiss(t.id); // Menyembunyikan toast
              setTimeout(() => {
                router.push('/');
              }, 1500);
            }}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
            >
            Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-2 bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600"
            >
            Batal
          </button>
            </div>
        </div>
      ),
      {
        duration: Infinity, // Menjaga toast tetap terbuka sampai dihilangkan
        position: 'top-center',
        className: 'bg-white text-black p-4 rounded-lg shadow-lg',
      }
    );
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-lg dark:shadow-blue-950 dark:shadow-sm">
      <h1 className="font-bold text-3xl">EvstStore</h1>
      <div className="flex space-x-6 mr-12 max-sm:mr-0 items-center">
      <div
          className="relative cursor-pointer"
          onClick={() => setShowCart(!showCart)}
        >
          <FaCartShopping size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
              {cartItems.length}
            </span>
          )}
        </div>
        {showCart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end z-50"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="bg-white w-[400px] h-full p-4 overflow-y-auto"
            initial={{ x: "0%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowCart(false)}
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCartItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCartItems([...selectedCartItems, item.id]);
                        } else {
                          setSelectedCartItems(
                            selectedCartItems.filter((id) => id !== item.id)
                          );
                        }
                      }}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h3 className="text-md">{trunCateText(item.name, 10)}</h3>
                      <p className="text-gray-500 text-sm">
                        {trunCateText(convertRupiah.convert(item.price), 15)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => decrementQuantity(item.id)}>
                        <div className="border pl-2 pr-2">-</div>
                      </button>
                      <p> {item.quantity} </p>
                      <button onClick={() => incrementQuantity(item.id)}>
                        <div className="border pl-1.5 pr-1.5">+</div>
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-1 py-1 ml-4"
                      >
                        <IoTrashOutline size={24} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty!</p>
            )}
            <p className="mb-2">
              Total: {convertRupiah.convert(calculateTotalPrice())}
            </p>
            <button
              className={`w-full bg-green-500 text-white py-2 mt-4 rounded ${
                selectedCartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
              disabled={selectedCartItems.length === 0}
              onClick={() => {
                setShowCart(false);
                if (selectedCartItems.length > 0) {
                  router.push(
                    `/checkout?id=${cartItems[cartItems.length - 1].id}`
                  );
                } else {
                  alert("Your cart is empty!");
                }
              }}
            >
              Checkout
            </button>
          </motion.div>
        </motion.div>
      )}
        {isLoggedIn ? (
          <>
            <ProfileUser />
          </>
        ) : (
          <>
            <ButtonRegisterUser />
            <ButtonLoginUser />
          </>
        )}
      </div>
      <Toaster position="top-center" toastOptions={{ className: 'toast-position' }}/>
    </div>
  );
};

export default Navbar;
