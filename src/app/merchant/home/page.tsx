"use client";

import { useFetchMerchantProfile, useFetchProfileUser } from "@/features";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChartLine,
  Gear,
  House,
  List,
  ListBullets,
  Package,
  SignIn,
  UserCircle,
  X,
  CaretDown,
  CaretRight,
  Plus,
} from "@phosphor-icons/react";
import { useImageProfileModal } from "../../../../hooks/useImageProfileModal";

const menuItems = [
  {
    icon: <House size={30} />,
    label: "Home",
    url: "/merchant/home",
  },
  {
    icon: <ChartLine size={30} />,
    label: "Dashboard",
    url: "/merchant/dashboard",
  },
  {
    icon: <Package size={30} />,
    label: "Products",
    children: [
      {
        label: (
          <>
            <Plus size={24} /> Add Product
          </>
        ),
        url: "/merchant/add-product",
      },
    ],
  },
  {
    icon: <Gear size={30} />,
    label: "Settings",
  },
  {
    icon: <ListBullets size={30} />,
    label: "Log",
  },
  {
    icon: <SignIn size={30} />,
    label: "Report",
  },
];

const MerchantHomePage = () => {
  const { data: profileUser } = useFetchProfileUser();
  const userId = profileUser?.id;
  const { data: merchantProfile } = useFetchMerchantProfile(userId);

  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccordion = (index: any) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const { isModalOpen, openModal, closeModal } = useImageProfileModal();

  return (
    <div className="flex">
      <motion.nav
        initial={{ width: isOpen ? 240 : 64 }}
        animate={{ width: isOpen ? 240 : 64 }}
        transition={{ duration: 0.5 }}
        className="shadow-md h-screen p-2 flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text space-y-2"
      >
        <div className="px-3 py-2 h-20 flex justify-between items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${merchantProfile?.image}`}
            alt=""
            className={`${
              isOpen ? "block" : "hidden"
            } w-16 h-16 object-cover rounded-full cursor-pointer`}
            onClick={openModal}
          />
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${merchantProfile?.image}`}
                  alt="profile"
                  className="max-w-full max-h-full max-sm:h-[450px] max-sm:p-4 p-2 rounded-md object-cover"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
          >
            <List size={34} className={`${!isOpen ? "rotate-180" : ""}`} />
          </motion.div>
        </div>
        <ul className="flex-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 my-2 rounded-md cursor-pointer flex justify-between items-center 
                ${
                  item.label === "Home"
                    ? "bg-light-hover dark:bg-dark-hover"
                    : "hover:bg-light-hover dark:hover:bg-dark-hover"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex gap-2 items-center">
                  {item.icon}
                  <motion.p
                    initial={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                    transition={{ duration: 0.3 }}
                    className={`${!isOpen && "hidden"}`}
                  >
                    {item.label}
                  </motion.p>
                </div>
                {item.children && isOpen && (
                  <CaretDown
                    size={20}
                    className={`transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </motion.li>
              {item.children && expandedIndex === index && (
                <ul className={`pl-8 ${isOpen ? "block" : "hidden"} `}>
                  {item.children.map((child, childIndex) => (
                    <motion.button
                      key={childIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 flex hover:bg-light-hover dark:hover:bg-dark-hover rounded-md w-full"
                    >
                      <li key={childIndex}>
                        <Link href={child.url}>
                          <p className="hover:text-primary transition-colors flex gap-2">
                            {child.label}
                          </p>
                        </Link>
                      </li>
                    </motion.button>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
        <motion.div
          className="flex items-center gap-2 px-3 py-2"
          initial={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <UserCircle size={30} />
          {isOpen && (
            <div className="leading-5">
              <p>Saheb</p>
              <span className="text-xs">saheb@gmail.com</span>
            </div>
          )}
        </motion.div>
      </motion.nav>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">Dashboard Merchant</h1>

        {/* Summary Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Ringkasan Penjualan</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg">Penjualan Hari Ini</h3>
              <p className="text-2xl font-bold">Rp 1.500.000</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg">Penjualan Minggu Ini</h3>
              <p className="text-2xl font-bold">Rp 10.500.000</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
              <h3 className="text-lg">Penjualan Bulan Ini</h3>
              <p className="text-2xl font-bold">Rp 45.000.000</p>
            </div>
          </div>
        </section>

        {/* Latest Orders Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Pesanan Terbaru</h2>
          <ul className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <li className="p-4 border-b border-gray-200 dark:border-gray-700">
              Pesanan #001 - Rp 500.000 - Status: Diproses
            </li>
            <li className="p-4 border-b border-gray-200 dark:border-gray-700">
              Pesanan #002 - Rp 750.000 - Status: Selesai
            </li>
            <li className="p-4">
              Pesanan #003 - Rp 250.000 - Status: Belum Dibayar
            </li>
          </ul>
        </section>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Aksi Cepat</h2>
          <div className="flex gap-4">
            <button className="p-4 bg-blue-600 text-white rounded-lg">
              Tambah Produk Baru
            </button>
            <button className="p-4 bg-green-600 text-white rounded-lg">
              Proses Pesanan
            </button>
            <button className="p-4 bg-yellow-600 text-white rounded-lg">
              Update Info Toko
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MerchantHomePage;