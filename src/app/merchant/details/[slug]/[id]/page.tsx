"use client"

import { useFetchMerchantProducts, useFetchMerchantProfile } from '@/features'
import { MerchantProfileProps, ProductTypes } from '@/types/merchant/merchant'
import { useRouter } from 'next/navigation'
import React from 'react'
import rupiahFormat from 'rupiah-format'

const DetailsMerchant = ({ params }: { params: { slug: string; id: string }}) => {
    console.log(params)
    const { data: merchant } = useFetchMerchantProducts(params.id)

    const router = useRouter()
  return (
    <div>
        <img src={`http://localhost:5000${merchant?.image}`} alt="" className='w-80 h-80 object-cover' />
        <p> {merchant?.storeName} </p>
        <div className='grid grid-cols-4 mt-6 gap-4 mb-10'>
        {merchant?.Product?.map((product: ProductTypes) => {
            return (
                <div key={product.id} className='shadow-md rounded-2xl cursor-pointer' onClick={() => router.push(`/details/${product.id}`)}>
                    <img src={`${product.image}`} alt="" className='w-[500px] h-[300px] rounded-t-xl object-cover' />
                    <div className='p-2'>
                    <p> {product.name} </p>
                    <p className="text-xl font-bold"> {rupiahFormat.convert(product.price)} </p>
                    </div>
                    {/* <p> {product.description} </p> */}
                </div>
            )
        })}
        {/* <div className="grid grid-cols-4 gap-4 mb-8 mt-10">
          {products?.map((product: ProductTypes) => {
            return (
              <div key={product.id} className="shadow-md rounded-2xl" onClick={() => router.push(`/details/${product.id}`)}>
                <img src={`${product.image}`} alt="" className="w-[500px] h-[300px] object-cover rounded-t-xl" />
                <div className="p-2" >
                <p> {product.name} </p>
                <p className="text-xl font-bold"> {rupiahFormat.convert(product.price)} </p>
                </div>
              </div>
            );
          })}
        </div> */}
        </div>
    </div>
  )
}

export default DetailsMerchant