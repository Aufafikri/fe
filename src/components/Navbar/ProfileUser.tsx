"use client";

import { useFetchMerchantProfile, useFetchProfileUser } from "@/features";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SignOut } from "@phosphor-icons/react";
import Image from "next/image";

const DEFAULT_PROFILE_IMAGE =
  "https://www.its.ac.id/it/wp-content/uploads/sites/46/2021/06/blank-profile-picture-973460_1280.png";

const ProfileUser = () => {
  const { data: profileUser } = useFetchProfileUser();
  const userId = profileUser?.id
  const { data: profileMerchant } = useFetchMerchantProfile(userId)
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    toast(
      (t) => (
        <div className="">
          <p className="">Apakah Anda yakin ingin logout?</p>
          <div className="flex justify-evenly pt-2">
            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                toast.dismiss(t.id);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setShowLogoutConfirm(false);
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        className: "bg-white text-black p-4 rounded-lg shadow-lg",
      }
    );
  };

  const handleSettingsAccount = () => {
    router.push("/settings/your-account");
  };

  const handleDashboardPage = () => {
    router.push("/dashboard");
  };

  const handleMerchantPage = () => {
    if(profileMerchant) {
      router.push('/merchant')
    } else {
      router.push('/merchant/create')
    }
  }

  const cleanedProfileImage = profileUser?.profileImage ? profileUser.profileImage.replace("http://localhost:5000/", "") : DEFAULT_PROFILE_IMAGE

  const isGoogleLogin = profileUser?.profileImage?.includes(
    "googleusercontent.com"
  );

  const isGitHubLogin = profileUser?.profileImage?.includes(
    "avatars.githubusercontent.com"
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      onMouseLeave={() => {
        if (!showLogoutConfirm) setIsHovered(false);
      }}
      onClick={() => !showLogoutConfirm && setIsClicked(!isClicked)}
    >
       {(isGoogleLogin || isGitHubLogin) ? (
              <Image
                src={cleanedProfileImage}
                alt="profile"
                className="w-14 h-14 rounded-full cursor-pointer object-cover"
                width={300}
                height={300}
              />
            ) : (
              <img
                src={profileUser?.profileImage}
                alt="profile"
                className="w-14 h-14 rounded-full cursor-pointer object-cover"
              />
            )}
      {/* <img
        src={`${profileUser?.profileImage || DEFAULT_PROFILE_IMAGE}`}
        alt="Profile"
        className="w-14 h-14 rounded-full cursor-pointer object-cover"
      /> */}
      {isHovered && !isClicked && (
        <div className="absolute top-[65px] rounded-lg bg-black text-white px-2 py-1 w-[100px] left-1/2 transform -translate-x-1/2 whitespace-nowrap overflow-hidden">
          <p className="font-bold text-center capitalize">
            {profileUser?.name}
          </p>
        </div>
      )}
      {isClicked && (
        <motion.div
          className="border absolute top-[60px] right-12 dark:bg-neutral-800 rounded-lg shadow-lg w-[300px] dark:border-zinc-600 z-30 bg-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <div className="flex items-center gap-6">
            {(isGoogleLogin || isGitHubLogin) ? (
              <Image
                src={cleanedProfileImage}
                alt="profile"
                className="w-20 h-20 cursor-pointer rounded-full object-cover"
                width={300}
                height={300}
              />
            ) : (
              <img
                src={profileUser?.profileImage}
                alt="profile"
                className="w-20 h-20 rounded-full cursor-pointer object-cover"
              />
            )}
              {/* <img
                src={`${profileUser?.profileImage || DEFAULT_PROFILE_IMAGE}`}
                alt="Profile"
                className="w-20 h-20 rounded-full cursor-pointer object-cover"
              /> */}
              <div className="space-y-0.5">
                <p className="font-bold text-2xl capitalize">
                  {profileUser?.name}
                </p>
                <p className="text-xs text-gray-400">{profileUser?.email}</p>
              </div>
            </div>
          </div>
          <hr className="w-full dark:border-gray-500" />
          <button
            onClick={handleSettingsAccount}
            className="w-full hover:bg-slate-50 hover:dark:bg-neutral-700 text-left p-2 pl-4"
          >
            Settings Profile
          </button>
          <button
            onClick={handleDashboardPage}
            className="w-full hover:bg-slate-50 hover:dark:bg-neutral-700 text-left p-2 pl-4"
          >
            Dashboard
          </button>
          <button
            onClick={handleMerchantPage}
            className="w-full hover:bg-slate-50 hover:dark:bg-neutral-700 text-left p-2 pl-4"
          >
            Merchant
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            className="w-full hover:bg-slate-50 hover:dark:bg-neutral-700 text-left p-2 rounded-br-lg rounded-bl-lg pl-4 text-red-600 flex items-center gap-1"
          >
            <SignOut size={24} weight="bold" />
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileUser;
