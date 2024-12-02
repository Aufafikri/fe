"use client";

import MerchantSidebar from "@/components/Merchants/MerchantSideBar";
import { useFetchMerchantProfile, useFetchProfileUser } from "@/features";
import React from "react";

const MerchantPage = () => {
  const { data: profileSettings } = useFetchProfileUser();

  const userId = profileSettings?.id;
  const { data: profileMerchant } = useFetchMerchantProfile(userId);

  console.log(profileMerchant?.image);

  return (
    <div>
      {/* <h1> {profileMerchant?.storeName} </h1>
      <h1> {profileMerchant?.storeDescription} </h1>
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${profileMerchant?.image}`}
        alt=""
      /> */}
      <MerchantSidebar />
    </div>
  );
};

export default MerchantPage;
