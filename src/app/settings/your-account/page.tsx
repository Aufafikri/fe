"use client";

import Navbar from "@/components/Navbar/Index";
import { useDeleteAddress, useFetchProfileUser } from "@/features";
import toast, { Toaster } from "react-hot-toast";
import HandleLogoutButton from "@/components/Accounts/HandleLogoutButton";
import HandleDeleteAccountButton from "@/components/Accounts/HandleDeleteAccountButton";
import ThemeToggleButton from "@/components/Accounts/ThemeToggleButton";
import HandleEditNameButton from "@/components/Accounts/HandleEditNameButton";
import HandleDeleteImageButton from "@/components/Accounts/HandleDeleteImageButton";
import HandleEditProfileImageButton from "@/components/Accounts/HandleEditProfileImageButton";
import HandleCreateMerchant from "@/components/Accounts/HandleCreateMerchant";
import HandleModalProfileImage from "@/components/Accounts/HandleModalProfileImage";
import Link from "next/link";
import {
  MapPinArea,
  Pencil,
  Trash,
  TrashSimple,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import SideBarButtonPofileAccount from "@/styles/sideBarButtonPofileAccount";
import HandleAddAddressButton from "@/components/Accounts/HandleAddAddressButton";
import { trunCateText } from "@/utils/truncateText";
import { Addreess } from "@/types/address";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HandleAddPhoneNumber from "@/components/Accounts/HandleAddPhoneNumber";

const DEFAULT_PROFILE_IMAGE =
  "https://www.its.ac.id/it/wp-content/uploads/sites/46/2021/06/blank-profile-picture-973460_1280.png";

const SettingsAccount = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { mutate: deleteAddress } = useDeleteAddress();

  const addresses = profileSettings?.Address || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const handleOpenEditModal = () => {
    setIsModalEditOpen(true);
  };

  const handleOpenModal = (addressId: string) => {
    setSelectedAddressId(addressId);
    setIsModalOpen(true);
  };

  console.log(profileSettings);

  const handleDeleteAddress = async () => {
    if (selectedAddressId) {
      await deleteAddress(selectedAddressId, {
        onSuccess: () => {
          toast.success("Address deleted successfully!");
          setIsModalOpen(false); // Close modal after success
        },
        onError: () => {
          toast.error("Failed to delete address.");
        },
      });
    }
  };

  const cleanedProfileImage = profileSettings?.profileImage ? profileSettings.profileImage.replace("http://localhost:5000/", "") : DEFAULT_PROFILE_IMAGE

  const isGoogleLogin = profileSettings?.profileImage?.includes(
    "googleusercontent.com"
  );

  const isGitHubLogin = profileSettings?.profileImage?.includes(
    "avatars.githubusercontent.com"
  );

  return (
    <>
      <Navbar />
      <div className="flex max-sm:p-4">
        <div className="p-4 max-sm:hidden">
          <div className="flex items-center gap-4 mb-4">
            {(isGoogleLogin || isGitHubLogin) ? (
              <Image
                src={cleanedProfileImage}
                alt={DEFAULT_PROFILE_IMAGE}
                className="w-14 h-14 rounded-full object-cover"
                width={300}
                height={300}
              />
            ) : (
              <img
                src={profileSettings?.profileImage}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />
            )}
            {/* <img
              src={`${profileSettings?.profileImage || DEFAULT_PROFILE_IMAGE}`}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            /> */}
            <div>
              <h1 className="capitalize"> {profileSettings?.name} </h1>
              <p className="text-gray-400 text-sm">
                {" "}
                {profileSettings?.email}{" "}
              </p>
            </div>
          </div>
          <SideBarButtonPofileAccount />
        </div>
        <div className="pt-4 w-[600px] pb-4">
          <h1 className="text-2xl font-bold">Your Account</h1>
          <h1 className="mt-8 font-semibold dark:text-white">
            Profile Picture
          </h1>
          <div className="flex justify-between items-center max-sm:block">
            <HandleModalProfileImage />
            <div className="flex gap-2 mt-10 max-sm:mt-4 max-sm:justify-center">
              <HandleDeleteImageButton />
              <HandleEditProfileImageButton />
            </div>
          </div>
          <hr className="mt-6" />
          <HandleEditNameButton />
          <p className="text-sm mt-4">
            your name has been automaticly capitalize!
          </p>
          <hr className="mt-6" />
          <h1 className="font-semibold mt-3">Email Address</h1>
          <p className="mt-2"> {profileSettings?.email} </p>
          <hr className="mt-6" />
          <HandleAddPhoneNumber />
          <hr className="mt-6" />
          {profileSettings?.role !== "ADMIN" && (
            <>
              <HandleCreateMerchant />
              <hr className="mt-6" />
            </>
          )}
          <ThemeToggleButton />
          <hr className="mt-6" />
          <h1 className="font-semibold mt-3">
            {addresses.length > 0
              ? "Your Address"
              : "To complete your profile, please enter your address."}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div>
              {addresses.length > 0
                ? addresses.map((address: Addreess, index: any) => (
                    <div key={index}>
                      <div className="flex items-center justify-between gap-2 py-1">
                        <MapPinArea size={24} weight="fill" />
                        <p>
                          {trunCateText(
                            `${address.province}, ${address.city}, ${address.district}, ${address.subdistrict}, ${address.street}, ${address.zipCode}`,
                            60
                          )}
                        </p>
                        <div className="flex gap-2">
                          <button onClick={() => handleOpenEditModal()}>
                            <Pencil color="#386ff0" size={32} weight="fill" />
                          </button>
                          <button onClick={() => handleOpenModal(address.id)}>
                            {" "}
                            <Trash
                              size={32}
                              color="#ff1414"
                              weight="fill"
                            />{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>

          {addresses.length < 2 ? (
            <HandleAddAddressButton />
          ) : (
            <p className="mt-3 text-gray-500">
              You can only have up to 2 addresses.
            </p>
          )}
          <hr className="mt-6" />
          <HandleDeleteAccountButton />
          <hr className="mt-6" />
          <HandleLogoutButton />
        </div>
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
                    <MapPinArea size={40} color="#ff1a1a" weight="fill" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1 text-center mt-2 dark:text-white">
                  Are you sure?
                </h2>
                <div className="flex justify-center items-center">
                  <p className="mb-6 text-light-textGray dark:text-gray-300/50 w-64 text-center">
                    Are you sure want to delete this address on your profile?
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
                      handleDeleteAddress();
                      setIsModalOpen(false);
                    }}
                    className="px-10 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isModalEditOpen && (
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
                  onClick={() => setIsModalEditOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition dark:text-gray-100"
                >
                  <X size={24} weight="bold" />
                </button>
                <div className="flex justify-center items-center">
                  <div className="bg-red-200 w-14 h-14 p-2 rounded-xl">
                    <MapPinArea size={40} color="#ff1a1a" weight="fill" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-1 text-center mt-2 dark:text-white">
                  Are you sure?
                </h2>
                <div className="flex justify-center items-center">
                  <p className="mb-6 text-light-textGray dark:text-gray-300/50 w-64 text-center">
                    Are you sure want to delete this address on your profile?
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
                      handleDeleteAddress();
                      setIsModalOpen(false);
                    }}
                    className="px-10 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
};

export default SettingsAccount;
