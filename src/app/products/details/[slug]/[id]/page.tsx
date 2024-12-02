"use client"

import Navbar from '@/components/Navbar/Index'
import { useFetchMerchantProducts, useFetchProfileUser } from '@/features'
import { useFetchProductId } from '@/features/users/merchant/products/useFetchProducts'
import { LineVertical } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCartPlus } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import rupiahFormat from 'rupiah-format'
import { useCartStore } from '../../../../../../hooks/useCartStore'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import slugify from 'slugify'

const DetailsPageSlugs = ({ params }: { params: { slug: string; id: string } }) => {
    const { data: product } = useFetchProductId(params.id)
    const { data: user } = useFetchProfileUser()
    
    const userId = user?.id

    const merchantId = product?.Merchant.id

    const { cartItems, addToCart } = useCartStore()

    const { data: merchantProducts } = useFetchMerchantProducts(merchantId || "")
    console.log(merchantProducts)
    const totalProducts = merchantProducts?.Product?.length || 0
    const router = useRouter()
    console.log(product)
  return (
    <>
    <Navbar />
    <div className='p-16'>
        <div className='flex gap-8 shadow-xl p-4 dark:bg-slate-900 border'>
            <img src={`${product?.image}`} alt="" className='w-[420px] h-[400px] object-cover' />
            <div>
            <h1 className='text-xl font-semibold'> {product?.name} </h1>
            <p className='mb-3'>Stock:  {product?.stock} </p>
            <h1 className='mb-6 font-bold text-2xl'> {rupiahFormat.convert(product?.price)} </h1>
            <h2> Product Description </h2>
            <h2 className='text-justify mr-4'> {product?.description} </h2>
            <div className='flex gap-4 items-center text-white'>
            <button onClick={() => { addToCart(product); if (!cartItems.some((item) => item.id === product.id)) {
                    addToCart(product);
                    toast.success("Your product added to cart!");
                  } else {
                    toast.error("This product is already in the cart!");
                  } }} className='border py-4 px-8 bg-green-500 mt-6 hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2 rounded-xl'><FaCartPlus size={24} /> Add To Cart</button>
            <button onClick={() => router.push("/")} className='border py-4 px-10 bg-blue-500 mt-6 hover:bg-blue-600 transition duration-300 flex justify-center items-center gap-2 rounded-xl'>Checkout</button>
            </div>
            </div>
        </div>
            <div className='mt-8 dark:border-white flex gap-4 shadow-xl  dark:bg-slate-900 p-4'>
              <img src={`http://localhost:5000${product?.Merchant.image}`} alt="" className='w-28 h-28 object-cover rounded-full' />
              <div>
            <h1 className='font-bold'> {product?.Merchant?.storeName} </h1>
            <button onClick={() => router.push(`/merchant/details/${product?.Merchant?.id}`)} className='border py-2 px-6 flex items-center gap-2 dark:hover:bg-slate-950 hover:bg-slate-100 mt-2'><FaShop size={20} /> See Merchant</button>
              </div>
              <LineVertical size={100} weight='thin'  />
              <p className='w-50 text-justify'> {product?.Merchant.storeDescription}</p>
              <LineVertical size={100} weight='thin'  />
              {/* <MdOutlineProductionQuantityLimits size={24} /> */}
              <div className='flex gap-8'>
              <p>Products</p>
              <p> {totalProducts} </p>
              </div>
            </div>
    </div>
    <Toaster />
    </>
  )
}

export default DetailsPageSlugs