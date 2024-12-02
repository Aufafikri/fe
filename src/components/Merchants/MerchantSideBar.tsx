'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFetchMerchantProfile, useFetchProfileUser } from '@/features';

const MerchantSidebar = () => {
    const { data: profileUser } = useFetchProfileUser()
    const userId = profileUser?.id
    const { data: merchantProfile } = useFetchMerchantProfile(userId)

    const router = useRouter();

    const handleNavigation = (path: any) => {
    router.push(path);
  };

  return (
    <div className="flex">
      <aside className="text-white h-screen w-1/5 p-4 shadow-md shadow-stone-500">
        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${merchantProfile?.image}`} alt="" className='w-20 h-20 rounded-full mx-auto' />
        <div className="mt-10">
          <div className="mb-3">
            <Link href="/">
              <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-800 rounded">
                Dashboard
              </button>
            </Link>
          </div>
          <div className="mb-3">
            <Link href="/tambah">
              <button className="w-full text-left pl-3 font-bold py-2 hover:bg-gray-800 rounded">
                Tambah Product
              </button>
            </Link>
          </div>
          
        </div>
      </aside>
      </div>
  );
};


export default MerchantSidebar;
