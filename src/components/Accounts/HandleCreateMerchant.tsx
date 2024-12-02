"use client"

import { useFetchProfileUser } from '@/features'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const HandleCreateMerchant = () => {
    const { data: users } = useFetchProfileUser()

    console.log(users)

    const router = useRouter()

    const handleClick = () => {
      if(hasMerchant) {
        router.push('/merchant/home')
      } else {
        router.push('/merchant/create')
      }
    }

    const hasMerchant = users?.Merchant?.storeName != null
  return (
    <div>
        <h1 className='mt-3 font-semibold text-base'>
        {hasMerchant ? "Visit Your Merchant!" : "You Don't Have Yet Merchant, Create Your Merchant!"}
        </h1>
        <div className='flex items-center gap-4'>
        <button onClick={handleClick} className='mt-3 p-2 bg-blue-700 hover:bg-blue-600 font-bold rounded-lg text-white capitalize'> {hasMerchant ? "visit merchant" : "create merchant"} </button>
        <Link href={'/merchant/about'} className='mt-6'>what is merchant?</Link>
        </div>
    </div>
  )
}

export default HandleCreateMerchant