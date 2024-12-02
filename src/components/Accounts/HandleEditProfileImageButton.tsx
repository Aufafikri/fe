import { useFetchProfileUser, useUpdateProfileImage } from "@/features";
import React, { useState } from "react";
import toast from "react-hot-toast";

const HandleEditProfileImageButton = () => {
  const { data: profileSettings } = useFetchProfileUser();
  const { mutate: updateProfile } = useUpdateProfileImage();
  
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setNewProfileImage(file);

    if (file) {
      await handleUpdateProfile(file);
    }
  };

  const handleUpdateProfile = async (file: File) => {
    if (!profileSettings?.id) {
      toast.error("User ID is not available.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);
    console.log("FormData:", formData);
    console.log("File:", file);

    try {
      updateProfile(
        { userId: profileSettings.id, formData },
        {
          onSuccess: () => {
            window.location.reload()
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update profile image.");
    }
  };
  return (
    <>
      <input
        type="file"
        id="upload"
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor="upload"
        className="flex items-center p-2 bg-blue-600 justify-center text-white font-bold gap-2 hover:bg-blue-500 cursor-pointer duration-200 transition rounded-lg"
      >
        Change profile
      </label>
    </>
  );
};

export default HandleEditProfileImageButton;
