"use client"

import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ title }: { title: string }) => {
    const loginGoogle = () => {
        window.location.href = "http://localhost:5000/auth/google/login";
      };
  return (
    <>
      <button
        onClick={loginGoogle}
        className="w-full px-4 py-2 font-medium rounded-lg justify-center items-center focus:outline-none cursor-pointer flex gap-2 dark:hover:bg-dark-bg border hover:bg-gray-100"
      >
        <FcGoogle size={24} />
        {title}
      </button>
    </>
  );
};

export default GoogleLoginButton;
