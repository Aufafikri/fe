"use client"

import axios from "axios";
import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import ErrorNotification from "./ErrorNotification";

const GithubLoginButton = ({ title }: { title: string }) => {
  const [error, setError] = useState<string | null>(null)
    const loginGithub = async () => {
        // window.location.href = "http://localhost:5000/auth/github/login"
        try {
          const response = await axios.get("http://localhost:5000/auth/github/login", {
            method: "GET"
          })

          if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          window.location.href = response.url;

          }
         catch (error: any) {
          if (error.response && error.response.status === 500) {
            setError('Akun ini sudah terdaftar dengan metode login lain.');
          } else {
            setError('Terjadi kesalahan. Silakan coba lagi.');
          }
        }
    }
  return (
    <>
    {error && <ErrorNotification message={error} />}
      <button
        onClick={loginGithub}
        className="w-full px-4 py-2 font-medium rounded-lg justify-center items-center focus:outline-none cursor-pointer flex gap-2 dark:hover:bg-dark-bg mt-4 border hover:bg-gray-100"
      >
        <BsGithub size={24} />
        {title}
      </button>
    </>
  );
};

export default GithubLoginButton;
