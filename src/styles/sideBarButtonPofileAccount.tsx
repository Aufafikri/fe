import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { MapPinArea, UserCircle } from "@phosphor-icons/react";

const SideBarButtonPofileAccount = () => {
  return (
    <div>
      <button
        className={clsx(
          "w-full flex gap-2 font-bold items-center text-start p-2 rounded-lg mb-2",
          "bg-light-bgBlue text-white",
          "dark:bg-dark-bgBlue dark:text-dark-textBlue"
        )}
      >
        <UserCircle size={24} />
        Your Account
      </button>
      <Link href={"/settings/profile/address"}>
        <button className={clsx(
            "w-full flex gap-2 font-bold items-center text-start p-2 rounded-lg",
            "hover:bg-light-bgBlue hover:text-white",
            "dark:hover:bg-dark-bgBlue dark:text-dark-textBlue"
        )}>
          <MapPinArea size={24} />
          Address
        </button>
      </Link>
    </div>
  );
};

export default SideBarButtonPofileAccount;
