"use client";

import React from "react";
import { useImageProfileModal } from "../../../hooks/useImageProfileModal";
import { useFetchProfileUser } from "@/features";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DEFAULT_PROFILE_IMAGE =
  "https://www.its.ac.id/it/wp-content/uploads/sites/46/2021/06/blank-profile-picture-973460_1280.png";

const HandleModalProfileImage = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { isModalOpen, openModal, closeModal } = useImageProfileModal();

  const cleanedProfileImage = profileSettings?.profileImage ? profileSettings.profileImage.replace("http://localhost:5000/", "") : DEFAULT_PROFILE_IMAGE

  const isGoogleLogin = profileSettings?.profileImage?.includes(
    "googleusercontent.com"
  );

  const isGitHubLogin = profileSettings?.profileImage?.includes(
    "avatars.githubusercontent.com"
  );

  const profileImageToDisplay = cleanedProfileImage
    ? `/uploads/profile-images/${cleanedProfileImage}`
    : DEFAULT_PROFILE_IMAGE;

  console.log("Profile Settings:", profileSettings); // Log data yang diambil
  console.log("Cleaned Profile Image:", cleanedProfileImage);
  console.log(
    "Modal Image Source:",
    cleanedProfileImage || DEFAULT_PROFILE_IMAGE
  );

  return (
    <>
      {(isGoogleLogin || isGitHubLogin) ? (
        <Image
          src={cleanedProfileImage || DEFAULT_PROFILE_IMAGE}
          alt="profile"
          className="w-24 h-24 rounded-full mt-2 object-cover max-sm:mx-auto max-sm:h-32 max-sm:w-32 cursor-pointer"
          width={300}
          height={300}
          onClick={openModal}
        />
      ) : (
        <img
          src={profileSettings?.profileImage || DEFAULT_PROFILE_IMAGE}
          alt="profile"
          className="w-24 h-24 rounded-full mt-2 object-cover max-sm:mx-auto max-sm:h-32 max-sm:w-32 cursor-pointer"
          onClick={openModal}
        />
      )}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {(isGoogleLogin || isGitHubLogin) ? (
              <motion.img
                src={cleanedProfileImage || DEFAULT_PROFILE_IMAGE}
                alt="profile"
                className="max-w-full max-h-full max-sm:h-[450px] max-sm:p-4 p-2 rounded-md object-cover"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            ) : (
              <motion.img
                src={profileSettings?.profileImage || DEFAULT_PROFILE_IMAGE}
                alt="profile"
                className="max-w-full max-h-full max-sm:h-[450px] max-sm:p-4 p-2 rounded-md object-cover"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HandleModalProfileImage;
