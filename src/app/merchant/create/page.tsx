"use client";

import React, { useState } from "react";
import { z } from "zod";
import { merchantSchema } from "../../../../schema/useMerchantSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "react-hot-toast";
import { useCreateUserMerchant } from "@/features";
import { UploadSimple } from "@phosphor-icons/react";
import '../../globals.css'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const CreateMerchantPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const { mutate } = useCreateUserMerchant();

  type FormMerchant = z.infer<typeof merchantSchema>;

  const form = useForm<FormMerchant>({
    resolver: zodResolver(merchantSchema),
  });

  const { control, handleSubmit } = form

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
}

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.append("storeName", values.storeName);
    formData.append("storeDescription", values.storeDescription);
    if (image) {
      formData.append("merchantImage", image);
    }
    mutate(formData)
  })

  return (
    <BackgroundBeamsWithCollision className="h-screen">  
    <div className="p-4 min-h-screen flex justify-center items-center bg-gradient-to-b ">
      <div className="p-8 rounded-md shadow-md max-w-2xl dark:shadow-gray-600">
        <div className="flex gap-12">
          <div className="w-full">
        <h1 className="text-center text-3xl font-bold mb-6">Create Merchant</h1>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-2">
            <FormField
              control={control}
              name="storeName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="enter store name" className="dark:bg-transparent dark:border-gray-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="storeDescription"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Store Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="enter store description"
                        className="dark:bg-transparent dark:border-gray-600"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Storeimage</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </Form>
          </div>
        <div>
        <img src="/assets/merchant.png" alt="" className="w-[400px] h-60" />   
        </div>
        </div>
      </div>
      <Toaster />
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default CreateMerchantPage;
