"use client";

import Navbar from "@/components/Navbar/Index";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useFetchProducts } from "@/features/users/merchant/products/useFetchProducts";
import { ProductTypes } from "@/types/products/products";
import rupiahFormat from 'rupiah-format'
import { useRouter } from "next/navigation";
import slugify from "slugify";


const Home = () => {
  const { data: products } = useFetchProducts();
  console.log(products);

  const router = useRouter()
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-4 ">
        <h1 className="text-2xl font-bold mb-4">Category</h1>
        <div className="grid grid-cols-10">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-2">
              <img
                src="https://www.transparentpng.com/download/laptop/9oRuDc-refreshed-pavilion-gaming-series-launching-next-month.png"
                alt="Laptop"
                className="w-20 h-20 object-cover"
              />
              <h1>Laptop</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://www.static-src.com/siva/asset/10_2023/hp-vivo.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Handphone</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/03/Shoes-Free-Download-PNG.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Shoes</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-2">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Smart-Samsung-TV-PNG.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Smart Tv</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://www.pngkey.com/png/full/390-3903752_gambar-sandal-png-hayabusa-flip-flops.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Sandal</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-2">
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/03/Book-PNG-6.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Books</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/014/527/495/non_2x/plain-black-dslr-camera-free-png.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <h1>Camera</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://www.freepnglogos.com/uploads/kaos-polos-png/kaos-polos-black-shirt-png-image-transparent-35.png"
                alt=""
                className="w-20 h-20"
              />
              <h1>Clothes</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://down-id.img.susercontent.com/file/3ef3d17bce21ecb739c5e523c9081898"
                alt=""
                className="w-20 h-20"
              />
              <h1>Headscarf</h1>
            </Card>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ rotate: -10, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-24 h-24 flex flex-col items-center justify-center p-4">
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/04/Wallet-PNG.png"
                alt=""
                className="w-20 h-20"
              />
              <h1>Wallet</h1>
            </Card>
          </motion.div>
        </div>
      <div>
        <div className="grid grid-cols-4 gap-4 mb-8 mt-10">
          {products?.map((product: ProductTypes) => {
            return (
              <div key={product.id} className="shadow-md rounded-2xl" onClick={() => { const slug = slugify(product.name, { lower: true }); router.push(`/products/details/${slug}/${product.id}`)}}>
                <img src={`${product.image}`} alt="" className="w-[500px] h-[300px] object-cover rounded-t-xl" />
                <div className="p-2" >
                <p> {product.name} </p>
                <p className="text-xl font-bold"> {rupiahFormat.convert(product.price)} </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
