"use client"

import { useDeleteAccount, useFetchProfileUser } from "@/features";
import { Warning, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";

const HandleDeleteAccountButton = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleDelete = async () => {
    if (!profileSettings?.id) {
      toast.error("User ID is not available.");
      return;
    }

    try {
      await deleteAccount(profileSettings.id);
      localStorage.removeItem('access_token')
      toast.success("Account deleted successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };
  return (
    <>
      <h1 className="font-semibold mt-3 text-xl text-red-700">
        Delete Account
      </h1>
      <p className="text-sm mt-2">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border mt-2 py-1 px-2 rounded-lg text-red-700 font-semibold bg-slate-100 hover:text-white hover:bg-red-700 dark:bg-red-900 dark:text-white hover:dark:bg-red-700"
      >
        Delete Your Account
      </button>
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
                    <Warning size={40} color="#ff1a1a" weight="fill" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1 text-center mt-2 dark:text-white">
                  Delete Account
                </h2>
                <div className="flex justify-center items-center">
                  <p className="mb-6 text-light-textGray dark:text-gray-300/50 text-center">
                  Deleting your account will remove all of your 
                  information. This cannot be undone. 
                  </p>
                </div>
                  <p className="text-xs pl-2 text-red-500 mb-1">To confirm this type “DELETE”</p>
                <div className="flex justify-around gap-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border py-1 px-3 rounded-md w-full dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      if (inputValue === "DELETE") {
                        handleDelete();
                        setIsModalOpen(false);
                      } else {
                        toast.error('Please type "DELETE" to confirm.');
                      }
                    }}
                    className={`px-10 py-2 rounded text-white transition ${
                      inputValue === "DELETE"
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={inputValue !== "DELETE"}
                  >
                    Delete
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

export default HandleDeleteAccountButton;
