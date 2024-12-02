"use client"

import { SignOut, TrashSimple, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HandleLogoutButton = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      router.push("/login");
    
  };

  return (
    <>
    <div className="flex">
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition duration-200 mt-3 ml-auto"
        >
        Logout
      </button>
    </div>
    <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition dark:text-gray-100"
                >
                  <X size={24} weight="bold" />
                </button>
                <div className="flex justify-center items-center">
                  <div className="bg-red-200 w-14 h-14 p-2 rounded-xl">
                    <SignOut size={40} color="#ff1a1a" weight="fill" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1 text-center mt-2 dark:text-white">
                  Logout Account
                </h2>
                <div className="flex justify-center items-center">
                  <p className="mb-6 text-light-textGray dark:text-gray-300/50 w-64 text-center">
                  Are you sure want to logout?
                  once you logout need to log in again
                  </p>
                </div>
                <div className="flex justify-around">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mr-4 px-10 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsModalOpen(false);
                    }}
                    className="px-10 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </>
  );
};

export default HandleLogoutButton;
